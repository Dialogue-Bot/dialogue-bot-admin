export enum EActionTypes {
  START = 'start',
  MESSAGE = 'message',
  PROMPT_AND_COLLECT = 'prompt-and-collect',
  CHECK_VARIABLES = 'check-variables',
  SEND_MAIL = 'send-mail',
  HTTP_REQUEST = 'http-request',
  SUB_FLOW = 'sub-flow',
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
