import { IsEmail, IsString, IsOptional } from 'class-validator';

export class SigninCinemaDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
