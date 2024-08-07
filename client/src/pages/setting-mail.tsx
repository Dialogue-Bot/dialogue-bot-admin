import SettingMailForm from '@/components/forms/setting-mail'
import PageTitle from '@/components/page-title'
import {
  SectionSetting,
  SectionSettingBody,
  SectionSettingBottom,
  SectionSettingDescription,
  SectionSettingTextRequired,
  SectionSettingTitle,
} from '@/components/setting-section'
import { Button } from '@/components/ui'
import { useTestSendMail, useUpdateSettingMail } from '@/hooks/setting'
import { useSettingStore } from '@/store/use-setting'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Mail = () => {
  const { t } = useTranslation(['mail', 'common'])

  const { setting } = useSettingStore()

  const settingMailMutation = useUpdateSettingMail()
  const sendTestMailMutation = useTestSendMail()

  return (
    <div>
      <div className='h-[3.75rem] flex items-center px-6'>
        <PageTitle>{t('title')}</PageTitle>
      </div>
      <div className='p-6'>
        <div className='max-w-4xl  space-y-4'>
          <SectionSetting>
            <SectionSettingBody>
              <SectionSettingTitle title={t('sections.mail.label')} />
              <SectionSettingDescription
                description={t('sections.mail.description')}
              />
              <div className='max-w-80 mt-3'>
                <SettingMailForm
                  loading={settingMailMutation.isPending}
                  onSubmit={settingMailMutation.mutate}
                  defaultValues={{
                    email: setting?.email.email,
                    password: setting?.email.password,
                  }}
                />
              </div>
            </SectionSettingBody>
            <SectionSettingBottom>
              <SectionSettingTextRequired
                text={
                  <Trans
                    i18nKey='mail:sections.mail.message'
                    components={{
                      a: (
                        <Link
                          to='/help/instrcution-config-for-send-mail'
                          className='link'
                        />
                      ),
                    }}
                  />
                }
              />
              <div className='flex gap-4 items-center'>
                <Button
                  variant='outline'
                  onClick={() => sendTestMailMutation.mutate()}
                  loading={sendTestMailMutation.isPending}
                  disabled={!setting?.email.email || !setting?.email.password}
                >
                  {t('common:test')}
                </Button>
                <Button
                  form='setting-mail-form'
                  type='submit'
                  loading={settingMailMutation.isPending}
                >
                  {t('common:save')}
                </Button>
              </div>
            </SectionSettingBottom>
          </SectionSetting>
        </div>
      </div>
    </div>
  )
}

export default Mail
