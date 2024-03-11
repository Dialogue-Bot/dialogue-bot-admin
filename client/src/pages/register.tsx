import { RegisterForm } from '@/components/forms'
import { useRegister } from '@/hooks/auth'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Register = () => {
  const { t } = useTranslation(['common', 'register'])

  const registerMutation = useRegister()

  return (
    <div className='w-full max-w-sm space-y-3'>
      <div className='text-center'>
        <h2 className='text-xl font-semibold'>
          {t('title', {
            ns: 'register',
          })}
        </h2>
        <p className='mt-1 text-muted-foreground'>
          {t('subtitle', {
            ns: 'register',
          })}
        </p>
      </div>
      <RegisterForm
        onSubmit={(data) => registerMutation.mutate(data)}
        loading={registerMutation.isPending}
      />
      <p className='text-center text-sm'>
        <Trans
          i18nKey='register:already_have_account'
          components={{
            a: <Link to='/login' className='link' />,
          }}
        />
      </p>
      <p className='text-sm text-center'>
        <Trans
          i18nKey='login:term'
          components={{
            term: <Link to='/login' className='link' />,
            privacy: <Link to='/register' className='link' />,
          }}
        />
      </p>
    </div>
  )
}

export default Register
