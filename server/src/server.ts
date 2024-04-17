import { App } from '@/app'
import { ValidateEnv } from '@/utils/validate-env'
import { AuthRoute } from '@routes/auth.route'
import { BotMailRoute } from './routes/bot-mail.route'
import { ChannelRoute } from './routes/channels.route'
import { ConversationLiveChatRoute } from './routes/conversation-live-chat.route'
import { ConversationRoute } from './routes/conversation.route'
import { FlowRoute } from './routes/flow.route'
import { IntentRoute } from './routes/intent.route'
import { SettingRoute } from './routes/setting.route'
import { UploadRoute } from './routes/upload.route'
import { UserRoute } from './routes/users.route'
import { WebhookRoute } from './routes/webhook.route'

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
])

app.listen()
