import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
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
    restaurant: RestaurantDTO | RestaurantDTO[]
  ): Promise<Restaurant | Restaurant[]> {
    let data;
    console.log(restaurant);
    if (Array.isArray(restaurant)) {
      data = restaurant.map((item) => ({
        ...item,
        employee_id: employeeId,
        created_at: new Date(),
        updated_at: new Date(),
      }));
    } else {
      data = {
        ...restaurant,
        name: restaurant.name,
        employee_id: employeeId,
        created_at: new Date(),
        updated_at: new Date(),
      };
    }
    return await this.restaurantRepository.save(data);
  }

  async findNameArray(names: string[]): Promise<Restaurant[]> {
    return await this.restaurantRepository.findBy({
      name: In(names),
    });
  }

  async findOneByName(name: string): Promise<Restaurant> {
    return await this.restaurantRepository.findOne({
      where: { name: name },
    });
  }

  async findOneById(id: number, employeeId: number): Promise<Restaurant> {
    return await this.restaurantRepository.findOne({
      where: { id: id, employee_id: employeeId },
    });
  }

  async findAll(employee_id: number): Promise<Restaurant[]> {
    // console.log(await this.restaurantRepository.find(({ relations: ["brands", "brands.branches", "brands.branches.areas", "brands.branches.areas.tables"] })))
    return await this.restaurantRepository.findBy({ employee_id: employee_id });
  }

  async update(restaurant: Restaurant): Promise<Restaurant> {
    return await this.restaurantRepository.save(restaurant);
  }
}
