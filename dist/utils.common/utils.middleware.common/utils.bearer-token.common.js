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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("../../v1/employee/employee.service");
const utils_decode_token_common_1 = require("../utils.decode-token.common/utils.decode-token.common");
const utils_exception_common_1 = require("../utils.exception.common/utils.exception.common");
let AuthenticationMiddleware = class AuthenticationMiddleware {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async use(req, res, next) {
        let bearerToken = req.headers.authorization;
        if (!bearerToken || bearerToken === "") {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, "Kiểm tra lại xem bạn đã truyền token vào chưa!"), common_1.HttpStatus.OK);
        }
        let token = await new utils_decode_token_common_1.DecodeToken().verifyBearerToken(bearerToken, "");
        let employee = await this.employeeService.findOneByUsername(token["username"]);
        if (!employee) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, "Token không hợp lệ!"), common_1.HttpStatus.OK);
        }
        req["user"] = employee;
        next();
    }
};
AuthenticationMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], AuthenticationMiddleware);
exports.AuthenticationMiddleware = AuthenticationMiddleware;
//# sourceMappingURL=utils.bearer-token.common.js.map