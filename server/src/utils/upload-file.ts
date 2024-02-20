import { extname, join } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import multer, { diskStorage } from 'multer';

const storage = diskStorage({
   destination: (_req, _file, cb) => {
      const path = join(__dirname, '../../uploads');

      if (!existsSync(path)) {
         mkdirSync(path);
      }

      cb(null, path);
   },
   filename: (_req, file, cb) => {
      const name = file.originalname.split('.')[0];

      const fileExtName = extname(file.originalname);

      const randomName = Array(4)
         .fill(null)
         .map(() => Math.round(Math.random() * 16).toString(16))
         .join('');

      cb(null, `${name}-${randomName}${fileExtName}`);
   },
});

const upload = multer({
   storage,
   fileFilter: (_req, file, cb) => {
      if (
         file.mimetype.startsWith('image/') ||
         file.mimetype.startsWith('video/')
      ) {
         cb(null, true);
      } else {
         cb(new Error('Không đúng định dạng'));
      }
   },
   limits: {
      fileSize: 1024 * 1024 * 10, // 10MB
   },
});

export { upload };
