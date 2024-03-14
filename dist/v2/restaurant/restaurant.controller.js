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
const utils_exception_common_1 = require("../../utils.common/utils.exceptions.common/utils.exception-common");
const utils_response_common_1 = require("../../utils.common/utils.response.common/utils.response.common");
const employee_entity_1 = require("../employee/employee.entity/employee.entity");
const restaurant_create_dto_1 = require("./restaurant.dto/restaurant.create.dto");
const restaurant_service_1 = require("./restaurant.service");
const swagger_1 = require("@nestjs/swagger");
let RestaurantController = class RestaurantController {
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }
    async create(restaurantDTO, res, employee) {
        let response = new utils_response_common_1.ResponseData();
        let restaurant = await this.restaurantService.findOneByName(restaurantDTO.name);
        if (restaurant) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Tên nhà hàng [${restaurantDTO.name}] này đã tồn tại!`), common_1.HttpStatus.OK);
        }
        await this.restaurantService.create(employee.id, restaurantDTO);
        return res.status(common_1.HttpStatus.OK).send(response);
    }
};
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.UseGuards)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [restaurant_create_dto_1.RestaurantDTO, Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "create", null);
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