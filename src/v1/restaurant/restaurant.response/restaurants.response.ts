import { ApiProperty } from "@nestjs/swagger";
import { Restaurant } from "../restaurant.entity/restaurant.entity";

export class RestaurantsResponse {
  id: number;
  employee_id: number;
  name: string;
  created_at: Date;

  constructor(restaurant?: Restaurant) {
    this.id = restaurant?.id
    this.employee_id = restaurant?.employee_id
    this.name = restaurant?.name
    this.created_at = restaurant?.created_at
  }

  mapToList(list: Restaurant[]) {
    const result = list.map((item) => (
      new RestaurantsResponse(item)
    ))

    return result
  }
}
