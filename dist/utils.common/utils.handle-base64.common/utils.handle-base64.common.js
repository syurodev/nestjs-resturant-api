"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleBase64 = void 0;
const common_1 = require("@nestjs/common");
const utils_exception_common_1 = require("../utils.exceptions.common/utils.exception-common");
class HandleBase64 {
    constructor(api_key, password) {
        this.api_key = api_key;
        this.password = password;
    }
    static generateApiKey(api_key) {
        if (!api_key) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.FORBIDDEN, "api_key không hợp lệ!"), common_1.HttpStatus.OK);
        }
        else {
            let buff = Buffer.from(api_key);
            let base64data = buff.toString("base64");
            return base64data + "&sd";
        }
    }
    static verifyApiKey(api_key) {
        if (!api_key) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.FORBIDDEN, "api_key không hợp lệ!"), common_1.HttpStatus.OK);
        }
        else {
            let splitAPIKey = api_key.split(" ");
            if (splitAPIKey[0] !== "Basic") {
                throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.FORBIDDEN, "api_key không hợp lệ!"), common_1.HttpStatus.OK);
            }
            else {
                let response = splitAPIKey[1].split("&sd");
                let buff = Buffer.from(response[0], "base64");
                let text = buff.toString("ascii");
                return text;
            }
        }
    }
    static splitRefeshToken(api_key) {
        let splitAPIKey = api_key.split(" ");
        return splitAPIKey[0];
    }
    static async decodePasswordBase64(password) {
        if (!password) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, "password không được rỗng!"), common_1.HttpStatus.OK);
        }
        else {
            let buff = Buffer.from(password, "base64");
            let text = buff.toString("ascii");
            return text;
        }
    }
    static decodeSecretKey(api_key) {
        if (!api_key) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, "api_key không hợp lệ!"), common_1.HttpStatus.OK);
        }
        else {
            let buff = Buffer.from(api_key, "base64");
            let text = buff.toString("ascii");
            return text;
        }
    }
    getApi_key() {
        return this.api_key;
    }
    setApi_key(api_key) {
        this.api_key = api_key;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }
}
exports.HandleBase64 = HandleBase64;
//# sourceMappingURL=utils.handle-base64.common.js.map