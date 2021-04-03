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
exports.Photos = exports.SourcePlatform = void 0;
const typeorm_1 = require("typeorm");
const artists_entity_1 = require("./artists.entity");
var SourcePlatform;
(function (SourcePlatform) {
    SourcePlatform[SourcePlatform["upload"] = 1] = "upload";
    SourcePlatform[SourcePlatform["weibo"] = 2] = "weibo";
    SourcePlatform[SourcePlatform["twitter"] = 3] = "twitter";
    SourcePlatform[SourcePlatform["instagram"] = 4] = "instagram";
    SourcePlatform[SourcePlatform["other"] = 99] = "other";
})(SourcePlatform = exports.SourcePlatform || (exports.SourcePlatform = {}));
let Photos = class Photos {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Photos.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        comment: 'URL地址',
    }),
    __metadata("design:type", String)
], Photos.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({
        comment: '描述',
    }),
    __metadata("design:type", String)
], Photos.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToMany(type => artists_entity_1.Artists, artist => artist.photos),
    __metadata("design:type", Array)
], Photos.prototype, "artists", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: SourcePlatform,
        comment: '源数据 平台',
        default: 99,
    }),
    __metadata("design:type", Number)
], Photos.prototype, "sourcePlatform", void 0);
__decorate([
    typeorm_1.Column({
        comment: '源数据 地址',
    }),
    __metadata("design:type", String)
], Photos.prototype, "sourceUrl", void 0);
__decorate([
    typeorm_1.Column({
        comment: '启禁用状态',
        default: true,
    }),
    __metadata("design:type", Boolean)
], Photos.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({
        comment: '审核状态',
        default: false,
    }),
    __metadata("design:type", Boolean)
], Photos.prototype, "isAudit", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        comment: '更新时间',
    }),
    __metadata("design:type", Date)
], Photos.prototype, "updateDate", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        comment: '创建时间',
    }),
    __metadata("design:type", Date)
], Photos.prototype, "createDate", void 0);
__decorate([
    typeorm_1.Column({
        type: 'date',
        comment: '发布时间',
    }),
    __metadata("design:type", Date)
], Photos.prototype, "issueDate", void 0);
Photos = __decorate([
    typeorm_1.Entity()
], Photos);
exports.Photos = Photos;
//# sourceMappingURL=photos.entity.js.map