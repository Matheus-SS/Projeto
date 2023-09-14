import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

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
    default: () => `datetime('now','localtime')`, // para sqlite gerar data automaticamente
  })
  created_at: Date;
}
