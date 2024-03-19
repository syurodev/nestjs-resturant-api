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
exports.AreaCreateDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const utils_decorators_common_1 = require("../../../utils.common/utils.decorators.common/utils.decorators.common");
const utils_base_exception_lang_validator_1 = require("../../../utils.common/utils.exception.lang.common/utils.base.exception.lang.validator");
class AreaCreateDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: -1,
        description: utils_base_exception_lang_validator_1.UtilsBaseExceptionLangValidator.exceptionName("Khu vực"),
    }),
    (0, utils_decorators_common_1.IsNotEmptyString)(),
    (0, class_validator_1.Length)(1, 255),
    __metadata("design:type", String)
], AreaCreateDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: -1,
        description: utils_base_exception_lang_validator_1.UtilsBaseExceptionLangValidator.exceptionName("Nhà hàng"),
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AreaCreateDTO.prototype, "restaurant_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: -1,
        description: utils_base_exception_lang_validator_1.UtilsBaseExceptionLangValidator.exceptionName("Thương hiệu"),
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AreaCreateDTO.prototype, "restaurant_brand_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: -1,
        description: utils_base_exception_lang_validator_1.UtilsBaseExceptionLangValidator.exceptionName("Chi nhánh"),
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AreaCreateDTO.prototype, "branch_id", void 0);
exports.AreaCreateDTO = AreaCreateDTO;
//# sourceMappingURL=area-create.dto.js.map