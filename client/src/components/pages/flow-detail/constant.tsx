import i18n from '@/i18n'
import { EActionTypes } from '@/types/flow'
import {
  GitPullRequest,
  HelpCircle,
  Mail,
  MessageSquareMore,
  Variable,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

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
  {
    type: EActionTypes.SEND_MAIL,
    Icon: () => <Mail className='w-5 h-5' />,
  },
]

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
