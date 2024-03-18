import { RestaurantBrand } from "../restaurant-brand.entity/restaurant-brand.entity";

export class RestaurantBrandsResponse {
  id: number;
  employee_id: number;
  restaurant_id: number;
  name: string;
  created_at: Date;

  constructor(brand?: RestaurantBrand) {
    this.id = brand?.id
    this.employee_id = brand?.employee_id
    this.restaurant_id = brand?.restaurant_id
    this.name = brand?.name
    this.created_at = brand?.created_at
  }

  mapToList(list: RestaurantBrand[]) {
    const result = list.map((item) => (
      new RestaurantBrandsResponse(item)
    ))

    return result
  }
}
