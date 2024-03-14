import { getCurrentLocale } from '@/i18n/get-current';
import { IIntents } from '@/interfaces/intents.interface';
import { Transform } from 'class-transformer';
import {
    IsArray,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
} from 'class-validator';

export class IntentDTO {
    @IsString()
    @IsNotEmpty({
        message: () => getCurrentLocale().VALIDATE.REQUIRED({ field: 'Name' }),
    })
    @Transform(({ value }) => value.trim())
    name: string

    @IsString()
    @IsNotEmpty({
        message: () => getCurrentLocale().VALIDATE.REQUIRED({ field: 'Reference Id' }),
    })
    @Transform(({ value }) => value.trim())
    referenceId: string

    @IsArray()
    @IsOptional()
    @IsObject({ each: true })
    intents: Array<IIntents>

    @IsArray()
    @IsOptional()
    @IsObject({ each: true })
    entities: Array<Record<any, any>>
}