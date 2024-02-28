import { App } from '@/app';
import { ValidateEnv } from '@/utils/validate-env';
import { AuthRoute } from '@routes/auth.route';
import { ChannelRoute } from './routes/channels.route';
import { SettingRoute } from './routes/setting.route';
import { UploadRoute } from './routes/upload.route';
import { UserRoute } from './routes/users.route';
import { WebhookRoute } from './routes/webhook.route';

ValidateEnv();

const app = new App([
   new WebhookRoute(),
   new AuthRoute(),
   new UploadRoute(),
   new ChannelRoute(),
   new SettingRoute(),
   new UserRoute(),
]);

app.listen();
