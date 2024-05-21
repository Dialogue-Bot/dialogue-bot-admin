import 'reflect-metadata'

import { App } from '@/app'

import { ValidateEnv } from '@/utils/validate-env'
import { AuthRoute } from '@routes/auth.route'
import { BotMailRoute } from './routes/bot-mail.route'
import { ChannelRoute } from './routes/channels.route'
import { ChatBoxSettingRoute } from './routes/chatbox-setting.route'
import { CommonRoute } from './routes/common.route'
import { ConversationLiveChatRoute } from './routes/conversation-live-chat.route'
import { ConversationRoute } from './routes/conversation.route'
import { FlowRoute } from './routes/flow.route'
import { IntentRoute } from './routes/intent.route'
import { PlanRoute } from './routes/plan.route'
import { SettingRoute } from './routes/setting.route'
import { StripeWebhookRoute } from './routes/stripe-webhook.route'
import { SubscriptionRoute } from './routes/subscription.route'
import { UploadRoute } from './routes/upload.route'
import { UserSubscriptionRoute } from './routes/user-subscription.route'
import { UserRoute } from './routes/users.route'
import { WebhookRoute } from './routes/webhook.route'
import { runWorker } from './worker'

ValidateEnv()

const app = new App([
  new WebhookRoute(),
  new AuthRoute(),
  new UploadRoute(),
  new ChannelRoute(),
  new SettingRoute(),
  new UserRoute(),
  new ConversationRoute(),
  new FlowRoute(),
  new IntentRoute(),
  new ConversationLiveChatRoute(),
  new BotMailRoute(),
  new StripeWebhookRoute(),
  new PlanRoute(),
  new SubscriptionRoute(),
  new UserSubscriptionRoute(),
  new ChatBoxSettingRoute(),
  new CommonRoute(),
])

app.listen()

runWorker()
