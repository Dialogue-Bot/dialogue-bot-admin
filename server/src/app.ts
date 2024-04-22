import { CREDENTIALS, LOG_FORMAT, NODE_ENV, PORT } from '@config'
import type { Routes } from '@interfaces/routes.interface'
import { ErrorMiddleware } from '@middlewares/error.middleware'
import { logger, stream } from '@utils/logger'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'
import 'reflect-metadata'
import Container from 'typedi'
import { ENDPOINTS, LOCALE_KEY } from './constants'
import { LocaleService } from './i18n/ctx'
import { getPreferredLocale } from './i18n/get-preferred-locale'
import { loadAllLocales } from './i18n/i18n-util.sync'

// socket.io
import { createServer } from 'http'
import path from 'path'
import { Server } from 'socket.io'
import { SocketController } from './controllers/socket.controller'
import { printRoute } from './utils/print-route'

Container.set(LOCALE_KEY, new LocaleService('en'))

export class App {
  public app: express.Application
  public env: string
  public port: string | number
  public static io: Server

  constructor(routes: Routes[]) {
    this.app = express()
    this.env = NODE_ENV || 'development'
    this.port = PORT || 3000
    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeErrorHandling()
    this.initializeAllLocales()
  }

  public listen() {
    try {
      const socketController = new SocketController()
      const server = createServer(this.app)
      App.io = new Server(server)

      App.io.on('connection', (socket) => {
        socketController.handleJoinRoom(socket)
        socketController.handleSocketEvents(socket)
      })

      server.listen(this.port, () => {
        logger.info(`=================================`)
        logger.info(`======= ENV: ${this.env} =======`)
        logger.info(`🚀 App listening on the port ${this.port}`)
        logger.info(`=================================`)
      })
    } catch (error) {
      console.error('Error initializing server:', error)
    }
  }

  public getServer() {
    return this.app
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT as any, { stream }))
    this.app.use(
      cors({
        origin: [
          'http://localhost:5173',
          'http://localhost:3000',
          'http://localhost:4173',
          'http://localhost:5174',
          'http://localhost:5175',
        ],
        credentials: CREDENTIALS,
      }),
    )
    this.app.use(hpp())
    this.app.use(
      helmet({
        crossOriginResourcePolicy: false,
      }),
    )
    this.app.use(compression())
    this.app.use(
      `/api${ENDPOINTS.STRIPE_WEBHOOK.INDEX}`,
      express.raw({ type: '*/*' }),
    )
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
    this.app.use((req, _res, next) => {
      const locale = getPreferredLocale(req)

      Container.get<LocaleService>(LOCALE_KEY).setLocale(locale)

      next()
    })
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/api', route.router)
      logger.info(`Routes: ${route.constructor.name} initialized`)

      printRoute(route.router)
    })
    this.app.use('/public', express.static(path.join(process.cwd(), 'public')))
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware)
  }

  private initializeAllLocales() {
    loadAllLocales()
  }
}
