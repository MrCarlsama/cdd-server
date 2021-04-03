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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CddController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const artists_service_1 = require("./artists.service");
const cdd_dto_1 = require("./cdd.dto");
const photos_service_1 = require("./photos.service");
const artists_entity_1 = require("./entity/artists.entity");
const passport_1 = require("@nestjs/passport");
let CddController = class CddController {
    constructor(artistsService, photosService) {
        this.artistsService = artistsService;
        this.photosService = photosService;
    }
    createPhotos({ data }) {
        return this.photosService.createPhotos(data);
    }
    deletePhotos(id) {
        return this.photosService.deletePhoto(id);
    }
    updatePhotos(id) { }
    getPhotos(query) {
        return this.photosService.getPhotos(query);
    }
    auditPhotos(data) {
        return this.photosService.auditPhotos(data);
    }
    exportPhotos(data) {
        console.log(data);
        return this.photosService.exportPhotos(data);
    }
    getPhotosByCreeper(data) {
        return this.photosService.getPhotosByCreeper(data);
    }
    createArtists(artists) {
        return this.artistsService.createArtists(artists);
    }
    deleteArtists(id) {
        return this.artistsService.deleteArtists(id);
    }
    updateArtists(id, artists) {
        return this.artistsService.updateArtists(id, artists);
    }
    getArtists(query) {
        return this.artistsService.getArtists(query);
    }
    getArtist(id) {
        return this.artistsService.getArtistById(id);
    }
    initializeArtists() {
        return this.artistsService.initializeArtists();
    }
    createNicknames() { }
    deleteNicknames(id) { }
    updateNicknames(id) { }
    getNicknames(id) { }
};
__decorate([
    common_1.Post('/photos'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CddController.prototype, "createPhotos", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Delete('/photos/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CddController.prototype, "deletePhotos", null);
__decorate([
    common_1.Patch('/photos/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CddController.prototype, "updatePhotos", null);
__decorate([
    common_1.Get('/photos'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CddController.prototype, "getPhotos", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post('/photos/audit'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CddController.prototype, "auditPhotos", null);
__decorate([
    common_1.Post('/photos/export'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CddController.prototype, "exportPhotos", null);
__decorate([
    common_1.Post('/photos/urls'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cdd_dto_1.UrlsDTO]),
    __metadata("design:returntype", void 0)
], CddController.prototype, "getPhotosByCreeper", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post('/artists'),
    swagger_1.ApiOperation({
        summary: '新增艺人信息',
    }),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cdd_dto_1.ArtistsDTO]),
    __metadata("design:returntype", void 0)
], CddController.prototype, "createArtists", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Delete('/artists/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CddController.prototype, "deleteArtists", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Patch('/artists/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, artists_entity_1.Artists]),
    __metadata("design:returntype", void 0)
], CddController.prototype, "updateArtists", null);
__decorate([
    common_1.Get('/artists'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CddController.prototype, "getArtists", null);
__decorate([
    common_1.Get('/artists/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CddController.prototype, "getArtist", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post('/artists/init'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CddController.prototype, "initializeArtists", null);
__decorate([
    common_1.Post('/nicknames'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CddController.prototype, "createNicknames", null);
__decorate([
    common_1.Delete('/nicknames/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CddController.prototype, "deleteNicknames", null);
__decorate([
    common_1.Patch('/nicknames/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CddController.prototype, "updateNicknames", null);
__decorate([
    common_1.Get('/nicknames/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CddController.prototype, "getNicknames", null);
CddController = __decorate([
    swagger_1.ApiTags('CddModule'),
    common_1.Controller('cdd'),
    __metadata("design:paramtypes", [artists_service_1.ArtistsService,
        photos_service_1.PhotosService])
], CddController);
exports.CddController = CddController;
//# sourceMappingURL=cdd.controller.js.map