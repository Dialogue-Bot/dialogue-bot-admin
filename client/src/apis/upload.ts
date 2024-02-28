import { ENDPOINTS } from '@/constants';
import http_client from '@/lib/http-client';
import { TBaseResponse } from '@/types/share';

export class UploadApi {
   single(file: File): Promise<TBaseResponse<string>> {
      const formData = new FormData();

      formData.append('file', file);

      return http_client.post(ENDPOINTS.UPLOAD.SINGLE, formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });
   }
}

export const uploadApi = new UploadApi();
