import ButtonLang from '@/components/btn-lang'
import { ChangePassForm } from '@/components/forms'
import PageTitle from '@/components/page-title'
import {
  SectionSetting,
  SectionSettingBody,
  SectionSettingBottom,
  SectionSettingDescription,
  SectionSettingTextRequired,
  SectionSettingTitle,
} from '@/components/setting-section'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@/components/ui'
import { useUploadSingle } from '@/hooks/upload/use-upload-single'
import { useChangePass, useUpdateInfor } from '@/hooks/user'
import { TUpdateInfor, useUpdateInforSchema } from '@/lib/schema/update-infor'
import { useUserStore } from '@/store/use-user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const Profiles = () => {
  const { t } = useTranslation(['profile', 'common', 'forms'])

  const { user } = useUserStore()

  const updateInforSchema = useUpdateInforSchema()

  const updateInforEmailMutation = useUpdateInfor()
  const updateInforNameMutation = useUpdateInfor()
  const updateInforAvatarMutation = useUpdateInfor()
  const uploadSingleMutation = useUploadSingle()
  const changePasswordMutation = useChangePass()

  const file = useRef<HTMLInputElement>(null)

  const emailForm = useForm<TUpdateInfor>({
    defaultValues: {
      email: user?.email,
    },
    resolver: zodResolver(updateInforSchema),
  })

  const nameForm = useForm<TUpdateInfor>({
    defaultValues: {
      name: user?.name,
    },
    resolver: zodResolver(updateInforSchema),
  })

  return (
    <div>
      <div className='h-[3.75rem] flex items-center px-4'>
        <PageTitle>{t('title')}</PageTitle>
      </div>
      <div className='p-6'>
        <div className='max-w-4xl  space-y-4'>
          <SectionSetting>
            <SectionSettingBody>
              <div className='flex items-start justify-between'>
                <div>
                  <SectionSettingTitle title={t('sections.language.label')} />
                  <SectionSettingDescription
                    description={t('sections.language.description')}
                  />
                </div>
                <div>
                  <ButtonLang />
                </div>
              </div>
            </SectionSettingBody>
            <SectionSettingBottom>
              <SectionSettingTextRequired
                text={t('sections.language.message')}
              />
            </SectionSettingBottom>
          </SectionSetting>
          <SectionSetting>
            <SectionSettingBody>
              <div className='flex items-start justify-between'>
                <div>
                  <SectionSettingTitle title={t('sections.avatar.label')} />
                  <SectionSettingDescription
                    description={t('sections.avatar.description')}
                  />
                </div>
                <div>
                  <input
                    ref={file}
                    accept='image/*'
                    type='file'
                    onChange={(e) => {
                      if (!e.target.files) return

                      uploadSingleMutation.mutate(e.target.files[0], {
                        onSuccess: (data) => {
                          updateInforAvatarMutation.mutate({
                            avatar: data.data,
                          })
                          if (file.current) {
                            file.current.value = ''
                          }
                        },
                      })
                    }}
                    className='hidden'
                  />
                  <div className='relative rounded-full overflow-hidden'>
                    {(uploadSingleMutation.isPending ||
                      updateInforAvatarMutation.isPending) && (
                      <div className='absolute top-0 right-0 left-0 bg-transparent backdrop-blur-sm  z-10 w-full h-full flex items-center justify-center'>
                        <Loader2 className='w-4 h-4 text-white animate-spin' />
                      </div>
                    )}
                    <div
                      onClick={() => file.current?.click()}
                      className='cursor-pointer'
                    >
                      <Avatar className='w-24 h-24 flex-shrink-0'>
                        <AvatarImage src={user?.avatar as string} />
                        <AvatarFallback>{user?.name[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </div>
            </SectionSettingBody>
            <SectionSettingBottom>
              <SectionSettingTextRequired text={t('sections.avatar.message')} />
            </SectionSettingBottom>
          </SectionSetting>
          <Form {...nameForm}>
            <form
              onSubmit={nameForm.handleSubmit((data) => {
                updateInforNameMutation.mutate(data)
              })}
            >
              <SectionSetting>
                <SectionSettingBody>
                  <SectionSettingTitle title={t('sections.name.label')} />
                  <SectionSettingDescription
                    description={t('sections.name.description')}
                  />
                  <FormField
                    control={nameForm.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem className='mt-3'>
                        <FormControl>
                          <Input
                            {...field}
                            className='max-w-xs'
                            placeholder={t('forms:name.placeholder')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </SectionSettingBody>
                <SectionSettingBottom>
                  <Button
                    className='ml-auto'
                    loading={updateInforNameMutation.isPending}
                  >
                    {t('common:save')}
                  </Button>
                </SectionSettingBottom>
              </SectionSetting>
            </form>
          </Form>
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit((data) => {
                updateInforEmailMutation.mutate(data)
              })}
            >
              <SectionSetting>
                <SectionSettingBody>
                  <SectionSettingTitle title={t('sections.email.label')} />
                  <SectionSettingDescription
                    description={t('sections.email.description')}
                  />
                  <FormField
                    control={emailForm.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem className='mt-3'>
                        <FormControl>
                          <Input
                            {...field}
                            className='max-w-xs'
                            placeholder={t('forms:email.placeholder')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </SectionSettingBody>
                <SectionSettingBottom>
                  <Button
                    className='ml-auto'
                    loading={updateInforEmailMutation.isPending}
                  >
                    {t('common:save')}
                  </Button>
                </SectionSettingBottom>
              </SectionSetting>
            </form>
          </Form>
          {user?.provider === 'local' && (
            <SectionSetting>
              <SectionSettingBody>
                <SectionSettingTitle title={t('sections.password.label')} />
                <SectionSettingDescription
                  description={t('sections.password.description')}
                />
                <div className='mt-3 max-w-80'>
                  <ChangePassForm
                    onSubmit={(data) => {
                      changePasswordMutation.mutate(data)
                    }}
                    loading={changePasswordMutation.isPending}
                  />
                </div>
              </SectionSettingBody>
              <SectionSettingBottom>
                <SectionSettingTextRequired
                  text={t('sections.password.message')}
                />
                <Button
                  className='ml-auto'
                  form='change-pass-form'
                  loading={changePasswordMutation.isPending}
                >
                  {t('common:save')}
                </Button>
              </SectionSettingBottom>
            </SectionSetting>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profiles
