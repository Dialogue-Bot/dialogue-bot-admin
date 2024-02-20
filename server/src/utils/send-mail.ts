import { ForgotPassword } from '@repo/email';
import type { ForgotPasswordProps } from '@repo/email';
import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import { logger } from './logger';

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

const transporter = nodemailer.createTransport({
   service: 'gmail',
   host: 'smtp.gmail.com',
   port: 465,
   secure: true,
   auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
   },
});

export const sendMail = async <T extends keyof TemplateProps>(opts: {
   to: string;
   subject: string;
   template: T;
   props: TemplateProps[T];
}) => {
   const { to, subject, template, props } = opts;
   try {
      const html = MAP_TEMPLATES[template](props);

      await transporter.sendMail({
         from: process.env.MAIL_FROM,
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
