import { LOCALE_KEY } from '@/constants';
import { db } from '@/database/db';
import { users } from '@/database/schema';
import type { TNewUser, TUpdateUser } from '@/database/types';
import { ChangePasswordDto, UpdateInfoUserDto } from '@/dtos/users.dto';
import { HttpException } from '@/exceptions/http-exception';
import { LocaleService } from '@/i18n/ctx';
import { redis } from '@/libs/redis';
import * as bcrypt from 'bcrypt';
import { and, eq } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';
import { Inject, Service } from 'typedi';
import { FirebaseService } from './firebase.service';

@Service()
export class UserService {
   constructor(
      private readonly firebaseService: FirebaseService,
      @Inject(LOCALE_KEY) private readonly localeService: LocaleService
   ) {}

   public async findOneById(id: string) {
      const user = await db.query.users.findFirst({
         where: eq(users.id, id),
      });

      return user;
   }

   public async findOneByEmail(email: string) {
      const user = await db.query.users.findFirst({
         where: eq(users.email, email),
      });

      return user;
   }

   public async create(fields: TNewUser) {
      const [user] = await db.insert(users).values(fields).returning();

      return user;
   }

   public async updateOneById(id: string, fields: TUpdateUser) {
      const [user] = await db
         .update(users)
         .set(fields)
         .where(eq(users.id, id))
         .returning();

      return user;
   }

   public async findOneByEmailAndProvider(email: string, provider: string) {
      const user = await db.query.users.findFirst({
         where: and(eq(users.email, email), eq(users.provider, provider)),
      });

      return user;
   }

   public async updateInformation(id: string, fields: UpdateInfoUserDto) {
      try {
         const { name, avatar, email } = fields;

         const user = await this.findOneById(id);

         await this.firebaseService.deleteFile(user?.avatar);

         const [userUpdated] = await db
            .update(users)
            .set({
               name,
               avatar,
               email,
            })
            .where(eq(users.id, id))
            .returning();

         await redis.set(`user:${id}`, JSON.stringify(userUpdated));

         return userUpdated;
      } catch (error) {
         if (fields.avatar) {
            await this.firebaseService.deleteFile(fields.avatar);
         }

         throw error;
      }
   }

   public async changePassword(id: string, fields: ChangePasswordDto) {
      const { oldPassword, password } = fields;

      const user = await this.findOneById(id);

      if (user.provider !== 'local') {
         throw new HttpException(
            StatusCodes.BAD_REQUEST,
            this.localeService.i18n().USER.USER_NOT_PROVIDER()
         );
      }

      if (!user) {
         throw new HttpException(
            StatusCodes.NOT_FOUND,
            this.localeService.i18n().USER.USER_NOT_FOUND()
         );
      }

      const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordMatch) {
         throw new HttpException(
            StatusCodes.BAD_REQUEST,
            this.localeService.i18n().USER.OLD_PASSWORD_NOT_MATCH()
         );
      }

      const [userUpdated] = await db
         .update(users)
         .set({
            password: await bcrypt.hash(password, 10),
         })
         .where(eq(users.id, id))
         .returning();

      return userUpdated;
   }
}
