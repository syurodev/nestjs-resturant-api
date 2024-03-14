import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({
  name: "branches",
})
export class Branches extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  // @ManyToOne(() => Employee, (employee) => employee.branches)
  employee_id: number;

  @Column({ default: 1 })
  // @ManyToOne(() => Restaurant, (restaurant) => restaurant.branches)
  restaurant_id: number;

  @Column({ default: 1 })
  // @ManyToOne(() => RestaurantBrand, (brand) => brand.branches)
  restaurant_brand_id: number;

  @Column({ default: 1 })
  status: number;

  @Column({ default: "" })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @OneToMany(() => Areas, (areas) => areas.branch_id)
  // areas: Areas[]
}
