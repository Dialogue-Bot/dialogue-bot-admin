import { App } from '@/app';
import { ValidateEnv } from '@/utils/validate-env';
import { AuthRoute } from '@routes/auth.route';
import { ChannelRoute } from './routes/channels.route';
import { UploadRoute } from './routes/upload.route';
import { WebhookRoute } from './routes/webhook.route';

ValidateEnv();

const app = new App([
    new WebhookRoute(),
    new AuthRoute(),
    new UploadRoute(),
    new ChannelRoute(),
]);

app.listen();
