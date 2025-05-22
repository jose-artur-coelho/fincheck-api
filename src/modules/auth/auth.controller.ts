import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AutheticateDTO } from './dto/authenticate.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() dto: RegisterDTO) {
    return this.authService.register(dto);
  }

  @Post('/login')
  login(@Body() dto: AutheticateDTO) {
    return this.authService.authenticate(dto);
  }
}
