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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const users_entity_1 = require("./entity/users.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(authService, usersRepository) {
        this.authService = authService;
        this.usersRepository = usersRepository;
    }
    async login(data) {
        const user = await this.usersRepository.findOne({
            username: data.username,
        });
        if (!user || user.password !== data.password) {
            throw new common_1.HttpException('账号或密码不对', 422);
        }
        const { accessToken: token } = await this.authService.login({
            username: user.username,
            id: user.id,
        });
        return {
            username: user.username,
            id: user.id,
            token,
        };
    }
    async register(data) {
        const isHasUser = await this.usersRepository.findOne({
            username: data.username,
        });
        console.log(isHasUser);
        if (isHasUser) {
            throw new common_1.HttpException('已存在相同名称', 422);
        }
        const user = new users_entity_1.Users();
        user.username = data.username;
        user.password = data.password;
        const resultUser = await this.usersRepository.save(user);
        const { accessToken: token } = await this.authService.login({
            username: resultUser.username,
            id: resultUser.id,
        });
        return {
            username: resultUser.username,
            id: resultUser.id,
            token,
        };
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(users_entity_1.Users)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map