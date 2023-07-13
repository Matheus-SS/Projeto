import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_logs')
export class Log extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  request: string;

  @Column({
    nullable: true,
  })
  path: string;

  @Column({
    nullable: true,
  })
  method: string;

  @Column({
    nullable: true,
  })
  status_code: number;

  @Column({
    nullable: true,
  })
  response_time: number;

  @Column({
    nullable: true,
  })
  response: string;

  @Column({
    nullable: false,
  })
  created_at: Date;
}
