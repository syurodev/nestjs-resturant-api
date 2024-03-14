import { Areas } from "../areas.entity/areas.entity";

export class AreasResponse {
  id: number;
  employee_id: number;
  restaurant_id: number;
  restaurant_brand_id: number;
  branch_id: number;
  name: string;
  created_at: Date;

  constructor(areas?: Areas) {
    this.id = areas?.id
    this.employee_id = areas?.employee_id
    this.restaurant_id = areas?.restaurant_id
    this.restaurant_brand_id = areas?.restaurant_brand_id
    this.branch_id = areas?.branch_id
    this.name = areas?.name
    this.created_at = areas?.created_at
  }

  mapToList(list: Areas[]) {
    const result = list.map((item) => (
      new AreasResponse(item)
    ))

    return result
  }
}
