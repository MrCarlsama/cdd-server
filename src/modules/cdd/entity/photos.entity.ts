import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Artists } from './artists.entity';
import { Nicknames } from './nicknames.entity';

// 来源
export enum SourcePlatform {
  upload = 1,
  weibo,
  twitter,
  instagram,
  other = 99,
}

@Entity()
export class Photos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: 'URL地址',
  })
  url: string;

  @Column({
    comment: '描述',
  })
  description: string;

  // 所属艺人
  @ManyToMany(
    type => Artists,
    artist => artist.photos,
  )
  artists: Artists[];

  @Column({
    type: 'enum',
    enum: SourcePlatform,
    comment: '源数据 平台',
    default: 99,
  })
  sourcePlatform: SourcePlatform;

  @Column({
    comment: '源数据 地址',
  })
  sourceUrl: string;

  @Column({
    comment: '启禁用状态',
    default: true,
  })
  status: boolean;

  @Column({
    comment: '审核状态',
    default: false,
  })
  isAudit: boolean;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateDate: Date;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createDate: Date;

  @Column({
    type: 'date',
    comment: '发布时间',
  })
  issueDate: Date;
}
