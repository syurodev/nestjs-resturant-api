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
exports.TablesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const utils_version_enum_1 = require("../../utils.common/utils.enum.common/utils.version.enum");
const utils_swagger_response_1 = require("../../utils.common/utils.swagger.common/utils.swagger.response");
const utils_decorators_common_1 = require("../../utils.common/utils.decorators.common/utils.decorators.common");
const employee_entity_1 = require("../employee/employee.entity/employee.entity");
const utils_exception_common_1 = require("../../utils.common/utils.exceptions.common/utils.exception-common");
const utils_response_common_1 = require("../../utils.common/utils.response.common/utils.response.common");
const tables_service_1 = require("./tables.service");
const table_create_dto_1 = require("./tables.dto/table-create.dto");
const table_detail_response_1 = require("./tables.response/table-detail.response");
const table_update_dto_1 = require("./tables.dto/table-update.dto");
const tables_response_1 = require("./tables.response/tables.response");
let TablesController = class TablesController {
    constructor(tablesService) {
        this.tablesService = tablesService;
    }
    async create(tableCreateDto, res, employee) {
        let response = new utils_response_common_1.ResponseData();
        let existingTable = await this.tablesService.findWithName(tableCreateDto.restaurant_id, tableCreateDto.restaurant_brand_id, tableCreateDto.area_id, tableCreateDto.name);
        if (existingTable) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Tên bàn [${tableCreateDto.name}] này đã tồn tại!`), common_1.HttpStatus.OK);
        }
        const savedTable = await this.tablesService.create(employee.id, tableCreateDto);
        if (!savedTable) {
            response.setMessage(400, "Tạo bàn thất bại!");
            return res.status(common_1.HttpStatus.OK).send(response);
        }
        response.setData(new table_detail_response_1.TableDetailResponse(savedTable));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async createMulti(tableCreateDto, res, employee) {
        const response = new utils_response_common_1.ResponseData();
        const existingTables = await this.tablesService.findNameArray(tableCreateDto.map(item => item.restaurant_id), tableCreateDto.map(item => item.restaurant_brand_id), tableCreateDto.map(item => item.area_id), tableCreateDto.map(item => item.name));
        if (existingTables && existingTables.length > 0) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Tên bàn [${existingTables.map(item => item.name)}] này đã tồn tại!`), common_1.HttpStatus.OK);
        }
        const savedTables = await this.tablesService.create(employee.id, tableCreateDto);
        if (!savedTables || savedTables.length === 0) {
            response.setMessage(400, "Tạo bàn thất bại!");
            return res.status(common_1.HttpStatus.OK).send(response);
        }
        response.setData(new tables_response_1.TablesResponse().mapToList(savedTables));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async updateBrand(tableUpdateDto, res, id, employee) {
        let response = new utils_response_common_1.ResponseData();
        let existingTable = await this.tablesService.findWithId(id, employee.id);
        if (!existingTable) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Không tìm thấy bàn!`), common_1.HttpStatus.OK);
        }
        let existingTableName = await this.tablesService.findWithName(existingTable.restaurant_id, existingTable.restaurant_brand_id, existingTable.area_id, tableUpdateDto.name);
        if (existingTableName) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Tên bàn [${tableUpdateDto.name}] đã tồn tại!`), common_1.HttpStatus.OK);
        }
        existingTable.name = tableUpdateDto.name;
        existingTable.updated_at = new Date();
        const updatedTable = await this.tablesService.update(existingTable);
        if (!updatedTable) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Cập nhật bàn không thành công!`), common_1.HttpStatus.OK);
        }
        ;
        response.setData(new table_detail_response_1.TableDetailResponse(updatedTable));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async brancheDetail(id, res, employee) {
        const response = new utils_response_common_1.ResponseData();
        const existingTable = await this.tablesService.findWithId(id, employee.id);
        if (!existingTable) {
            response.setMessage(404, "Không tìm thấy bàn");
            return res.status(common_1.HttpStatus.OK).send(response);
        }
        response.setData(new table_detail_response_1.TableDetailResponse(existingTable));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async branches(res, employee) {
        const response = new utils_response_common_1.ResponseData();
        response.setData(new tables_response_1.TablesResponse().mapToList(await this.tablesService.findAll(employee.id)));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
};
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.UseGuards)(common_1.ValidationPipe),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("TableResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Tạo bàn" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [table_create_dto_1.TableCreateDTO, Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("/create-multi"),
    (0, common_1.UseGuards)(common_1.ValidationPipe),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("TableResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Tạo nhiều bàn" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "createMulti", null);
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
                            $ref: (0, swagger_1.getSchemaPath)("TableResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Chỉnh sửa bàn" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)("id")),
    __param(3, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [table_update_dto_1.TableUpdateDTO, Object, Number, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "updateBrand", null);
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
                            $ref: (0, swagger_1.getSchemaPath)("TableResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Chi tiết bàn" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "brancheDetail", null);
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
                            $ref: (0, swagger_1.getSchemaPath)("TableResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Danh sách bàn" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "branches", null);
TablesController = __decorate([
    (0, common_1.Controller)({
        version: utils_version_enum_1.VersionEnum.V1.toString(),
        path: "tables",
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [tables_service_1.TablesService])
], TablesController);
exports.TablesController = TablesController;
//# sourceMappingURL=tables.controller.js.map