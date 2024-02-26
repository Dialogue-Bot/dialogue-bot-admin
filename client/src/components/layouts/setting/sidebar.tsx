import PageTitle from '@/components/page-title';
import { Link } from '@tanstack/react-router';
import { CircleUserRound, Mails } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SIDEBAR_ITEMS = [
   {
      name: 'Profiles',
      to: '/settings/profiles',
      i18n: 'profiles',
      Icon: CircleUserRound,
   },
   {
      name: 'Mail',
      to: '/settings/mail',
      i18n: 'mail',
      Icon: Mails,
   },
] as const;

const Sidebar = () => {
   const { t } = useTranslation('common');
   return (
      <div className="min-h-svh w-sidebar-setting flex-shrink-0 bg-primary-foreground fixed top-0 bottom-0 left-sidebar">
         <div className="h-[3.75rem] flex items-center px-4">
            <PageTitle>{t('settings')}</PageTitle>
         </div>
         <ul className="space-y-1">
            {SIDEBAR_ITEMS.map((item: any) => {
               const Icon = item.Icon;
               return (
                  <li key={item.i18n}>
                     <Link
                        to={item.to}
                        search
                        className="flex items-center px-4 py-2 gap-2 transition-all"
                        activeProps={{
                           className: 'text-primary',
                        }}
                     >
                        <Icon className="w-5 h-5" />
                        <span>{t(item.i18n)}</span>
                     </Link>
                  </li>
               );
            })}
         </ul>
      </div>
   );
};

export default Sidebar;
