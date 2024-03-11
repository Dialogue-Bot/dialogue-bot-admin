import { getCurrentLocale } from '@/i18n/get-current'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UpdateEmailSettingDto {
  @IsEmail(
    {},
    {
      message: () => getCurrentLocale().VALIDATE.INVALID_EMAIL(),
    },
  )
  @IsString({
    message: () =>
      getCurrentLocale().VALIDATE.IS_STRING({
        field: 'Email',
      }),
  })
  email: string

  @IsString()
  @IsNotEmpty({
    message: () =>
      getCurrentLocale().VALIDATE.REQUIRED({
        field: getCurrentLocale().COMMON.PASSWORD(),
      }),
  })
  password: string
}
