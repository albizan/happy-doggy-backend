import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UseGuards(AuthGuard)
  async findAll(@Req() request) {
    // Here I can extract the userID from the request Object
    console.log(request.jwt);
    return await this.userService.findAll();
  }
}
