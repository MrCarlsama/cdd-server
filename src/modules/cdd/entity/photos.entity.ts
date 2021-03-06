import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Artists } from './artists.entity';

// 来源
enum SourcePlatform {
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
  })
  sourcePlatform: SourcePlatform;

  @Column({
    comment: '源数据 地址',
  })
  sourceUrl: string;

  @Column({
    comment: '启禁用状态',
  })
  status: boolean;

  @Column({
    comment: '审核状态',
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
