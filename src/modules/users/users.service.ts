import { Injectable, HttpException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Users } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async login(data: { username: string; password: string }) {
    const user = await this.usersRepository.findOne({
      username: data.username,
    });

    if (!user || user.password !== data.password) {
      throw new HttpException('账号或密码不对', 422);
    }

    const { accessToken: token } = await this.authService.login({
      username: user.username,
      id: user.id,
    });

    return {
      username: user.username,
      id: user.id,
      token,
    };
  }

  async register(data: { username: string; password: string }) {
    const isHasUser = await this.usersRepository.findOne({
      username: data.username,
    });
    console.log(isHasUser);
    if (isHasUser) {
      throw new HttpException('已存在相同名称', 422);
    }

    const user = new Users();

    user.username = data.username;
    user.password = data.password;

    const resultUser = await this.usersRepository.save(user);

    const { accessToken: token } = await this.authService.login({
      username: resultUser.username,
      id: resultUser.id,
    });

    return {
      username: resultUser.username,
      id: resultUser.id,
      token,
    };
  }
}
