import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBankAccountDTO } from './dto/create-bank-account.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import { UpdateBankAccountDTO } from './dto/update-bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly usersrepository: UsersRepository,
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async create(dto: CreateBankAccountDTO, userId: string) {
    const userExists = await this.usersrepository.findById(userId);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const createdAccount = await this.bankAccountsRepository.create(
      dto,
      userId,
    );

    return createdAccount;
  }

  async find(id: string, userId: string) {
    const account = await this.checkAccount(id, userId);
    return account;
  }

  async findAll(userId: string) {
    const accounts = await this.bankAccountsRepository.findAllByUser(userId);
    return accounts;
  }

  async update(id: string, dto: UpdateBankAccountDTO, userId: string) {
    await this.checkAccount(id, userId);
    const updatedAccount = await this.bankAccountsRepository.update(id, dto);
    return updatedAccount;
  }

  async delete(id: string, userId: string) {
    await this.checkAccount(id, userId);
    return this.bankAccountsRepository.deleteById(id);
  }

  private async checkAccount(id: string, userId: string) {
    const account = await this.bankAccountsRepository.findById(id);

    if (!account) {
      throw new NotFoundException('Bank account not found');
    }

    if (account.userId !== userId) {
      throw new ForbiddenException(
        "You don't have permission to acess this account",
      );
    }
    return account;
  }
}
