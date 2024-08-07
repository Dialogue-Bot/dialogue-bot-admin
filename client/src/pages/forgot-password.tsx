import { MailForm } from '@/components/forms'
import { Button, buttonVariants } from '@/components/ui'
import { EMAIL_TO_FILL_RESET_PASS, FIST_TIME_SET_PASS } from '@/constants'
import { useForgotPass } from '@/hooks/auth'
import { useLimitAction } from '@/hooks/use-limit-action'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

const ForgotPassword = () => {
  const { t } = useTranslation(['forgot_pass', 'common'])

  const navigate = useNavigate()

  const forgotPassMutation = useForgotPass()

  useDocumentTitle(t('page_title'))

  const { isActionAllowed, startCountdown, counter, setLastSubmitAction } =
    useLimitAction({
      intervalMs: 1000,
      time: 60,
    })

  return (
    <div className='w-full max-w-sm space-y-3'>
      <div className='text-center'>
        <h2 className='text-xl font-semibold'>
          {t('title', {
            ns: 'forgot_pass',
          })}
        </h2>
        <p className='mt-1 text-muted-foreground'>
          {t('subtitle', {
            ns: 'forgot_pass',
          })}
        </p>
      </div>
      <MailForm
        onSubmit={(data) => {
          if (!isActionAllowed()) return

          forgotPassMutation.mutate(data, {
            onSuccess: () => {
              startCountdown()
              localStorage.setItem(EMAIL_TO_FILL_RESET_PASS, data.email)
              localStorage.setItem(FIST_TIME_SET_PASS, '1')
            },
            onError: () => {
              setLastSubmitAction(null)
            },
          })
        }}
        id='forgot-pass-form'
      />
      <Button
        loading={forgotPassMutation.isPending}
        className='w-full'
        form='forgot-pass-form'
        type='submit'
        disabled={counter !== 60}
      >
        {counter === 60
          ? t('btn_submit', {
              ns: 'forgot_pass',
            })
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

export default ForgotPassword
