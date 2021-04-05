import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ArtistsDTO } from './cdd.dto';
import { Artists } from './entity/artists.entity';
import * as fs from 'fs';

@Injectable()
export class ArtistsService {
  constructor(
    // 艺人实体类
    @InjectRepository(Artists)
    private readonly artistsRepository: Repository<Artists>,
  ) {}

  /**
   * JSON数据生成艺人
   */
  async initializeArtists() {
    const artistToRomaJSON = JSON.parse(
      fs.readFileSync('./json/artists.simplified.json', 'utf-8'),
    );

    const successArtist = [];
    const failArtist = [];
    const repeationArtist = [];

    console.log('开始生成数据');

    for (const key in artistToRomaJSON) {
      const nameRoma = artistToRomaJSON[key];
      const name = key;

      const isHasArtist = await this.artistsRepository.findOne({
        where: [{ name }, { nameRoma }],
      });
      if (isHasArtist) {
        console.log(`${name}[${nameRoma}]已存在`);
        repeationArtist.push(`${name}[${nameRoma}]`);
        continue;
      }

      try {
        const artist = new Artists();
        artist.name = name;
        artist.nameRoma = nameRoma;
        await this.artistsRepository.save(artist);

        console.log(`${name}[${nameRoma}]生成成功`);
        successArtist.push(`${name}[${nameRoma}]`);
      } catch (e) {
        console.log(`${name}[${nameRoma}]生成失败`);
        failArtist.push(`${name}[${nameRoma}]`);
      }
    }

    console.log(
      `成功：${successArtist.length}条，失败：${failArtist.length}条，重复：${repeationArtist.length}条。`,
    );

    return {
      msg: `成功：${successArtist.length}条，失败：${failArtist.length}条，重复：${repeationArtist.length}条。`,
      successArtist,
      failArtist,
      repeationArtist,
    };
  }

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

  async getArtistByIds(ids: number[]) {
    return await this.artistsRepository
      .createQueryBuilder('artists')
      .where('artists.id IN (:...ids)', {
        ids,
      })
      .getMany();
  }

  async getArtistByName(name) {
    return await this.artistsRepository.findOne({ name });
  }

  /**
   * 获取静态JSON声优对照表
   */
  getStaticComparisonArtists({ empty, type }) {
    let jsonPath = '';
    switch (type) {
      case 'name':
        jsonPath = './json/artists.translate.json';
        break;
      case 'roma':
        jsonPath = './json/artists.simplified.json';
        break;
    }
    const isFilterNotEmpty = !!empty;

    const comparisonArtists = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    const comparisonArtistsArray = [];

    for (const key in comparisonArtists) {
      // 只获取空值 且 符合条件
      if (isFilterNotEmpty && comparisonArtists[key].toString().trim() !== '')
        continue;

      const keyValue = {
        key,
        value: comparisonArtists[key],
      };

      comparisonArtistsArray.push(keyValue);
    }

    return comparisonArtistsArray;
  }

  /**
   * 更新静态JSON声优对照表
   */
  updateStaticComparisonArtists({
    updateArray,
    deleteArray,
    type,
  }: {
    updateArray: { key: string; value: string }[];
    deleteArray: { key: string }[];
    type: 'name' | 'roma';
  }) {
    let jsonPath = '';
    switch (type) {
      case 'name':
        jsonPath = './json/artists.translate.json';
        break;
      case 'roma':
        jsonPath = './json/artists.simplified.json';
        break;
    }
    const comparisonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    for (const keyVal of updateArray) {
      comparisonData[keyVal.key] = keyVal.value;
    }

    for (const { key } of deleteArray) {
      delete comparisonData[key];
    }

    fs.writeFileSync(jsonPath, JSON.stringify(comparisonData));

    if (type === 'name') this.writeSimplifiedToRomaNameJSON();

    return `更新完毕，删除${deleteArray.length}个，更新${updateArray.length}个。`;
  }

  /**
   * 生成简体JSON
   */
  writeSimplifiedToRomaNameJSON() {
    const oldJson = JSON.parse(
      fs.readFileSync('./json/artists.translate.json', 'utf-8'),
    );

    const newJson = JSON.parse(
      fs.readFileSync('./json/artists.simplified.json', 'utf-8'),
    );
    for (const key in oldJson) {
      const value: string = oldJson[key];
      if (!newJson[value] && value && !value.includes(',')) {
        newJson[value] = '';
        fs.writeFileSync(
          './json/artists.simplified.json',
          JSON.stringify(newJson),
        );
      }
    }
  }

  /**
   * 声优名字表 简体匹配简体JSON表
   */
  writeSimplifiedToNameJSON() {
    const artistsJson = JSON.parse(
      fs.readFileSync('./json/artists.translate.json', 'utf-8'),
    );

    for (const key in artistsJson) {
      // 多名字组合跳过
      if (artistsJson[key].includes(',')) continue;

      // 已存在且有值的跳过
      const newKey = artistsJson[key];
      const isTrueHas =
        artistsJson[newKey] !== undefined && artistsJson[newKey] !== '';

      if (isTrueHas) continue;

      if (newKey !== '') artistsJson[newKey] = newKey;
    }

    fs.writeFileSync(
      './json/artists.translate.json',
      JSON.stringify(artistsJson),
    );
  }

  /**
   * 全局重新匹配即声优对照表
   */
  reMatchAllArtistsData() {
    this.writeSimplifiedToNameJSON();
    this.writeSimplifiedToRomaNameJSON();
  }
}
