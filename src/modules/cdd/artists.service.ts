import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ArtistsDTO } from './cdd.dto';
import { Artists } from './entity/artists.entity';

@Injectable()
export class ArtistsService {
  constructor(
    // 艺人实体类
    @InjectRepository(Artists)
    private readonly artistsRepository: Repository<Artists>,
  ) {}
  async createArtists(data: ArtistsDTO) {
    const isHasArtist = await this.artistsRepository.findOne({
      where: [{ name: data.name }, { nameRoma: data.nameRoma }],
    });
    if (isHasArtist) {
      throw new HttpException('存在相同的名称或假名', 422);
    }

    const artist = new Artists();
    artist.name = data.name;
    artist.nameRoma = data.nameRoma;
    await this.artistsRepository.save(artist);

    return artist;
  }

  async deleteArtists(id) {
    await this.artistsRepository.delete(id);

    return '删除成功';
  }

  async updateArtists(id, data: Artists) {
    try {
      return await this.artistsRepository.update(id, data);
    } catch (e) {
      throw new HttpException('更新异常；' + e, 422);
    }
  }

  async getArtists(
    { limit, skip, name, nameRoma } = {
      limit: 0,
      skip: 0,
      name: '',
      nameRoma: '',
    },
  ) {
    const isNotNumber = isNaN(Number(limit || 0)) || isNaN(Number(skip || 0));

    if (isNotNumber) {
      throw new HttpException('分页数据类型不符合', 422);
    }

    return await this.artistsRepository.find({
      where: {
        name: Like(`%${name || ''}%`),
        nameRoma: Like(`%${nameRoma || ''}%`),
      },
      take: Number(limit || 0),
      skip: Number(skip || 0),
    });
  }

  async getArtistById(id) {
    return await this.artistsRepository.findOne(id);
  }

  async getArtistByName(name) {
    return await this.artistsRepository.findOne({ name });
  }
}
