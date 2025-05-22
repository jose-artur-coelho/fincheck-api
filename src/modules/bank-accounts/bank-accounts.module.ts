import { Module } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, BankAccountsRepository, UsersRepository],
})
export class BankAccountsModule {}
