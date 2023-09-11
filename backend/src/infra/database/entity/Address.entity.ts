import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_address')
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  user_id: number;

  @Column({
    nullable: false,
  })
  cep: string;

  @Column({
    nullable: true,
  })
  public_place: string;

  @Column({
    nullable: true,
  })
  complement: string;

  @Column({
    nullable: false,
  })
  neighborhood: string;

  @Column({
    nullable: false,
  })
  city: string;

  @Column({
    nullable: false,
  })
  uf: string;

  @Column({
    nullable: false,
  })
  created_at: Date;

  @Column({
    nullable: true,
  })
  updated_at: Date;
}
