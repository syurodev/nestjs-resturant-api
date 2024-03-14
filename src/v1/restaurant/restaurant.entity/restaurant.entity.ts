import { Areas } from "src/v1/areas/areas.entity/areas.entity";
import { Branches } from "src/v1/branches/branches.entity/branches.entity";
import { Employee } from "src/v1/employee/employee.entity/employee.entity";
import { RestaurantBrand } from "src/v1/restaurant-brand/restaurant-brand.entity/restaurant-brand.entity";
import { Tables } from "src/v1/tables/tables.entity/tables.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({
  name: "restaurants",
})
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  employee_id: number;

  @Column({ default: 1 })
  status: number;

  @Column({ default: "" })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @OneToMany(() => RestaurantBrand, (restaurant_brand) => restaurant_brand.restaurant_id)
  // brands: RestaurantBrand[]

  // @OneToMany(() => Branches, (branches) => branches.restaurant_id)
  // branches: Branches[]

  // @OneToMany(() => Areas, (areas) => areas.restaurant_id)
  // areas: Areas[]

  // @OneToMany(() => Tables, (tables) => tables.restaurant_id)
  // tables: Tables[]
}
