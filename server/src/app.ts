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
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import Container from 'typedi'
import { LOCALE_KEY } from './constants'
import { LocaleService } from './i18n/ctx'
import { getPreferredLocale } from './i18n/get-preferred-locale'
import { loadAllLocales } from './i18n/i18n-util.sync'

Container.set(LOCALE_KEY, new LocaleService('en'))

export class App {
  public app: express.Application
  public env: string
  public port: string | number

  constructor(routes: Routes[]) {
    this.app = express()
    this.env = NODE_ENV || 'development'
    this.port = PORT || 3000
    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeSwagger()
    this.initializeErrorHandling()
    this.initializeAllLocales()
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`)
      logger.info(`======= ENV: ${this.env} =======`)
      logger.info(`🚀 App listening on the port ${this.port}`)
      logger.info(`=================================`)
    })
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
        ],
        credentials: CREDENTIALS,
      }),
    )
    this.app.use(hpp())
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
    this.app.use((req, res, next) => {
      const locale = getPreferredLocale(req)

      Container.get<LocaleService>(LOCALE_KEY).setLocale(locale)

      next()
    })
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/api', route.router)
    })
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    }

    const specs = swaggerJSDoc(options)
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware)
  }

  private initializeAllLocales() {
    loadAllLocales()
  }
}
