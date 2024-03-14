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
let RestaurantService = class RestaurantService {
    constructor(restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }
    async create(employeeId, restaurant) {
        let data;
        console.log(restaurant);
        if (Array.isArray(restaurant)) {
            data = restaurant.map((item) => (Object.assign(Object.assign({}, item), { employee_id: employeeId, created_at: new Date(), updated_at: new Date() })));
        }
        else {
            data = Object.assign(Object.assign({}, restaurant), { name: restaurant.name, employee_id: employeeId, created_at: new Date(), updated_at: new Date() });
        }
        return await this.restaurantRepository.save(data);
    }
    async findNameArray(names) {
        return await this.restaurantRepository.findBy({
            name: (0, typeorm_2.In)(names),
        });
    }
    async findOneByName(name) {
        return await this.restaurantRepository.findOne({
            where: { name: name },
        });
    }
    async findOneById(id, employeeId) {
        return await this.restaurantRepository.findOne({
            where: { id: id, employee_id: employeeId },
        });
    }
    async findAll(employee_id) {
        return await this.restaurantRepository.findBy({ employee_id: employee_id });
    }
    async update(restaurant) {
        return await this.restaurantRepository.save(restaurant);
    }
};
RestaurantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RestaurantService);
exports.RestaurantService = RestaurantService;
//# sourceMappingURL=restaurant.service.js.map