import { Controller, Get, Post, Body, Logger, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/registerUser.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: RegisterUserDto): Promise<string> {
    return this.authService.register(data);
  }
}
