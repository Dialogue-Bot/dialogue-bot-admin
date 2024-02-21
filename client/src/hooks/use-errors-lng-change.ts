import { useTranslation } from 'react-i18next';
import { useDidUpdate } from './use-did-update';
import { UseFormReturn } from 'react-hook-form';

/**
 * Triggers form validation when language changes
 * @param form - react-hook-form form
 */
export const useErrorsLngChange = (form: UseFormReturn<any>) => {
   const { i18n } = useTranslation();

   useDidUpdate(() => {
      form.trigger();
   }, [i18n.language]);
};
