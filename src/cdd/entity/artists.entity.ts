import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Dynamics } from './dynamics.entity';
import { Nicknames } from './nicknames.entity';
import { Photos } from './photos.entity';

// 艺人表
@Entity()
export class Artists {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '艺人名字',
  })
  name: string;

  @Column({
    comment: '名字 罗马音',
  })
  nameRoma: string;

  @Column({
    comment: '名字 日文',
  })
  nameJA: string;

  @Column({
    comment: '封面url',
  })
  coverUrl: string;

  // 图片集
  @ManyToMany(
    type => Photos,
    photo => photo.artists,
  )
  @JoinTable()
  photos: Photos[];

  // 其他昵称
  @OneToMany(
    type => Nicknames,
    nickname => nickname.artist,
  )
  nicknames: Nicknames[];

  // 发布的动态
  @ManyToMany(
    type => Dynamics,
    dynamic => dynamic.artists,
  )
  @JoinTable()
  dynamics: Dynamics[];

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
}
