import { IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator'

export class BotMailDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  to: string

  @IsString()
  @IsNotEmpty()
  subject: string

  @IsString()
  @IsNotEmpty()
  @IsString()
  from: string

  @IsString()
  @IsNotEmpty()
  template: string

  @IsObject()
  variables: Record<string, any>
}
