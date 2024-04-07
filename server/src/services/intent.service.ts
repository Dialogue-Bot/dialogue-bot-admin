import { API_KEY } from '@/config'
import { LOCALE_KEY } from '@/constants'
import { db } from '@/database/db'
import { intents } from '@/database/schema'
import { IntentDTO, PredictIntentDTO } from '@/dtos/intent.dto'
import { PagingDTO } from '@/dtos/paging.dto'
import { HttpException } from '@/exceptions/http-exception'
import { LocaleService } from '@/i18n/ctx'
import { IIntentExtend, IIntents } from '@/interfaces/intents.interface'
import { Paging } from '@/interfaces/paging.interface'
import { logger } from '@/utils/logger'
import axios from 'axios'
import { and, asc, desc, eq, like, sql } from 'drizzle-orm'
import { StatusCodes } from 'http-status-codes'
import { omit } from 'lodash'
import { Inject, Service } from 'typedi'
import { NlpService } from './nlp.service'

@Service()
export class IntentService {
  constructor(
    @Inject(LOCALE_KEY) private readonly localeService: LocaleService,
    private readonly nlpService: NlpService,
  ) {}

  public async create({
    fields,
    userId,
  }: {
    fields: IntentDTO
    userId: string
  }) {
    const existedName = await db.query.intents.findFirst({
      where: and(
        eq(intents.name, fields.name),
        eq(intents.deleted, false),
        eq(intents.userId, userId),
      ),
    })

    if (existedName) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().INTENT.TRAIN_NAME_EXISTED(),
      )
    }

    const { trainType, trainDescription } = fields

    if (trainType === 'automation') {
      for (const td of trainDescription) {
        const dataTrain = await this.search(td.description)

        let prompts = []
        let answers = []

        const { answerBox, relatedSearches, organic, peopleAlsoAsk } =
          dataTrain || {}

        organic?.forEach((o) => {
          const { title, snippet } = o
          prompts.push(title)
          answers.push(snippet)
        })

        relatedSearches?.forEach((r) => {
          prompts.push(r.query)
        })

        peopleAlsoAsk?.forEach((p) => {
          const { question, snippet } = p
          prompts.push(question)
          answers.push(snippet)
        })

        if (answerBox) {
          const { title, snippet } = answerBox
          prompts.push(title)
          answers.push(snippet)
        }

        let intent: IIntents = {
          intent: td.intent,
          prompts: prompts,
          answers: answers,
        }

        fields.intents.push(intent)
      }
    }

    await this.nlpService.train({
      intents: fields.intents,
      referenceId: fields.referenceId,
    })

    const [newTrain] = await db
      .insert(intents)
      .values({
        ...omit(fields, ['trainType', 'trainDescription']),
        userId,
      })
      .returning()

    return newTrain
  }

  public async PredictTrainIntent(fields: PredictIntentDTO) {
    const { referenceId, text } = fields

    const existedIntent = await db.query.intents.findFirst({
      where: and(
        eq(intents.referenceId, referenceId),
        eq(intents.deleted, false),
      ),
    })

    if (!existedIntent) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().INTENT.NOT_FOUND(),
      )
    }

    const intent = await this.nlpService.predict(referenceId, text)

    if (!intent) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().INTENT.NOT_FOUND(),
      )
    }

    return intent
  }

  async search(query: string) {
    try {
      const data = JSON.stringify({
        q: query,
      })

      const config = {
        method: 'post',
        url: 'https://google.serper.dev/search',
        headers: {
          'X-API-KEY': API_KEY,
          'Content-Type': 'application/json',
        },
        data: data,
      }

      const response = await axios(config)
      return response.data
    } catch (ex) {
      logger.info(`[Search] search failed - Error: ${ex}`)
    }
  }

  public async getById(id: string) {
    const existedIntent = await db.query.intents.findFirst({
      where: and(eq(intents.id, id), eq(intents.deleted, false)),
    })

    if (!existedIntent) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().INTENT.NOT_FOUND(),
      )
    }

    return existedIntent
  }

  public async updateById({
    id,
    fields,
    userId,
  }: {
    id: string
    fields: IntentDTO
    userId: string
  }) {
    const existedIntent = await db.query.intents.findFirst({
      where: and(eq(intents.id, id), eq(intents.deleted, false)),
    })

    if (!existedIntent) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().INTENT.NOT_FOUND(),
      )
    }

    const [updateIntent] = await db
      .update(intents)
      .set({
        ...omit(fields, ['trainType', 'trainDescription']),
        updatedAt: new Date(),
      })
      .where(eq(intents.id, id))
      .returning()

    await this.nlpService.train({
      intents: fields.intents,
      referenceId: existedIntent.referenceId,
    })

    return updateIntent
  }

  public async deleteById(id: string) {
    const existedIntent = await db.query.intents.findFirst({
      where: and(eq(intents.id, id), eq(intents.deleted, false)),
    })

    if (!existedIntent) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        this.localeService.i18n().FLOW.NOT_FOUND(),
      )
    }

    await db
      .update(intents)
      .set({
        deleted: true,
      })
      .where(eq(intents.id, id))

    await this.nlpService.deleteTrain(existedIntent.referenceId)
  }

  public async getAllIntents(
    paging: PagingDTO,
    userId: string,
  ): Promise<Paging<IIntentExtend>> {
    const offset = (paging.page && (paging.page - 1) * paging.limit) || 0

    const where = and(
      like(intents.name, `%${paging.q || ''}%`),
      eq(intents.deleted, false),
      eq(intents.userId, userId),
    )

    const result: IIntentExtend[] = await db
      .select({
        id: intents.id,
        name: intents.name,
        trained: sql<boolean>`
        case when ${intents.intents} is null or ${intents.intents}::jsonb = jsonb '[]' then false else true end
    `,
      })
      .from(intents)
      .where(where)
      .orderBy(this.makeOrderBy(paging.sortType, 'name', paging.orderBy))
      .offset(offset)
      .limit(paging.limit)
    const [{ count }] = await db
      .select({ count: sql<number>`cast(count(${intents.id}) as integer)` })
      .from(intents)
      .where(where)

    return { items: result, totalItems: count }
  }

  private makeOrderBy(sortType: string, defaultOrderBy: string, key?: string) {
    let orderBy =
      sortType === 'asc'
        ? asc(intents[key || defaultOrderBy])
        : desc(intents[key || defaultOrderBy])
    return orderBy
  }

  public async getIntentsForSelect(userId: string) {
    const rows = await db
      .select({
        label: intents.name,
        value: intents.id,
      })
      .from(intents)
      .where(and(eq(intents.deleted, false), eq(intents.userId, userId)))
      .orderBy(asc(intents.name))

    return rows
  }
}
