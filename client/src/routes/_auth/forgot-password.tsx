import ForgotPassForm from '@/components/forms/forgot-pass';
import { buttonVariants } from '@/components/ui';
import { useForgotPass } from '@/hooks/auth';
import { Link, createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
   const { t } = useTranslation(['common', 'forgot_pass']);

   const forgotPassMutation = useForgotPass();

   return (
      <div className="w-full max-w-sm space-y-3">
         <div className="text-center">
            <h2 className="text-xl font-semibold">
               {t('title', {
                  ns: 'forgot_pass',
               })}
            </h2>
            <p className="mt-1 text-muted-foreground">
               {t('subtitle', {
                  ns: 'forgot_pass',
               })}
            </p>
         </div>
         <ForgotPassForm
            onSubmit={(data) => forgotPassMutation.mutate(data)}
            loading={forgotPassMutation.isPending}
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

export const Route = createFileRoute('/_auth/forgot-password')({
   component: ForgotPassword,
});
