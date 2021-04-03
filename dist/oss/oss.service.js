"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OssService = void 0;
const common_1 = require("@nestjs/common");
const OSS = require("ali-oss");
let OssService = class OssService {
    constructor(httpSerivce) {
        this.httpSerivce = httpSerivce;
        this.client = new OSS({
            region: process.env.OSS_REGION,
            accessKeyId: process.env.OSS_ACCESSKEY_ID,
            accessKeySecret: process.env.OSS_ACCESSKEY_SECRET,
            bucket: process.env.OSS_BUCKET,
        });
    }
    async createOss(pathUrl, url) {
        const resStream = await this.getImageStream(url);
        const resultUrl = await this.uploadOssStream(pathUrl, resStream);
        return resultUrl;
    }
    async getImageStream(url) {
        try {
            const response = await this.httpSerivce
                .request({
                url,
                method: 'get',
                responseType: 'stream',
            })
                .toPromise()
                .then(res => res.data);
            return response;
        }
        catch (e) {
            return await this.getImageStream(url);
        }
    }
    async uploadOssStream(pathUrl, stream) {
        try {
            const result = await this.client.putStream(pathUrl, stream);
            await this.client.putACL(pathUrl, 'public-read');
            return result.name;
        }
        catch (e) {
            return this.uploadOssStream(pathUrl, stream);
        }
    }
    async isExistObject(pathUrl, options = {}) {
        try {
            await this.client.head(pathUrl, options);
            return true;
        }
        catch (error) {
            if (error.code === 'NoSuchKey') {
                return false;
            }
        }
    }
};
OssService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], OssService);
exports.OssService = OssService;
//# sourceMappingURL=oss.service.js.map