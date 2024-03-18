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
const utils_store_procedure_result_common_1 = require("../../utils.common/utils.store-procedure-result.common/utils.store-procedure-result.common");
let RestaurantBrandService = class RestaurantBrandService {
    constructor(restaurantBrandRepository) {
        this.restaurantBrandRepository = restaurantBrandRepository;
    }
    async findWithRestaurantIdAndName(restaurantId, brandName) {
        const brand = await this.restaurantBrandRepository.findOne({
            where: {
                restaurant_id: restaurantId,
                name: brandName,
            },
        });
        return brand;
    }
    async findRestaurantBrandWithId(brandId, employeeId) {
        const brand = await this.restaurantBrandRepository.query(`
      CALL sp_g_restaurant_brand(?, ?, @c, @m);
      SELECT @c as status, @m as message;
    `, [employeeId, brandId]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultDetail(brand);
    }
    async create(employeeId, restaurantBrand) {
        let createdRestaurantBrand = await this.restaurantBrandRepository.query(`
      CALL sp_u_restaurant_brand_create(?, ?, ?, @c, @m);
      SELECT @c as status, @m as message;
    `, [employeeId, restaurantBrand.restaurant_id, restaurantBrand.name]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultDetail(createdRestaurantBrand);
    }
    async createMulti(employeeId, restaurantBrands) {
        let createdRestaurantBrands = await this.restaurantBrandRepository.query(`
      CALL sp_u_restaurant_brands_create(?, ?, @c, @m);
      SELECT @c as status, @m as message;
    `, [employeeId, JSON.stringify(restaurantBrands)]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultList(createdRestaurantBrands);
    }
    async update(restaurantBrand) {
        return await this.restaurantBrandRepository.save(restaurantBrand);
    }
    async findAll(employeeId) {
        let restaurantBrands = await this.restaurantBrandRepository.query(`
      CALL sp_g_restaurant_brands(?, @c, @m);
      SELECT @c as status, @m as message;
    `, [employeeId]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultList(restaurantBrands);
    }
};
RestaurantBrandService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_brand_entity_1.RestaurantBrand)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RestaurantBrandService);
exports.RestaurantBrandService = RestaurantBrandService;
//# sourceMappingURL=restaurant-brand.service.js.map