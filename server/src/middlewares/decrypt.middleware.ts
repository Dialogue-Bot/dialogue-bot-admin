import { decrypt } from '@/utils/crypto';

export const decryptMiddleware = (req, res, next) => {
   if (req.body?.encrypted) {
      req.body = JSON.parse(decrypt(req.body.encrypted));
   }

   next();
};
