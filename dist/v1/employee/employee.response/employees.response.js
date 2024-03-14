"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesResponse = void 0;
class EmployeesResponse {
    constructor(employee) {
        this.id = employee === null || employee === void 0 ? void 0 : employee.id;
        this.username = employee === null || employee === void 0 ? void 0 : employee.username;
        this.full_name = employee === null || employee === void 0 ? void 0 : employee.full_name;
        this.gender = employee === null || employee === void 0 ? void 0 : employee.gender;
        this.phone_number = employee === null || employee === void 0 ? void 0 : employee.phone_number;
        this.birthday = employee === null || employee === void 0 ? void 0 : employee.birthday;
    }
    mapToList(list) {
        const result = list.map((item) => (new EmployeesResponse(item)));
        return result;
    }
}
exports.EmployeesResponse = EmployeesResponse;
//# sourceMappingURL=employees.response.js.map