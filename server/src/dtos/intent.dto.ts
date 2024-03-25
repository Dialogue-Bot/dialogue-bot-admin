import { getCurrentLocale } from '@/i18n/get-current'
import { IIntents, ITrainDescription } from '@/interfaces/intents.interface'
import { Transform } from 'class-transformer'
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator'

export class IntentDTO {
  @IsString()
  @IsNotEmpty({
    message: () => getCurrentLocale().VALIDATE.REQUIRED({ field: 'Name' }),
  })
  @Transform(({ value }) => value.trim())
  name: string

  @IsString()
  @IsNotEmpty({
    message: () =>
      getCurrentLocale().VALIDATE.REQUIRED({ field: 'Reference Id' }),
  })
  @Transform(({ value }) => value.trim())
  referenceId: string

  @IsString()
  @IsNotEmpty({
    message: () =>
      getCurrentLocale().VALIDATE.REQUIRED({ field: 'Train Type' }),
  })
  @Transform(({ value }) => value ?? 'manual')
  trainType: 'manual' | 'automation'

  @IsArray()
  @ValidateIf((object, value) => object.trainType === 'automation')
  @IsObject({ each: true })
  trainDescription: Array<ITrainDescription>

  @IsArray()
  @IsOptional()
  @IsObject({ each: true })
  intents: Array<IIntents>

  @IsArray()
  @IsOptional()
  @IsObject({ each: true })
  entities: Array<Record<any, any>>
}

export class PredictIntentDTO {
  @IsString()
  @IsNotEmpty({
    message: () =>
      getCurrentLocale().VALIDATE.REQUIRED({ field: 'Reference Id' }),
  })
  @Transform(({ value }) => value.trim())
  referenceId: string

  @IsString()
  @IsNotEmpty({
    message: () => getCurrentLocale().VALIDATE.REQUIRED({ field: 'Text' }),
  })
  @Transform(({ value }) => value.trim())
  text: string
}
