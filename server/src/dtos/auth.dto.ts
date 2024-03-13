import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@/constants'
import { getCurrentLocale } from '@/i18n/get-current'
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class LoginDto {
  @IsEmail(
    {},
    {
      message: () => getCurrentLocale().VALIDATE.INVALID_EMAIL(),
    },
  )
  @IsNotEmpty({
    message: () => getCurrentLocale().VALIDATE.REQUIRED({ field: 'Email' }),
  })
  @IsString({
    message: () =>
      getCurrentLocale().VALIDATE.IS_STRING({
        field: 'Email',
      }),
  })
  email: string

  @IsString({
    message: () =>
      getCurrentLocale().VALIDATE.IS_STRING({
        field: getCurrentLocale().COMMON.PASSWORD(),
      }),
  })
  @IsNotEmpty({
    message: () =>
      getCurrentLocale().VALIDATE.REQUIRED({
        field: getCurrentLocale().COMMON.PASSWORD(),
      }),
  })
  password: string
}

export class RegisterDto extends LoginDto {
  @IsString({
    message: () =>
      getCurrentLocale().VALIDATE.IS_STRING({
        field: getCurrentLocale().COMMON.CONFIRM_PASSWORD(),
      }),
  })
  @IsNotEmpty({
    message: () =>
      getCurrentLocale().VALIDATE.REQUIRED({
        field: getCurrentLocale().COMMON.CONFIRM_PASSWORD(),
      }),
  })
  passwordConfirm: string

  @IsString({
    message: () =>
      getCurrentLocale().VALIDATE.IS_STRING({
        field: getCurrentLocale().COMMON.NAME(),
      }),
  })
  @IsNotEmpty({
    message: () =>
      getCurrentLocale().VALIDATE.REQUIRED({
        field: getCurrentLocale().COMMON.NAME(),
      }),
  })
  name: string
}

export class ForgotPasswordDto {
  @IsEmail(
    {},
    {
      message: () => getCurrentLocale().VALIDATE.INVALID_EMAIL(),
    },
  )
  @IsNotEmpty({
    message: () =>
      getCurrentLocale().VALIDATE.REQUIRED({
        field: 'Email',
      }),
  })
  @IsString({
    message: () =>
      getCurrentLocale().VALIDATE.IS_STRING({
        field: 'Email',
      }),
  })
  email: string
}

export class ResetPasswordDto {
  @IsString({
    message: () =>
      getCurrentLocale().VALIDATE.IS_STRING({
        field: getCurrentLocale().COMMON.PASSWORD(),
      }),
  })
  @MinLength(MIN_PASSWORD_LENGTH, {
    message: () =>
      getCurrentLocale().VALIDATE.MIN_LENGTH({
        field: getCurrentLocale().COMMON.PASSWORD(),
        length: MIN_PASSWORD_LENGTH,
      }),
  })
  @MaxLength(MAX_PASSWORD_LENGTH, {
    message: () =>
      getCurrentLocale().VALIDATE.MAX_LENGTH({
        field: getCurrentLocale().COMMON.PASSWORD(),
        length: MAX_PASSWORD_LENGTH,
      }),
  })
  @IsNotEmpty({
    message: () =>
      getCurrentLocale().VALIDATE.REQUIRED({
        field: getCurrentLocale().COMMON.PASSWORD(),
      }),
  })
  password: string

  @IsString({
    message: () =>
      getCurrentLocale().VALIDATE.IS_STRING({
        field: getCurrentLocale().COMMON.CONFIRM_PASSWORD(),
      }),
  })
  @IsNotEmpty({
    message: () =>
      getCurrentLocale().VALIDATE.REQUIRED({
        field: getCurrentLocale().COMMON.CONFIRM_PASSWORD(),
      }),
  })
  passwordConfirm: string

  @IsString({
    message: () =>
      getCurrentLocale().VALIDATE.IS_STRING({
        field: 'Token',
      }),
  })
  @IsOptional()
  token: string
}

export class IdTokenDto {
  @IsString({
    message: () =>
      getCurrentLocale().VALIDATE.IS_STRING({
        field: 'Id token',
      }),
  })
  @IsNotEmpty({
    message: () =>
      getCurrentLocale().VALIDATE.REQUIRED({
        field: 'Id token',
      }),
  })
  idToken: string
}
