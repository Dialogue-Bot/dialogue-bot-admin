import { LOCALE_KEY } from '@/constants'
import Container from 'typedi'
import { LocaleService } from './ctx'

export const getCurrentLocale = () => {
  return Container.get<LocaleService>(LOCALE_KEY).i18n()
}

export const currentLocale = getCurrentLocale()
