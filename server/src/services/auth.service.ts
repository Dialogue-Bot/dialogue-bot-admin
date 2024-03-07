import { LOCALE_KEY, TIME_EXPIRED_REFRESH_TOKEN } from '@/constants';
import type { InferResultType } from '@/database/types';
import type {
   ForgotPasswordDto,
   IdTokenDto,
   LoginDto,
   RegisterDto,
   ResetPasswordDto,
} from '@/dtos/auth.dto';
import { HttpException } from '@/exceptions/http-exception';
import { LocaleService } from '@/i18n/ctx';
import L from '@/i18n/i18n-node';
import { redis } from '@/libs/redis';
import { SendMailQueue } from '@/queues/mail.queue';
import { logger } from '@/utils/logger';
import {
   ACCESS_TOKEN_SECRET,
   REFRESH_TOKEN_SECRET,
   RESET_PASS_TOKEN_SECRET,
} from '@config';
import type { TTokenData, TTokenStore } from '@interfaces/auth.interface';
import * as bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { sign, verify } from 'jsonwebtoken';
import { omit } from 'lodash';
import { Inject, Service } from 'typedi';
import { FirebaseService } from './firebase.service';
import { UserService } from './users.service';

@Service()
export class AuthService {
   constructor(
      private readonly userService: UserService,
      private readonly sendMailQueue: SendMailQueue,
      @Inject(LOCALE_KEY) private readonly localeService: LocaleService,
      private readonly firebaseService: FirebaseService
   ) {}

   public async login(fields: LoginDto): Promise<TTokenData> {
      const user = await this.userService.findOneByEmail(fields.email);

      if (!user) {
         throw new HttpException(
            StatusCodes.NOT_FOUND,
            this.localeService.i18n().AUTH.ACCOUNT_NOT_FOUND()
         );
      }

      const isMatched = await this.validatePassword(
         fields.password,
         user.password
      );

      if (!isMatched) {
         throw new HttpException(
            StatusCodes.UNAUTHORIZED,
            this.localeService.i18n().AUTH.INCORRECT_PASSWORD()
         );
      }

      const tokenData = this.genTokens(user);

      await redis.set(
         `refresh-token:${user.id}`,
         tokenData.refreshToken,
         'EX',
         TIME_EXPIRED_REFRESH_TOKEN
      );

      return tokenData;
   }

   public async loginWithIdToken(fields: IdTokenDto) {
      const { idToken } = fields;
      const { email, provider, avatar, name } =
         await this.firebaseService.verifyIdToken(idToken);

      const user = await this.userService.findOneByEmail(email);

      // If user exist and provider is not the same => throw error
      if (user && user.provider !== provider) {
         throw new HttpException(
            StatusCodes.CONFLICT,
            this.localeService.i18n().AUTH.PROVIDER_EXIST()
         );
      }

      // If user exist and provider is the same => login success
      if (user && user.provider === provider) {
         const tokenData = this.genTokens(user);

         await redis.set(
            `refresh-token:${user.id}`,
            tokenData.refreshToken,
            'EX',
            TIME_EXPIRED_REFRESH_TOKEN
         );

         return tokenData;
      }

      const createdUser = await this.userService.create({
         avatar,
         email,
         name,
         password: null,
         provider,
         roles: ['USER'],
      });

      const tokenData = this.genTokens(createdUser);

      await redis.set(
         `refresh-token:${createdUser.id}`,
         tokenData.refreshToken,
         'EX',
         TIME_EXPIRED_REFRESH_TOKEN
      );

      return tokenData;
   }

   public async loginAdmin(fields: LoginDto): Promise<TTokenData> {
      const user = await this.userService.findOneByEmail(fields.email);

      if (!user) {
         throw new HttpException(
            StatusCodes.NOT_FOUND,
            this.localeService.i18n().AUTH.ACCOUNT_NOT_FOUND()
         );
      }

      const isMatched = await this.validatePassword(
         fields.password,
         user.password
      );

      if (!isMatched) {
         throw new HttpException(
            StatusCodes.UNAUTHORIZED,
            this.localeService.i18n().AUTH.INCORRECT_PASSWORD()
         );
      }

      if (!user.roles.includes('ADMIN')) {
         throw new HttpException(
            StatusCodes.UNAUTHORIZED,
            this.localeService.i18n().AUTH.UNAUTHORIZED()
         );
      }

      const tokenData = this.genTokens(user);

      await redis.set(
         `refresh-token:${user.id}`,
         tokenData.refreshToken,
         'EX',
         TIME_EXPIRED_REFRESH_TOKEN
      );

      return tokenData;
   }

