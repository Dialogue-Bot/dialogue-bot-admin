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

export type TNodeTypes = Partial<Record<ENodeTypes, () => JSX.Element>>;
