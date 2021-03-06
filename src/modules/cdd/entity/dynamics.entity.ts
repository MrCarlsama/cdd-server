import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artists } from './artists.entity';

@Entity()
export class Dynamics {
  @PrimaryGeneratedColumn()
  id: number;

  // 所包含艺人
  @ManyToMany(
    type => Artists,
    artist => artist.dynamics,
  )
  artists: Artists[];

  // 图片
  // @ManyToMany
}
