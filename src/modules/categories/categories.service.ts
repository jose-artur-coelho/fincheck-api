import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly usersrepository: UsersRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async create(dto: CreateCategoryDTO, userId: string) {
    const userExists = await this.usersrepository.findById(userId);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const createdCategory = await this.categoriesRepository.create(dto, userId);

    return createdCategory;
  }

  async find(id: string, userId: string) {
    const category = await this.checkCategory(id, userId);
    return category;
  }

  async findAll(userId: string) {
    const categories = await this.categoriesRepository.findAllByUser(userId);
    return categories;
  }

  async update(id: string, dto: UpdateCategoryDTO, userId: string) {
    await this.checkCategory(id, userId);
    const updatedCategory = await this.categoriesRepository.update(id, dto);
    return updatedCategory;
  }

  async delete(id: string, userId: string) {
    await this.checkCategory(id, userId);
    return this.categoriesRepository.deleteById(id);
  }

  private async checkCategory(id: string, userId: string) {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.userId !== userId) {
      throw new ForbiddenException(
        "You don't have permission to acess this category",
      );
    }
    return category;
  }
}
