"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionResponseDetail = void 0;
const common_1 = require("@nestjs/common");
class ExceptionResponseDetail {
    constructor(status = null, message = null, data) {
        this.status = status ? status : common_1.HttpStatus.BAD_REQUEST;
        this.message = message ? this.getMessage(status, message) : "Dữ liệu không hợp lệ!";
        this.data = data ? data : null;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    getMessage(status, message) {
        if (message) {
            this.message = message;
        }
        else {
            switch (status) {
                case common_1.HttpStatus.BAD_REQUEST:
                    this.message = "Dữ liệu không hợp lệ!";
                    break;
                case common_1.HttpStatus.UNAUTHORIZED:
                    this.message = "Không có quyền truy cập";
                    break;
                case common_1.HttpStatus.INTERNAL_SERVER_ERROR:
                    this.message = "Lỗi Server!";
                    break;
                default:
                    this.message = "Dữ liệu không hợp lệ!";
                    break;
            }
        }
        return this.message;
    }
    setMessage(message) {
        this.message = message;
    }
    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
    }
}
exports.ExceptionResponseDetail = ExceptionResponseDetail;
//# sourceMappingURL=utils.exception.common.js.map