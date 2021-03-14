import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photos } from './entity/photos.entity';

@Injectable()
export class CddService {
  constructor(
    // 图片实体类
    @InjectRepository(Photos)
    private readonly photosRepository: Repository<Photos>,
  ) {}
}
