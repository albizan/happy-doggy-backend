import { Controller, Get, Post, Body, Logger, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { LoginUserDto } from './dtos/loginUser.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterUserDto): Promise<string> {
    return this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: LoginUserDto): Promise<string> {
    return this.authService.login(data);
  }
}
