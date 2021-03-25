import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photos, SourcePlatform } from './entity/photos.entity';
import * as fs from 'fs';
import { OssService } from 'src/oss/oss.service';
import { ArtistsService } from './artists.service';
import { ContentDTO } from './cdd.dto';

@Injectable()
export class PhotosService {
  constructor(
    // 图片实体类
    @InjectRepository(Photos)
    private readonly photosRepository: Repository<Photos>,
    // OSS
    private readonly ossService: OssService,
    // Artist
    private readonly artistsService: ArtistsService,
  ) {
    // 读取JSON对照表
    const json = fs.readFileSync('./json/artists.translate.json', 'utf-8');
    this.artistsNicknameTranslate = JSON.parse(json);
  }

  private artistsNicknameTranslate: {};

  async createPhotos(data: ContentDTO) {
    const results = [];
    for (let i = 0; i < data.nicknames.length; i++) {
      let artists = [];
      const names = this.getNamesByNickname(data.nicknames);
      // 存在 加入联
      if (names.length > 0) {
        artists = await this.getArtistsByNames(names);
        console.log(artists);
      }

      const ossPathName = await this.getPathName(i, data);

      // 转OSS
      const url = await this.ossService.createOss(
        `${ossPathName}`,
        data.sourceUrl,
      );

      // 加入数据库
      const photo = new Photos();
      photo.url = url;
      photo.artists = artists;
      photo.sourceUrl = data.sourceUrl;
      photo.sourcePlatform = data.sourcePlatform;
      photo.issueDate = new Date(data.issueDate);
      const result = await this.photosRepository.save(photo);
      results.push(result);
    }
    return results;
  }

  // oss 路径名建议
  async getPathName(index, data) {
    const name = this.getName(data.nicknames[index]);
    const currentNicknameArtist = await this.getArtist(name);

    const lastFilesType = data.sourceUrl.slice(
      data.sourceUrl.lastIndexOf('.') + 1,
    );

    if (currentNicknameArtist) {
      return `/${currentNicknameArtist.nameRoma}/${currentNicknameArtist.id}.${lastFilesType}`;
    } else {
      return `/shiranaiyo/${new Date(data.issueDate).valueOf() +
        index}.${lastFilesType}`;
    }
  }

  async getArtistsByNames(names) {
    const artists = [];
    for (const name of names) {
      const artist = await this.getArtist(name);
      artist && artists.push(artist);
    }
    return artists;
  }

  async getArtist(name) {
    return await this.artistsService.getArtistByName(name);
  }

  getNamesByNickname(keys) {
    return keys.map(key => this.getName(key)).filter(key => key !== '');
  }

  getName(key) {
    const nicknamesJSON = this.artistsNicknameTranslate;

    if (nicknamesJSON[key]) {
      return nicknamesJSON[key];
    } else {
      nicknamesJSON[key] = '';

      fs.writeFileSync(
        './json/artists.translate.json',
        JSON.stringify(nicknamesJSON),
      );
      this.artistsNicknameTranslate = { ...nicknamesJSON };

      return '';
    }
  }
}
