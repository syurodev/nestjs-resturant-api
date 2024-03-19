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
exports.AreasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const utils_version_enum_1 = require("../../utils.common/utils.enum.common/utils.version.enum");
const utils_swagger_response_1 = require("../../utils.common/utils.swagger.common/utils.swagger.response");
const utils_decorators_common_1 = require("../../utils.common/utils.decorators.common/utils.decorators.common");
const employee_entity_1 = require("../employee/employee.entity/employee.entity");
const utils_response_common_1 = require("../../utils.common/utils.response.common/utils.response.common");
const areas_service_1 = require("./areas.service");
const area_create_dto_1 = require("./areas.dto/area-create.dto");
const area_detail_response_1 = require("./areas.response/area-detail.response");
const area_update_dto_1 = require("./areas.dto/area-update.dto");
const areas_response_1 = require("./areas.response/areas.response");
let AreasController = class AreasController {
    constructor(areasService) {
        this.areasService = areasService;
    }
    async create(areaCreateDto, res, employee) {
        const response = new utils_response_common_1.ResponseData();
        const savedArea = await this.areasService.create(employee.id, areaCreateDto);
        response.setData(new area_detail_response_1.AreaDetailResponse(savedArea));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async createMulti(areaCreateDto, res, employee) {
        let response = new utils_response_common_1.ResponseData();
        let savedArea = (await this.areasService.createMulti(employee.id, areaCreateDto));
        response.setData(new areas_response_1.AreasResponse().mapToList(savedArea));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async update(areaUpdateDTO, res, id, employee) {
        let response = new utils_response_common_1.ResponseData();
        const updatedArea = await this.areasService.update(employee.id, id, areaUpdateDTO);
        response.setData(new area_detail_response_1.AreaDetailResponse(updatedArea));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async detail(id, res, employee) {
        let response = new utils_response_common_1.ResponseData();
        let existingArea = await this.areasService.findWithId(id, employee.id);
        response.setData(new area_detail_response_1.AreaDetailResponse(existingArea));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async areas(res, employee) {
        let response = new utils_response_common_1.ResponseData();
        let areas = await this.areasService.findAll(employee.id);
        response.setData(new areas_response_1.AreasResponse().mapToList(areas));
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
                            $ref: (0, swagger_1.getSchemaPath)("AreaResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Tạo khu vực" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_create_dto_1.AreaCreateDTO, Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], AreasController.prototype, "create", null);
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
                            $ref: (0, swagger_1.getSchemaPath)("AreaResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Tạo nhiều khu vực" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], AreasController.prototype, "createMulti", null);
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
                            $ref: (0, swagger_1.getSchemaPath)("AreaResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Chỉnh sửa khu vực" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)("id")),
    __param(3, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [area_update_dto_1.AreaUpdateDTO, Object, Number, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], AreasController.prototype, "update", null);
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
                            $ref: (0, swagger_1.getSchemaPath)("AreaResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Chi tiết khu vực" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], AreasController.prototype, "detail", null);
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
                            $ref: (0, swagger_1.getSchemaPath)("AreaResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Danh sách khu vực" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], AreasController.prototype, "areas", null);
AreasController = __decorate([
    (0, common_1.Controller)({
        version: utils_version_enum_1.VersionEnum.V2.toString(),
        path: "areas",
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [areas_service_1.AreasService])
], AreasController);
exports.AreasController = AreasController;
//# sourceMappingURL=areas.controller.js.map