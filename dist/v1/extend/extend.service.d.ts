import { Repository } from "typeorm";
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
export declare class ExtendService {
    private restaurantRepository;
    private restaurantBrandRepository;
    private branchesRepository;
    private areasRepository;
    private tableRepository;
    constructor(restaurantRepository: Repository<Restaurant>, restaurantBrandRepository: Repository<RestaurantBrand>, branchesRepository: Repository<Branches>, areasRepository: Repository<Areas>, tableRepository: Repository<Tables>);
    getRestaurantDetail(employeeId: number, status?: number): Promise<ExtendResponse>;
}
