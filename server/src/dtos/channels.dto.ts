import { getCurrentLocale } from '@/i18n/get-current'
import { toBoolean } from '@/utils/to-boolean'
import { Transform } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator'

export class ChannelDTO {
  @IsString()
  @IsNotEmpty({
    message: () => getCurrentLocale().VALIDATE.REQUIRED({ field: 'ContactId' }),
  })
  @Transform(({ value }) => value.trim())
  contactId: string

  @IsString()
  @IsNotEmpty({
    message: () =>
      getCurrentLocale().VALIDATE.REQUIRED({ field: 'Contact name' }),
  })
  @Transform(({ value }) => value.trim())
  contactName: string

  @IsString()
  @IsNotEmpty({
    message: () =>
      getCurrentLocale().VALIDATE.REQUIRED({ field: 'Channel type' }),
  })
  channelTypeId: string

  @IsOptional()
  @IsObject()
  credentials?: {
    pageToken?: string
    webhookSecret?: string
  }

  @IsBoolean()
  active: boolean | false

  @IsString()
  @IsOptional()
  flowId: string
}

export class DeleteChannelDTO {
  @IsArray()
  @IsString({ each: true })
  ids: string[]
}

export class UpdateChannelForTestDto {
  @IsString()
  flowId: string
}

export class QueryChannelForSelectDto {
  @IsString()
  @IsOptional()
  flowId: string

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => toBoolean(value))
  isForConversation: boolean
}
