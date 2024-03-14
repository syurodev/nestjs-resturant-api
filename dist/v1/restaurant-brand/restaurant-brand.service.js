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
exports.RestaurantBrandService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const restaurant_brand_entity_1 = require("./restaurant-brand.entity/restaurant-brand.entity");
const typeorm_2 = require("typeorm");
let RestaurantBrandService = class RestaurantBrandService {
    constructor(restaurantBrandRepository) {
        this.restaurantBrandRepository = restaurantBrandRepository;
    }
    ;
    async findWithRestaurantIdAndName(restaurantId, brandName) {
        const brand = await this.restaurantBrandRepository.findOne({
            where: {
                restaurant_id: restaurantId,
                name: brandName
            }
        });
        return brand;
    }
    async findNameArray(restaurantIds, names) {
        return await this.restaurantBrandRepository.findBy({
            restaurant_id: (0, typeorm_2.In)(restaurantIds),
            name: (0, typeorm_2.In)(names)
        });
    }
    async findRestaurantBrandWithId(brandId, employeeId) {
        const brand = await this.restaurantBrandRepository.findOne({
            where: {
                id: brandId,
                employee_id: employeeId
            }
        });
        return brand;
    }
    async create(employeeId, restaurantBrand) {
        let data;
        if (Array.isArray(restaurantBrand)) {
            data = restaurantBrand.map((item) => (Object.assign(Object.assign({}, item), { employee_id: employeeId, created_at: new Date(), updated_at: new Date() })));
        }
        else {
            data = Object.assign(Object.assign({}, restaurantBrand), { employee_id: employeeId, created_at: new Date(), updated_at: new Date() });
        }
        ;
        return await this.restaurantBrandRepository.save(data);
    }
    async update(restaurantBrand) {
        return await this.restaurantBrandRepository.save(restaurantBrand);
    }
    async findAll(employeeId) {
        return await this.restaurantBrandRepository.findBy({ employee_id: employeeId });
    }
};
RestaurantBrandService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_brand_entity_1.RestaurantBrand)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RestaurantBrandService);
exports.RestaurantBrandService = RestaurantBrandService;
//# sourceMappingURL=restaurant-brand.service.js.map