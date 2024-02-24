import { QUEUE_KEYS } from '@/constants';
import { redis } from '@/libs/redis';
import type { sendMail } from '@/mail/send-mail';
import { Queue } from 'bullmq';
import { Service } from 'typedi';

@Service()
export class SendMailQueue extends Queue {
   constructor() {
      super(QUEUE_KEYS.SEND_EMAIL, {
         connection: redis,
      });
   }

   async addJob(data: Parameters<typeof sendMail>[0]) {
      const job = await this.add('send-mail', data, {
         attempts: 3,
         backoff: {
            type: 'exponential',
            delay: 1000,
         },
         removeOnComplete: true,
         removeOnFail: true,
      });

      return job;
   }
}
