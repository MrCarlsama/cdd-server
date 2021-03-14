import { ApiProperty } from '@nestjs/swagger';

export class ContentDTO {
  @ApiProperty()
  readonly nicknames: string[];
  @ApiProperty()
  readonly sourcePlatform: number;
  @ApiProperty()
  readonly sourceUrl: number;
  @ApiProperty()
  readonly status: boolean;
  @ApiProperty()
  readonly isAudit: boolean;
  @ApiProperty()
  readonly issueDate: Date;
}
