import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { initialCategories } from '../initial-categories';
import { hash } from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    const createdUser = await this.prisma.user.create({
      data: {
        ...data,
        password: await hash(data.password, 6),
        categories: { createMany: { data: initialCategories } },
      },
    });
    return createdUser;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        password: true,
      },
    });
    return user;
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    let newPassword: undefined | string = undefined;

    if (typeof data?.password === 'string') {
      newPassword = await hash(data.password, 6);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { ...data, password: newPassword },
    });

    return updatedUser;
  }

  async deleteById(id: string) {
    await this.prisma.user.delete({ where: { id } });
  }

  async getAllDataById(id: string) {
    const userData = await this.prisma.user.findUnique({
      where: { id },
      select: {
        email: true,
        name: true,
        categories: true,
        bankAccounts: true,
        transactions: true,
      },
    });
    return userData;
  }

  async ownsBankAccountByIdAndCategoryById(
    userId: string,
    bankAccountId: string,
    categoryId: string,
  ) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        bankAccounts: {
          some: { id: bankAccountId },
        },
        categories: {
          some: { id: categoryId },
        },
      },
    });
    return Boolean(user);
  }
}
