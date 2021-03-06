import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { ExecWeiboTaskDTO } from './task.dto';
import { TaskService } from './task.service';

@ApiTags('TaskModule')
@Controller('task')
export class TaskController {
  constructor(private readonly taskSerivce: TaskService) {}

  @Post('/execWeiboTask')
  @ApiOperation({
    summary: '执行微博的当前用户博文',
  })
  @UsePipes(new ValidationPipe())
  execWeiboTask(@Body() data: ExecWeiboTaskDTO) {
    return this.taskSerivce.execGetWeiboUserContentsTask(data);
  }
}
