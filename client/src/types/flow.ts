export enum ENodeTypes {
  START = 'start',
  END = 'end',
  ACTION = 'action',
  CONDITION = 'condition',
  MESSAGE = 'message',
  QUESTION = 'question',
  ANSWER = 'answer',
  OPTION = 'option',
  FORM = 'form',
}

export type TNodeTypes = Partial<Record<ENodeTypes, () => JSX.Element>>

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
