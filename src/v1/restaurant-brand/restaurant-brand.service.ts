import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RestaurantBrand } from "./restaurant-brand.entity/restaurant-brand.entity";
import { In, Like, Repository } from "typeorm";
import { RestaurantBrandDTO } from "./restaurant-brand.dto/restaurant-brand.create.dto";

@Injectable()
export class RestaurantBrandService {
  constructor(
    @InjectRepository(RestaurantBrand)
    private restaurantBrandRepository: Repository<RestaurantBrand>
  ) { };

  async findWithRestaurantIdAndName(restaurantId: number, brandName: string): Promise<RestaurantBrand> {
    const brand = await this.restaurantBrandRepository.findOne({
      where: {
        restaurant_id: restaurantId,
        name: brandName
      }
    });

    return brand;
  }

  async findNameArray(
    restaurantIds: number[],
    names: string[]
  ): Promise<RestaurantBrand[]> {
    return await this.restaurantBrandRepository.findBy({
      restaurant_id: In(restaurantIds),
      name: In(names)
    });
  }

  async findRestaurantBrandWithId(brandId: number, employeeId: number): Promise<RestaurantBrand> {
    const brand = await this.restaurantBrandRepository.findOne({
      where: {
        id: brandId,
        employee_id: employeeId
      }
    });

    return brand;
  }

  async create(
    employeeId: number,
    restaurantBrand: RestaurantBrandDTO | RestaurantBrandDTO[]
  ): Promise<RestaurantBrand | RestaurantBrand[]> {
    let data;
    if (Array.isArray(restaurantBrand)) {
      data = restaurantBrand.map((item) => ({
        ...item,
        employee_id: employeeId,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    } else {
      data = {
        ...restaurantBrand,
        employee_id: employeeId,
        created_at: new Date(),
        updated_at: new Date(),
      }
    };

    return await this.restaurantBrandRepository.save(data);
  }

  async update(restaurantBrand: RestaurantBrand): Promise<RestaurantBrand> {
    return await this.restaurantBrandRepository.save(restaurantBrand);
  }

  async findAll(employeeId: number): Promise<RestaurantBrand[]> {
    return await this.restaurantBrandRepository.findBy({ employee_id: employeeId })
  }
}
