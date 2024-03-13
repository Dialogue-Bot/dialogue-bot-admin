import { BotMailDto } from '@/dtos/bot-mail.dto'
import { SendMailQueue } from '@/queues/mail.queue'
import { Service } from 'typedi'
import { db } from '@/database/db'
import { settings } from '@/database/schema'
import { eq } from 'drizzle-orm'

@Service()
export class BotMailService {
  constructor(private readonly sendMailQueue: SendMailQueue) {}

  async sendMail(fields: BotMailDto) {
    const { from, subject, template, to, variables } = fields

    const userId = '1'

    const [user] = await db
      .select()
      .from(settings)
      .where(eq(settings.userId, userId))

    if (!user) {
      return
    }

    const { email, password } = user.email

    await this.sendMailQueue.addJob({
      from,
      to,
      props: variables,
      subject,
      template,
      pass: password,
      user: email,
    })
  }
}
