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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const utils_version_enum_1 = require("../../utils.common/utils.enum.common/utils.version.enum");
const utils_exception_common_1 = require("../../utils.common/utils.exceptions.common/utils.exception-common");
const utils_handle_base64_common_1 = require("../../utils.common/utils.handle-base64.common/utils.handle-base64.common");
const utils_password_common_1 = require("../../utils.common/utils.password.common/utils.password.common");
const utils_response_common_1 = require("../../utils.common/utils.response.common/utils.response.common");
const utils_swagger_response_1 = require("../../utils.common/utils.swagger.common/utils.swagger.response");
const employee_service_1 = require("../employee/employee.service");
const auth_login_dto_1 = require("./auth.dto/auth-login.dto");
const auth_token_response_1 = require("./auth.response/auth.token.response");
let AuthController = class AuthController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async login(authLoginDTO, res) {
        let response = new utils_response_common_1.ResponseData();
        let employee = await this.employeeService.findOneByUsername(authLoginDTO.username);
        if (!employee) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.FORBIDDEN, `Tài khoản [${authLoginDTO.username}] không đúng!`), common_1.HttpStatus.OK);
        }
        if (!(await utils_password_common_1.Password.comparePassword(await utils_handle_base64_common_1.HandleBase64.decodePasswordBase64(authLoginDTO.password), employee.password))) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.FORBIDDEN, `Mật khẩu không đúng!`), common_1.HttpStatus.OK);
        }
        response.setData(new auth_token_response_1.AuthTokenResponse(employee));
        return res.status(common_1.HttpStatus.OK).send(response);
    }
};
__decorate([
    (0, common_1.Post)("login"),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(utils_swagger_response_1.SwaggerResponse) },
                {
                    properties: {
                        data: {
                            $ref: (0, swagger_1.getSchemaPath)(auth_token_response_1.AuthTokenResponse),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: "Đăng nhập" }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_login_dto_1.AuthLoginDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, swagger_1.ApiExtraModels)(auth_token_response_1.AuthTokenResponse),
    (0, common_1.Controller)({
        version: utils_version_enum_1.VersionEnum.V2.toString(),
        path: "auth",
    }),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map