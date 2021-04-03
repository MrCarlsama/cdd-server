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
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("./lib/logger");
const line = '-'.repeat(50);
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const { logger } = this;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let errorLog = exception;
        let code = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let error = 'Internal Server Error';
        if (exception instanceof common_1.HttpException) {
            const res = exception.getResponse();
            code = exception.getStatus();
            error = exception.message;
            if (code === 401) {
                error = '权限不足或过期';
            }
        }
        else {
            logger.error(errorLog, '服务运行错误');
        }
        const resJson = { code, error, isSuccess: false };
        logger.error(resJson, '响应错误');
        logger.log(line, '请求结束');
        response.status(code).json(resJson);
    }
};
HttpExceptionFilter = __decorate([
    common_1.Catch(),
    __metadata("design:paramtypes", [logger_1.MyLogger])
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map