import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum BankAccountType {
  CHECKING = 'CHECKING',
  INVESTMENT = 'INVESTMENT',
  CASH = 'CASH',
}

export class UpdateBankAccountDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type?: BankAccountType;
}
