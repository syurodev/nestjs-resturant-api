import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository, Table } from "typeorm";
import { Restaurant } from "../restaurant/restaurant.entity/restaurant.entity";
import { RestaurantBrand } from "../restaurant-brand/restaurant-brand.entity/restaurant-brand.entity";
import { Branches } from "../branches/branches.entity/branches.entity";
import { Areas } from "../areas/areas.entity/areas.entity";
import { Tables } from "../tables/tables.entity/tables.entity";

export type ExtendResponse = {
  id: number;
  name: string;
  created_at: Date;
  status: number;
  restaurant_brands: {
    total: number;
    list: {
      id: number;
      name: string;
      created_at: Date;
      status: number;
      branches: {
        total: number;
        list: {
          id: number;
          name: string;
          created_at: Date;
          status: number;
          areas: {
            total: number;
            list: {
              id: number;
              name: string;
              created_at: Date;
              status: number;
              tables: {
                total: number;
                list: {
                  id: number;
                  name: string;
                  created_at: Date;
                  status: number;
                }[];
              };
            }[];
          };
        }[];
      };
    }[];
  };
}[];

@Injectable()
export class ExtendService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(RestaurantBrand)
    private restaurantBrandRepository: Repository<RestaurantBrand>,
    @InjectRepository(Branches)
    private branchesRepository: Repository<Branches>,
    @InjectRepository(Areas)
    private areasRepository: Repository<Areas>,
    @InjectRepository(Tables)
    private tableRepository: Repository<Tables>
  ) {}

  async getRestaurantDetail(employeeId: number, status: number = -1) {
    let query: any = { employee_id: employeeId };
    let restaurants: Restaurant[] = [];
    let restaurantBrands: RestaurantBrand[] = [];
    let branches: Branches[] = [];
    let areas: Areas[] = [];
    let tables: Tables[] = [];
    // Chỉ thêm điều kiện status vào query nếu status > -1
    if (status > -1) {
      query.status = status;
    }

    restaurants = await this.restaurantRepository.findBy(query);

    if (restaurants.length > 0) {
      query.restaurant_id = In(restaurants.map((item) => item.id));
      restaurantBrands = await this.restaurantBrandRepository.findBy(query);
    }

    if (restaurantBrands.length > 0) {
      query.restaurant_brand_id = In(restaurantBrands.map((item) => item.id));
      branches = await this.branchesRepository.findBy(query);
    }

    if (branches.length > 0) {
      query.branch_id = In(branches.map((item) => item.id));
      areas = await this.areasRepository.findBy(query);
    }

    if (areas.length > 0) {
      query.area_id = In(areas.map((item) => item.id));
      if (query.branch_id) {
        delete query.branch_id;
      }
      tables = await this.tableRepository.findBy(query);
    }

    let result: ExtendResponse = restaurants.map((restaurant) => ({
      id: restaurant.id,
      name: restaurant.name,
      status: restaurant.status,
      created_at: restaurant.created_at,
      restaurant_brands: {
        total: filterRestaurantBrands(restaurantBrands, restaurant.id).length,
        list: filterRestaurantBrands(restaurantBrands, restaurant.id).map(
          (restaurantBrand) => ({
            id: restaurantBrand.id,
            name: restaurantBrand.name,
            status: restaurantBrand.status,
            created_at: restaurantBrand.created_at,
            branches: {
              total: filterBranches(branches, restaurant.id, restaurantBrand.id)
                .length,
              list: filterBranches(
                branches,
                restaurant.id,
                restaurantBrand.id
              ).map((branche) => ({
                id: branche.id,
                name: branche.name,
                status: branche.status,
                created_at: branche.created_at,
                areas: {
                  total: filterAreas(
                    areas,
                    restaurant.id,
                    restaurantBrand.id,
                    branche.id
                  ).length,
                  list: filterAreas(
                    areas,
                    restaurant.id,
                    restaurantBrand.id,
                    branche.id
                  ).map((area) => ({
                    id: area.id,
                    name: area.name,
                    status: area.status,
                    created_at: area.created_at,
                    tables: {
                      total: filterTables(
                        tables,
                        restaurant.id,
                        restaurantBrand.id,
                        area.id
                      ).length,
                      list: filterTables(
                        tables,
                        restaurant.id,
                        restaurantBrand.id,
                        area.id
                      ).map((table) => ({
                        id: table.id,
                        name: table.name,
                        status: table.status,
                        created_at: table.created_at,
                      })),
                    },
                  })),
                },
              })),
            },
          })
        ),
      },
    }));

    return result;
  }
}

const filterRestaurantBrands = (
  restaurantBrands: RestaurantBrand[],
  restaurantId: number
): RestaurantBrand[] => {
  return restaurantBrands.filter(
    (restaurantBrand) => restaurantBrand.restaurant_id === restaurantId
  );
};

const filterBranches = (
  branches: Branches[],
  restaurantId: number,
  restaurantBrandId: number
): Branches[] => {
  return branches.filter(
    (restaurantBrand) =>
      restaurantBrand.restaurant_id === restaurantId &&
      restaurantBrand.restaurant_brand_id === restaurantBrandId
  );
};

const filterAreas = (
  areas: Areas[],
  restaurantId: number,
  restaurantBrandId: number,
  brancheId: number
): Areas[] => {
  return areas.filter(
    (area) =>
      area.restaurant_id === restaurantId &&
      area.restaurant_brand_id === restaurantBrandId &&
      area.branch_id === brancheId
  );
};

const filterTables = (
  tables: Tables[],
  restaurantId: number,
  restaurantBrandId: number,
  areaId: number
): Tables[] => {
  return tables.filter(
    (table) =>
      table.restaurant_id === restaurantId &&
      table.restaurant_brand_id === restaurantBrandId &&
      table.area_id === areaId
  );
};
