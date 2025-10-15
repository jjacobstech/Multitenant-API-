import { Entity, Column, EntitySchema, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" }) // good to explicitly name the table
export class User {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 150, unique: true })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "int", nullable: true })
  age?: number;
}
