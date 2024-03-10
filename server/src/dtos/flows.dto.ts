import { getCurrentLocale } from '@/i18n/get-current';
import { Transform } from 'class-transformer';
import {
    IsArray,
    IsNotEmpty,
    IsObject,
    IsString
} from 'class-validator';

export class FlowDTO {
    @IsString()
    @IsNotEmpty({
        message: () =>
            getCurrentLocale().VALIDATE.REQUIRED({ field: 'Name' }),
    })
    @Transform(({ value }) => value.trim())
    name: string;

    @IsArray()
    @IsObject({ each: true })
    diagrams: Array<Record<any, any>>

    @IsArray()
    @IsObject({ each: true })
    edges: Array<Record<any, any>>

    @IsArray()
    @IsObject({ each: true })
    nodes: Array<Record<any, any>>

    @IsArray()
    @IsObject({ each: true })
    settings: Array<Record<any, any>>

    @IsArray()
    @IsObject({ each: true })
    variables: Array<Record<any, any>>

    @IsArray()
    @IsObject({ each: true })
    flows: Array<Record<any, any>>
}

export class SelectMultipleChannelDTO {
    @IsString()
    @IsNotEmpty({
        message: () =>
            getCurrentLocale().VALIDATE.REQUIRED({ field: 'Flow Id' }),
    })
    flowId: string;

    @IsArray()
    @IsString({ each: true })
    channelIds: string[];
}

export class DeleteFlowDTO {
    @IsArray()
    @IsString({ each: true })
    ids: string[];
}
