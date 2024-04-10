import ForgotPassForm from '@/components/forms/mail'
import { Button, buttonVariants } from '@/components/ui'
import { useRequestVerifyAccount } from '@/hooks/auth'
import { useLimitAction } from '@/hooks/use-limit-action'
import { urlSearchParamsToObject } from '@/utils'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'

const TIMEOUT = 60

const RequestVerifyAccount = () => {
  const { t } = useTranslation(['requestVerifyAccount', 'common'])
  const [searchParams] = useSearchParams()

  const {
    counter,
    isActionAllowed,
    resetCountdown,
    startCountdown,
    setLastSubmitAction,
  } = useLimitAction({
    intervalMs: 1000,
    time: TIMEOUT,
  })

  useEffect(() => {
    const search = urlSearchParamsToObject(searchParams)

    if (search.send === 'true') {
      startCountdown()
    }
  }, [searchParams, startCountdown])

  const requestVerifyAccountMutation = useRequestVerifyAccount()

  return (
    <div className='w-full max-w-sm space-y-3'>
      <div className='text-center'>
        <h2 className='text-xl font-semibold'>{t('title')}</h2>
        <p className='mt-1 text-muted-foreground'>{t('subtitle')}</p>
      </div>
      <ForgotPassForm
        defaultValues={{
          email: searchParams.get('email') || '',
        }}
        onSubmit={(data) => {
          if (!isActionAllowed()) return

          requestVerifyAccountMutation.mutate(data, {
            onSuccess: () => {
              startCountdown()
            },
            onError: () => {
              resetCountdown()
              setLastSubmitAction(null)
            },
          })
        }}
        id='request-verify-account-form'
      />
      <Button
        loading={requestVerifyAccountMutation.isPending}
        className='w-full select-none'
        form='request-verify-account-form'
        type='submit'
        disabled={counter !== TIMEOUT}
      >
        {counter === TIMEOUT
          ? t('btn_submit')
          : t('common:send_mail_after_time', {
              time: counter,
            })}
      </Button>
      <Link
        className={buttonVariants({
          variant: 'outline',
          className: 'w-full',
        })}
        to='/login'
      >
        {t('back_to_login', {
          ns: 'common',
        })}
      </Link>
    </div>
  )
}

export default RequestVerifyAccount
