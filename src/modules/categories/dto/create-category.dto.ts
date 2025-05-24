import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TransactionType } from 'src/shared/types/transaction-type.dto';

export class CreateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;
}
