export interface IIntents {
  intent: string
  prompts: string[]
  answers: string[]
}

export interface ITrainDescription {
  intent: string
  description: string
}

export interface IIntentExtend {
  id: string
  name: string
  trained: boolean
}