   public async register(
      fields: RegisterDto
   ): Promise<Omit<InferResultType<'users'>, 'password'>> {
      const { email, name, password } = fields;
      const user = await this.userService.findOneByEmail(email);

      if (user) {
         throw new HttpException(
            StatusCodes.CONFLICT,
            this.localeService.i18n().AUTH.ACCOUNT_EXISTS()
         );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await this.userService.create({
         avatar: null,
         email,
         name,
         password: hashedPassword,
         provider: 'local',
         roles: ['USER'],
      });

      this.genTokens(createdUser);

      return omit(createdUser, ['password']);
   }

   public async forgotPassword(
      fields: ForgotPasswordDto,
      clientUrl = 'http://localhost:3000/'
   ) {
      const { email } = fields;

      const user = await this.userService.findOneByEmail(email);

      if (!user) {
         throw new HttpException(
            StatusCodes.NOT_FOUND,
            this.localeService.i18n().AUTH.ACCOUNT_NOT_FOUND()
         );
      }

      const token = sign({ id: user.id }, RESET_PASS_TOKEN_SECRET as string, {
         expiresIn: '10m',
      });

      await redis.set(`reset-password:${user.id}`, token, 'EX', 10 * 60);

      await this.sendMailQueue.addJob({
         to: email,
         subject: 'Reset password',
         template: 'forgot-password',
         props: {
            // TODO: Change client url when deploy production
            logoUrl: 'http://localhost:8080/public/images/logo.png',
            url: `${clientUrl}/reset-password?token=${token}`,
            username: user.name,
         },
      });
   }

   public async resetPassword(
      fields: ResetPasswordDto & {
         token: string;
      }
   ) {
      const { token, password, passwordConfirm } = fields;

      if (!token) {
         throw new HttpException(
            StatusCodes.BAD_REQUEST,
            this.localeService.i18n().AUTH.URL_TOKEN_INVALID()
         );
      }

      const decoded = (await this.verifyToken(
         token,
         RESET_PASS_TOKEN_SECRET as string
      )) as { id: string };

      const user = await this.userService.findOneById(decoded.id);

      if (!user) {
         throw new HttpException(
            StatusCodes.BAD_REQUEST,
            this.localeService.i18n().AUTH.ACCOUNT_NOT_FOUND()
         );
      }

      if (password !== passwordConfirm) {
         throw new HttpException(
            StatusCodes.BAD_REQUEST,
            this.localeService.i18n().AUTH.PASSWORD_UNMATCH()
         );
      }

      const tokenInRedis = await redis.get(`reset-password:${user.id}`);

      if (token !== tokenInRedis) {
         throw new HttpException(
            StatusCodes.BAD_REQUEST,
            this.localeService.i18n().AUTH.URL_TOKEN_INVALID()
         );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await this.userService.updateOneById(user.id, {
         password: hashedPassword,
      });

      await redis.del(`reset-password:${user.id}`);
   }

   public async refreshToken(refreshToken: string): Promise<TTokenData> {
      logger.info('[AUTH] Try to refresh token');
      const decoded = (await this.verifyToken(
         refreshToken,
         REFRESH_TOKEN_SECRET as string
      )) as { id: string };

      const tokenInRedis = await redis.get(`refresh-token:${decoded.id}`);

      if (refreshToken !== tokenInRedis) {
         logger.error('[AUTH] Refresh token failed');
         throw new HttpException(
            StatusCodes.BAD_REQUEST,
            this.localeService.i18n().AUTH.TOKEN_INVALID_OR_EXPIRED()
         );
      }

      const user = await this.userService.findOneById(decoded.id);

      if (!user) {
         logger.error('[AUTH] Refresh token failed');
         throw new HttpException(
            StatusCodes.NOT_FOUND,
            this.localeService.i18n().AUTH.ACCOUNT_NOT_FOUND()
         );
      }

      const tokenData = this.genTokens(user);

      await redis.set(
         `refresh-token:${user.id}`,
         tokenData.refreshToken,
         'EX',
         TIME_EXPIRED_REFRESH_TOKEN
      );

      logger.info('[AUTH] Refresh token success');
      return tokenData;
   }

   public async findCurrentUser(userId: string) {
      logger.info('[AUTH] Try to get current user');
      const userInCache = await redis.get(`user:${userId}`);

      if (userInCache) {
         logger.info('[AUTH] Get current user in cache success');

         return JSON.parse(userInCache);
      }

      const user = await this.userService.findOneById(userId);

      if (!user) {
         throw new HttpException(
            StatusCodes.NOT_FOUND,
            this.localeService.i18n().AUTH.ACCOUNT_NOT_FOUND()
         );
      }

      await redis.set(
         `user:${userId}`,
         JSON.stringify(omit(user, ['password']))
      );
      logger.info('[AUTH] Get current user success');
      return omit(user, ['password']);
   }

   private genTokens(user: InferResultType<'users'>): TTokenData {
      const dataStoredInToken: TTokenStore = {
         id: user.id,
         roles: user.roles,
      };

      const accessToken = sign(
         dataStoredInToken,
         ACCESS_TOKEN_SECRET as string,
         {
            expiresIn: '2h',
         }
      );

      const refreshToken = sign(
         dataStoredInToken,
         REFRESH_TOKEN_SECRET as string,
         {
            expiresIn: '7d',
         }
      );

      return {
         accessToken,
         refreshToken,
      };
   }

   private async validatePassword(
      incomePassword: string,
      hashedPassword: string
   ) {
      const isMatched = await bcrypt.compare(incomePassword, hashedPassword);

      return isMatched;
   }

   public async verifyToken(token: string, secret: string) {
      return new Promise((resolve, reject) => {
         verify(token, secret, (err, decoded) => {
            if (err) {
               reject(
                  new HttpException(
                     StatusCodes.BAD_REQUEST,
                     L[
                        this.localeService.getLocale()
                     ].AUTH.TOKEN_INVALID_OR_EXPIRED()
                  )
               );
            }

            resolve(decoded);
         });
      });
   }

   public async logout(userId?: string) {
      if (userId) {
         await redis.del(`refresh-token:${userId}`);
      }
   }
}
