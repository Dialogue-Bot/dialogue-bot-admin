import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';
import { ForgotPassword, ForgotPasswordProps } from './templates';
import { MAIL_PASS, MAIL_USER } from '@/config';

interface TemplateProps {
   'forgot-password': ForgotPasswordProps;
   'verify-email': {};
}
type TMapTemplates = {
   [T in keyof TemplateProps]: (props: TemplateProps[T]) => string;
};

const MAP_TEMPLATES: TMapTemplates = {
   'forgot-password': (props) => render(ForgotPassword(props)),
   'verify-email': () => '',
};

export type TTemplate = keyof TemplateProps;

export const sendMail = async <T extends keyof TemplateProps>(opts: {
   to: string;
   subject: string;
   template: T;
   props: TemplateProps[T];
   from?: string;
   user?: string;
   pass?: string;
}) => {
   const {
      to,
      subject,
      template,
      props,
      pass = MAIL_PASS,
      user = MAIL_USER,
      from = MAIL_USER,
   } = opts;
   try {
      const html = MAP_TEMPLATES[template](props);

      const transporter = nodemailer.createTransport({
         service: 'gmail',
         host: 'smtp.gmail.com',
         port: 465,
         secure: true,
         auth: {
            user,
            pass,
         },
      });

      await transporter.sendMail({
         from,
         to,
         subject,
         html,
      });

      logger.info(`Sent email to ${to}`);
   } catch (error) {
      logger.error('Failed to send email');

      throw error;
   }
};
