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
}
