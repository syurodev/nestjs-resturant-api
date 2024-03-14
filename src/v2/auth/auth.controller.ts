import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";

import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from "@nestjs/swagger";
import { VersionEnum } from "src/utils.common/utils.enum.common/utils.version.enum";
import { ExceptionResponseDetail } from "src/utils.common/utils.exceptions.common/utils.exception-common";
import { HandleBase64 } from "src/utils.common/utils.handle-base64.common/utils.handle-base64.common";
import { Password } from "src/utils.common/utils.password.common/utils.password.common";
import { ResponseData } from "src/utils.common/utils.response.common/utils.response.common";
import { SwaggerResponse } from "src/utils.common/utils.swagger.common/utils.swagger.response";
import { Employee } from "../employee/employee.entity/employee.entity";
import { EmployeeService } from "../employee/employee.service";
import { AuthLoginDTO } from "./auth.dto/auth-login.dto";
import { AuthTokenResponse } from "./auth.response/auth.token.response";

@ApiExtraModels(AuthTokenResponse)
@Controller({
  version: VersionEnum.V2.toString(),
  path: "auth",
})
export class AuthController {
  constructor(private employeeService: EmployeeService) {}

  @Post("login")
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(AuthTokenResponse),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Đăng nhập" })
  async login(
    @Body(new ValidationPipe()) authLoginDTO: AuthLoginDTO,
    @Res() res: Response
  ): Promise<any> {
    let response: ResponseData = new ResponseData();
    let employee: Employee = await this.employeeService.findOneByUsername(
      authLoginDTO.username
    );
    if (!employee) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.FORBIDDEN,
          `Tài khoản [${authLoginDTO.username}] không đúng!`
        ),
        HttpStatus.OK
      );
    }
    if (
      !(await Password.comparePassword(
        await HandleBase64.decodePasswordBase64(authLoginDTO.password),
        employee.password
      ))
    ) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.FORBIDDEN,
          `Mật khẩu không đúng!`
        ),
        HttpStatus.OK
      );
    }

    response.setData(new AuthTokenResponse(employee));

    return res.status(HttpStatus.OK).send(response);
  }
}
