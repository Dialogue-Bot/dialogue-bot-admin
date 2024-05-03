import { IIntents } from '@/interfaces/intents.interface'
import { logger } from '@/utils/logger'
import fs from 'fs'
import { NlpManager } from 'node-nlp'
import path from 'path'
import { Service } from 'typedi'

@Service()
export class NlpService {
  public async train({
    intents,
    referenceId,
  }: {
    intents: Array<IIntents>
    referenceId: string
  }) {
    const manager = new NlpManager({ languages: ['en'], forceNER: true })

    intents.forEach((it) => {
      const { intent, prompts, answers } = it

      prompts.forEach((prompt) => {
        manager.addDocument('en', prompt, intent)
      })

      answers.forEach((answer) => {
        manager.addAnswer('en', intent, answer)
      })
    })
    await manager.train()
    await manager.save(
      path.join(process.cwd(), `\/train_data\/${referenceId}.json`),
    )
    console.log('Trained for ' + referenceId + ' successfully')
  }

  public async predict(referenceId: string, text: string) {
    const manager = new NlpManager({ languages: ['en'], nlu: { log: false } })

    if (
      !fs.existsSync(
        path.join(process.cwd(), `\/train_data\/${referenceId}.json`),
      )
    ) {
      logger.info(`[NLP] Could't find references: ${referenceId}`)
      return
    }

    await manager.load(
      path.join(process.cwd(), `\/train_data\/${referenceId}.json`),
    )

    let result = await manager.process('en', text)

    if (result.intent === 'None') return null

    return {
      intent: result.intent,
      answer: result.answer,
    }
  }

  public async deleteTrain(referenceId: string) {
    if (
      !fs.existsSync(
        path.join(process.cwd(), `\/train_data\/${referenceId}.json`),
      )
    )
      throw new Error(`Could't find references!`)

    fs.unlink(
      path.join(process.cwd(), `\/train_data\/${referenceId}.json`),
      (err) => {
        if (err) {
          logger.info(
            `[NLP] Could't delete train: ${referenceId} - Error: ${err}`,
          )
          return
        }
      },
    )
  }
}
