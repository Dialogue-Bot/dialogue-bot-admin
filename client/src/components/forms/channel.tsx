import { useForm } from 'react-hook-form';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
   Input,
   Label,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
   Switch,
} from '../ui';
import { TChannelInput, useChannelSchema } from '@/lib/schema/channel';
import { useErrorsLngChange } from '@/hooks/use-errors-lng-change';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { queryChannelTypesOption } from '@/lib/query-options/channel';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChannelType } from '@/types/channel';
import { useMemo } from 'react';
import { useDidUpdate } from '@/hooks/use-did-update';

type Props = {
   id?: string;
   onSubmit?: (data: TChannelInput) => void;
   defaultValues?: TChannelInput;
};

const ChannelForm = ({
   id = 'channel-form',
   onSubmit,
   defaultValues,
}: Props) => {
   const { t } = useTranslation('forms');
   const schema = useChannelSchema();
   const form = useForm<TChannelInput>({
      resolver: zodResolver(schema),
      mode: 'onChange',
      defaultValues: {
         active: true,
         ...defaultValues,
      },
   });
   const { data: types } = useQuery(queryChannelTypesOption);

   const channelTypeId = form.watch('channelTypeId');

   const currentType = useMemo(
      () => types?.find((type) => type.id === channelTypeId),
      [channelTypeId, types]
   );

   useErrorsLngChange(form);

   const handleSubmit = (data: TChannelInput) => {
      if (onSubmit) {
         onSubmit(data);
      }
   };

   useDidUpdate(() => {
      form.setValue('credentials', {});
   }, [currentType, form]);

   return (
      <Form {...form}>
         <form
            className="space-y-3"
            id={id}
            onSubmit={form.handleSubmit(handleSubmit)}
         >
            <FormField
               name="contactId"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>{t('contactId.label')}</FormLabel>
                     <FormControl>
                        <Input
                           {...field}
                           placeholder={t('contactId.placeholder')}
                           autoComplete="off"
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               name="contactName"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>{t('contactName.label')}</FormLabel>
                     <FormControl>
                        <Input
                           {...field}
                           placeholder={t('contactName.placeholder')}
                           autoComplete="off"
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="active"
               render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                     <div className="space-y-0.5">
                        <FormLabel>
                           <Label>{t('active.label')}</Label>
                        </FormLabel>
                     </div>
                     <FormControl>
                        <Switch
                           checked={field.value}
                           onCheckedChange={field.onChange}
                        />
                     </FormControl>
                  </FormItem>
               )}
            />
            <FormField
               name="channelTypeId"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>{t('channelTypeId.label')}</FormLabel>
                     <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                     >
                        <FormControl>
                           <SelectTrigger>
                              <SelectValue
                                 placeholder={t('channelTypeId.placeholder')}
                              />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {types?.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                 {type.description}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>

                     <FormMessage />
                  </FormItem>
               )}
            />
            {currentType &&
               (currentType.name === ChannelType.MESSENGER ||
                  currentType.name === ChannelType.LINE) && (
                  <>
                     <FormField
                        name="credentials.pageToken"
                        control={form.control}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>{t('pageToken.label')}</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    placeholder={t('pageToken.placeholder')}
                                    autoComplete="off"
                                 />
                              </FormControl>

                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     {currentType.name === ChannelType.MESSENGER && (
                        <FormField
                           name="credentials.webhookSecret"
                           control={form.control}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>
                                    {t('webhookSecret.label')}
                                 </FormLabel>
                                 <FormControl>
                                    <Input
                                       {...field}
                                       placeholder={t(
                                          'webhookSecret.placeholder'
                                       )}
                                       autoComplete="off"
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     )}
                  </>
               )}
         </form>
      </Form>
   );
};

export default ChannelForm;
