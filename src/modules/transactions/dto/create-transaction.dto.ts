import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { TransactionType } from 'src/shared/types/transaction-type.dto';

export class CreateTransactionDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @IsString()
  bankAccountId: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
