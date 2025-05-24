import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTransactionDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  date?: Date;

  @IsNotEmpty()
  @IsString()
  bankAccountId: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
