import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDidUpdate } from './use-did-update';

/**
 * Triggers form validation when language changes
 * @param form - react-hook-form form
 */
export const useErrorsLngChange = (form: UseFormReturn<any>) => {
   const { i18n } = useTranslation();

   useDidUpdate(() => {
      const fields = Object.keys(form.formState.errors);

      if (fields.length) {
         form.trigger(fields);
      }
   }, [i18n.language, form]);
};
