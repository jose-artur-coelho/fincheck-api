import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8)
  password: string;
}
