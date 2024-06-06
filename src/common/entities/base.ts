import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Base {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ nullable: true})
    description: string;

    @Column({ nullable: true})
    created_at: string;

    @Column({ nullable: true})
    updated_at: string;

    @Column({ nullable: true})
    updated_by: string;

    @Column({ nullable: true})
    created_by: string;
}
