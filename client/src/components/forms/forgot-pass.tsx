import { useErrorsLngChange } from '@/hooks/use-errors-lng-change';
import { TForgotPass, useForgotPassSchema } from '@/lib/schema/forgot-pass';
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
   onSubmit?: (data: TForgotPass) => void;
};

export const ForgotPassForm = ({ loading, onSubmit }: Props) => {
   const { t } = useTranslation(['set_pass', 'forms']);

   const schema = useForgotPassSchema();

   const form = useForm<TForgotPass>({
      resolver: zodResolver(schema),
      mode: 'onChange',
   });

   const handleSubmit = (data: TForgotPass) => {
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
            <Button className="w-full" type="submit" loading={loading}>
               {t('btn_submit', {
                  ns: 'set_pass',
               })}
            </Button>
         </form>
      </Form>
   );
};

export default ForgotPassForm;
