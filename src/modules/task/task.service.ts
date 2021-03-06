import { HttpService, Injectable } from '@nestjs/common';
import { ExecWeiboTaskDTO } from './task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly http: HttpService) {}

  /**
   * 执行爬虫微博任务
   */
  execGetWeiboUserContentsTask(data: ExecWeiboTaskDTO) {
    return '已提交执行任务';
  }
}
