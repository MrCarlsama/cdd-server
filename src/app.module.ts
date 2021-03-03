import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CddModule } from './cdd/cdd.module';
import { DATABASE } from './config';
import { TaskModule } from './task/task.module';
import { OssModule } from './oss/oss.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DATABASE.HOST,
      port: DATABASE.PORT,
      username: DATABASE.USERNAME,
      password: DATABASE.PASSWORD,
      database: 'cdd_carl',
      autoLoadEntities: true,
      synchronize: true,
      charset: 'utf8mb4',
    }),
    CddModule,
    TaskModule,
    OssModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
