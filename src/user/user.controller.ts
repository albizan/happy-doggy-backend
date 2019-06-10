import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { UserService } from 'dist/user/user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.userService.findAll();
  }
}
