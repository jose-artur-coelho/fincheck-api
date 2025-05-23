import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { TransactionType } from 'src/shared/types/transaction-type.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly bankAccounstRepository: BankAccountsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(dto: CreateTransactionDTO, userId: string) {
    const canCreate =
      await this.usersRepository.ownsBankAccountByIdAndCategoryById(
        userId,
        dto.bankAccountId,
        dto.categoryId,
      );

    if (!canCreate) {
      throw new NotFoundException(
        'Bank account or category not found or not owned by user',
      );
    }

    if (dto.type === TransactionType.EXPENSE) {
      const canWithdraw = await this.bankAccounstRepository.canWithdraw(
        dto.bankAccountId,
        dto.value,
      );

      if (!canWithdraw) {
        throw new BadRequestException(
          'Insufficient balance for this transaction',
        );
      }
    }

    const createdTransaction = await this.transactionsRepository.create(
      dto,
      userId,
    );
    return createdTransaction;
  }

  async retrieve(id: string, userId: string) {
    const transaction = await this.checkTransaction(id, userId);
    return transaction;
  }

  async retrieveAll(userId: string) {
    const accounts = await this.transactionsRepository.findAllByUserId(userId);
    return accounts;
  }

  async delete(id: string, userId: string) {
    await this.checkTransaction(id, userId);
    return this.transactionsRepository.deleteById(id);
  }

  private async checkTransaction(id: string, userId: string) {
    const transaction = await this.transactionsRepository.findById(id);

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (transaction.userId !== userId) {
      throw new ForbiddenException(
        "You don't have permission to acess this transaction",
      );
    }
    return transaction;
  }
}
