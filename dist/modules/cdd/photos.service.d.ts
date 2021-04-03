import { HttpService } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photos } from './entity/photos.entity';
import * as archiver from 'archiver';
import { OssService } from 'src/oss/oss.service';
import { ArtistsService } from './artists.service';
import { ContentDTO, UrlsDTO } from './cdd.dto';
import { Artists } from './entity/artists.entity';
export declare class PhotosService {
    private readonly photosRepository;
    private readonly httpSerivce;
    private readonly ossService;
    private readonly artistsService;
    constructor(photosRepository: Repository<Photos>, httpSerivce: HttpService, ossService: OssService, artistsService: ArtistsService);
    private artistsNicknameTranslate;
    createPhotos(data: ContentDTO): Promise<Photos>;
    getPhotoRepo(data: ContentDTO): Promise<Photos>;
    getPhotoOssUrl(photo: Photos): Promise<string>;
    getPhotoJoinArtists(photo: Photos, data: ContentDTO): Promise<Artists[]>;
    auditPhotos(data: {
        id: number;
        artistIds: number[];
    }[]): Promise<string>;
    deletePhoto(id: any): Promise<string>;
    updatePhoto(id: any, data: Partial<Photos>): Promise<import("typeorm").UpdateResult>;
    getPhotos({ limit, skip, options }?: {
        limit: number;
        skip: number;
        options: {
            artistIds: any[];
            isAudit: any;
        };
    }): Promise<Photos[]>;
    getPhotosByCreeper({ urls }: UrlsDTO): Promise<void>;
    handleGetPhotosResult(contents: ContentDTO[]): Promise<void>;
    getPathName(index: any, data: any): Promise<string>;
    getArtistsByNames(names: string[]): Promise<Artists[]>;
    getArtist(name: any): Promise<Artists>;
    getNamesByNickname(keys: any): any;
    getName(key: any): string;
    writeSimplifiedNameJSON(): void;
    exportPhotos({ artistIds }: {
        artistIds: number[];
    }): Promise<{
        url: string;
    }>;
    createPhotosZipStream(photos: Photos[]): Promise<archiver.Archiver>;
}
