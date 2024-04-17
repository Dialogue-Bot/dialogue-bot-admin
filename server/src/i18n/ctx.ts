import { Service } from 'typedi'
import L from './i18n-node'
import { Locales } from './i18n-types'

@Service()
export class LocaleService {
  private locale: Locales

  constructor(locale: Locales = 'en') {
    this.locale = locale
  }

  /**
   * Gets the current locale.
   *
   * @returns The current locale.
   */
  getLocale() {
    return this.locale
  }

  /**
   * Sets the locale for the context.
   * @param locale The locale to set.
   */
  setLocale(locale: Locales) {
    this.locale = locale
  }

  /**
   * Returns the localized language object based on the current locale.
   * @returns The localized language object.
   */
  i18n() {
    return L[this.locale]
  }
}
