import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RestaurantBrand } from "./restaurant-brand.entity/restaurant-brand.entity";
import { In, Like, Repository } from "typeorm";
import { RestaurantBrandDTO } from "./restaurant-brand.dto/restaurant-brand.create.dto";
import { StoreProcedureResult } from "src/utils.common/utils.store-procedure-result.common/utils.store-procedure-result.common";

@Injectable()
export class RestaurantBrandService {
  constructor(
    @InjectRepository(RestaurantBrand)
    private restaurantBrandRepository: Repository<RestaurantBrand>
  ) {}

  async findWithRestaurantIdAndName(
    restaurantId: number,
    brandName: string
  ): Promise<RestaurantBrand> {
    const brand = await this.restaurantBrandRepository.findOne({
      where: {
        restaurant_id: restaurantId,
        name: brandName,
      },
    });

    return brand;
  }

  async findRestaurantBrandWithId(
    brandId: number,
    employeeId: number
  ): Promise<RestaurantBrand> {
    const brand = await this.restaurantBrandRepository.query(
      `
      CALL sp_g_restaurant_brand(?, ?, @c, @m);
      SELECT @c as status, @m as message;
    `,
      [employeeId, brandId]
    );

    return new StoreProcedureResult<RestaurantBrand>().getResultDetail(brand);
  }

  async create(
    employeeId: number,
    restaurantBrand: RestaurantBrandDTO
  ): Promise<RestaurantBrand> {
    let createdRestaurantBrand = await this.restaurantBrandRepository.query(
      `
      CALL sp_u_restaurant_brand_create(?, ?, ?, @c, @m);
      SELECT @c as status, @m as message;
    `,
      [employeeId, restaurantBrand.restaurant_id, restaurantBrand.name]
    );

    return new StoreProcedureResult<RestaurantBrand>().getResultDetail(
      createdRestaurantBrand
    );
  }

  async createMulti(
    employeeId: number,
    restaurantBrands: RestaurantBrandDTO[]
  ) {
    let createdRestaurantBrands = await this.restaurantBrandRepository.query(
      `
      CALL sp_u_restaurant_brands_create(?, ?, @c, @m);
      SELECT @c as status, @m as message;
    `,
      [employeeId, JSON.stringify(restaurantBrands)]
    );

    return new StoreProcedureResult<RestaurantBrand>().getResultList(
      createdRestaurantBrands
    );
  }

  async update(restaurantBrand: RestaurantBrand): Promise<RestaurantBrand> {
    return await this.restaurantBrandRepository.save(restaurantBrand);
  }

  async findAll(employeeId: number): Promise<RestaurantBrand[]> {
    let restaurantBrands = await this.restaurantBrandRepository.query(
      `
      CALL sp_g_restaurant_brands(?, @c, @m);
      SELECT @c as status, @m as message;
    `,
      [employeeId]
    );

    return new StoreProcedureResult<RestaurantBrand>().getResultList(
      restaurantBrands
    );
  }
}
