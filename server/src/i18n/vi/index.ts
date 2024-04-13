import { BaseTranslation } from '../i18n-types'
import { AUTH } from './auth'
import { CHANNEL } from './channel'
import { COMMON } from './common'
import { CONVERSATION_LIVE_CHAT } from './conversation-live-chat'
import { FLOW } from './flow'
import { INTENT } from './intent'
import { SETTING } from './setting'
import { USER } from './user'
import { VALIDATE } from './validate'
const vi = {
  HI: 'Hallo {name}! toi la hoang huy',
  AUTH,
  USER,
  COMMON,
  VALIDATE,
  CHANNEL,
  SETTING,
  FLOW,
  INTENT,
  CONVERSATION_LIVE_CHAT,
} satisfies BaseTranslation

export default vi
