"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModule = void 0;
const common_1 = require("@nestjs/common");
const restaurant_service_1 = require("./restaurant.service");
const restaurant_controller_1 = require("./restaurant.controller");
const restaurant_entity_1 = require("./restaurant.entity/restaurant.entity");
const typeorm_1 = require("@nestjs/typeorm");
const restaurant_brand_module_1 = require("../restaurant-brand/restaurant-brand.module");
let RestaurantModule = class RestaurantModule {
};
RestaurantModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([restaurant_entity_1.Restaurant]),
            restaurant_brand_module_1.RestaurantBrandModule,
        ],
        providers: [restaurant_service_1.RestaurantService],
        controllers: [restaurant_controller_1.RestaurantController],
    })
], RestaurantModule);
exports.RestaurantModule = RestaurantModule;
//# sourceMappingURL=restaurant.module.js.map