import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { EmployeeService } from "src/v1/employee/employee.service";
import { DecodeToken } from "../utils.decode-token.common/utils.decode-token.common";
import { ExceptionResponseDetail } from "../utils.exception.common/utils.exception.common";
import { DecodeBearerTokenInterFace } from "../utils.decode-token.common/utils.decode-token.interface.common";
import { Employee } from "src/v1/employee/employee.entity/employee.entity";

interface ValidateTokenService {
  isValid(data: { token: string });
}

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private validateTokenService: ValidateTokenService;

  constructor(private readonly employeeService: EmployeeService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let bearerToken: string = req.headers.authorization;

    if (!bearerToken || bearerToken === "") {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          "Kiểm tra lại xem bạn đã truyền token vào chưa!"
        ),
        HttpStatus.OK
      );
    }

    let token: DecodeBearerTokenInterFace =
      await new DecodeToken().verifyBearerToken(bearerToken, "");

    let employee: Employee = await this.employeeService.findOneByUsername(
      token["username"]
    );

    if (!employee) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          "Token không hợp lệ!"
        ),
        HttpStatus.OK
      );
    }

    req["user"] = employee;

    next();
  }
}
