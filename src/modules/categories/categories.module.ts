import { Module } from '@nestjs/common';

import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository, UsersRepository],
})
export class CategoriesModule {}
