import { Tables } from "../tables.entity/tables.entity";

export class TablesResponse {
  id: number;
  employee_id: number;
  restaurant_id: number;
  restaurant_brand_id: number;
  area_id: number;
  name: string;
  created_at: Date;

  constructor(table?: Tables) {
    this.id = table?.id
    this.employee_id = table?.employee_id
    this.restaurant_id = table?.restaurant_id
    this.restaurant_brand_id = table?.restaurant_brand_id
    this.area_id = table?.area_id
    this.name = table?.name
    this.created_at = table?.created_at
  }

  mapToList(list: Tables[]) {
    const result = list.map((item) => (
      new TablesResponse(item)
    ))

    return result
  }
}
