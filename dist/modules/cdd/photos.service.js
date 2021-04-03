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
exports.PhotosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const photos_entity_1 = require("./entity/photos.entity");
const fs = require("fs");
const archiver = require("archiver");
const oss_service_1 = require("../../oss/oss.service");
const artists_service_1 = require("./artists.service");
let PhotosService = class PhotosService {
    constructor(photosRepository, httpSerivce, ossService, artistsService) {
        this.photosRepository = photosRepository;
        this.httpSerivce = httpSerivce;
        this.ossService = ossService;
        this.artistsService = artistsService;
        const json = fs.readFileSync('./json/artists.translate.json', 'utf-8');
        this.artistsNicknameTranslate = JSON.parse(json);
    }
    async createPhotos(data) {
        console.log(data);
        const photo = await this.getPhotoRepo(data);
        if (photo.url !== '') {
            return photo;
        }
        const photoJoinArtists = await this.getPhotoJoinArtists(photo, data);
        const photoOssUrl = await this.getPhotoOssUrl(photo);
        photo.url = photoOssUrl;
        photo.artists = photoJoinArtists;
        return await this.photosRepository.save(photo);
    }
    async getPhotoRepo(data) {
        const hasPhoto = await this.photosRepository.findOne({
            where: [{ sourceUrl: data.sourceUrl }],
        });
        if (hasPhoto) {
            return hasPhoto;
        }
        const photo = new photos_entity_1.Photos();
        photo.description = data.description;
        photo.url = '';
        photo.sourceUrl = data.sourceUrl;
        photo.sourcePlatform = data.sourcePlatform;
        photo.issueDate = new Date(data.issueDate);
        return this.photosRepository.save(photo);
    }
    async getPhotoOssUrl(photo) {
        const currentId = photo.id;
        const lastFilesType = photo.sourceUrl.slice(photo.sourceUrl.lastIndexOf('.') + 1);
        const ossPathName = `/${currentId}.${lastFilesType}`;
        const isHasOss = await this.ossService.isExistObject(ossPathName);
        if (isHasOss) {
            this.deletePhoto(currentId);
            throw new common_1.HttpException('该图片已经存在oss：' + ossPathName, 422);
        }
        const url = await this.ossService.createOss(ossPathName, photo.sourceUrl);
        return url;
    }
    async getPhotoJoinArtists(photo, data) {
        const names = this.getNamesByNickname(data.nicknames);
        const artists = await this.getArtistsByNames(names);
        return artists;
    }
    async auditPhotos(data) {
        for (const { id, artistIds } of data) {
            const artists = await this.artistsService.getArtistByIds(artistIds);
            const photo = await this.photosRepository.findOne(id);
            photo.isAudit = true;
            photo.artists = artists;
            const result = await this.photosRepository.save(photo);
        }
        return '审核成功';
    }
    async deletePhoto(id) {
        try {
            await this.photosRepository.delete(id);
            return '删除成功';
        }
        catch (e) {
            throw new common_1.HttpException('删除异常' + e, 422);
        }
    }
    async updatePhoto(id, data) {
        try {
            return await this.photosRepository.update(id, data);
        }
        catch (e) {
            throw new common_1.HttpException('更新异常；' + e, 422);
        }
    }
    async getPhotos({ limit, skip, options } = {
        limit: 50,
        skip: 0,
        options: {
            artistIds: [],
            isAudit: null,
        },
    }) {
        const isNotNumber = isNaN(Number(limit || 0)) || isNaN(Number(skip || 0));
        if (isNotNumber) {
            throw new common_1.HttpException('分页数据类型不符合', 422);
        }
        let photoQueryBuilder = this.photosRepository
            .createQueryBuilder('photos')
            .leftJoinAndSelect('photos.artists', 'artists');
        if (options) {
            if ((options === null || options === void 0 ? void 0 : options.artistIds) instanceof Array && options.artistIds.length > 0) {
                const ids = options.artistIds.map(id => Number(id));
                photoQueryBuilder = photoQueryBuilder.where('artists.id IN (:...ids)', {
                    ids,
                });
            }
            if ((options === null || options === void 0 ? void 0 : options.isAudit) !== null) {
                const isAudit = options.isAudit === 'true';
                photoQueryBuilder = photoQueryBuilder.andWhere('photos.isAudit = :isAudit', {
                    isAudit,
                });
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
    async getPhotosByCreeper({ urls }) {
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
    async handleGetPhotosResult(contents) {
        for (const content of contents) {
            this.createPhotos(content);
        }
    }
    async getPathName(index, data) {
        const name = this.getName(data.nicknames[index]);
        const currentNicknameArtist = await this.getArtist(name);
        const lastFilesType = data.sourceUrl.slice(data.sourceUrl.lastIndexOf('.') + 1);
        if (currentNicknameArtist) {
            return `/${currentNicknameArtist.nameRoma}/${currentNicknameArtist.id}.${lastFilesType}`;
        }
        else {
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
        try {
            return keys
                .map(key => this.getName(key))
                .flat()
                .filter(key => key !== '');
        }
        catch (e) {
            console.log(e);
            console.log(keys);
        }
    }
    getName(key) {
        this.artistsNicknameTranslate = JSON.parse(fs.readFileSync('./json/artists.translate.json', 'utf-8'));
        let name = '';
        const namesArray = (this.artistsNicknameTranslate[key] || '')
            .split(',')
            .filter(key => key.trim() !== '');
        const isNamesArray = namesArray.length > 1;
        if (isNamesArray) {
            name = this.getNamesByNickname(namesArray);
        }
        else if (this.artistsNicknameTranslate[key]) {
            name = this.artistsNicknameTranslate[key];
        }
        else {
            this.artistsNicknameTranslate[key] = '';
            fs.writeFileSync('./json/artists.translate.json', JSON.stringify(this.artistsNicknameTranslate));
            name = '';
        }
        this.writeSimplifiedNameJSON();
        return name;
    }
    writeSimplifiedNameJSON() {
        const oldJson = JSON.parse(fs.readFileSync('./json/artists.translate.json', 'utf-8'));
        const newJson = JSON.parse(fs.readFileSync('./json/artists.simplified.json', 'utf-8'));
        for (const key in oldJson) {
            const value = oldJson[key];
            if (!newJson[value] && value && !value.includes(',')) {
                newJson[value] = '';
                fs.writeFileSync('./json/artists.simplified.json', JSON.stringify(newJson));
            }
        }
    }
    async exportPhotos({ artistIds }) {
        const params = {
            limit: 0,
            skip: 0,
            options: { artistIds, isAudit: true },
        };
        const photos = await this.getPhotos(params);
        const zip = await this.createPhotosZipStream(photos);
        const url = await this.ossService.uploadOssStream(`/zip/[DD大礼包]${new Date().toISOString()}.zip`, zip);
        return { url: process.env.OSS_BASE_URL + '/' + url };
    }
    async createPhotosZipStream(photos) {
        const zipStream = fs.createWriteStream(`./zip/[dd]${new Date().toISOString()}.zip`);
        const zip = archiver('zip', { zlib: { level: 9 } });
        zip.pipe(zipStream);
        for (const photo of photos) {
            const photoStream = await this.ossService.getImageStream(process.env.OSS_BASE_URL + '/' + photo.url);
            zip.append(photoStream, { name: photo.url });
        }
        zip.finalize();
        return zip;
    }
};
PhotosService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(photos_entity_1.Photos)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_1.HttpService,
        oss_service_1.OssService,
        artists_service_1.ArtistsService])
], PhotosService);
exports.PhotosService = PhotosService;
//# sourceMappingURL=photos.service.js.map