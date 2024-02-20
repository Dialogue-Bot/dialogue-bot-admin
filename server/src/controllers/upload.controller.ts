import Container from 'typedi';
import { StatusCodes } from 'http-status-codes';
import { FirebaseService } from '@/services/firebase.service';
import { catchAsync } from '@/utils/catch-async';

export class UploadController {
   firebaseService = Container.get(FirebaseService);

   public uploadFile = catchAsync(async (req, res) => {
      const { file } = req;

      const data = await this.firebaseService.uploadFile(
         file as any,
         'shop-locations'
      );

      res.status(200).json({
         message: 'Upload tệp thành công',
         data,
      });
   });

   public uploadFiles = catchAsync(async (req, res) => {
      const { files } = req;

      const data = await this.firebaseService.uploadFiles(
         files as any,
         'shop-locations'
      );

      res.status(StatusCodes.OK).json({
         message: 'Upload tệp lên thành công',
         data,
      });
   });
}
