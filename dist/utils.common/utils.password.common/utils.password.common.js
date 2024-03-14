"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const utils_exception_common_1 = require("../utils.exceptions.common/utils.exception-common");
class Password {
    constructor(password) {
        this.password = password;
    }
    static async bcryptPassword(password) {
        if (!password) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, "password không hợp lệ!"), common_1.HttpStatus.OK);
        }
        else {
            let saltRound = 10;
            let salt = await bcrypt.genSaltSync(saltRound);
            let hash = await bcrypt.hashSync(password, salt);
            return hash;
        }
    }
    static async comparePassword(password, bcryptPassword) {
        if (!password || !bcryptPassword) {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, "password không hợp lệ!"), common_1.HttpStatus.OK);
        }
        else {
            let comParePassword = await bcrypt.compareSync(password, bcryptPassword);
            return comParePassword;
        }
    }
}
exports.Password = Password;
//# sourceMappingURL=utils.password.common.js.map