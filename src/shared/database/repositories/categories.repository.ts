import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CategoryCreateWithoutUserInput, userId: string) {
    const createdCategory = await this.prisma.category.create({
      data: {
        ...data,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return createdCategory;
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    const updatedCategory = await this.prisma.category.update({
      where: {
        id,
      },
      data: data,
    });

    return updatedCategory;
  }

  async findById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    return category;
  }

  async findAllByUser(userId: string) {
    const categories = await this.prisma.category.findMany({
      where: { userId },
    });

    return categories;
  }

  async deleteById(id: string) {
    await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
