import { MAIL_PASS, MAIL_USER } from '@/config'
import { render } from '@react-email/render'
import nodemailer from 'nodemailer'
import { logger } from '../utils/logger'
import {
  ForgotPassword,
  ForgotPasswordProps,
  VerifyAccount,
  VerifyAccountProps,
} from './templates'

interface TemplateProps {
  'forgot-password': ForgotPasswordProps
  'verify-account': VerifyAccountProps
}
type TMapTemplates = {
  [T in keyof TemplateProps]: (props: TemplateProps[T]) => string
}

const MAP_TEMPLATES: TMapTemplates = {
  'forgot-password': (props) => render(ForgotPassword(props)),
  'verify-account': (props) => render(VerifyAccount(props)),
}

export type TTemplate = keyof TemplateProps

export const sendMail = async <
  T extends keyof TemplateProps = keyof TemplateProps & string,
>(opts: {
  to: string
  subject: string
  template: T
  props: T extends keyof TemplateProps ? TemplateProps[T] : any
  from?: string
  user?: string
  pass?: string
}) => {
  const {
    to,
    subject,
    template,
    props,
    pass = MAIL_PASS,
    user = MAIL_USER,
    from = MAIL_USER,
  } = opts
  try {
    const isNotInKey = !Object.keys(MAP_TEMPLATES).includes(template)

    const html = isNotInKey ? template : MAP_TEMPLATES[template](props)

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user,
        pass,
      },
    })

    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    })

    logger.info(`Sent email to ${to}`)
  } catch (error) {
    logger.error('Failed to send email')

    throw error
  }
}
