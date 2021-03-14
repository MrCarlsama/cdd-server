import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OssModule } from 'src/oss/oss.module';
import { CddController } from './cdd.controller';
import { CddService } from './cdd.service';
import { Artists } from './entity/artists.entity';
import { Dynamics } from './entity/dynamics.entity';
import { Nicknames } from './entity/nicknames.entity';
import { Photos } from './entity/photos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artists, Dynamics, Nicknames, Photos]),
    OssModule,
  ],
  controllers: [CddController],
  providers: [CddService],
})
export class CddModule {}
