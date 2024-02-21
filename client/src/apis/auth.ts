import { ENDPOINTS } from '@/constants';
import http_client from '@/lib/http-client';
import { TLogin } from '@/lib/schema/login';
import { TBaseResponse, TToken } from '@/types/share';

class Auth {
   async login(data: TLogin): Promise<TBaseResponse<TToken>> {
      return http_client.post(ENDPOINTS.AUTH.LOGIN, data);
   }
}

export const auth = new Auth();
