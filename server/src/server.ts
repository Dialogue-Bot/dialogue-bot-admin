import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { ValidateEnv } from '@/utils/validate-env';
import { UploadRoute } from './routes/upload.route';
import { ChannelRoute } from './routes/channels.route';

ValidateEnv();

const app = new App([
    new AuthRoute(),
    new UploadRoute(),
    new ChannelRoute(),
]);

app.listen();
