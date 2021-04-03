"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CddModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const oss_module_1 = require("../../oss/oss.module");
const cdd_controller_1 = require("./cdd.controller");
const photos_service_1 = require("./photos.service");
const artists_service_1 = require("./artists.service");
const artists_entity_1 = require("./entity/artists.entity");
const dynamics_entity_1 = require("./entity/dynamics.entity");
const nicknames_entity_1 = require("./entity/nicknames.entity");
const photos_entity_1 = require("./entity/photos.entity");
const oss_service_1 = require("../../oss/oss.service");
let CddModule = class CddModule {
};
CddModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([artists_entity_1.Artists, dynamics_entity_1.Dynamics, nicknames_entity_1.Nicknames, photos_entity_1.Photos]),
            oss_module_1.OssModule,
            common_1.HttpModule,
        ],
        controllers: [cdd_controller_1.CddController],
        providers: [photos_service_1.PhotosService, artists_service_1.ArtistsService, oss_service_1.OssService],
    })
], CddModule);
exports.CddModule = CddModule;
//# sourceMappingURL=cdd.module.js.map