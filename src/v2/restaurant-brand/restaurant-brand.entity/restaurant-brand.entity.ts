import { Areas } from "src/v1/areas/areas.entity/areas.entity";
import { Branches } from "src/v1/branches/branches.entity/branches.entity";
import { Employee } from "src/v1/employee/employee.entity/employee.entity";
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
  name: "restaurant_brands",
})
export class RestaurantBrand extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  // @ManyToOne(() => Employee, employee => employee.brands)
  employee_id: number;

  @Column({ default: 1 })
  // @ManyToOne(() => Restaurant, restaurant => restaurant.brands)
  restaurant_id: number;

  @Column({ default: 1 })
  status: number;

  // @OneToMany(() => Branches, branches => branches.restaurant_brand_id)
  // branches: Branches[];

  // @OneToMany(() => Tables, tables => tables.restaurant_brand_id)
  // tables: Tables[];

  // @OneToMany(() => Areas, areas => areas.restaurant_brand_id)
  // areas: Areas[];

  @Column({ default: "" })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
