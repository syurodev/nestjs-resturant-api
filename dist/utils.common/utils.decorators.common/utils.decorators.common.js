"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsInt = exports.IsNotEmptyString = exports.UserAuthentication = exports.GetAdminFromToken = exports.GetUserFromToken = exports.RequestHeaderVerifyApiKey = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const utils_exception_common_1 = require("../utils.exceptions.common/utils.exception-common");
const utils_handle_base64_common_1 = require("../utils.handle-base64.common/utils.handle-base64.common");
const employee_service_1 = require("../../v1/employee/employee.service");
exports.RequestHeaderVerifyApiKey = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    switch (data) {
        case "authorization":
            let verifyApiKey = utils_handle_base64_common_1.HandleBase64.verifyApiKey(request.headers.authorization);
            if (!verifyApiKey) {
                throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.FORBIDDEN, "Vui lòng truyền api_key!"), common_1.HttpStatus.OK);
            }
            else {
                return verifyApiKey;
            }
        default:
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.FORBIDDEN), common_1.HttpStatus.OK);
    }
});
exports.GetUserFromToken = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
exports.GetAdminFromToken = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
function UserAuthentication(bubble = true) {
    const injectUser = (0, common_1.Inject)(employee_service_1.EmployeeService);
    return (target, propertyKey, propertyDescriptor) => {
        injectUser(target, "employeeService");
        const originalMethod = propertyDescriptor.value;
        propertyDescriptor.value = async function (...args) {
            try {
                let userId = args[1].id;
                console.log(args[1].request);
                if (!userId) {
                    userId =
                        args[1].req == undefined
                            ? args[1].request.user.id
                            : args[1].req.user.id;
                }
                let user = await this.userService.findOne(userId);
                if (user) {
                    return await originalMethod.apply(this, args);
                }
                else {
                    throw new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.UNAUTHORIZED, "Không có quyền truy cập", null);
                }
            }
            catch (error) {
                console.log(error);
                throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, "", error), common_1.HttpStatus.OK);
            }
        };
    };
}
exports.UserAuthentication = UserAuthentication;
function IsNotEmptyString(validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: "isNotEmptyString",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate: (value) => (0, class_validator_1.isString)(value) && (0, class_validator_1.isNotEmpty)(value.trim()),
                defaultMessage: (validationArguments) => {
                    throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `[${validationArguments.property}] không được để trống`), common_1.HttpStatus.OK);
                },
            },
        });
    };
}
exports.IsNotEmptyString = IsNotEmptyString;
function IsInt(validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: "isInt",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate: (value) => !isNaN(parseInt(value)) || !value,
                defaultMessage: (validationArguments) => {
                    throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, `[${validationArguments.property}] phải là kiêu số nguyên`), common_1.HttpStatus.OK);
                },
            },
        });
    };
}
exports.IsInt = IsInt;
//# sourceMappingURL=utils.decorators.common.js.map