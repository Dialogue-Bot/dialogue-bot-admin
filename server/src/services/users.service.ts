import { eq } from 'drizzle-orm';
import { Service } from 'typedi';
import { db } from '@/database/db';
import { users } from '@/database/schema';
import type { TNewUser, TUpdateUser } from '@/database/types';

@Service()
export class UserService {
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
      const user = await db.insert(users).values(fields).returning();

      return user[0];
   }

   public async updateOneById(id: string, fields: TUpdateUser) {
      const user = await db
         .update(users)
         .set(fields)
         .where(eq(users.id, id))
         .returning();

      return user[0];
   }
}
