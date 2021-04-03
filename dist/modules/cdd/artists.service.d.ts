import { Repository } from 'typeorm';
import { ArtistsDTO } from './cdd.dto';
import { Artists } from './entity/artists.entity';
export declare class ArtistsService {
    private readonly artistsRepository;
    constructor(artistsRepository: Repository<Artists>);
    initializeArtists(): Promise<{
        successArtist: any[];
        failArtist: any[];
        repeationArtist: any[];
    }>;
    createArtists(data: ArtistsDTO): Promise<Artists>;
    deleteArtists(id: any): Promise<string>;
    updateArtists(id: any, data: Artists): Promise<import("typeorm").UpdateResult>;
    getArtists({ limit, skip, name, nameRoma }?: {
        limit: number;
        skip: number;
        name: string;
        nameRoma: string;
    }): Promise<Artists[]>;
    getArtistById(id: any): Promise<Artists>;
    getArtistByIds(ids: number[]): Promise<Artists[]>;
    getArtistByName(name: any): Promise<Artists>;
}
