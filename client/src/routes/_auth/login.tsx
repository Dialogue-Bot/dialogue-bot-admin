import { LoginForm } from '@/components/forms';
import { Layout } from '@/components/layouts/auth';
import { Separator } from '@/components/ui';
import { useLogin } from '@/hooks/auth';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Trans, useTranslation } from 'react-i18next';

const Login = () => {
   const { t } = useTranslation('login');

   const loginMutation = useLogin();

   return (
      <div className="w-full max-w-sm space-y-3">
         <div className="text-center">
            <h2 className="text-xl font-semibold">{t('title')}</h2>
            <p className="mt-1 text-muted-foreground">{t('subtitle')}</p>
         </div>
         <LoginForm
            onSubmit={(data) => loginMutation.mutate(data)}
            loading={loginMutation.isPending}
         />
         <p className="text-center text-sm">
            <Trans
               i18nKey="login:not_have_account"
               components={{
                  a: <Link to="/register" className="link" />,
               }}
            />
         </p>
         <p className="text-sm text-center">
            <Trans
               i18nKey="login:term"
               components={{
                  term: <Link to="/login" className="link" />,
                  privacy: <Link to="/register" className="link" />,
               }}
            />
         </p>
      </div>
   );
};

export const Route = createFileRoute('/_auth/login')({
   component: Login,
   beforeLoad: async ({ context: _context }) => {
      console.log('beforeLoad');
   },
});
