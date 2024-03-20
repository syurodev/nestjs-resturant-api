"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProcedureResult = void 0;
const common_1 = require("@nestjs/common");
const utils_exception_common_1 = require("../utils.exceptions.common/utils.exception-common");
const utils_store_procedure_status_enum_common_1 = require("./utils.store-procedure-status-enum.common");
class StoreProcedureResult {
    constructor(result) {
        this.result = result ? null : result;
    }
    getResultPagination(data) {
        if (data.length < 3 &&
            (parseInt(data[1][0].status) === utils_store_procedure_status_enum_common_1.StoreProcedureStatusEnum.ERROR ||
                parseInt(data[1][0].status) === utils_store_procedure_status_enum_common_1.StoreProcedureStatusEnum.FAIL_LOGIC)) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, data[0][0].message), common_1.HttpStatus.OK);
        }
        return {
            data: data[0],
            total_record: +data[2][0].total_record,
        };
    }
    getResultList(data) {
        console.log(data);
        if (data.length < 3 &&
            (parseInt(data[1][0].status) === utils_store_procedure_status_enum_common_1.StoreProcedureStatusEnum.ERROR ||
                parseInt(data[1][0].status) === utils_store_procedure_status_enum_common_1.StoreProcedureStatusEnum.FAIL_LOGIC)) {
            const jsonString = convertMySQLStringToJSON(data[1][0].message);
            if (checkMessageType(jsonString) === 0) {
                throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, data[1][0].message), common_1.HttpStatus.OK);
            }
            else {
                throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, JSON.parse(jsonString)), common_1.HttpStatus.OK);
            }
        }
        return data[0];
    }
    getResultDetail(data) {
        if (data.length < 3 &&
            (parseInt(data[1][0].status) === utils_store_procedure_status_enum_common_1.StoreProcedureStatusEnum.ERROR ||
                parseInt(data[1][0].status) === utils_store_procedure_status_enum_common_1.StoreProcedureStatusEnum.FAIL_LOGIC)) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, data[1][0].message), common_1.HttpStatus.OK);
        }
        return data[0][0];
    }
}
exports.StoreProcedureResult = StoreProcedureResult;
function convertMySQLStringToJSON(mysqlString) {
    if (mysqlString.includes("[") &&
        mysqlString.includes("]") &&
        mysqlString.includes("{") &&
        mysqlString.includes("}")) {
        mysqlString = mysqlString.slice(1, -1);
        mysqlString = mysqlString.replace(/'/g, '"');
        mysqlString = "[" + mysqlString + "]";
        return mysqlString;
    }
    return mysqlString;
}
function checkMessageType(data) {
    try {
        const parsedMessage = JSON.parse(data);
        if (Array.isArray(parsedMessage)) {
            return 1;
        }
        else {
            return 0;
        }
    }
    catch (error) {
        return 0;
    }
}
//# sourceMappingURL=utils.store-procedure-result.common.js.map