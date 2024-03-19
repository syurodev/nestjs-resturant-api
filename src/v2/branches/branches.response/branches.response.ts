import { Branches } from "../branches.entity/branches.entity";

export class BranchesResponse {
  id: number;
  employee_id: number;
  restaurant_id: number;
  restaurant_brand_id: number;
  name: string;
  created_at: Date;

  constructor(branches?: Branches) {
    this.id = branches?.id;
    this.employee_id = branches?.employee_id;
    this.restaurant_id = branches?.restaurant_id;
    this.restaurant_brand_id = branches?.restaurant_brand_id;
    this.name = branches?.name;
    this.created_at = branches?.created_at;
  }

  mapToList(list: Branches[]) {
    // const result = list.map((item) => (
    //   new BranchesResponse(item)
    // ))

    return list;
  }
}
