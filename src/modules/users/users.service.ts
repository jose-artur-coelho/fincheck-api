import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDTO } from './dto/create.user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDTO) {
    const emailTaken = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (emailTaken) {
      throw new ConflictException('This e-mail is already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 6);

    const createdUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              {
                name: 'Salário',
                icon: 'salary',
                type: 'INCOME',
              },
              {
                name: 'Freelance',
                icon: 'freelance',
                type: 'INCOME',
              },
              {
                name: 'Outro',
                icon: 'other',
                type: 'INCOME',
              },
              {
                name: 'Casa',
                icon: 'home',
                type: 'EXPENSE',
              },
              {
                name: 'Alimentação',
                icon: 'food',
                type: 'EXPENSE',
              },
              {
                name: 'Educação',
                icon: 'education',
                type: 'EXPENSE',
              },
              {
                name: 'Lazer',
                icon: 'fun',
                type: 'EXPENSE',
              },
              {
                name: 'Mercado',
                icon: 'grocery',
                type: 'EXPENSE',
              },
              {
                name: 'Roupas',
                icon: 'clothes',
                type: 'EXPENSE',
              },
              {
                name: 'Transporte',
                icon: 'transport',
                type: 'EXPENSE',
              },
              {
                name: 'Viagem',
                icon: 'travel',
                type: 'EXPENSE',
              },
              {
                name: 'Outro',
                icon: 'other',
                type: 'INCOME',
              },
            ],
          },
        },
      },
    });
    return createdUser;
  }
}
