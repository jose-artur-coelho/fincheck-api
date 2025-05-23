import { Module } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    BankAccountsRepository,
    BankAccountsRepository,
  ],
})
export class BankAccountsModule {}
