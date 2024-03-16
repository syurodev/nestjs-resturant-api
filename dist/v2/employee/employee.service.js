"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const utils_generate_token_common_1 = require("../../utils.common/utils.generate-token.common/utils.generate-token.common");
const utils_handle_base64_common_1 = require("../../utils.common/utils.handle-base64.common/utils.handle-base64.common");
const typeorm_2 = require("typeorm");
const utils_password_common_1 = require("../../utils.common/utils.password.common/utils.password.common");
const employee_entity_1 = require("./employee.entity/employee.entity");
let EmployeeService = class EmployeeService {
    constructor(employeeRepository, jwtService) {
        this.employeeRepository = employeeRepository;
        this.jwtService = jwtService;
    }
    async findOne(id) {
        let existingEmployee = await this.employeeRepository.query("CALL phamtuanvu.sp_g_employee(?);", [
            id,
        ]);
        return existingEmployee[0][0];
    }
    async findAll() {
        const existingEmployee = await this.employeeRepository.query(`CALL phamtuanvu.sp_g_employees()`);
        return existingEmployee;
    }
    async findOneByPhone(phoneNumber) {
        return await this.employeeRepository.findOne({
            where: { phone_number: phoneNumber },
        });
    }
    async findOneByUsername(username) {
        return await this.employeeRepository.findOne({
            where: { username: username },
        });
    }
    async create(employeeDTO) {
        let employee = new employee_entity_1.Employee();
        employee.full_name = employeeDTO.full_name;
        employee.phone_number = employeeDTO.phone_number;
        employee.username = employeeDTO.username;
        employee.password = await utils_handle_base64_common_1.HandleBase64.decodePasswordBase64(employeeDTO.password);
        let generateToken = new utils_generate_token_common_1.GenerateToken(employee.username);
        employee.access_token = await this.jwtService.sign(JSON.stringify(generateToken));
        employee.password = String(await utils_password_common_1.Password.bcryptPassword(employee.password));
        await this.employeeRepository.save(employee);
        return employee;
    }
    async update(employee) {
        let updatedEmployee = await this.employeeRepository.query("CALL sp_u_employee(?, ?, ?, ?, @e, @m)", [
            employee.id,
            employee.full_name,
            employee.phone_number,
            employee.gender,
        ]);
        return updatedEmployee[0][0];
    }
    async updateStatus(employeeId, newStatus) {
        let updatedEmployee = await this.employeeRepository.query("CALL phamtuanvu.sp_u_employee_status(?, ?, @c, @m);", [employeeId, newStatus]);
        return updatedEmployee[0][0];
    }
};
EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map