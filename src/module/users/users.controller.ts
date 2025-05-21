import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/modules/users/dto/create.user.dto';
import { UsersService } from 'src/modules/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }
}
