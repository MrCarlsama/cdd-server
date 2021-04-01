import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { Users } from './entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
