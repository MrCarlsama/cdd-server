import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('UsersController')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  @ApiOperation({
    summary: '登录',
  })
  async login(@Body() data: { username: string; password: string }) {
    return this.usersService.login(data);
  }

  @Post('/register')
  @ApiOperation({
    summary: '注册',
  })
  async register(@Body() data: { username: string; password: string }) {
    return this.usersService.register(data);
  }
}
