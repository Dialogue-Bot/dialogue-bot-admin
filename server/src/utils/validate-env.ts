import { cleanEnv, port, str } from 'envalid';

export const ValidateEnv = () => {
   cleanEnv(process.env, {
      NODE_ENV: str(),
      PORT: port(),
      ACCESS_TOKEN_SECRET: str(),
      REFRESH_TOKEN_SECRET: str(),
      DATABASE_URL: str(),
   });
};
