import { LOCALE_KEY } from '@/constants'
import { db } from '@/database/db'
import { settings } from '@/database/schema'
import { UpdateEmailSettingDto } from '@/dtos/setting.dto'
import { HttpException } from '@/exceptions/http-exception'
import { LocaleService } from '@/i18n/ctx'
import { SendMailQueue } from '@/queues/mail.queue'
import { encrypt } from '@/utils/crypto'
import { eq } from 'drizzle-orm'
import { StatusCodes } from 'http-status-codes'
import { Inject, Service } from 'typedi'
import { ChannelService } from './channels.service'
@Service()
export class SettingService {
  constructor(
    private readonly channelService: ChannelService,
    private readonly sendMailQueue: SendMailQueue,
    @Inject(LOCALE_KEY)
    private readonly localeService: LocaleService,
  ) {}

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

  async testSendMail(userId: string) {
    const setting = (await this.findByUserId(userId, false)) as {
      email: {
        email: string
        password: string
      }
    }

    if (!setting.email.email || !setting.email.password) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().SETTING.SAVE_MAIL_FIRST(),
      )
    }

    await this.sendMailQueue.addJob({
      from: setting.email.email,
      to: setting.email.email,
      props: {} as any,
      subject: `Test your email`,
      template: 'This is a test email.' as any,
      pass: setting.email.password,
      user: setting.email.email,
      isPreventSpam: false,
    })
  }
}
