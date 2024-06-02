import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Base {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    description: string;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;

    @Column()
    updated_by: string;

    @Column()
    created_by: string;
}
