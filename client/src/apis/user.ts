import { ENDPOINTS } from '@/constants';
import http_client from '@/lib/http-client';
import { TUpdateInfor } from '@/lib/schema/update-infor';
import { TBaseResponse } from '@/types/share';
import { TUser } from '@/types/user';

class User {
   updateInfor(data: TUpdateInfor): Promise<TBaseResponse<TUser>> {
      return http_client.patch(ENDPOINTS.USER.UPDATE_INFO, data);
   }

   changePass(data: any): Promise<TBaseResponse<null>> {
      return http_client.post(ENDPOINTS.USER.CHANGE_PASS, data);
   }
}

export const userApi = new User();
