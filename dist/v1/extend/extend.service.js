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
exports.ExtendService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurant_entity_1 = require("../restaurant/restaurant.entity/restaurant.entity");
const restaurant_brand_entity_1 = require("../restaurant-brand/restaurant-brand.entity/restaurant-brand.entity");
const branches_entity_1 = require("../branches/branches.entity/branches.entity");
const areas_entity_1 = require("../areas/areas.entity/areas.entity");
const tables_entity_1 = require("../tables/tables.entity/tables.entity");
let ExtendService = class ExtendService {
    constructor(restaurantRepository, restaurantBrandRepository, branchesRepository, areasRepository, tableRepository) {
        this.restaurantRepository = restaurantRepository;
        this.restaurantBrandRepository = restaurantBrandRepository;
        this.branchesRepository = branchesRepository;
        this.areasRepository = areasRepository;
        this.tableRepository = tableRepository;
    }
    async getRestaurantDetail(employeeId, status = -1) {
        let query = { employee_id: employeeId };
        let restaurants = [];
        let restaurantBrands = [];
        let branches = [];
        let areas = [];
        let tables = [];
        if (status > -1) {
            query.status = status;
        }
        restaurants = await this.restaurantRepository.findBy(query);
        if (restaurants.length > 0) {
            query.restaurant_id = (0, typeorm_2.In)(restaurants.map((item) => item.id));
            restaurantBrands = await this.restaurantBrandRepository.findBy(query);
        }
        if (restaurantBrands.length > 0) {
            query.restaurant_brand_id = (0, typeorm_2.In)(restaurantBrands.map((item) => item.id));
            branches = await this.branchesRepository.findBy(query);
        }
        if (branches.length > 0) {
            query.branch_id = (0, typeorm_2.In)(branches.map((item) => item.id));
            areas = await this.areasRepository.findBy(query);
        }
        if (areas.length > 0) {
            query.area_id = (0, typeorm_2.In)(areas.map((item) => item.id));
            if (query.branch_id) {
                delete query.branch_id;
            }
            tables = await this.tableRepository.findBy(query);
        }
        let result = restaurants.map((restaurant) => ({
            id: restaurant.id,
            name: restaurant.name,
            status: restaurant.status,
            created_at: restaurant.created_at,
            restaurant_brands: {
                total: filterRestaurantBrands(restaurantBrands, restaurant.id).length,
                list: filterRestaurantBrands(restaurantBrands, restaurant.id).map((restaurantBrand) => ({
                    id: restaurantBrand.id,
                    name: restaurantBrand.name,
                    status: restaurantBrand.status,
                    created_at: restaurantBrand.created_at,
                    branches: {
                        total: filterBranches(branches, restaurant.id, restaurantBrand.id)
                            .length,
                        list: filterBranches(branches, restaurant.id, restaurantBrand.id).map((branche) => ({
                            id: branche.id,
                            name: branche.name,
                            status: branche.status,
                            created_at: branche.created_at,
                            areas: {
                                total: filterAreas(areas, restaurant.id, restaurantBrand.id, branche.id).length,
                                list: filterAreas(areas, restaurant.id, restaurantBrand.id, branche.id).map((area) => ({
                                    id: area.id,
                                    name: area.name,
                                    status: area.status,
                                    created_at: area.created_at,
                                    tables: {
                                        total: filterTables(tables, restaurant.id, restaurantBrand.id, area.id).length,
                                        list: filterTables(tables, restaurant.id, restaurantBrand.id, area.id).map((table) => ({
                                            id: table.id,
                                            name: table.name,
                                            status: table.status,
                                            created_at: table.created_at,
                                        })),
                                    },
                                })),
                            },
                        })),
                    },
                })),
            },
        }));
        return result;
    }
};
ExtendService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __param(1, (0, typeorm_1.InjectRepository)(restaurant_brand_entity_1.RestaurantBrand)),
    __param(2, (0, typeorm_1.InjectRepository)(branches_entity_1.Branches)),
    __param(3, (0, typeorm_1.InjectRepository)(areas_entity_1.Areas)),
    __param(4, (0, typeorm_1.InjectRepository)(tables_entity_1.Tables)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ExtendService);
exports.ExtendService = ExtendService;
const filterRestaurantBrands = (restaurantBrands, restaurantId) => {
    return restaurantBrands.filter((restaurantBrand) => restaurantBrand.restaurant_id === restaurantId);
};
const filterBranches = (branches, restaurantId, restaurantBrandId) => {
    return branches.filter((restaurantBrand) => restaurantBrand.restaurant_id === restaurantId &&
        restaurantBrand.restaurant_brand_id === restaurantBrandId);
};
const filterAreas = (areas, restaurantId, restaurantBrandId, brancheId) => {
    return areas.filter((area) => area.restaurant_id === restaurantId &&
        area.restaurant_brand_id === restaurantBrandId &&
        area.branch_id === brancheId);
};
const filterTables = (tables, restaurantId, restaurantBrandId, areaId) => {
    return tables.filter((table) => table.restaurant_id === restaurantId &&
        table.restaurant_brand_id === restaurantBrandId &&
        table.area_id === areaId);
};
//# sourceMappingURL=extend.service.js.map