import { ENDPOINTS } from '@/constants';
import http_client from '@/lib/http-client';
import { TForgotPass } from '@/lib/schema/forgot-pass';
import { TLogin } from '@/lib/schema/login';
import { TRegister } from '@/lib/schema/register';
import { TSetPass } from '@/lib/schema/set-pass';
import { TBaseResponse, TToken } from '@/types/share';
import { TUser } from '@/types/user';

class Auth {
   login(data: TLogin): Promise<TBaseResponse<TToken>> {
      return http_client.post(ENDPOINTS.AUTH.LOGIN, data);
   }

   // TODO: SHOULD BE CHANGE TYPE ANY TO TYPE USER
   register(data: TRegister): Promise<TBaseResponse<any>> {
      return http_client.post(ENDPOINTS.AUTH.REGISTER, data);
   }

   forgotPassword(data: TForgotPass): Promise<TBaseResponse<null>> {
      return http_client.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
   }

   setPassword(data: TSetPass): Promise<TBaseResponse<null>> {
      return http_client.post(ENDPOINTS.AUTH.RESET_PASSWORD, data);
   }

   // TODO: SHOULD BE CHANGE TYPE ANY TO TYPE USER
   getCurrentUser(): Promise<TBaseResponse<TUser>> {
      return http_client.get(ENDPOINTS.AUTH.CURRENT_USER);
   }

   refreshToken(): Promise<TBaseResponse<TToken>> {
      return http_client.post(ENDPOINTS.AUTH.REFRESH_TOKEN);
   }

   loginWithIdToken(idToken: string): Promise<TBaseResponse<TToken>> {
      return http_client.post(ENDPOINTS.AUTH.WITH_ID_TOKEN, { idToken });
   }

   logout(): Promise<TBaseResponse<null>> {
      return http_client.post(ENDPOINTS.AUTH.LOGOUT);
   }
}

export const auth = new Auth();
