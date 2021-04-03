import { Artists } from './artists.entity';
export declare class Nicknames {
    id: number;
    nickname: string;
    artist: Artists;
    status: boolean;
    updateDate: Date;
    createDate: Date;
    issueDate: Date;
}
