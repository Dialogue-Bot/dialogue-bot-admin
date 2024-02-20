import fs from 'node:fs/promises';
import cuid2 from '@paralleldrive/cuid2';
import { Service } from 'typedi';
import { lookup } from 'mime-types';
import { getDownloadURL } from 'firebase-admin/storage';
import { firebase } from '@/libs/firebase';
import { logger } from '@/utils/logger';

const storageUrl =
   'https://firebasestorage.googleapis.com/v0/b/coffeenearyou-37ef4.appspot.com/o';

@Service()
export class FirebaseService {
   async uploadFile(file: Express.Multer.File, destination: string) {
      const token = cuid2.createId();

      await firebase
         .storage()
         .bucket()
         .upload(file.path, {
            public: true,
            destination: `/${destination}/${file.filename}`,
            metadata: {
               firebaseStorageDownloadTokens: token,
            },
            contentType: lookup(file.path) as string,
         });

      logger.info(`[FIREBASE] Upload file ${file.path}`);

      try {
         await fs.unlink(file.path);
         logger.info(
            `[FIREBASE] Delete file on ${file.path} after upload to firebase`
         );
      } catch (error) {
         logger.error(
            `[FIREBASE] this file ${file.path} not exist but i will ignore it`
         );
      }
      const fileRef = firebase
         .storage()
         .bucket()
         .file(`/${destination}/${file.filename}`);

      const url = await getDownloadURL(fileRef);

      logger.info(`[FIREBASE] Get download url ${url}`);

      return url;
   }

   async uploadFiles(files: Express.Multer.File[], destination: string) {
      const urls = await Promise.all(
         files.map(async (file) => this.uploadFile(file, destination))
      );

      return urls;
   }

   async deleteFile(url: string) {
      try {
         if (!url.includes(storageUrl)) return;

         const path = this.getPathStorageFromUrl(url);

         await firebase.storage().bucket().file(path).delete();

         logger.info(`[FIREBASE] Delete file ${path}`);
      } catch (error) {
         logger.error(`[FIREBASE] Delete file ${error}`);
      }
   }

   async deleteFiles(urls: string[]) {
      await Promise.all(urls.map((url) => this.deleteFile(url)));
   }

   private getPathStorageFromUrl(url: String) {
      let imagePath: string = url.replace(storageUrl, '');

      const indexOfEndPath = imagePath.indexOf('?');

      imagePath = imagePath.substring(0, indexOfEndPath);

      imagePath = imagePath.replace(/%2F/g, '/');

      imagePath = imagePath.replace(/%20/g, ' ');

      return imagePath;
   }
}
