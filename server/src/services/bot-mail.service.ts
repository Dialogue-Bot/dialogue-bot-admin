import { db } from '@/database/db'
import { settings } from '@/database/schema'
import { BotMailDto } from '@/dtos/bot-mail.dto'
import { SendMailQueue } from '@/queues/mail.queue'
import { eq } from 'drizzle-orm'
import { Service } from 'typedi'
import { ChannelService } from './channels.service'

@Service()
export class BotMailService {
  constructor(
    private readonly sendMailQueue: SendMailQueue,
    private readonly channelService: ChannelService,
  ) {}

  async sendMail(fields: BotMailDto) {
    const { subject, template, to, contactId } = fields

    const channel = await this.channelService.findOneByContactId(contactId)

    if (!channel) {
      return
    }

    const [userSetting] = await db
      .select()
      .from(settings)
      .where(eq(settings.userId, channel.userId))

    if (!userSetting) {
      return
    }

    const { email, password } = userSetting.email

    await this.sendMailQueue.addJob({
      from: email,
      to,
      props: {} as any,
      subject,
      template: template as any,
      pass: password,
      user: email,
      isPreventSpam: false,
    })
  }
}
