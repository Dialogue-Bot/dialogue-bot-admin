import {
   IsEmail,
   IsNotEmpty,
   IsOptional,
   IsString,
   MaxLength,
   MinLength,
} from 'class-validator';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@/constants';

export class LoginDto {
   @IsEmail(
      {},
      {
         message: 'Email không đúng định dạng',
      }
   )
   @IsNotEmpty({
      message: 'Email không được để trống',
   })
   @IsString()
   email: string;

   @IsString()
   @IsNotEmpty({
      message: 'Mật khẩu không được để trống',
   })
   password: string;
}

export class RegisterDto extends LoginDto {
   @IsString()
   @IsNotEmpty({
      message: 'Xác nhận mật khẩu không được để trống',
   })
   passwordConfirm: string;

   @IsString()
   @IsNotEmpty({
      message: 'Tên không được để trống',
   })
   name: string;
}

export class ForgotPasswordDto {
   @IsEmail(
      {},
      {
         message: 'Email không đúng định dạng',
      }
   )
   @IsNotEmpty({
      message: 'Email không được để trống',
   })
   @IsString()
   email: string;
}

export class ResetPasswordDto {
   @IsString()
   @MinLength(MIN_PASSWORD_LENGTH, {
      message: 'Mật khẩu phải có ít nhất 8 ký tự',
   })
   @MaxLength(MAX_PASSWORD_LENGTH, {
      message: 'Mật khẩu có độ dài tối đa là 32 ký tự',
   })
   @IsNotEmpty({
      message: 'Mật khẩu không được để trống',
   })
   password: string;

   @IsString()
   @IsNotEmpty({
      message: 'Xác nhận mật khẩu không được để trống',
   })
   passwordConfirm: string;

   @IsString()
   @IsOptional()
   token: string;
}
