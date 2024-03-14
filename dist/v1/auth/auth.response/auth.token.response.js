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
exports.AuthTokenResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class AuthTokenResponse {
    constructor(employee) {
        this.access_token = employee === null || employee === void 0 ? void 0 : employee.access_token;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        default: "",
        example: "",
        description: "token của nhân viên",
    }),
    __metadata("design:type", String)
], AuthTokenResponse.prototype, "access_token", void 0);
exports.AuthTokenResponse = AuthTokenResponse;
//# sourceMappingURL=auth.token.response.js.map