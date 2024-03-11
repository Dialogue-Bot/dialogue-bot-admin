import { useForm } from 'react-hook-form';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
   Input,
} from '../ui';
import { useErrorsLngChange } from '@/hooks/use-errors-lng-change';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { TFlowInput, useFlowInputSchema } from '@/lib/schema/flow-input';

type Props = {
   id?: string;
   onSubmit?: (data: TFlowInput) => void;
   defaultValues?: TFlowInput;
};

const FLowForm = ({ id = 'channel-form', onSubmit, defaultValues }: Props) => {
   const { t } = useTranslation('forms');
   const schema = useFlowInputSchema();
   const form = useForm<TFlowInput>({
      resolver: zodResolver(schema),
      mode: 'onChange',
      defaultValues,
   });

   useErrorsLngChange(form);

   const handleSubmit = (data: TFlowInput) => {
      if (onSubmit) {
         onSubmit(data);
      }
   };

   return (
      <Form {...form}>
         <form
            className="space-y-3"
            id={id}
            onSubmit={form.handleSubmit(handleSubmit)}
         >
            <FormField
               name="name"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel required>{t('name.label')}</FormLabel>
                     <FormControl>
                        <Input
                           {...field}
                           placeholder={t('name.placeholder')}
                           autoComplete="off"
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
         </form>
      </Form>
   );
};

export default FLowForm;
