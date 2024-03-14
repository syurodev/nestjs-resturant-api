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
exports.BranchesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const utils_version_enum_1 = require("../../utils.common/utils.enum.common/utils.version.enum");
const utils_swagger_response_1 = require("../../utils.common/utils.swagger.common/utils.swagger.response");
const utils_decorators_common_1 = require("../../utils.common/utils.decorators.common/utils.decorators.common");
const employee_entity_1 = require("../employee/employee.entity/employee.entity");
const utils_exception_common_1 = require("../../utils.common/utils.exceptions.common/utils.exception-common");
const utils_response_common_1 = require("../../utils.common/utils.response.common/utils.response.common");
const branches_service_1 = require("./branches.service");
const branches_create_dto_1 = require("./branches.dto/branches-create.dto");
const branches_detail_response_1 = require("./branches.response/branches-detail.response");
const branches_update_dto_1 = require("./branches.dto/branches-update.dto");
const branches_response_1 = require("./branches.response/branches.response");
let BranchesController = class BranchesController {
    constructor(branchesService) {
        this.branchesService = branchesService;
    }
    async create(branchesDTO, res, employee) {
        let response = new utils_response_common_1.ResponseData();
        let existingBranches = await this.branchesService.findWithName(branchesDTO.restaurant_id, branchesDTO.restaurant_brand_id, branchesDTO.name);
        if (existingBranches) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Tên chi nhánh [${branchesDTO.name}] này đã tồn tại!`), common_1.HttpStatus.OK);
        }
        const savedBranche = await this.branchesService.create(employee.id, branchesDTO);
        if (!savedBranche) {
            response.setMessage(common_1.HttpStatus.BAD_REQUEST, "Tạo chi nhánh thất bại!");
            return res.status(common_1.HttpStatus.OK).send(response);
        }
        response.setData(new branches_detail_response_1.BrancheDetailResponse(savedBranche));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async createMulti(branchesDTO, res, employee) {
        let response = new utils_response_common_1.ResponseData();
        let existingBranches = await this.branchesService.findNameArray(branchesDTO.map(item => item.restaurant_id), branchesDTO.map(item => item.restaurant_brand_id), branchesDTO.map(item => item.name));
        if (existingBranches.length > 0) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Tên chi nhánh [${existingBranches.map(item => item.name)}] này đã tồn tại!`), common_1.HttpStatus.OK);
        }
        response.setData(new branches_response_1.BranchesResponse().mapToList(await this.branchesService.create(employee.id, branchesDTO)));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async updateBrand(branchesUpdateDTO, res, id, employee) {
        let response = new utils_response_common_1.ResponseData();
        let existingBranche = await this.branchesService.findWithId(id, employee.id);
        if (!existingBranche) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Không tìm thấy chi nhánh!`), common_1.HttpStatus.OK);
        }
        let existingBrancheName = await this.branchesService.findWithName(existingBranche.restaurant_id, existingBranche.restaurant_brand_id, branchesUpdateDTO.name);
        if (existingBrancheName) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Tên chi nhánh [${branchesUpdateDTO.name}] đã tồn tại!`), common_1.HttpStatus.OK);
        }
        existingBranche.name = branchesUpdateDTO.name;
        existingBranche.updated_at = new Date();
        const updatedBranche = await this.branchesService.update(existingBranche);
        if (!updatedBranche) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `Cập nhật chi nhánh không thành công!`), common_1.HttpStatus.OK);
        }
        ;
        response.setData(updatedBranche);
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async brancheDetail(id, res, employee) {
        let response = new utils_response_common_1.ResponseData();
        let existingBranche = await this.branchesService.findWithId(id, employee.id);
        if (!existingBranche) {
            response.setMessage(404, "Không tìm thấy chi nhánh");
            return res.status(common_1.HttpStatus.OK).send(response);
        }
        response.setData(new branches_detail_response_1.BrancheDetailResponse(existingBranche));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
    async branches(res, employee) {
        const response = new utils_response_common_1.ResponseData();
        let branches = await this.branchesService.findAll(employee.id);
        if (branches.length === 0) {
            response.setMessage(common_1.HttpStatus.BAD_REQUEST, "Không tìm thấy danh sách chi nhánh");
            return res.status(common_1.HttpStatus.OK).send(response);
        }
        response.setData(new branches_response_1.BranchesResponse().mapToList(branches));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
};
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.UseGuards)(common_1.ValidationPipe),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("BrancheResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Tạo thương hiệu" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [branches_create_dto_1.BrancheDTO, Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], BranchesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("/create-multi"),
    (0, common_1.UseGuards)(common_1.ValidationPipe),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("BrancheResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Tạo nhiều chi nhánh" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], BranchesController.prototype, "createMulti", null);
__decorate([
    (0, common_1.Post)("/:id/update"),
    (0, common_1.UseGuards)(common_1.ValidationPipe),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("BrancheResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Chỉnh sửa chi nhánh" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)("id")),
    __param(3, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [branches_update_dto_1.BrancheUpdateDTO, Object, Number, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], BranchesController.prototype, "updateBrand", null);
__decorate([
    (0, common_1.Get)("/:id"),
    (0, common_1.UseGuards)(common_1.ValidationPipe),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("BrancheResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Chi tiết chi nhánh" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], BranchesController.prototype, "brancheDetail", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(common_1.ValidationPipe),
    (0, common_1.UsePipes)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)("BrancheResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Danh sách chi nhánh" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, utils_decorators_common_1.GetUserFromToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], BranchesController.prototype, "branches", null);
BranchesController = __decorate([
    (0, common_1.Controller)({
        version: utils_version_enum_1.VersionEnum.V1.toString(),
        path: "branches",
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [branches_service_1.BranchesService])
], BranchesController);
exports.BranchesController = BranchesController;
//# sourceMappingURL=branches.controller.js.map