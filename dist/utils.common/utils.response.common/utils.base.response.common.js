"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResponseData = void 0;
const common_1 = require("@nestjs/common");
class BaseResponseData {
    constructor(status = null, message = null, data) {
        this.status = status ? +status : +common_1.HttpStatus.OK;
        this.message = message ? message : "SUCCESS";
        this.data = data ? data : null;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    getMessage() {
        return this.message;
    }
    setMessage(status, message) {
        if (message) {
            this.message = message;
        }
        else {
            switch (status) {
                case common_1.HttpStatus.OK:
                    this.message = "SUCCESS";
                    break;
                case common_1.HttpStatus.BAD_REQUEST:
                    this.message = "Dữ liệu không hợp lệ";
                    break;
                default:
                    this.message = "SUCCESS";
                    break;
            }
        }
    }
    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
    }
}
exports.BaseResponseData = BaseResponseData;
//# sourceMappingURL=utils.base.response.common.js.map