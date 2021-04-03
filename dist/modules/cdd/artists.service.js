"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const artists_entity_1 = require("./entity/artists.entity");
const fs = require("fs");
let ArtistsService = class ArtistsService {
    constructor(artistsRepository) {
        this.artistsRepository = artistsRepository;
    }
    async initializeArtists() {
        const artistToRomaJSON = JSON.parse(fs.readFileSync('./json/artists.simplified.json', 'utf-8'));
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
                const artist = new artists_entity_1.Artists();
                artist.name = name;
                artist.nameRoma = nameRoma;
                await this.artistsRepository.save(artist);
                console.log(`${name}[${nameRoma}]生成成功`);
                successArtist.push(`${name}[${nameRoma}]`);
            }
            catch (e) {
                console.log(`${name}[${nameRoma}]生成失败`);
                failArtist.push(`${name}[${nameRoma}]`);
            }
        }
        console.log(`成功：${successArtist.length}条，失败：${failArtist.length}条，重复：${repeationArtist.length}条。`);
        return {
            successArtist,
            failArtist,
            repeationArtist,
        };
    }
    async createArtists(data) {
        const isHasArtist = await this.artistsRepository.findOne({
            where: [{ name: data.name }, { nameRoma: data.nameRoma }],
        });
        if (isHasArtist) {
            throw new common_1.HttpException('存在相同的名称或假名', 422);
        }
        const artist = new artists_entity_1.Artists();
        artist.name = data.name;
        artist.nameRoma = data.nameRoma;
        await this.artistsRepository.save(artist);
        return artist;
    }
    async deleteArtists(id) {
        await this.artistsRepository.delete(id);
        return '删除成功';
    }
    async updateArtists(id, data) {
        try {
            return await this.artistsRepository.update(id, data);
        }
        catch (e) {
            throw new common_1.HttpException('更新异常；' + e, 422);
        }
    }
    async getArtists({ limit, skip, name, nameRoma } = {
        limit: 0,
        skip: 0,
        name: '',
        nameRoma: '',
    }) {
        const isNotNumber = isNaN(Number(limit || 0)) || isNaN(Number(skip || 0));
        if (isNotNumber) {
            throw new common_1.HttpException('分页数据类型不符合', 422);
        }
        return await this.artistsRepository.find({
            where: {
                name: typeorm_2.Like(`%${name || ''}%`),
                nameRoma: typeorm_2.Like(`%${nameRoma || ''}%`),
            },
            take: Number(limit || 0),
            skip: Number(skip || 0),
        });
    }
    async getArtistById(id) {
        return await this.artistsRepository.findOne(id);
    }
    async getArtistByIds(ids) {
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
};
ArtistsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(artists_entity_1.Artists)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArtistsService);
exports.ArtistsService = ArtistsService;
//# sourceMappingURL=artists.service.js.map