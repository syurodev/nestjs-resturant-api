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
exports.TablesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tables_entity_1 = require("./tables.entity/tables.entity");
let TablesService = class TablesService {
    constructor(tablesRepository) {
        this.tablesRepository = tablesRepository;
    }
    ;
    async findWithName(restaurantId, restaurantBrandId, areaId, tableName) {
        return await this.tablesRepository.findOne({
            where: {
                restaurant_id: restaurantId,
                restaurant_brand_id: restaurantBrandId,
                area_id: areaId,
                name: tableName
            }
        });
    }
    async findNameArray(restaurantIds, restaurantBrandIds, areaIds, names) {
        return await this.tablesRepository.findBy({
            restaurant_id: (0, typeorm_2.In)(restaurantIds),
            restaurant_brand_id: (0, typeorm_2.In)(restaurantBrandIds),
            area_id: (0, typeorm_2.In)(areaIds),
            name: (0, typeorm_2.In)(names)
        });
    }
    ;
    async findWithId(tableId, employeeId) {
        return await this.tablesRepository.findOneBy({
            id: tableId,
            employee_id: employeeId
        });
    }
    async create(employeeId, table) {
        let data;
        if (Array.isArray(table)) {
            data = table.map((item) => (Object.assign(Object.assign({}, item), { employee_id: employeeId, created_at: new Date(), updated_at: new Date() })));
        }
        else {
            data = Object.assign(Object.assign({}, table), { employee_id: employeeId, created_at: new Date(), updated_at: new Date() });
        }
        ;
        return await this.tablesRepository.save(data);
    }
    async update(table) {
        return await this.tablesRepository.save(table);
    }
    async findAll(employeeId) {
        return await this.tablesRepository.findBy({ employee_id: employeeId });
    }
};
TablesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tables_entity_1.Tables)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TablesService);
exports.TablesService = TablesService;
//# sourceMappingURL=tables.service.js.map