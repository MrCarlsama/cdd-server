import { ApiProperty } from '@nestjs/swagger';
import { SourcePlatform } from './entity/photos.entity';

export class ContentDTO {
  @ApiProperty()
  readonly nicknames: string[];
  @ApiProperty()
  readonly sourcePlatform: SourcePlatform;
  @ApiProperty()
  readonly sourceUrl: string;
  @ApiProperty()
  readonly status: true;
  @ApiProperty()
  readonly isAudit: false;
  @ApiProperty()
  readonly issueDate: Date;
}
export class ArtistsDTO {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly nameRoma: string;
  @ApiProperty()
  readonly status: boolean;
  @ApiProperty()
  readonly isAudit: boolean;
}
