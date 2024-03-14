"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionStoreProcedure = void 0;
const common_1 = require("@nestjs/common");
const utils_store_procedure_status_enum_common_1 = require("../utils.store-procedure-result.common/utils.store-procedure-status-enum.common");
const utils_exception_common_1 = require("./utils.exception-common");
class ExceptionStoreProcedure {
    constructor(data) {
        this.data = data;
    }
    static validate(data) {
        if (data.length < 3 &&
            parseInt(data[1][0].status) === utils_store_procedure_status_enum_common_1.StoreProcedureStatusEnum.ERROR) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, data[1][0].message), common_1.HttpStatus.OK);
        }
        return true;
    }
    static validateEmptyDetail(data) {
        if (data.length < 3) {
            let textShow = data[1][0].message;
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, textShow), common_1.HttpStatus.OK);
        }
        if (data.length === 3 && data[0].length === 0) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, "Không tồn tại"), common_1.HttpStatus.OK);
        }
        return true;
    }
}
exports.ExceptionStoreProcedure = ExceptionStoreProcedure;
//# sourceMappingURL=utils.store-procedure-exception.common.js.map