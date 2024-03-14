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
exports.ExtendController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const utils_version_enum_1 = require("../../utils.common/utils.enum.common/utils.version.enum");
const extend_service_1 = require("./extend.service");
const utils_swagger_response_1 = require("../../utils.common/utils.swagger.common/utils.swagger.response");
const utils_decorators_common_1 = require("../../utils.common/utils.decorators.common/utils.decorators.common");
const employee_entity_1 = require("../employee/employee.entity/employee.entity");
const utils_response_common_1 = require("../../utils.common/utils.response.common/utils.response.common");
let ExtendController = class ExtendController {
    constructor(extendService) {
        this.extendService = extendService;
    }
    async getRestaurantDetail(employee, res, query) {
        var _a;
        let response = new utils_response_common_1.ResponseData();
        response.setData(await this.extendService.getRestaurantDetail(employee.id, (_a = query.status) !== null && _a !== void 0 ? _a : -1));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
};
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
                            $ref: (0, swagger_1.getSchemaPath)("ExtendResponse"),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Chi tiết danh sách nhà hàng" }),
    __param(0, (0, utils_decorators_common_1.GetUserFromToken)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, Object, Object]),
    __metadata("design:returntype", Promise)
], ExtendController.prototype, "getRestaurantDetail", null);
ExtendController = __decorate([
    (0, common_1.Controller)({
        version: utils_version_enum_1.VersionEnum.V1.toString(),
        path: "extend",
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [extend_service_1.ExtendService])
], ExtendController);
exports.ExtendController = ExtendController;
//# sourceMappingURL=extend.controller.js.map