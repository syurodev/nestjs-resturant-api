import { Repository } from "typeorm";
import { RestaurantDTO } from "./restaurant.dto/restaurant.create.dto";
import { Restaurant } from "./restaurant.entity/restaurant.entity";
export declare class RestaurantService {
    private restaurantRepository;
    constructor(restaurantRepository: Repository<Restaurant>);
    create(employeeId: number, restaurant: RestaurantDTO | RestaurantDTO[]): Promise<Restaurant | Restaurant[]>;
    findNameArray(names: string[]): Promise<Restaurant[]>;
    findOneByName(name: string): Promise<Restaurant>;
    findOneById(id: number, employeeId: number): Promise<Restaurant>;
    findAll(employee_id: number): Promise<Restaurant[]>;
    update(restaurant: Restaurant): Promise<Restaurant>;
}
