import { useTranslation } from 'react-i18next';
import { Button } from './ui';
import { lngs } from '@/i18n';
import { ELang } from '@/types/share';

export const ButtonLang = () => {
   const { i18n } = useTranslation();

   return (
      <Button
         variant="outline"
         size="sm"
         onClick={() => {
            i18n.changeLanguage(
               i18n.language === ELang.EN ? ELang.VI : ELang.EN
            );
         }}
         className="min-w-24"
      >
         {lngs.find((lng) => lng.code === i18n.language)?.name}
      </Button>
   );
};

export default ButtonLang;
