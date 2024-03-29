import { Request } from 'express'
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors'
import { Locales } from './i18n-types'
import { detectLocale } from './i18n-util'

export const getPreferredLocale = (req: Request): Locales => {
  const headers = {
    get: (key: string) => (req.headers[key] as string) || null,
  }
  const acceptLanguageDetector = initAcceptLanguageHeaderDetector(
    { headers },
    'lang',
  )

  return detectLocale(acceptLanguageDetector)
}
