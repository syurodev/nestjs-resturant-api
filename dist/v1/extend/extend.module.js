"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const extend_service_1 = require("./extend.service");
const extend_controller_1 = require("./extend.controller");
const restaurant_entity_1 = require("../restaurant/restaurant.entity/restaurant.entity");
const restaurant_brand_entity_1 = require("../restaurant-brand/restaurant-brand.entity/restaurant-brand.entity");
const branches_entity_1 = require("../branches/branches.entity/branches.entity");
const areas_entity_1 = require("../areas/areas.entity/areas.entity");
const tables_entity_1 = require("../tables/tables.entity/tables.entity");
let ExtendModule = class ExtendModule {
};
ExtendModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                restaurant_entity_1.Restaurant,
                restaurant_brand_entity_1.RestaurantBrand,
                branches_entity_1.Branches,
                areas_entity_1.Areas,
                tables_entity_1.Tables,
            ]),
        ],
        providers: [extend_service_1.ExtendService],
        controllers: [extend_controller_1.ExtendController],
    })
], ExtendModule);
exports.ExtendModule = ExtendModule;
//# sourceMappingURL=extend.module.js.map