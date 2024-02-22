import { SetPassForm } from '@/components/forms';
import { buttonVariants } from '@/components/ui';
import { useSetPass } from '@/hooks/auth';
import { Link, createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

const SetPassword = () => {
   const { t } = useTranslation(['common', 'set_pass']);

   const setPassMutation = useSetPass();

   return (
      <div className="w-full max-w-sm space-y-3">
         <div className="text-center">
            <h2 className="text-xl font-semibold">
               {t('title', {
                  ns: 'set_pass',
               })}
            </h2>
            <p className="mt-1 text-muted-foreground">
               {t('subtitle', {
                  ns: 'set_pass',
               })}
            </p>
         </div>
         <SetPassForm
            onSubmit={(data) => setPassMutation.mutate(data)}
            loading={setPassMutation.isPending}
         />
         <Link
            className={buttonVariants({
               variant: 'outline',
               className: 'w-full',
            })}
            to="/login"
         >
            {t('back_to_login', {
               ns: 'common',
            })}
         </Link>
      </div>
   );
};

export const Route = createFileRoute('/_auth/set-password')({
   component: SetPassword,
   validateSearch: (search: { token: string }) => {
      return {
         token: search.token || '',
      };
   },
});
