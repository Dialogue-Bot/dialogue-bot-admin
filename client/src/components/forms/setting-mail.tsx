import { useErrorsLngChange } from '@/hooks/use-errors-lng-change';
import { TSettingMail, useSettingMailSchema } from '@/lib/schema/setting-mail';
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

type Props = {
   loading?: boolean;
   onSubmit?: (data: TSettingMail) => void;
   hasBtn?: boolean;
   defaultValues?: Partial<TSettingMail>;
};

export const SettingMailForm = ({
   loading,
   onSubmit,
   hasBtn,
   defaultValues,
}: Props) => {
   const { t } = useTranslation(['forms', 'common']);

   const schema = useSettingMailSchema();

   const form = useForm<TSettingMail>({
      resolver: zodResolver(schema),
      mode: 'onChange',
      defaultValues,
   });

   const handleSubmit = (data: TSettingMail) => {
      onSubmit?.(data);
   };

   useErrorsLngChange(form);

   return (
      <Form {...form}>
         <form
            className="space-y-3"
            onSubmit={form.handleSubmit(handleSubmit)}
            id="setting-mail-form"
         >
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => {
                  return (
                     <FormItem>
                        <FormLabel required>{t('email.label')}</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              placeholder={t('email.placeholder')}
                              autoComplete="one-time-code"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  );
               }}
            />
            <FormField
               control={form.control}
               name="password"
               render={({ field }) => {
                  return (
                     <FormItem>
                        <FormLabel required>{t('password.label')}</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              placeholder={t('password.placeholder')}
                              type="password"
                              autoComplete="one-time-code"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  );
               }}
            />
            {hasBtn && (
               <Button className="w-full" type="submit" loading={loading}>
                  {t('common:save')}
               </Button>
            )}
         </form>
      </Form>
   );
};

export default SettingMailForm;
