import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.BankAccountCreateWithoutUserInput, userId: string) {
    const createdAccount = await this.prisma.bankAccount.create({
      data: {
        ...data,
        User: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        type: true,
        userId: true,
      },
    });
    return createdAccount;
  }

  async update(id: string, data: Prisma.BankAccountUpdateInput) {
    const updatedAccount = await this.prisma.bankAccount.update({
      where: {
        id,
      },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.color !== undefined && { color: data.color }),
        ...(data.type !== undefined && { type: data.type }),
      },
      select: {
        id: true,
        name: true,
        type: true,
        color: true,
        userId: true,
      },
    });

    return updatedAccount;
  }

  async findById(id: string) {
    const account = await this.prisma.bankAccount.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        balance: true,
        type: true,
        color: true,
        userId: true,
      },
    });
    return account;
  }

  async findAllByUser(userId: string) {
    const accounts = await this.prisma.bankAccount.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        balance: true,
        type: true,
        color: true,
        userId: true,
      },
    });

    return accounts;
  }

  async delete(id: string) {
    await this.prisma.bankAccount.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
