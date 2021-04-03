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
exports.ArtistsDTO = exports.UrlsDTO = exports.ContentDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const photos_entity_1 = require("./entity/photos.entity");
class ContentDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Array)
], ContentDTO.prototype, "nicknames", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ContentDTO.prototype, "sourcePlatform", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ContentDTO.prototype, "sourceUrl", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], ContentDTO.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], ContentDTO.prototype, "isAudit", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], ContentDTO.prototype, "issueDate", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ContentDTO.prototype, "description", void 0);
exports.ContentDTO = ContentDTO;
class UrlsDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Array)
], UrlsDTO.prototype, "urls", void 0);
exports.UrlsDTO = UrlsDTO;
class ArtistsDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ArtistsDTO.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ArtistsDTO.prototype, "nameRoma", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], ArtistsDTO.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], ArtistsDTO.prototype, "isAudit", void 0);
exports.ArtistsDTO = ArtistsDTO;
//# sourceMappingURL=cdd.dto.js.map