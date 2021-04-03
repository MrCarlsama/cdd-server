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
exports.Nicknames = void 0;
const typeorm_1 = require("typeorm");
const artists_entity_1 = require("./artists.entity");
let Nicknames = class Nicknames {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Nicknames.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        comment: '标签昵称',
    }),
    __metadata("design:type", String)
], Nicknames.prototype, "nickname", void 0);
__decorate([
    typeorm_1.ManyToOne(type => artists_entity_1.Artists, artist => artist.nicknames),
    __metadata("design:type", artists_entity_1.Artists)
], Nicknames.prototype, "artist", void 0);
__decorate([
    typeorm_1.Column({
        comment: '启禁用状态',
    }),
    __metadata("design:type", Boolean)
], Nicknames.prototype, "status", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'timestamp',
        comment: '更新时间',
    }),
    __metadata("design:type", Date)
], Nicknames.prototype, "updateDate", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        comment: '创建时间',
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Nicknames.prototype, "createDate", void 0);
__decorate([
    typeorm_1.Column({
        type: 'timestamp',
        comment: '发布时间',
    }),
    __metadata("design:type", Date)
], Nicknames.prototype, "issueDate", void 0);
Nicknames = __decorate([
    typeorm_1.Entity()
], Nicknames);
exports.Nicknames = Nicknames;
//# sourceMappingURL=nicknames.entity.js.map