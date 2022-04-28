import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/auth/register.dto';
import { LoginDto } from '../dto/auth/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const { email } = await this.authService.register(dto);
    return { email };
  }

  @Post('recovery')
  async recovery(@Body() email: string) {
    return await this.authService.recovery(email);
  }
}