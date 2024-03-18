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
exports.RestaurantController = void 0;
const common_1 = require("@nestjs/common");
const utils_decorators_common_1 = require("../../utils.common/utils.decorators.common/utils.decorators.common");
const utils_version_enum_1 = require("../../utils.common/utils.enum.common/utils.version.enum");
const utils_response_common_1 = require("../../utils.common/utils.response.common/utils.response.common");
const employee_entity_1 = require("../employee/employee.entity/employee.entity");
const restaurant_create_dto_1 = require("./restaurant.dto/restaurant.create.dto");
const restaurant_service_1 = require("./restaurant.service");
const swagger_1 = require("@nestjs/swagger");
const utils_swagger_response_1 = require("../../utils.common/utils.swagger.common/utils.swagger.response");
const restaurants_detail_response_1 = require("./restaurant.response/restaurants-detail.response");
const restaurants_response_1 = require("./restaurant.response/restaurants.response");
let RestaurantController = class RestaurantController {
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }
    async create(restaurantDTO, res, employee) {
        let response = new utils_response_common_1.ResponseData();
        let createdRestaurant = (await this.restaurantService.create(employee.id, restaurantDTO));
        if (!createdRestaurant) {
            response.setMessage(common_1.HttpStatus.BAD_REQUEST, "Tạo nhà hàng không thành công");
            return res.status(common_1.HttpStatus.OK).send(response);
        }
        response.setData(createdRestaurant);
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async update(restaurantDTO, res, id, employee) {
        let response = new utils_response_common_1.ResponseData();
        let updatedRestaurant = await this.restaurantService.updateName(employee.id, id, restaurantDTO.name);
        if (!updatedRestaurant) {
            response.setMessage(common_1.HttpStatus.BAD_REQUEST, "Cập nhật nhà hàng không thành công!");
            return res.status(common_1.HttpStatus.OK).send(response);
        }
        response.setData(new restaurants_detail_response_1.RestaurantDetailResponse(updatedRestaurant));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async createMulti(restaurantDTO, res, employee) {
        let response = new utils_response_common_1.ResponseData();
        let createdRestaurants = (await this.restaurantService.createMulti(employee.id, restaurantDTO));
        response.setData(new restaurants_response_1.RestaurantsResponse().mapToList(createdRestaurants));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async restaurantDetail(res, id, employee) {
        let response = new utils_response_common_1.ResponseData();
        let restaurant = await this.restaurantService.findOneById(id, employee.id);
        response.setData(new restaurants_detail_response_1.RestaurantDetailResponse(restaurant));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async findAll(res, employee) {
        let response = new utils_response_common_1.ResponseData();
        let restaurant = await this.restaurantService.findAll(employee.id);
        response.setData(new restaurants_response_1.RestaurantsResponse().mapToList(restaurant));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
};
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("RestaurantResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Tạo nhà hàng" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [restaurant_create_dto_1.RestaurantDTO, Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("/:id/update"),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("RestaurantResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Chỉnh sửa nhà hàng" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)("id")),
    __param(3, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [restaurant_create_dto_1.RestaurantDTO, Object, Number, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("/create-multi"),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("RestaurantResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Tạo nhiều nhà hàng" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "createMulti", null);
__decorate([
    (0, common_1.Get)("/:id"),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("RestaurantResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Chi tiết nhà hàng" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "restaurantDetail", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("RestaurantResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Danh sách nhà hàng" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "findAll", null);
RestaurantController = __decorate([
    (0, common_1.Controller)({
        version: utils_version_enum_1.VersionEnum.V2.toString(),
        path: "restaurants",
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [restaurant_service_1.RestaurantService])
], RestaurantController);
exports.RestaurantController = RestaurantController;
//# sourceMappingURL=restaurant.controller.js.map