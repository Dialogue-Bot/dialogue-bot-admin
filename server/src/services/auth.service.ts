import { sign, verify } from 'jsonwebtoken';
import { Service } from 'typedi';
import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import {
   ACCESS_TOKEN_SECRET,
   REFRESH_TOKEN_SECRET,
   RESET_PASS_TOKEN_SECRET,
} from '@config';
import type { TTokenData, TTokenStore } from '@interfaces/auth.interface';
import type {
   ForgotPasswordDto,
   LoginDto,
   RegisterDto,
   ResetPasswordDto,
} from '@/dtos/auth.dto';
import type { InferResultType } from '@/database/types';
import { HttpException } from '@/exceptions/http-exception';
import { redis } from '@/libs/redis';
import { TIME_EXPIRED_REFRESH_TOKEN } from '@/constants';
import { SendMailQueue } from '@/queues/mail.queue';
import { logger } from '@/utils/logger';
import { UserService } from './users.service';

@Service()
export class AuthService {
   constructor(
      private readonly userService: UserService,
      private readonly sendMailQueue: SendMailQueue
   ) {}

   public async login(fields: LoginDto): Promise<TTokenData> {
      const user = await this.userService.findOneByEmail(fields.email);

      if (!user) {
         throw new HttpException(
            StatusCodes.NOT_FOUND,
            'Tài khoản không tồn tại'
         );
      }

      const isMatched = await this.validatePassword(
         fields.password,
         user.password
      );

      if (!isMatched) {
         throw new HttpException(
            StatusCodes.UNAUTHORIZED,
            'Mật khẩu không chính xác'
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

   public async loginAdmin(fields: LoginDto): Promise<TTokenData> {
      const user = await this.userService.findOneByEmail(fields.email);

      if (!user) {
         throw new HttpException(
            StatusCodes.NOT_FOUND,
            'Tài khoản không tồn tại'
         );
      }

      const isMatched = await this.validatePassword(
         fields.password,
         user.password
      );

      if (!isMatched) {
         throw new HttpException(
            StatusCodes.UNAUTHORIZED,
            'Mật khẩu không chính xác'
         );
      }

      if (!user.roles.includes('ADMIN')) {
         throw new HttpException(
            StatusCodes.UNAUTHORIZED,
            'Bạn không có quyền truy cập'
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
         throw new HttpException(StatusCodes.CONFLICT, 'Email đã được sử dụng');
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
            'Tài khoản không tồn tại'
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
            'Đường dẫn đã hết hạn hoặc không hợp lệ'
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
            'Đường dẫn đã hết hạn hoặc không hợp lệ'
         );
      }

      if (password !== passwordConfirm) {
         throw new HttpException(
            StatusCodes.BAD_REQUEST,
            'Mật khẩu không khớp'
         );
      }

      const tokenInRedis = await redis.get(`reset-password:${user.id}`);

      if (token !== tokenInRedis) {
         throw new HttpException(
            StatusCodes.BAD_REQUEST,
            'Đường dẫn đã hết hạn hoặc không hợp lệ'
         );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await this.userService.updateOneById(user.id, {
         password: hashedPassword,
      });

      await redis.del(`reset-password:${user.id}`);
   }

   public async refreshToken(refreshToken: string): Promise<TTokenData> {
      const decoded = (await this.verifyToken(
         refreshToken,
         REFRESH_TOKEN_SECRET as string
      )) as { id: string };

      const tokenInRedis = await redis.get(`refresh-token:${decoded.id}`);

      if (refreshToken !== tokenInRedis) {
         throw new HttpException(
            StatusCodes.UNAUTHORIZED,
            'Phiên đăng nhập đã hết hạn'
         );
      }

      const user = await this.userService.findOneById(decoded.id);

      if (!user) {
         throw new HttpException(
            StatusCodes.NOT_FOUND,
            'Tài khoản không tồn tại'
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
            'Tài khoản không tồn tại'
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
            expiresIn: '1d',
         }
      );

      const refreshToken = sign(
         dataStoredInToken,
         REFRESH_TOKEN_SECRET as string,
         {
            expiresIn: '30d',
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
                     StatusCodes.UNAUTHORIZED,
                     'Token đã hết hạn hoặc không hợp lệ'
                  )
               );
            }

            resolve(decoded);
         });
      });
   }
}
