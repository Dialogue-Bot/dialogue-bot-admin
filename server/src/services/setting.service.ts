import { db } from '@/database/db'
import { settings } from '@/database/schema'
import { UpdateEmailSettingDto } from '@/dtos/setting.dto'
import { encrypt } from '@/utils/crypto'
import { eq } from 'drizzle-orm'
import { Service } from 'typedi'
import { ChannelService } from './channels.service'
@Service()
export class SettingService {
  constructor(private readonly channelService: ChannelService) {}

  async findByUserId(userId: string, isEnCrypt = true) {
    const [setting] = await db
      .select()
      .from(settings)
      .where(eq(settings.userId, userId))

    if (!setting) {
      const [settingInserted] = await db
        .insert(settings)
        .values({
          userId,
        })
        .returning()

      return isEnCrypt
        ? encrypt(JSON.stringify(settingInserted))
        : settingInserted
    }

    return isEnCrypt ? encrypt(JSON.stringify(setting)) : setting
  }

  async updateEmailSetting(userId: string, fields: UpdateEmailSettingDto) {
    const { email, password } = fields

    const [emailSetting] = await db
      .update(settings)
      .set({
        email: {
          email,
          password,
        },
      })
      .where(eq(settings.userId, userId))
      .returning({
        email: settings.email,
      })

    if (!emailSetting) {
      const [settingInserted] = await db
        .insert(settings)
        .values({
          userId,
          email: {
            email,
            password,
          },
        })
        .returning({
          email: settings.email,
        })

      return encrypt(JSON.stringify(settingInserted))
    }

    return encrypt(JSON.stringify(emailSetting))
  }

  async findByContactId(contactId: string) {
    const channel = await this.channelService.findOneByContactId(contactId)

    if (!channel) {
      return null
    }

    const setting = await this.findByUserId(channel.userId)

    return setting
  }
}
