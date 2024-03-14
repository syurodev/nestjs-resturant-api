import { Areas } from "src/v1/areas/areas.entity/areas.entity";
import { Branches } from "src/v1/branches/branches.entity/branches.entity";
import { RestaurantBrand } from "src/v1/restaurant-brand/restaurant-brand.entity/restaurant-brand.entity";
import { Restaurant } from "src/v1/restaurant/restaurant.entity/restaurant.entity";
import { Tables } from "src/v1/tables/tables.entity/tables.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @Column({ default: 1 })
  status: number;

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();

  // @OneToMany(() => Restaurant, (restaurant) => restaurant.employee_id)
  // restaurants: Restaurant[]

  // @OneToMany(() => RestaurantBrand, (brands) => brands.employee_id)
  // brands: RestaurantBrand[]

  // @OneToMany(() => Branches, (branches) => branches.employee_id)
  // branches: Branches[]

  // @OneToMany(() => Areas, (areas) => areas.employee_id)
  // areas: Areas[]

  // @OneToMany(() => Tables, (tables) => tables.employee_id)
  // tables: Tables[]
}
