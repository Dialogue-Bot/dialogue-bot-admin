import { getCurrentLocale } from '@/i18n/get-current';
import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ChannelDTO {
    @IsString()
    @IsNotEmpty({
        message: () => getCurrentLocale().VALIDATE.REQUIRED({ field: 'ContactId' }),
    })
    @Transform(({ value }) => value.trim())
    contactId: string;

    @IsString()
    @IsNotEmpty({
        message: () => getCurrentLocale().VALIDATE.REQUIRED({ field: 'Contact name' }),
    })
    @Transform(({ value }) => value.trim())
    contactName: string;

    @IsString()
    @IsNotEmpty({
        message: () => getCurrentLocale().VALIDATE.REQUIRED({ field: 'Channel type' }),
    })
    channelTypeId: string;

    @IsOptional()
    credentials: any;

    @IsBoolean()
    active: boolean | false;
}

export class DeleteChannelDTO {
    @IsArray()
    @Transform(({ value }) => value ?? [])
    id: string[];
}

export class MessengerDTO {
    pageToken: string;
    webhookSecret: string;
}