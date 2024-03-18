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
exports.RestaurantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurant_entity_1 = require("./restaurant.entity/restaurant.entity");
const utils_store_procedure_result_common_1 = require("../../utils.common/utils.store-procedure-result.common/utils.store-procedure-result.common");
let RestaurantService = class RestaurantService {
    constructor(restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }
    async create(employeeId, restaurantDTO) {
        let createdRestaurant = await this.restaurantRepository.query(`
          CALL sp_u_restaurant_create(?, ?, @c, @m);
          SELECT @c as status, @m as message;
        `, [employeeId, restaurantDTO.name]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultDetail(createdRestaurant);
    }
    async createMulti(employeeId, restaurantDTO) {
        let createdRestaurant = await this.restaurantRepository.query(`
          CALL sp_u_restaurants_create(?, ?, @c, @m);
          SELECT @c as status, @m as message;
        `, [employeeId, JSON.stringify(restaurantDTO)]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultList(createdRestaurant);
    }
    async findOneByName(name) {
        return await this.restaurantRepository.findOne({
            where: { name: name },
        });
    }
    async findOneById(restaurantId, employeeId) {
        let existingEmployee = await this.restaurantRepository.query(`
          CALL sp_g_restaurant(?, ?, @c, @m);
          SELECT @c as status, @m as message;
        `, [restaurantId, employeeId]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultDetail(existingEmployee);
    }
    async findAll(employeeId) {
        let existingEmployee = await this.restaurantRepository.query(`
          CALL sp_g_restaurants(?, @c, @m);
          SELECT @c as status, @m as message;
        `, [employeeId]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultList(existingEmployee);
    }
    async updateName(employeeId, restaurantId, name) {
        let updatedRestaurant = await this.restaurantRepository.query(`
          CALL sp_u_restaunant_name(?, ?, ?, @c, @m);
          SELECT @c as status, @m as message;
        `, [employeeId, restaurantId, name]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultDetail(updatedRestaurant);
    }
};
RestaurantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RestaurantService);
exports.RestaurantService = RestaurantService;
//# sourceMappingURL=restaurant.service.js.map