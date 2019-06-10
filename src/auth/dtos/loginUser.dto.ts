import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
