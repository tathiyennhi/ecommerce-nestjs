import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Base {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    // unique: true,
    nullable: true,
  })
  description: string;
}
