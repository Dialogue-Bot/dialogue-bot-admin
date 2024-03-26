import i18n from '@/i18n'
import { EActionTypes, EMessageTypes } from '@/types/flow'
import {
  Bolt,
  GitPullRequest,
  HelpCircle,
  Mail,
  MessageSquareMore,
  Variable,
  Webhook,
  Workflow,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CheckVariablesContent, MessageDialogContent } from './node-dialog'

export const MAP_ACTION_TO_LABEL: Record<EActionTypes, string> = {
  [EActionTypes.MESSAGE]: i18n.t('flowDetail:actions.items.message') as string,
  [EActionTypes.PROMPT_AND_COLLECT]: i18n.t(
    'flowDetail:actions.items.prompt_and_collect',
  ) as string,
  [EActionTypes.CHECK_VARIABLES]: i18n.t(
    'flowDetail:actions.items.check_variables',
  ) as string,
  [EActionTypes.HTTP_REQUEST]: i18n.t(
    'flowDetail:actions.items.http_request',
  ) as string,
  [EActionTypes.FALLBACK]: i18n.t(
    'flowDetail:actions.items.fallback',
  ) as string,
  [EActionTypes.START]: i18n.t('flowDetail:actions.items.start') as string,
  [EActionTypes.SUB_FLOW]: i18n.t(
    'flowDetail:actions.items.sub_flow',
  ) as string,
  [EActionTypes.SEND_MAIL]: i18n.t(
    'flowDetail:actions.items.send_mail',
  ) as string,
}

export const useMapActionToLabel = () => {
  const { t } = useTranslation('flowDetail')

  return {
    [EActionTypes.MESSAGE]: t('actions.items.message'),
    [EActionTypes.PROMPT_AND_COLLECT]: t('actions.items.prompt_and_collect'),
    [EActionTypes.CHECK_VARIABLES]: t('actions.items.check_variables'),
    [EActionTypes.HTTP_REQUEST]: t('actions.items.http_request'),
    [EActionTypes.FALLBACK]: t('actions.items.fallback'),
    [EActionTypes.START]: t('actions.items.start'),
    [EActionTypes.SUB_FLOW]: t('actions.items.sub_flow'),
    [EActionTypes.SEND_MAIL]: t('actions.items.send_mail'),
  }
}

export const SOURCE_HANDLE_PROMPT_YES = 'prompt-and-collect-yes'
export const SOURCE_HANDLE_PROMPT_NO = 'prompt-and-collect-no'

export const MAP_ACTION: Record<
  EActionTypes,
  {
    icon: () => JSX.Element
    label: string
    dialogContent: () => JSX.Element
  }
> = {
  [EActionTypes.MESSAGE]: {
    icon: () => <MessageSquareMore className='w-4 h-4' />,
    label: 'Message',
    dialogContent: () => <MessageDialogContent />,
  },
  [EActionTypes.PROMPT_AND_COLLECT]: {
    icon: () => <HelpCircle className='w-4 h-4' />,
    label: 'Prompt and collect',
    dialogContent: () => <MessageDialogContent />,
  },
  [EActionTypes.CHECK_VARIABLES]: {
    icon: () => <Variable className='w-4 h-4' />,
    label: 'Check variables',
    dialogContent: () => <CheckVariablesContent />,
  },
  [EActionTypes.HTTP_REQUEST]: {
    icon: () => <GitPullRequest className='w-4 h-4' />,
    label: 'Http request',
    dialogContent: () => <div>Http request</div>,
  },
  [EActionTypes.SEND_MAIL]: {
    icon: () => <Mail className='w-4 h-4' />,
    label: 'Send mail',
    dialogContent: () => <div>Send mail</div>,
  },
  [EActionTypes.FALLBACK]: {
    icon: () => <Webhook className='w-4 h-4' />,
    label: 'Fallback',
    dialogContent: () => <div>Fallback</div>,
  },
  [EActionTypes.START]: {
    icon: () => <Bolt className='w-4 h-4' />,
    label: 'Start',
    dialogContent: () => <div>Start</div>,
  },
  [EActionTypes.SUB_FLOW]: {
    icon: () => <Workflow className='w-4 h-4' />,
    label: 'Sub flow',
    dialogContent: () => <div>Sub flow</div>,
  },
}

export const MAP_MESSAGE_TYPE: Record<
  EMessageTypes,
  {
    label: string
  }
> = {
  [EMessageTypes.TEXT]: {
    label: i18n.t('flowDetail:message_dialog.message_types.text'),
  },
  [EMessageTypes.IMAGE]: {
    label: i18n.t('flowDetail:message_dialog.message_types.image'),
  },
  [EMessageTypes.LIST_BUTTON]: {
    label: i18n.t('flowDetail:message_dialog.message_types.list_button'),
  },
  [EMessageTypes.LIST_CARD]: {
    label: i18n.t('flowDetail:message_dialog.message_types.list_card'),
  },
}

export const CONDITIONAL_OPERATOR = [
  '==',
  '!=',
  '>',
  '>=',
  '<',
  '<=',
  'contains',
  'not_contains',
  'in',
  'not_in',
]
