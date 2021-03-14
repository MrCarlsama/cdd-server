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

  async getImageStream(url: string) {
    const response = await this.httpSerivce.request<Stream>({
      url,
      method: 'get',
      responseType: 'stream',
    });
    console.log(response);
    return response;
  }

  async uploadOssStream(pathUrl: string, stream: Stream) {
    try {
      const result = await this.client.putStream(pathUrl, stream);
      // 公告读
      await this.client.putACL(pathUrl, 'public-read');

      console.log(result);

      return pathUrl;
    } catch (e) {
      console.log(e);
      return this.uploadOssStream(pathUrl, stream);
    }
  }

  async isExistObject(
    pathUrl: string,
    options: OSS.HeadObjectOptions = {},
  ): Promise<boolean> {
    try {
      await this.client.head(pathUrl, options);
      // console.log(`${name}, 文件存在`);
      return true;
    } catch (error) {
      if (error.code === 'NoSuchKey') {
        console.log(`${name}, 文件不存在`);
        return false;
      }
    }
  }
}
