import { Dynamics } from './dynamics.entity';
import { Nicknames } from './nicknames.entity';
import { Photos } from './photos.entity';
export declare class Artists {
    id: number;
    name: string;
    nameRoma: string;
    nameJA: string;
    coverUrl: string;
    photos: Photos[];
    nicknames: Nicknames[];
    dynamics: Dynamics[];
    status: boolean;
    isAudit: boolean;
    updateDate: Date;
    createDate: Date;
}
