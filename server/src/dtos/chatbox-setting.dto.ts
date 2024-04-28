import { Transform } from 'class-transformer'
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator'
import { toNumber } from 'lodash'

export class ChatboxSettingDto {
  @IsString()
  @IsNotEmpty()
  channelId: string

  @IsString()
  @IsOptional()
  logoUrl: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string

  @IsString()
  @IsNotEmpty()
  @Matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, {
    message: 'Invalid color format',
  })
  color: string

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => toNumber(value))
  buttonSize: number

  @IsObject()
  @IsNotEmpty()
  position: { x: number; y: number }

  @IsObject()
  @IsNotEmpty()
  windowSize: { width: number; height: number }
}
