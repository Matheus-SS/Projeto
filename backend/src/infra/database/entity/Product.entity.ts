import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity('tbl_product')
export class Product extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    nullable: false,
  })
  price: number;

  @Column({
    nullable: false,
  })
  quantity: number;

  @Column({
    nullable: false,
  })
  created_at: Date;

  @Column({
    nullable: true,
  })
  updated_at: Date;
}
