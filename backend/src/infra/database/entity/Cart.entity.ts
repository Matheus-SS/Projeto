import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_cart')
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: false,
  })
  user_id: number;

  @Column({
    nullable: false,
  })
  product_id: string;

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
