import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AutheticateDTO } from './dto/authenticate.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { compare } from 'bcrypt';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDTO) {
    const emailTaken = await this.usersRepository.findByEmail(dto.email);

    if (emailTaken) {
      throw new ConflictException('This e-mail is already in use');
    }

    const createdUser = await this.usersRepository.create(dto);

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    };
  }

  async authenticate(dto: AutheticateDTO) {
    const user = await this.usersRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const validPassword = await compare(dto.password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id };
    const token = { access_token: await this.jwtService.signAsync(payload) };
    return token;
  }
}
