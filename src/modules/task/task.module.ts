import { HttpModule, Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [HttpModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
