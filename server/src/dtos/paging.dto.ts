import { Transform, Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class PagingDTO {
    @IsNumber()
    @Type(() => Number)
    @Transform(({ value }) => parseInt(value) ?? 1)
    @IsOptional()
    page: number | 0;

    @IsNumber()
    @Type(() => Number)
    @Transform(({ value }) => parseInt(value) ?? 20)
    @IsOptional()
    limit: number | 20;

    @IsString()
    @IsOptional()
    orderBy: string;

    @IsString()
    @Transform(({ value }) => value ?? 'asc')
    @IsOptional()
    sortType: 'asc' | 'desc';

    @IsString()
    @IsOptional()
    q: string;
}