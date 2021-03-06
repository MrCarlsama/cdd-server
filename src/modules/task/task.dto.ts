import { ApiProperty } from '@nestjs/swagger';

export class ExecWeiboTaskDTO {
  @ApiProperty()
  readonly url: string;
  @ApiProperty()
  readonly pageIndex: number;
  @ApiProperty()
  readonly isAll: boolean;
}
