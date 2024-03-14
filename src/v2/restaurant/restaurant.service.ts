import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RestaurantDTO } from "./restaurant.dto/restaurant.create.dto";
import { Restaurant } from "./restaurant.entity/restaurant.entity";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>
  ) {}

  /**
   *
   * @param employeeId
   * @param restaurantDTO
   * @returns
   */
  async create(
    employeeId: number,
    restaurantDTO: RestaurantDTO
  ): Promise<Restaurant> {
    let restaurant: Restaurant = new Restaurant();

    restaurant.employee_id = employeeId;
    restaurant.name = restaurantDTO.name;

    await this.restaurantRepository.save(restaurant);
    return restaurant;
  }

  async findOneByName(name: string): Promise<Restaurant> {
    return await this.restaurantRepository.findOne({
      where: { name: name },
    });
  }

  async updateName(employeeId: number, restaurantId: number, name: string) {}
}
