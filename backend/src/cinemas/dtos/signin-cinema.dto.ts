import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateCinemaDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
