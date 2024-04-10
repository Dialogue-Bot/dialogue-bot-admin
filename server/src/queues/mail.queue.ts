import { QUEUE_KEYS } from '@/constants'
import { HttpException } from '@/exceptions/http-exception'
import { redis } from '@/libs/redis'
import type { sendMail } from '@/mail/send-mail'
import { Queue } from 'bullmq'
import { Service } from 'typedi'

@Service()
export class SendMailQueue extends Queue {
  constructor() {
    super(QUEUE_KEYS.SEND_EMAIL, {
      connection: redis,
    })
  }

  async addJob(data: Parameters<typeof sendMail>[0]) {
    const lastSubmissionTime = await redis.get(`send-email:${data.to}`)
    const currentTime = new Date().getTime()
    if (
      lastSubmissionTime &&
      currentTime - parseInt(lastSubmissionTime) < 60 * 1000
    ) {
      throw new HttpException(429, 'You can only send email once per minute')
    }

    const job = await this.add('send-mail', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnComplete: true,
      removeOnFail: true,
    })

    await redis.set(`send-email:${data.to}`, currentTime.toString(), 'EX', 60)

    return job
  }
}
