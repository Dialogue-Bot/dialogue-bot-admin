import { LOCALE_KEY } from '@/constants'
import { db } from '@/database/db'
import { intents } from '@/database/schema'
import { TNewIntent } from '@/database/types'
import { HttpException } from '@/exceptions/http-exception'
import { LocaleService } from '@/i18n/ctx'
import { and, eq } from 'drizzle-orm'
import { StatusCodes } from 'http-status-codes'
import { Inject, Service } from 'typedi'
import { NlpService } from './nlp.service'

@Service()
export class IntentService {
  constructor(
    @Inject(LOCALE_KEY) private readonly localeService: LocaleService,
    private readonly nlpService: NlpService,
  ) { }

  public async create(fields: TNewIntent) {
    const existedName = await db.query.intents.findFirst({
      where: and(
        eq(intents.name, fields.name),
        eq(intents.deleted, false),
        eq(intents.userId, fields.userId)
      ),
    })

    if (existedName) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().INTENT.TRAIN_NAME_EXISTED(),
      )
    }

    await this.nlpService.train({ intents: fields.intents, referenceId: fields.referenceId });

    const [newTrain] = await db.insert(intents).values(fields).returning();


    return newTrain;
  }
}
