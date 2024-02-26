import { uploadApi } from '@/apis/upload';
import { useMutation } from '@tanstack/react-query';

export const useUploadSingle = () => {
   return useMutation({
      mutationFn: (file: File) => {
         return uploadApi.single(file);
      },
   });
};
