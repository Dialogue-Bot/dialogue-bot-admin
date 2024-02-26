import { Transform, Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class PagingDTO {
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @Transform(({ value }) => parseInt(value) ?? 1)
    page: number | 1;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @Transform(({ value }) => parseInt(value) ?? 20)
    limit: number | 20;

    @IsString()
    @IsOptional()
    orderBy: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value ?? 'asc')
    sortType: 'asc' | 'desc';

    @IsString()
    @IsOptional()
    q: string | '';
}