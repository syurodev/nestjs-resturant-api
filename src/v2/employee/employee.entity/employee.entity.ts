import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({
  name: "employees",
})
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "" })
  username: string;

  @Column({ default: "" })
  full_name: string;

  @Column({ default: 0 })
  gender: number;

  @Column({ default: null })
  birthday: Date;

  @Column({ default: "" })
  phone_number: string;

  @Column({ default: "" })
  password: string;

  @Column({ default: "" })
  access_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
