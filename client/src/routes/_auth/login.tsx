import { LoginForm } from '@/components/forms';
import { Button } from '@/components/ui';
import { useLogin, useLoginWithProvider } from '@/hooks/auth';
import { GoogleProvider } from '@/lib/firebase';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Trans, useTranslation } from 'react-i18next';

const Login = () => {
   const { t } = useTranslation(['login', 'common']);

   const loginMutation = useLogin();
   const withProviderMutation = useLoginWithProvider(GoogleProvider);

   return (
      <div className="w-full max-w-sm space-y-3">
         <div className="text-center">
            <h2 className="text-xl font-semibold">{t('title')}</h2>
            <p className="mt-1 text-muted-foreground">{t('subtitle')}</p>
         </div>
         <LoginForm
            onSubmit={(data) => loginMutation.mutate(data)}
            loading={withProviderMutation.isPending || loginMutation.isPending}
         />
         <Button
            variant="outline"
            className="w-full flex items-center "
            leftIcon={
               <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 48 48"
                  enable-background="new 0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mr-2"
               >
                  <path
                     fill="#FFC107"
                     d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                     fill="#FF3D00"
                     d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                     fill="#4CAF50"
                     d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                     fill="#1976D2"
                     d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
               </svg>
            }
            loading={withProviderMutation.isPending || loginMutation.isPending}
            onClick={() => withProviderMutation.mutate()}
         >
            {t('common:login_with', {
               provider: 'Google',
            })}
         </Button>
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
});
