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
exports.BranchesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const branches_entity_1 = require("./branches.entity/branches.entity");
let BranchesService = class BranchesService {
    constructor(branchesRepository) {
        this.branchesRepository = branchesRepository;
    }
    ;
    async findWithName(restaurantId, restaurantBrandId, brancheName) {
        return await this.branchesRepository.findOne({
            where: {
                restaurant_id: restaurantId,
                restaurant_brand_id: restaurantBrandId,
                name: brancheName
            }
        });
    }
    ;
    async findNameArray(restaurantIds, restaurantBrandIds, names) {
        return await this.branchesRepository.findBy({
            restaurant_id: (0, typeorm_2.In)(restaurantIds),
            restaurant_brand_id: (0, typeorm_2.In)(restaurantBrandIds),
            name: (0, typeorm_2.In)(names)
        });
    }
    ;
    async findWithId(brancheId, employeeId) {
        return await this.branchesRepository.findOneBy({ id: brancheId, employee_id: employeeId });
    }
    ;
    async create(employeeId, branches) {
        let data;
        if (Array.isArray(branches)) {
            data = branches.map((item) => (Object.assign(Object.assign({}, item), { employee_id: employeeId, created_at: new Date(), updated_at: new Date() })));
        }
        else {
            data = Object.assign(Object.assign({}, branches), { employee_id: employeeId, created_at: new Date(), updated_at: new Date() });
        }
        return await this.branchesRepository.save(data);
    }
    ;
    async update(branche) {
        return await this.branchesRepository.save(branche);
    }
    ;
    async findAll(employeeId) {
        return await this.branchesRepository.findBy({ employee_id: employeeId });
    }
    ;
};
BranchesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(branches_entity_1.Branches)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BranchesService);
exports.BranchesService = BranchesService;
;
//# sourceMappingURL=branches.service.js.map