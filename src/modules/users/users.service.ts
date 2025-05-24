import { Injectable } from '@nestjs/common';

import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async update(id: string, dto: UpdateUserDTO) {
    const updatedUser = await this.usersRepository.update(id, dto);
    return updatedUser;
  }
  async delete(id: string) {
    await this.usersRepository.deleteById(id);
  }
  async getAllData(id: string) {
    const userData = await this.usersRepository.getAllDataById(id);
    return userData;
  }
}
