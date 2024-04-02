export type TIntent = {
  trained: boolean
  id: string
  name: string
  referenceId: string
  intents: Array<{
    intent: string
    prompts: string[]
    answers: string[]
  }>
  entities: Array<any>
  userId: string
  deleted: boolean
  createdAt: string
  updatedAt: string
}

export type TIntentInput = Omit<
  TIntent,
  'id' | 'userId' | 'deleted' | 'createdAt' | 'updatedAt' | 'trained'
>
