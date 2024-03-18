import { Restaurant } from "../restaurant.entity/restaurant.entity";
export declare class RestaurantDetailResponse {
    id: number;
    name: string;
    status: number;
    created_at: Date;
    constructor(restaurant?: Restaurant);
}
