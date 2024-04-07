export enum EActionTypes {
  START = 'start',
  MESSAGE = 'message',
  PROMPT_AND_COLLECT = 'prompt-and-collect',
  CHECK_VARIABLES = 'check-variables',
  SEND_MAIL = 'send-mail',
  HTTP_REQUEST = 'http-request',
  SUB_FLOW = 'sub-flow',
  FALLBACK = 'fallback',
}

export type TNodeTypes = Partial<Record<EActionTypes, () => JSX.Element>>

export type TFLow = {
  id: string
  name: string
  userId: string
  deleted: boolean
  updatedAt: string
  createdAt: string
  edges: Array<Record<any, any>>
  nodes: Array<Record<any, any>>
  settings: Array<Record<any, any>>
  variables: Array<{
    name: string
    value: string
  }>
  flows: Array<Record<any, any>>
  publishAt: string
}

export type TNode = {
  id: string
  label: string
  action: EActionTypes
  nextAction?: string
  nextActions?: Array<{
    condition: string
    id: string
  }>
  name: string
  contents?: {
    vi: Record<string, any>
    en: Record<string, any>
  }
  [key: string]: any
}

export enum EMessageTypes {
  TEXT = 'text',
  IMAGE = 'image',
  LIST_CARD = 'list-card',
}

export enum EGrammarTypes {
  INTENT = 'intent',
  NUMBER = 'number',
  EMAIL = 'email',
  PHONE_NUMBER = 'phone-number',
  YES_NO = 'yes-no',
  TEXT = 'text',
}
