import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { ValidateEnv } from '@/utils/validate-env';
import { UploadRoute } from './routes/upload.route';
import Container from 'typedi';

ValidateEnv();

const app = new App([new AuthRoute(), new UploadRoute()]);

app.listen();
