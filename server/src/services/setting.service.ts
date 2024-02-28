import { db } from '@/database/db';
import { settings } from '@/database/schema';
import { UpdateEmailSettingDto } from '@/dtos/setting.dto';
import { eq } from 'drizzle-orm';
import { Service } from 'typedi';
import { decrypt, encrypt } from '@/utils/crypto';
@Service()
export class SettingService {
   async findByUserId(userId: string) {
      const [setting] = await db
         .select()
         .from(settings)
         .where(eq(settings.userId, userId));

      if (!setting) {
         const [settingInserted] = await db
            .insert(settings)
            .values({
               userId,
            })
            .returning();

         return encrypt(JSON.stringify(settingInserted));
      }

      return encrypt(JSON.stringify(setting));
   }

   async updateEmailSetting(userId: string, fields: UpdateEmailSettingDto) {
      const { email, password } = fields;

      const [emailSetting] = await db
         .update(settings)
         .set({
            email: {
               email,
               password: decrypt(password),
            },
         })
         .where(eq(settings.userId, userId))
         .returning({
            email: settings.email,
         });

      if (!emailSetting) {
         const [settingInserted] = await db
            .insert(settings)
            .values({
               userId,
               email: {
                  email,
                  password: decrypt(password),
               },
            })
            .returning({
               email: settings.email,
            });

         return settingInserted;
      }

      return encrypt(JSON.stringify(emailSetting));
   }
}
