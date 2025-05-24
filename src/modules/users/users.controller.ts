import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Request } from 'express';
import { getRequestUser } from 'src/shared/utils/get-request-user';
import { UpdateUserDTO } from './dto/update-user.dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put()
  update(@Req() req: Request, @Body() dto: UpdateUserDTO) {
    const id = getRequestUser(req);
    return this.usersService.update(id, dto);
  }

  @HttpCode(204)
  @Delete()
  delete(@Req() req: Request) {
    const id = getRequestUser(req);
    return this.usersService.delete(id);
  }

  @Get()
  getAllData(@Req() req: Request) {
    const id = getRequestUser(req);
    return this.usersService.getAllData(id);
  }
}
