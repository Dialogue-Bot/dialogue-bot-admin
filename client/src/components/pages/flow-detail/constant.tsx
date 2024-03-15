import { EActionTypes } from '@/types/flow'
import {
  GitPullRequest,
  HelpCircle,
  MessageSquareMore,
  Variable,
} from 'lucide-react'

type TAction = {
  type: EActionTypes
  Icon: () => JSX.Element
}

export const ACTIONS: TAction[] = [
  {
    type: EActionTypes.MESSAGE,
    Icon: () => <MessageSquareMore className='w-5 h-5' />,
  },
  {
    type: EActionTypes.PROMPT_AND_COLLECT,
    Icon: () => <HelpCircle className='w-5 h-5' />,
  },
  {
    type: EActionTypes.CHECK_VARIABLES,
    Icon: () => <Variable className='w-5 h-5' />,
  },
  {
    type: EActionTypes.HTTP_REQUEST,
    Icon: () => <GitPullRequest className='w-5 h-5' />,
  },
]

export const MAP_ACTION_TO_LABEL: Record<EActionTypes, string> = {
  [EActionTypes.MESSAGE]: 'Message',
  [EActionTypes.PROMPT_AND_COLLECT]: 'Prompt & Collect',
  [EActionTypes.CHECK_VARIABLES]: 'Check Variables',
  [EActionTypes.HTTP_REQUEST]: 'HTTP Request',
  [EActionTypes.FALLBACK]: 'Fallback',
  [EActionTypes.START]: 'Start',
  [EActionTypes.SUB_FLOW]: 'Sub Flow',
  [EActionTypes.SEND_MAIL]: 'Send Mail',
}
