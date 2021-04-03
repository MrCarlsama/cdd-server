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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const validation_pipe_1 = require("../../pipe/validation.pipe");
const task_dto_1 = require("./task.dto");
const task_service_1 = require("./task.service");
let TaskController = class TaskController {
    constructor(taskSerivce) {
        this.taskSerivce = taskSerivce;
    }
    execWeiboTask(data) {
        return this.taskSerivce.execGetWeiboUserContentsTask(data);
    }
};
__decorate([
    common_1.Post('/execWeiboTask'),
    swagger_1.ApiOperation({
        summary: '执行微博的当前用户博文',
    }),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.ExecWeiboTaskDTO]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "execWeiboTask", null);
TaskController = __decorate([
    swagger_1.ApiTags('TaskModule'),
    common_1.Controller('task'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map