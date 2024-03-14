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
exports.RestaurantBrandController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const utils_version_enum_1 = require("../../utils.common/utils.enum.common/utils.version.enum");
const utils_swagger_response_1 = require("../../utils.common/utils.swagger.common/utils.swagger.response");
const restaurant_brand_create_dto_1 = require("./restaurant-brand.dto/restaurant-brand.create.dto");
const utils_decorators_common_1 = require("../../utils.common/utils.decorators.common/utils.decorators.common");
const employee_entity_1 = require("../employee/employee.entity/employee.entity");
const restaurant_brand_service_1 = require("./restaurant-brand.service");
const utils_exception_common_1 = require("../../utils.common/utils.exceptions.common/utils.exception-common");
const utils_response_common_1 = require("../../utils.common/utils.response.common/utils.response.common");
const restaurant_brand_detail_response_1 = require("./restaurant-brand.response/restaurant-brand-detail.response");
const restaurant_brands_response_1 = require("./restaurant-brand.response/restaurant-brands.response");
let RestaurantBrandController = class RestaurantBrandController {
    constructor(restaurantBrandService) {
        this.restaurantBrandService = restaurantBrandService;
    }
    async create(restaurantBrandDTO, res, employee) {
        let response = new utils_response_common_1.ResponseData();
        let existingRestaurantBrand = await this.restaurantBrandService.findWithRestaurantIdAndName(restaurantBrandDTO.restaurant_id, restaurantBrandDTO.name);
        if (existingRestaurantBrand) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Tên thương hiệu [${restaurantBrandDTO.name}] này đã tồn tại!`), common_1.HttpStatus.OK);
        }
        let savedRestaurantBrand = await this.restaurantBrandService.create(employee.id, restaurantBrandDTO);
        if (!savedRestaurantBrand) {
            response.setMessage(400, "Tạo thương hiệu thất bại!");
            return res.status(common_1.HttpStatus.OK).send(response);
        }
        response.setData(new restaurant_brand_detail_response_1.RestaurantBrandDetailResponse(savedRestaurantBrand));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async createMulti(restaurantBrandDTO, res, employee) {
        let response = new utils_response_common_1.ResponseData();
        let existingRestaurantBrands = await this.restaurantBrandService.findNameArray(restaurantBrandDTO.map(item => item.restaurant_id), restaurantBrandDTO.map(item => item.name));
        if (existingRestaurantBrands && existingRestaurantBrands.length > 0) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Tên thương hiệu [${existingRestaurantBrands.map(item => item.name)}] này đã tồn tại!`), common_1.HttpStatus.OK);
        }
        let savedRestaurantBrand = await this.restaurantBrandService.create(employee.id, restaurantBrandDTO);
        if (!savedRestaurantBrand || savedRestaurantBrand.length === 0) {
            response.setMessage(common_1.HttpStatus.BAD_REQUEST, "Tạo thương hiệu thất bại!");
            return res.status(common_1.HttpStatus.OK).send(response);
        }
        response.setData(new restaurant_brands_response_1.RestaurantBrandsResponse().mapToList(savedRestaurantBrand));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async updateBrand(restaurantBrandDTO, res, id, employee) {
        let response = new utils_response_common_1.ResponseData();
        let existingRestaurantBrand = await this.restaurantBrandService.findRestaurantBrandWithId(id, employee.id);
        if (!existingRestaurantBrand) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Không tìm thấy thương hiệu!`), common_1.HttpStatus.OK);
        }
        existingRestaurantBrand.name = restaurantBrandDTO.name;
        existingRestaurantBrand.updated_at = new Date();
        let updatedRestaurantBrand = await this.restaurantBrandService.update(existingRestaurantBrand);
        if (!updatedRestaurantBrand) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Cập nhật thương hiệu không thành công!`), common_1.HttpStatus.OK);
        }
        ;
        response.setData(new restaurant_brand_detail_response_1.RestaurantBrandDetailResponse(updatedRestaurantBrand));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async brandDetail(res, id, employee) {
        let response = new utils_response_common_1.ResponseData();
        let existingRestaurantBrand = await this.restaurantBrandService.findRestaurantBrandWithId(id, employee.id);
        if (!existingRestaurantBrand) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Không tìm thấy thương hiệu!`), common_1.HttpStatus.OK);
        }
        response.setData(new restaurant_brand_detail_response_1.RestaurantBrandDetailResponse(existingRestaurantBrand));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async listBrand(res, employee) {
        let response = new utils_response_common_1.ResponseData();
        response.setData(new restaurant_brands_response_1.RestaurantBrandsResponse().mapToList(await this.restaurantBrandService.findAll(employee.id)));
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
                            $ref: (0, swagger_1.getSchemaPath)("RestaurantBrandResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Tạo thương hiệu" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [restaurant_brand_create_dto_1.RestaurantBrandDTO, Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], RestaurantBrandController.prototype, "create", null);
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
                            $ref: (0, swagger_1.getSchemaPath)("RestaurantBrandResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Tạo nhiều thương hiệu" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], RestaurantBrandController.prototype, "createMulti", null);
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
                            $ref: (0, swagger_1.getSchemaPath)("RestaurantBrandResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Chỉnh sửa thương hiệu" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)("id")),
    __param(3, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [restaurant_brand_create_dto_1.RestaurantBrandDTO, Object, Number, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], RestaurantBrandController.prototype, "updateBrand", null);
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
                            $ref: (0, swagger_1.getSchemaPath)("RestaurantBrandResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Chi tiết thương hiệu" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], RestaurantBrandController.prototype, "brandDetail", null);
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
                            $ref: (0, swagger_1.getSchemaPath)("RestaurantBrandResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Danh sách thương hiệu" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], RestaurantBrandController.prototype, "listBrand", null);
RestaurantBrandController = __decorate([
    (0, common_1.Controller)({
        version: utils_version_enum_1.VersionEnum.V1.toString(),
        path: "restaurant-brands",
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [restaurant_brand_service_1.RestaurantBrandService])
], RestaurantBrandController);
exports.RestaurantBrandController = RestaurantBrandController;
//# sourceMappingURL=restaurant-brand.controller.js.map