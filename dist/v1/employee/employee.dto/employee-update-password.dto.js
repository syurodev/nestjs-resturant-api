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
exports.EmployeeUpdatePasswordDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const utils_decorators_common_1 = require("../../../utils.common/utils.decorators.common/utils.decorators.common");
const utils_base_exception_lang_validator_1 = require("../../../utils.common/utils.exception.lang.common/utils.base.exception.lang.validator");
class EmployeeUpdatePasswordDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: -1,
        description: utils_base_exception_lang_validator_1.UtilsBaseExceptionLangValidator.exceptionPassword(),
    }),
    (0, utils_decorators_common_1.IsNotEmptyString)(),
    __metadata("design:type", String)
], EmployeeUpdatePasswordDTO.prototype, "old_password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: -1,
        description: utils_base_exception_lang_validator_1.UtilsBaseExceptionLangValidator.exceptionPassword(),
    }),
    (0, utils_decorators_common_1.IsNotEmptyString)(),
    __metadata("design:type", String)
], EmployeeUpdatePasswordDTO.prototype, "new_password", void 0);
exports.EmployeeUpdatePasswordDTO = EmployeeUpdatePasswordDTO;
//# sourceMappingURL=employee-update-password.dto.js.map