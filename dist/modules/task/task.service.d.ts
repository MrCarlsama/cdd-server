import { HttpService } from '@nestjs/common';
import { ExecWeiboTaskDTO } from './task.dto';
export declare class TaskService {
    private readonly http;
    constructor(http: HttpService);
    execGetWeiboUserContentsTask(data: ExecWeiboTaskDTO): string;
}
