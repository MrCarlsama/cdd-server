import { SourcePlatform } from './entity/photos.entity';
export declare class ContentDTO {
    readonly nicknames: string[];
    readonly sourcePlatform: SourcePlatform;
    readonly sourceUrl: string;
    readonly status: true;
    readonly isAudit: false;
    readonly issueDate: Date;
    readonly description: string;
}
export declare class UrlsDTO {
    readonly urls: string[];
}
export declare class ArtistsDTO {
    readonly name: string;
    readonly nameRoma: string;
    readonly status: boolean;
    readonly isAudit: boolean;
}
