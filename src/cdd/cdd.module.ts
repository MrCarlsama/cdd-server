import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CddController } from './cdd.controller';
import { CddService } from './cdd.service';
import { Artists } from './entity/artists.entity';
import { Dynamics } from './entity/dynamics.entity';
import { Nicknames } from './entity/nicknames.entity';
import { Photos } from './entity/photos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artists, Dynamics, Nicknames, Photos])],
  controllers: [CddController],
  providers: [CddService],
})
export class CddModule {}
