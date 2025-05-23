import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.TransactionUncheckedCreateWithoutUserInput,
    userId: string,
  ) {
    const createdTransaction = await this.prisma.transaction.create({
      data: {
        ...data,
        userId,
      },
    });

    await this.prisma.bankAccount.update({
      where: { id: data.bankAccountId },
      data: {
        balance:
          data.type === 'INCOME'
            ? { increment: data.value }
            : { decrement: data.value },
      },
    });

    return createdTransaction;
  }

  async findById(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });
    return transaction;
  }

  async findAllByUserId(userId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
      },
    });
    return transactions;
  }

  async deleteById(id: string) {
    await this.prisma.transaction.delete({
      where: {
        id,
      },
    });
  }
}
