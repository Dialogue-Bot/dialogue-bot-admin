import type { Router } from 'express'

export interface Routes<T = any> {
  path?: string
  router: Router
  controller: T
  initializeRoutes: () => void
}
