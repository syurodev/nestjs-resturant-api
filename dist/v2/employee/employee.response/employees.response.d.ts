import { Employee } from "../employee.entity/employee.entity";
export declare class EmployeesResponse {
    id: number;
    username: string;
    full_name: string;
    gender: number;
    phone_number: string;
    birthday: Date;
    constructor(employee?: Employee);
    mapToList(list: Employee[]): EmployeesResponse[];
}
