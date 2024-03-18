import { Repository } from "typeorm";
import { RestaurantDTO } from "./restaurant.dto/restaurant.create.dto";
import { Restaurant } from "./restaurant.entity/restaurant.entity";
export declare class RestaurantService {
    private restaurantRepository;
    constructor(restaurantRepository: Repository<Restaurant>);
    create(employeeId: number, restaurantDTO: RestaurantDTO): Promise<Restaurant>;
    createMulti(employeeId: number, restaurantDTO: RestaurantDTO[]): Promise<Restaurant[]>;
    findOneByName(name: string): Promise<Restaurant>;
    findOneById(restaurantId: number, employeeId: number): Promise<any>;
    findAll(employeeId: number): Promise<any>;
    updateName(employeeId: number, restaurantId: number, name: string): Promise<any>;
}
