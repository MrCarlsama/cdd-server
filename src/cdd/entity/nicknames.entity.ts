import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Artists } from './artists.entity';

@Entity()
export class Nicknames {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '标签昵称',
  })
  nickname: string;

  @ManyToOne(
    type => Artists,
    artist => artist.nicknames,
  )
  artist: Artists;

  @Column({
    comment: '启禁用状态',
  })
  status: boolean;

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
