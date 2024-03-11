import { getCurrentLocale } from '@/i18n/get-current';
import { IFlowSetting, IFlowVariable } from '@/interfaces/flows.interface';
import { Transform } from 'class-transformer';
import {
   IsArray,
   IsNotEmpty,
   IsObject,
   IsOptional,
   IsString,
} from 'class-validator';

export class FlowDTO {
   @IsString()
   @IsNotEmpty({
      message: () => getCurrentLocale().VALIDATE.REQUIRED({ field: 'Name' }),
   })
   @Transform(({ value }) => value.trim())
   name: string;

   @IsArray()
   @IsOptional()
   @IsObject({ each: true })
   edges: Array<Record<any, any>>;

   @IsArray()
   @IsOptional()
   @IsObject({ each: true })
   nodes: Array<Record<any, any>>;

   @IsArray()
   @IsOptional()
   @IsObject({ each: true })
   settings: Array<IFlowSetting>;

   @IsArray()
   @IsOptional()
   @IsObject({ each: true })
   variables: Array<IFlowVariable>;

   @IsArray()
   @IsOptional()
   @IsObject({ each: true })
   flows: Array<Record<any, any>>;

   @IsArray()
   @IsOptional()
   @IsString({ each: true })
   channelIds: string[];
}

export class SelectMultipleChannelDTO {
   @IsString()
   @IsNotEmpty({
      message: () => getCurrentLocale().VALIDATE.REQUIRED({ field: 'Flow Id' }),
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
