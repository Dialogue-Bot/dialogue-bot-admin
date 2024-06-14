import { SetPassForm } from '@/components/forms'
import { Button, buttonVariants } from '@/components/ui'
import { EMAIL_TO_FILL_RESET_PASS, FIST_TIME_SET_PASS } from '@/constants'
import { useForgotPass, useSetPass } from '@/hooks/auth'
import { useLimitAction } from '@/hooks/use-limit-action'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

const MAX_TIME = 60

const SetPassword = () => {
  const { t } = useTranslation(['common', 'set_pass'])

  const setPassMutation = useSetPass()
  const forgotPassMutation = useForgotPass()

  useDocumentTitle(t('set_pass:page_title'))

  const {
    isActionAllowed,
    startCountdown,
    counter,
    setLastSubmitAction,
    resetCountdown,
  } = useLimitAction({
    intervalMs: 1000,
    time: MAX_TIME,
  })

  useEffect(() => {
    if (localStorage.getItem(FIST_TIME_SET_PASS)) {
      startCountdown()
      localStorage.removeItem(FIST_TIME_SET_PASS)
    }

    return () => {
      localStorage.removeItem(FIST_TIME_SET_PASS)
    }
  }, [startCountdown])

  return (
    <div className='w-full max-w-sm space-y-3'>
      <div className='text-center'>
        <h2 className='text-xl font-semibold'>
          {t('title', {
            ns: 'set_pass',
          })}
        </h2>
        <p className='mt-1 text-muted-foreground'>
          {t('subtitle', {
            ns: 'set_pass',
          })}
        </p>
      </div>
      <SetPassForm
        onSubmit={(data) => {
          setPassMutation.mutate(data)
        }}
        loading={setPassMutation.isPending}
      />
      <Button
        className='w-full'
        variant='outline'
        disabled={counter !== MAX_TIME}
        loading={forgotPassMutation.isPending}
        onClick={() => {
          if (!isActionAllowed()) return

          startCountdown()

          forgotPassMutation.mutate(
            {
              email: localStorage.getItem(EMAIL_TO_FILL_RESET_PASS) || '',
            },
            {
              onSuccess: () => {
                resetCountdown()
              },
              onError: () => {
                setLastSubmitAction(null)
              },
            },
          )
        }}
      >
        {counter === 60
          ? t('set_pass:re_send')
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

export default SetPassword
