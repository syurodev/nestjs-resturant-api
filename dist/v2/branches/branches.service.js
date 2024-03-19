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
const utils_store_procedure_result_common_1 = require("../../utils.common/utils.store-procedure-result.common/utils.store-procedure-result.common");
let BranchesService = class BranchesService {
    constructor(branchesRepository) {
        this.branchesRepository = branchesRepository;
    }
    async findWithId(brancheId, employeeId) {
        let existingBranche = await this.branchesRepository.query(`
        CALL sp_g_branche(?, ?, ?, @c, @m)
        SELECT @c as status, @m as message;
      `, [employeeId, brancheId]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultDetail(existingBranche);
    }
    async create(employeeId, branches) {
        let createdBranche = await this.branchesRepository.query(`
          CALL sp_u_branche_create(?, ?, @c, @m);
          SELECT @c as status, @m as message;
        `, [employeeId, JSON.stringify(branches)]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultDetail(createdBranche);
    }
    async createMulti(employeeId, branches) {
        let createdBranches = await this.branchesRepository.query(`
          CALL sp_u_branches_create(?, ?, @c, @m);
          SELECT @c as status, @m as message;
        `, [employeeId, JSON.stringify(branches)]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultList(createdBranches);
    }
    async update(employeeId, brancheId, branche) {
        let updatedBranche = await this.branchesRepository.query(`
        CALL sp_u_branche(?, ?, ?, @c, @m);
        SELECT @c as status, @m as message;
      `, [employeeId, brancheId, branche]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultDetail(updatedBranche);
    }
    async findAll(employeeId) {
        let branches = await this.branchesRepository.query(`
          CALL sp_g_branches(?, @c, @m);
          SELECT @c as status, @m as message;
        `, [employeeId]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultList(branches);
    }
};
BranchesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(branches_entity_1.Branches)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BranchesService);
exports.BranchesService = BranchesService;
//# sourceMappingURL=branches.service.js.map