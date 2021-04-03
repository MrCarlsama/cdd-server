import { Artists } from './artists.entity';
export declare enum SourcePlatform {
    upload = 1,
    weibo = 2,
    twitter = 3,
    instagram = 4,
    other = 99
}
export declare class Photos {
    id: number;
    url: string;
    description: string;
    artists: Artists[];
    sourcePlatform: SourcePlatform;
    sourceUrl: string;
    status: boolean;
    isAudit: boolean;
    updateDate: Date;
    createDate: Date;
    issueDate: Date;
}
