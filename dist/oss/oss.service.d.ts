import { HttpService } from '@nestjs/common';
import * as OSS from 'ali-oss';
export declare class OssService {
    private readonly httpSerivce;
    constructor(httpSerivce: HttpService);
    private client;
    createOss(pathUrl: string, url: string): Promise<string>;
    getImageStream(url: string): any;
    uploadOssStream(pathUrl: any, stream: any): Promise<string>;
    isExistObject(pathUrl: string, options?: OSS.HeadObjectOptions): Promise<boolean>;
}
