import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, TransactionType } from '@prisma/client';

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

  async update(
    id: string,
    data: Prisma.TransactionUncheckedUpdateWithoutUserInput,
  ) {
    const beforeUpdateTransaction = await this.prisma.transaction.findUnique({
      where: { id },
      select: {
        bankAccountId: true,
      },
    });

    const updatedTransaction = await this.prisma.transaction.update({
      where: {
        id,
      },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.date !== undefined && { date: data.date }),
        ...(data.bankAccountId !== undefined && {
          bankAccountId: data.bankAccountId,
        }),
        ...(data.categoryId !== undefined && {
          categoryId: data.categoryId,
        }),
      },
    });

    if (
      beforeUpdateTransaction?.bankAccountId &&
      beforeUpdateTransaction.bankAccountId !== updatedTransaction.bankAccountId
    ) {
      await this.swapBalance(
        beforeUpdateTransaction.bankAccountId,
        updatedTransaction.bankAccountId,
        updatedTransaction.type,
        updatedTransaction.value,
      );
    }
    return updatedTransaction;
  }

  async deleteById(id: string) {
    const transactionToDelete = await this.prisma.transaction.delete({
      where: {
        id,
      },
      select: {
        bankAccountId: true,
        type: true,
        value: true,
      },
    });
    await this.prisma.bankAccount.update({
      where: {
        id: transactionToDelete.bankAccountId,
      },
      data: {
        balance:
          transactionToDelete.type === 'INCOME'
            ? { decrement: transactionToDelete.value }
            : { increment: transactionToDelete.value },
      },
    });
  }

  private async swapBalance(
    oldAccountid: string,
    newAccountId: string,
    type: TransactionType,
    value: number,
  ) {
    await this.prisma.bankAccount.update({
      where: {
        id: oldAccountid,
      },
      data: {
        balance:
          type === 'INCOME' ? { decrement: value } : { increment: value },
      },
    });

    await this.prisma.bankAccount.update({
      where: {
        id: newAccountId,
      },
      data: {
        balance:
          type === 'INCOME' ? { increment: value } : { decrement: value },
      },
    });
  }
}
