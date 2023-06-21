import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity('tbl_session')
export class Session extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column({
    nullable: false,
  })
  user_id: number;

  @Column({
    nullable: false,
    name: 'created_at',
  })
  created_at: Date;
}
