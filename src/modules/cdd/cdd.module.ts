import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OssModule } from 'src/oss/oss.module';
import { CddController } from './cdd.controller';
import { PhotosService } from './photos.service';
import { ArtistsService } from './artists.service';
import { Artists } from './entity/artists.entity';
import { Dynamics } from './entity/dynamics.entity';
import { Nicknames } from './entity/nicknames.entity';
import { Photos } from './entity/photos.entity';
import { OssService } from 'src/oss/oss.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artists, Dynamics, Nicknames, Photos]),
    OssModule,
    HttpModule,
  ],
  controllers: [CddController],
  providers: [PhotosService, ArtistsService, OssService],
})
export class CddModule {}
