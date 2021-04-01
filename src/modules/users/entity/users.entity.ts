import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '账号',
  })
  username: string;

  @Column({
    comment: '密码',
  })
  password: string;
}
