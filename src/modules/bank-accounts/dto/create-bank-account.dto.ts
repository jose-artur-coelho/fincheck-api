import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

enum BankAccountType {
  CHECKING = 'CHECKING',
  INVESTMENT = 'INVESTMENT',
  CASH = 'CASH',
}

export class CreateBankAccountDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type: BankAccountType;
}
