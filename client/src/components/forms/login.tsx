import { useErrorsLngChange } from '@/hooks/use-errors-lng-change';
import { TLogin, useLoginSchema } from '@/lib/schema/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
   Button,
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
   Input,
} from '../ui';
import { Link } from 'react-router-dom';

type Props = {
   loading?: boolean;
   onSubmit?: (data: TLogin) => void;
};

export const LoginForm = ({ loading, onSubmit }: Props) => {
   const { t } = useTranslation(['login', 'forms']);

   const schema = useLoginSchema();

   const form = useForm<TLogin>({
      resolver: zodResolver(schema),
      mode: 'onChange',
   });

   const handleSubmit = (data: TLogin) => {
      onSubmit?.(data);
   };

   useErrorsLngChange(form);

   return (
      <Form {...form}>
         <form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => {
                  return (
                     <FormItem>
                        <FormLabel required>
                           {t('email.label', {
                              ns: 'forms',
                           })}
                        </FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              placeholder={t('email.placeholder', {
                                 ns: 'forms',
                              })}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  );
               }}
            />
            <div className="space-y-2">
               <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                     return (
                        <FormItem>
                           <FormLabel required>
                              {t('password.label', {
                                 ns: 'forms',
                              })}
                           </FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 placeholder={t('password.placeholder', {
                                    ns: 'forms',
                                 })}
                                 type="password"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     );
                  }}
               />
               <div className="flex items-center justify-end">
                  <Link
                     className="text-muted-foreground inline-block text-sm hover:underline underline-offset-2 transition-all"
                     to="/forgot-password"
                  >
                     {t('forgot_password_ask', {
                        ns: 'common',
                     })}
                  </Link>
               </div>
            </div>
            <Button className="w-full" type="submit" loading={loading}>
               {t('btn_submit', {
                  ns: 'login',
               })}
            </Button>
         </form>
      </Form>
   );
};

export default LoginForm;
