import { UsersModule } from './modules/users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CddModule } from './modules/cdd/cdd.module';
import { TaskModule } from './modules/task/task.module';
import { OssModule } from './oss/oss.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      acquireTimeout: 60 * 60 * 1000,
      connectTimeout: 60 * 60 * 1000,
      autoLoadEntities: true,
      synchronize: true,
      charset: 'utf8mb4',
    }),
    OssModule,

    CddModule,
    TaskModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
