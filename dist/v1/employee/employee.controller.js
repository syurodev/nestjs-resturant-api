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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("./employee.service");
const employee_register_dto_1 = require("./employee.dto/employee-register.dto");
const utils_response_common_1 = require("../../utils.common/utils.response.common/utils.response.common");
const employee_entity_1 = require("./employee.entity/employee.entity");
const utils_exception_common_1 = require("../../utils.common/utils.exceptions.common/utils.exception-common");
const utils_version_enum_1 = require("../../utils.common/utils.enum.common/utils.version.enum");
const swagger_1 = require("@nestjs/swagger");
const utils_swagger_response_1 = require("../../utils.common/utils.swagger.common/utils.swagger.response");
const utils_decorators_common_1 = require("../../utils.common/utils.decorators.common/utils.decorators.common");
const employee_update_dto_1 = require("./employee.dto/employee-update.dto");
const employee_update_password_dto_1 = require("./employee.dto/employee-update-password.dto");
const utils_password_common_1 = require("../../utils.common/utils.password.common/utils.password.common");
const employee_detail_response_1 = require("./employee.response/employee-detail.response");
const employees_response_1 = require("./employee.response/employees.response");
const employee_update_status_1 = require("./employee.dto/employee-update-status");
const utils_handle_base64_common_1 = require("../../utils.common/utils.handle-base64.common/utils.handle-base64.common");
let EmployeeController = class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async create(employeeDTO, res) {
        let response = new utils_response_common_1.ResponseData();
        let employee = await this.employeeService.findOneByPhone(employeeDTO.phone_number);
        if (employee) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Số điện thoại [${employee.phone_number}] này đã tồn tại!`), common_1.HttpStatus.OK);
        }
        let newEmployee = new employee_entity_1.Employee();
        newEmployee.full_name = employeeDTO.full_name;
        newEmployee.phone_number = employeeDTO.phone_number;
        newEmployee.username = employeeDTO.username;
        newEmployee.password = await utils_handle_base64_common_1.HandleBase64.decodePasswordBase64(employeeDTO.password);
        let createdEmployee = await this.employeeService.create(newEmployee);
        if (!createdEmployee) {
            response.setMessage(common_1.HttpStatus.BAD_REQUEST, "Tạo nhân viên không thành công");
            return res.status(common_1.HttpStatus.BAD_REQUEST).send(response);
        }
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async updateEmployee(employeeUpdateDTO, res, employee) {
        let response = new utils_response_common_1.ResponseData();
        let existingEmployee = await this.employeeService.findOneById(employee.id);
        if (!existingEmployee) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Không tìm thấy nhân viên!`), common_1.HttpStatus.OK);
        }
        existingEmployee.full_name = employeeUpdateDTO.full_name;
        existingEmployee.gender = employeeUpdateDTO.gender;
        existingEmployee.phone_number = employeeUpdateDTO.phone_number;
        let updatedEmployee = await this.employeeService.update(existingEmployee);
        if (!updatedEmployee) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Cập nhật nhân viên không thành công!`), common_1.HttpStatus.OK);
        }
        response.setData(new employee_detail_response_1.EmployeeDetailResponse(updatedEmployee));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async updateEmployeePassword(employeeUpdatePasswordDTO, res, employee) {
        let response = new utils_response_common_1.ResponseData();
        let existingEmployee = await this.employeeService.findOneById(employee.id);
        if (!existingEmployee) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Không tìm thấy nhân viên!`), common_1.HttpStatus.OK);
        }
        let newPassword = await utils_handle_base64_common_1.HandleBase64.decodePasswordBase64(employeeUpdatePasswordDTO.new_password);
        let oldPassword = await utils_handle_base64_common_1.HandleBase64.decodePasswordBase64(employeeUpdatePasswordDTO.old_password);
        if (await utils_password_common_1.Password.comparePassword(oldPassword, existingEmployee.password)) {
            existingEmployee.password = await utils_password_common_1.Password.bcryptPassword(newPassword);
            let updatedEmployee = await this.employeeService.updatePassword(existingEmployee);
            if (updatedEmployee) {
                return res.status(common_1.HttpStatus.OK).send("Chỉnh sửa thành công");
            }
            else {
                response.setMessage(common_1.HttpStatus.BAD_REQUEST, "Chỉnh sửa thất bại");
                return res.status(common_1.HttpStatus.BAD_REQUEST).send(response);
            }
        }
        response.setMessage(common_1.HttpStatus.BAD_REQUEST, "Mật khẩu không chính xác!");
        return res.status(common_1.HttpStatus.BAD_REQUEST).send(response);
    }
    async updateStatus(employeeUpdateStatusDTO, res, employee, id) {
        let response = new utils_response_common_1.ResponseData();
        if (+employee.id !== +id) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Bạn không có quyền thay đổi trạng thái nhân viên này!`), common_1.HttpStatus.OK);
        }
        let existingEmployee = await this.employeeService.findOneById(employee.id);
        if (!existingEmployee) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Không tìm thấy nhân viên!`), common_1.HttpStatus.OK);
        }
        existingEmployee.status = employeeUpdateStatusDTO.status;
        let updatedEmployee = await this.employeeService.updateStatus(existingEmployee);
        if (updatedEmployee) {
            return res.status(common_1.HttpStatus.OK).send(response);
        }
        else {
            response.setMessage(400, "Chỉnh sửa thất bại");
            return res.status(common_1.HttpStatus.BAD_REQUEST).send(response);
        }
    }
    async employeeDetail(id, res) {
        let response = new utils_response_common_1.ResponseData();
        let existingEmployee = await this.employeeService.getEmployeeDetail(id);
        response.setData(new employee_detail_response_1.EmployeeDetailResponse(existingEmployee));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async employees(res) {
        let response = new utils_response_common_1.ResponseData();
        response.setData(new employees_response_1.EmployeesResponse().mapToList(await this.employeeService.getEmployees()));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
};
__decorate([
    (0, common_1.Post)("/register"),
    (0, common_1.UseGuards)(common_1.ValidationPipe),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("EmployeeResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Đăng kí tài khoản" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_register_dto_1.EmployeeDTO, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("/:id/update"),
    (0, common_1.UseGuards)(common_1.ValidationPipe),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("EmployeeResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Chỉnh sửa nhân viên" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_update_dto_1.EmployeeUpdateDTO, Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updateEmployee", null);
__decorate([
    (0, common_1.Post)(":id/update-password"),
    (0, common_1.UseGuards)(common_1.ValidationPipe),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("EmployeeResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Đổi mật khẩu" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_update_password_dto_1.EmployeeUpdatePasswordDTO, Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updateEmployeePassword", null);
__decorate([
    (0, common_1.Post)("/:id/update-status"),
    (0, common_1.UseGuards)(common_1.ValidationPipe),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("EmployeeResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Đổi trạng thái nhân viên" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __param(3, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_update_status_1.EmployeeUpdateStatusDTO, Object, employee_entity_1.Employee, Number]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)("/:id"),
    (0, common_1.UseGuards)(common_1.ValidationPipe),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("EmployeeResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Thông tin chi tiết nhân viên" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "employeeDetail", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(common_1.ValidationPipe),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("EmployeeResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Danh sách nhân viên" }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "employees", null);
EmployeeController = __decorate([
    (0, common_1.Controller)({
        version: utils_version_enum_1.VersionEnum.V1.toString(),
        path: "employees",
    }),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeController);
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee.controller.js.map