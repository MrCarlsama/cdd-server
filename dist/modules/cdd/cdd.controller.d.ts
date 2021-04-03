import { ArtistsService } from './artists.service';
import { ArtistsDTO, ContentDTO, UrlsDTO } from './cdd.dto';
import { PhotosService } from './photos.service';
import { Artists } from './entity/artists.entity';
export declare class CddController {
    private readonly artistsService;
    private readonly photosService;
    constructor(artistsService: ArtistsService, photosService: PhotosService);
    createPhotos({ data }: {
        data: ContentDTO;
    }): Promise<import("./entity/photos.entity").Photos>;
    deletePhotos(id: any): Promise<string>;
    updatePhotos(id: any): void;
    getPhotos(query: any): Promise<import("./entity/photos.entity").Photos[]>;
    auditPhotos(data: any): Promise<string>;
    exportPhotos(data: any): Promise<{
        url: string;
    }>;
    getPhotosByCreeper(data: UrlsDTO): Promise<void>;
    createArtists(artists: ArtistsDTO): Promise<Artists>;
    deleteArtists(id: any): Promise<string>;
    updateArtists(id: any, artists: Artists): Promise<import("typeorm").UpdateResult>;
    getArtists(query: any): Promise<Artists[]>;
    getArtist(id: any): Promise<Artists>;
    initializeArtists(): Promise<{
        successArtist: any[];
        failArtist: any[];
        repeationArtist: any[];
    }>;
    createNicknames(): void;
    deleteNicknames(id: any): void;
    updateNicknames(id: any): void;
    getNicknames(id: any): void;
}
