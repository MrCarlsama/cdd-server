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
exports.Artists = void 0;
const typeorm_1 = require("typeorm");
const dynamics_entity_1 = require("./dynamics.entity");
const nicknames_entity_1 = require("./nicknames.entity");
const photos_entity_1 = require("./photos.entity");
let Artists = class Artists {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Artists.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        comment: '艺人名字',
    }),
    __metadata("design:type", String)
], Artists.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        comment: '名字 罗马音',
    }),
    __metadata("design:type", String)
], Artists.prototype, "nameRoma", void 0);
__decorate([
    typeorm_1.Column({
        comment: '名字 日文',
        default: '',
    }),
    __metadata("design:type", String)
], Artists.prototype, "nameJA", void 0);
__decorate([
    typeorm_1.Column({
        comment: '封面url',
        default: '',
    }),
    __metadata("design:type", String)
], Artists.prototype, "coverUrl", void 0);
__decorate([
    typeorm_1.ManyToMany(type => photos_entity_1.Photos, photo => photo.artists),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Artists.prototype, "photos", void 0);
__decorate([
    typeorm_1.OneToMany(type => nicknames_entity_1.Nicknames, nickname => nickname.artist),
    __metadata("design:type", Array)
], Artists.prototype, "nicknames", void 0);
__decorate([
    typeorm_1.ManyToMany(type => dynamics_entity_1.Dynamics, dynamic => dynamic.artists),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Artists.prototype, "dynamics", void 0);
__decorate([
    typeorm_1.Column({
        comment: '启禁用状态',
        default: true,
    }),
    __metadata("design:type", Boolean)
], Artists.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({
        comment: '审核状态',
        default: false,
    }),
    __metadata("design:type", Boolean)
], Artists.prototype, "isAudit", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        comment: '更新时间',
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Artists.prototype, "updateDate", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        comment: '创建时间',
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Artists.prototype, "createDate", void 0);
Artists = __decorate([
    typeorm_1.Entity()
], Artists);
exports.Artists = Artists;
//# sourceMappingURL=artists.entity.js.map