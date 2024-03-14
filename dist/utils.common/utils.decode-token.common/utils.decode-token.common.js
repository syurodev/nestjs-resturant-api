"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecodeToken = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const utils_exception_common_1 = require("../utils.exception.common/utils.exception.common");
class DecodeToken {
    constructor(token = "", secret_key = "") {
        this.verifyBearerToken = async (bearerToken, secretKey) => {
            let decodeBearerTokenInterFace;
            if (!bearerToken || bearerToken === "") {
                throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, "Token không hợp lệ!"), common_1.HttpStatus.OK);
            }
            else {
                let token = await this.splitBearerToken(bearerToken);
                decodeBearerTokenInterFace = Object(await jwt.decode(token));
                decodeBearerTokenInterFace.jwt_token = token;
            }
            return decodeBearerTokenInterFace;
        };
        this.splitBearerToken = (token) => {
            let splitToken;
            if (!token || token === "") {
                throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, "Token không hợp lệ!"), common_1.HttpStatus.OK);
            }
            else {
                splitToken = token.split(" ")[1];
                if (!splitToken || splitToken === "") {
                    throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, "Token không hợp lệ!"), common_1.HttpStatus.OK);
                }
            }
            return splitToken;
        };
        this.token = token;
        this.secret_key = secret_key;
    }
}
exports.DecodeToken = DecodeToken;
//# sourceMappingURL=utils.decode-token.common.js.map