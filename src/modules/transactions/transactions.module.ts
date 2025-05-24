import { Module } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionsRepository,
    BankAccountsRepository,
    UsersRepository,
  ],
})
export class TransactionsModule {}
