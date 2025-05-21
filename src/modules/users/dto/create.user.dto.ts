import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8)
  password: string;
}
