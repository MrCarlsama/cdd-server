import { HttpModule, Module } from '@nestjs/common';
import { OssController } from './oss.controller';
import { OssService } from './oss.service';

@Module({
  imports: [HttpModule],
  controllers: [OssController],
  providers: [OssService],
})
export class OssModule {}
