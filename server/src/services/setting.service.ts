import { db } from "@/database/db";
import { settings } from "@/database/schema";
import { UpdateEmailSettingDto } from "@/dtos/setting.dto";
import { eq } from "drizzle-orm";
import { Service } from "typedi";
@Service()
export class SettingService {

    async findByUserId(
        userId: string
    ) {
        const [setting] = await db.select(

        ).from(settings).where(
            eq(settings.userId, userId)
        )

        if (!setting) {
            const [settingInserted] = await db.insert(
                settings
            ).values({
                userId
            }).returning()

            return settingInserted
        }

        return setting
    }

    async updateEmailSetting(
        userId: string,
        fields: UpdateEmailSettingDto
    ) {
        const { email, password } = fields

        const [emailSetting] = await db.update(
            settings
        ).set({
            email: {
                email,
                password
            }
        }).where(
            eq(settings.userId, userId)
        ).returning({
            email: settings.email
        })

        return emailSetting.email
    }
}