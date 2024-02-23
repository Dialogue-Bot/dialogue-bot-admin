import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class channelDTO {
    @IsString()
    @IsNotEmpty({
        message: 'ContactID không được bỏ trống',
    })
    contactId: string;

    @IsString()
    @IsNotEmpty({
        message: 'Contact name không được bỏ trống',
    })
    contactName: string;

    @IsNumber()
    @IsNotEmpty({
        message: 'Channel type không được bỏ trống',
    })
    channelTypeId: number;

    @IsString()
    credentials: string;

    @IsBoolean()
    active: boolean | false;
}