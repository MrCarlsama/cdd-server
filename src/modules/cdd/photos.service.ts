import { HttpService, Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photos } from './entity/photos.entity';
import * as fs from 'fs';
import { OssService } from 'src/oss/oss.service';
import { ArtistsService } from './artists.service';
import { ContentDTO, UrlsDTO } from './cdd.dto';
import { Artists } from './entity/artists.entity';

@Injectable()
export class PhotosService {
  constructor(
    // 图片实体类
    @InjectRepository(Photos)
    private readonly photosRepository: Repository<Photos>,
    // http
    private readonly httpSerivce: HttpService,
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

  /**
   * 创建图片
   */
  async createPhotos(data: ContentDTO) {
    const names = this.getNamesByNickname(data.nicknames);
    const artists = await this.getArtistsByNames(names);

    const isFlag =
      data.nicknames.length === artists.length && artists.length > 0;
    // 存在 加入联 且符合
    if (isFlag) {
      return this.createPhotosByPick(data, artists);
    } else {
      return this.createPhoto(data);
    }
  }

  async createPhoto(data: ContentDTO) {
    const lastName = data.sourceUrl.split('/');

    const ossPathUrl = `/shiranaiyo/${lastName[lastName.length - 1]}`;

    const isHasOss = await this.ossService.isExistObject(ossPathUrl);

    if (isHasOss) {
      throw new HttpException('该图片已经存在oss：' + ossPathUrl, 422);
    }

    // 转OSS
    const url = await this.ossService.createOss(ossPathUrl, data.sourceUrl);
    return this.createPhotosBySingle(data, {
      artists: [],
      url,
    });
  }

  /**
   * 多声优图分配
   */
  async createPhotosByPick(data: ContentDTO, artists: Artists[]) {
    const results: Photos[] = [];
    const lastFilesType = data.sourceUrl.slice(
      data.sourceUrl.lastIndexOf('.') + 1,
    );

    // 每个声优 分配一张图片
    for (let i = 0; i < artists.length; i++) {
      // const ossPathName = await this.getPathName(i, data);

      const photo = await this.createPhotosBySingle(data, {
        artists,
        url: '',
      });

      const currentId = photo.id;

      const ossPathName = `/${artists[i].nameRoma}/${currentId}.${lastFilesType}`;

      const isHasOss = await this.ossService.isExistObject(ossPathName);

      if (isHasOss) {
        this.deletePhoto(currentId);

        throw new HttpException('该图片已经存在oss：' + ossPathName, 422);
      }

      // 转OSS
      const url = await this.ossService.createOss(
        `${ossPathName}`,
        data.sourceUrl,
      );

      const result = await this.updatePhoto(currentId, { url, isAudit: true });

      results.push(photo);
    }

    return results;
  }

  async createPhotosBySingle(
    data: ContentDTO,
    {
      artists,
      url,
    }: {
      artists: Artists[];
      url: string;
    },
  ) {
    // 加入数据库
    const photo = new Photos();
    photo.url = url;
    photo.artists = artists;
    photo.description = data.description;
    photo.sourceUrl = data.sourceUrl;
    photo.sourcePlatform = data.sourcePlatform;
    photo.issueDate = new Date(data.issueDate);
    return await this.photosRepository.save(photo);
  }

  /**
   * 审核图片
   */
  async auditPhotos(data: { id: number; artistIds: number[] }[]) {
    for (const { id, artistIds } of data) {
      const artists = await this.artistsService.getArtistByIds(artistIds);

      const photo = await this.photosRepository.findOne(id);

      photo.isAudit = true;
      photo.artists = artists;

      const result = await this.photosRepository.save(photo);

      console.log(result);
    }
  }

  /**
   * 删除图片
   */
  async deletePhoto(id) {
    try {
      await this.photosRepository.delete(id);
      return '删除成功';
    } catch (e) {
      throw new HttpException('删除异常' + e, 422);
    }
  }
  /**
   * 更新图片
   */
  async updatePhoto(id, data: Partial<Photos>) {
    try {
      return await this.photosRepository.update(id, data);
    } catch (e) {
      throw new HttpException('更新异常；' + e, 422);
    }
  }

  async getPhotos(
    { limit, skip, options } = {
      limit: 50,
      skip: 0,
      options: {
        artistIds: [],
        isAudit: null,
      },
    },
  ) {
    const isNotNumber = isNaN(Number(limit || 0)) || isNaN(Number(skip || 0));

    if (isNotNumber) {
      throw new HttpException('分页数据类型不符合', 422);
    }

    let photoQueryBuilder = this.photosRepository
      .createQueryBuilder('photos')
      .leftJoinAndSelect('photos.artists', 'artists');

    // 存在其他参数
    if (options) {
      if (options?.artistIds instanceof Array && options.artistIds.length > 0) {
        const ids = options.artistIds.map(id => Number(id));

        photoQueryBuilder = photoQueryBuilder.where('artists.id IN (:...ids)', {
          ids,
        });
      }

      if (options?.isAudit !== null) {
        const isAudit = options.isAudit === 'true';
        photoQueryBuilder = photoQueryBuilder.andWhere(
          'photos.isAudit = :isAudit',
          {
            isAudit,
          },
        );
      }
    }

    if (limit) {
      photoQueryBuilder = photoQueryBuilder.take(limit);
    }

    if (skip) {
      photoQueryBuilder = photoQueryBuilder.skip(skip);
    }

    return await photoQueryBuilder.printSql().getMany();
  }

  async getPhotosByCreeper({ urls }: UrlsDTO) {
    for (const url of urls) {
      this.httpSerivce
        .request({
          url: 'http://localhost:2333/task/weibo',
          method: 'post',
          data: {
            url,
          },
        })
        .toPromise()
        .then(res => this.handleGetPhotosResult(res.data));
    }
  }

  /**
   * 处理远程图片数据
   */
  async handleGetPhotosResult(contents: ContentDTO[]) {
    for (const content of contents) {
      this.createPhotos(content);
    }
  }

  /**
   *  oss 路径名建议
   */
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
    const artists: Artists[] = [];
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
    try {
      return keys.map(key => this.getName(key)).filter(key => key !== '');
    } catch (e) {
      console.log(e);
      console.log(keys);
    }
  }

  /**
   * 昵称匹配名称 by JSON文件
   */
  getName(key) {
    this.artistsNicknameTranslate = JSON.parse(
      fs.readFileSync('./json/artists.translate.json', 'utf-8'),
    );

    let name = '';

    if (this.artistsNicknameTranslate[key]) {
      name = this.artistsNicknameTranslate[key];
    } else {
      this.artistsNicknameTranslate[key] = '';

      fs.writeFileSync(
        './json/artists.translate.json',
        JSON.stringify(this.artistsNicknameTranslate),
      );

      name = '';
    }

    this.writeSimplifiedNameJSON();

    return name;
  }

  /**
   * 生成简体JSON
   */
  writeSimplifiedNameJSON() {
    const oldJson = JSON.parse(
      fs.readFileSync('./json/artists.translate.json', 'utf-8'),
    );

    const newJson = JSON.parse(
      fs.readFileSync('./json/artists.simplified.json', 'utf-8'),
    );
    for (const key in oldJson) {
      const value = oldJson[key];
      if (!newJson[value] && value) {
        newJson[value] = '';
        fs.writeFileSync(
          './json/artists.simplified.json',
          JSON.stringify(newJson),
        );
      }
    }
  }
}
