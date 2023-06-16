import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    nullable: false,
  })
  username: string;

  @Column({
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    length: 50,
    nullable: false,
  })
  password: string;
}
