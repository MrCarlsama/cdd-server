import { ExecWeiboTaskDTO } from './task.dto';
import { TaskService } from './task.service';
export declare class TaskController {
    private readonly taskSerivce;
    constructor(taskSerivce: TaskService);
    execWeiboTask(data: ExecWeiboTaskDTO): string;
}
