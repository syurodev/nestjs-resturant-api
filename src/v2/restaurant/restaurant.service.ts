import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RestaurantDTO } from "./restaurant.dto/restaurant.create.dto";
import { Restaurant } from "./restaurant.entity/restaurant.entity";
import { StoreProcedureResult } from "src/utils.common/utils.store-procedure-result.common/utils.store-procedure-result.common";

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
    let createdRestaurant: any = await this.restaurantRepository.query(
      `
          CALL sp_u_restaurant_create(?, ?, @c, @m);
          SELECT @c as status, @m as message;
        `,
      [employeeId, restaurantDTO.name]
    );
    return new StoreProcedureResult<Restaurant>().getResultDetail(
      createdRestaurant
    );
  }

  async createMulti(
    employeeId: number,
    restaurantDTO: RestaurantDTO[]
  ): Promise<Restaurant[]> {
    let createdRestaurant: any = await this.restaurantRepository.query(
      `
          CALL sp_u_restaurants_create(?, ?, @c, @m);
          SELECT @c as status, @m as message;
        `,
      [employeeId, JSON.stringify(restaurantDTO)]
    );

    return new StoreProcedureResult<Restaurant>().getResultList(
      createdRestaurant
    );
  }

  async findOneByName(name: string): Promise<Restaurant> {
    return await this.restaurantRepository.findOne({
      where: { name: name },
    });
  }

  async findOneById(restaurantId: number, employeeId: number) {
    let existingEmployee: [ResultSetHeader, [Restaurant]] =
      await this.restaurantRepository.query(
        `
          CALL sp_g_restaurant(?, ?, @c, @m);
          SELECT @c as status, @m as message;
        `,
        [restaurantId, employeeId]
      );

    return new StoreProcedureResult<Restaurant>().getResultDetail(
      existingEmployee
    );
  }

  async findAll(employeeId: number) {
    let existingEmployee: [ResultSetHeader, [Restaurant]] =
      await this.restaurantRepository.query(
        `
          CALL sp_g_restaurants(?, @c, @m);
          SELECT @c as status, @m as message;
        `,
        [employeeId]
      );

    return new StoreProcedureResult<Restaurant>().getResultList(
      existingEmployee
    );
  }

  async updateName(employeeId: number, restaurantId: number, name: string) {
    let updatedRestaurant = await this.restaurantRepository.query(
      `
          CALL sp_u_restaunant_name(?, ?, ?, @c, @m);
          SELECT @c as status, @m as message;
        `,
      [employeeId, restaurantId, name]
    );
    return new StoreProcedureResult<Restaurant>().getResultDetail(
      updatedRestaurant
    );
  }
}
