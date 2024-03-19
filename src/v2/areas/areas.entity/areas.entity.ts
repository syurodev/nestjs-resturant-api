import { Branches } from "src/v1/branches/branches.entity/branches.entity";
import { Employee } from "src/v1/employee/employee.entity/employee.entity";
import { RestaurantBrand } from "src/v1/restaurant-brand/restaurant-brand.entity/restaurant-brand.entity";
import { Restaurant } from "src/v1/restaurant/restaurant.entity/restaurant.entity";
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
  name: "areas",
})
export class Areas extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  // @ManyToOne(() => Employee, (employee) => employee.areas)
  employee_id: number;

  @Column({ default: 0 })
  // @ManyToOne(() => Restaurant, (restaurant) => restaurant.areas)
  restaurant_id: number;

  @Column({ default: 1 })
  // @ManyToOne(() => RestaurantBrand, (brand) => brand.areas)
  restaurant_brand_id: number;

  @Column({ default: 1 })
  // @ManyToOne(() => Branches, (branch) => branch.areas)
  branch_id: number;

  @Column({ default: 1 })
  status: number;

  @Column({ default: "" })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @OneToMany(() => Tables, (tables) => tables.area_id)
  // tables: Tables[]
}
