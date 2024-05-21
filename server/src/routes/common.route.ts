import { Routes } from '@/interfaces/routes.interface'
import { config } from 'dotenv'
import { Router } from 'express'

config({
  path: process.env.NODE_ENV === 'development' ? '.env.development' : undefined,
})

export class CommonRoute implements Routes {
  public path = '/common'
  public router = Router()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get(`${this.path}/health`, (req, res) => {
      res.status(200).json({ message: 'OK' })
    })

    this.router.get(`${this.path}/env`, (req, res) => {
      res.status(200).json({ env: process.env })
    })
  }
}
