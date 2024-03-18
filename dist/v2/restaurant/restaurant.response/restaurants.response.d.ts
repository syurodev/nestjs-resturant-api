import { Restaurant } from "../restaurant.entity/restaurant.entity";
export declare class RestaurantsResponse {
    id: number;
    employee_id: number;
    name: string;
    created_at: Date;
    constructor(restaurant?: Restaurant);
    mapToList(list: Restaurant[]): RestaurantsResponse[];
}
