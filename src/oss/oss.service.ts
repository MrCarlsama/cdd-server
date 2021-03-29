import { HttpService, Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
import { Stream } from 'stream';

@Injectable()
export class OssService {
  constructor(private readonly httpSerivce: HttpService) {
    this.client = new OSS({
      region: process.env.OSS_REGION,
      accessKeyId: process.env.OSS_ACCESSKEY_ID,
      accessKeySecret: process.env.OSS_ACCESSKEY_SECRET,
      bucket: process.env.OSS_BUCKET,
    });
  }
  private client: OSS;

  async createOss(pathUrl: string, url: string) {
    const resStream = await this.getImageStream(url);
    const resultUrl = await this.uploadOssStream(pathUrl, resStream);
    return resultUrl;
  }

  async getImageStream(url: string) {
    try {
      const response = await this.httpSerivce
        .request<Stream>({
          url,
          method: 'get',
          responseType: 'stream',
        })
        .toPromise()
        .then(res => res.data);

      return response;
    } catch (e) {
      return await this.getImageStream(url);
    }
  }

  async uploadOssStream(pathUrl, stream): Promise<string> {
    try {
      const result = await this.client.putStream(pathUrl, stream);
      // 公共读
      await this.client.putACL(pathUrl, 'public-read');

      return result.name;
    } catch (e) {
      return this.uploadOssStream(pathUrl, stream);
    }
  }

  async isExistObject(
    pathUrl: string,
    options: OSS.HeadObjectOptions = {},
  ): Promise<boolean> {
    try {
      await this.client.head(pathUrl, options);
      return true;
    } catch (error) {
      if (error.code === 'NoSuchKey') {
        return false;
      }
    }
  }
}
