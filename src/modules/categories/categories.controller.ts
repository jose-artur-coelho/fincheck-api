import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { getRequestUser } from 'src/shared/utils/get-request-user';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/:id')
  find(@Req() req: Request, @Param('id') id: string) {
    const userId = getRequestUser(req);
    return this.categoriesService.find(id, userId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const userId = getRequestUser(req);
    return this.categoriesService.findAll(userId);
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreateCategoryDTO) {
    const userId = getRequestUser(req);
    return this.categoriesService.create(dto, userId);
  }

  @Put('/:id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDTO,
  ) {
    const userId = getRequestUser(req);
    return this.categoriesService.update(id, dto, userId);
  }

  @HttpCode(204)
  @Delete('/:id')
  delete(@Req() req: Request, @Param('id') id: string) {
    const userId = getRequestUser(req);
    return this.categoriesService.delete(id, userId);
  }
}
