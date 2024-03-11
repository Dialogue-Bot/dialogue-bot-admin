import { Router } from 'express'
import { UploadController } from '@/controllers/upload.controller'
import type { Routes } from '@/interfaces/routes.interface'
import { upload } from '@/utils/upload-file'
import { ENDPOINTS } from '@/constants'

export class UploadRoute implements Routes {
  router: Router
  controller = new UploadController()

  constructor() {
    this.router = Router()
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.post(
      ENDPOINTS.UPLOAD.SINGLE,
      upload.single('file'),
      this.controller.uploadFile,
    )
    this.router.post(
      ENDPOINTS.UPLOAD.MULTIPLE,
      upload.array('file', 10),
      this.controller.uploadFiles,
    )
  }
}
