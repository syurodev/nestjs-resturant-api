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
exports.AreasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const areas_entity_1 = require("./areas.entity/areas.entity");
let AreasService = class AreasService {
    constructor(areasRepository) {
        this.areasRepository = areasRepository;
    }
    ;
    async findWithName(restaurantId, restaurantBrandId, branchId, brancheName) {
        return await this.areasRepository.findOne({
            where: {
                restaurant_id: restaurantId,
                restaurant_brand_id: restaurantBrandId,
                branch_id: branchId,
                name: brancheName
            }
        });
    }
    async findNameArray(restaurantIds, restaurantBrandIds, branchIds, names) {
        return await this.areasRepository.findBy({
            restaurant_id: (0, typeorm_2.In)(restaurantIds),
            restaurant_brand_id: (0, typeorm_2.In)(restaurantBrandIds),
            branch_id: (0, typeorm_2.In)(branchIds),
            name: (0, typeorm_2.In)(names)
        });
    }
    async findWithId(areaId, employeeId) {
        return await this.areasRepository.findOneBy({ id: areaId, employee_id: employeeId });
    }
    async create(employeeId, area) {
        let data;
        if (Array.isArray(area)) {
            data = area.map((item) => (Object.assign(Object.assign({}, item), { employee_id: employeeId, created_at: new Date(), updated_at: new Date() })));
        }
        else {
            data = Object.assign(Object.assign({}, area), { employee_id: employeeId, created_at: new Date(), updated_at: new Date() });
        }
        ;
        return await this.areasRepository.save(data);
    }
    async update(area) {
        return await this.areasRepository.save(area);
    }
    async findAll(employee_id) {
        return await this.areasRepository.findBy({ employee_id: employee_id });
    }
};
AreasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(areas_entity_1.Areas)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AreasService);
exports.AreasService = AreasService;
//# sourceMappingURL=areas.service.js.map