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
const utils_store_procedure_result_common_1 = require("../../utils.common/utils.store-procedure-result.common/utils.store-procedure-result.common");
let AreasService = class AreasService {
    constructor(areasRepository) {
        this.areasRepository = areasRepository;
    }
    async findWithId(areaId, employeeId) {
        let existingArea = await this.areasRepository.query(`
        CALL sp_g_area(?, ?, @c, @m);
        SELECT @c as status, @m as message;
      `, [employeeId, areaId]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultDetail(existingArea);
    }
    async create(employeeId, area) {
        let createdArea = await this.areasRepository.query(`
        CALL sp_u_area_create(?, ?, @c, @m);
        SELECT @c as status, @m as message;
      `, [employeeId, JSON.stringify(area)]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultDetail(createdArea);
    }
    async createMulti(employeeId, area) {
        let createdAreas = await this.areasRepository.query(`
        CALL sp_u_areas_create(?, ?, @c, @m);
        SELECT @c as status, @m as message;
      `, [employeeId, JSON.stringify(area)]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultList(createdAreas);
    }
    async update(employeeId, areaId, areaUpdateData) {
        let updatedArea = await this.areasRepository.query(`
        CALL sp_u_area_name(?, ?, ?, @c, @m);
        SELECT @c as status, @m as message;
      `, [employeeId, areaId, JSON.stringify(areaUpdateData)]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultDetail(updatedArea);
    }
    async findAll(employeeId) {
        let existingAreas = await this.areasRepository.query(`
        CALL sp_g_areas(?, @c, @m);
        SELECT @c as status, @m as message;
      `, [employeeId]);
        return new utils_store_procedure_result_common_1.StoreProcedureResult().getResultList(existingAreas);
    }
};
AreasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(areas_entity_1.Areas)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AreasService);
exports.AreasService = AreasService;
//# sourceMappingURL=areas.service.js.map