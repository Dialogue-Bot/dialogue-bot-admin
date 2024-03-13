import { getCurrentLocale } from '@/i18n/get-current'
import { Match } from '@/utils/match'
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  public email!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password!: string
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password!: string
}

export class UpdateInfoUserDto {
  @IsString({
    message: () =>
      getCurrentLocale().VALIDATE.IS_STRING({
        field: getCurrentLocale().COMMON.NAME(),
      }),
  })
  @IsOptional()
  name?: string

  @IsString({
    message: () =>
      getCurrentLocale().VALIDATE.IS_STRING({
        field: 'Email',
      }),
  })
  @IsEmail()
  @IsOptional()
  email?: string

  @IsString({
    message: () =>
      getCurrentLocale().VALIDATE.IS_STRING({
        field: 'Avatar',
      }),
  })
  @IsOptional()
  avatar?: string
}

export class ChangePasswordDto {
  @IsString({
    message: () =>
      getCurrentLocale().VALIDATE.IS_STRING({
        field: getCurrentLocale().COMMON.OLD_PASSWORD(),
      }),
  })
  @IsNotEmpty({
    message: () =>
      getCurrentLocale().VALIDATE.REQUIRED({
        field: getCurrentLocale().COMMON.OLD_PASSWORD(),
      }),
  })
  oldPassword: string

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
  @MinLength(6, {
    message: () =>
      getCurrentLocale().VALIDATE.MIN_LENGTH({
        field: getCurrentLocale().COMMON.PASSWORD(),
        length: 6,
      }),
  })
  @MaxLength(32, {
    message: () =>
      getCurrentLocale().VALIDATE.MAX_LENGTH({
        field: getCurrentLocale().COMMON.PASSWORD(),
        length: 32,
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
  @Match(ChangePasswordDto, (o) => o.password)
  passwordConfirm: string
}
