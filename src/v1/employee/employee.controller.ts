import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";

import { EmployeeService } from "./employee.service";
import { EmployeeDTO } from "./employee.dto/employee-register.dto";
import { ResponseData } from "src/utils.common/utils.response.common/utils.response.common";
import { Employee } from "./employee.entity/employee.entity";
import { ExceptionResponseDetail } from "src/utils.common/utils.exceptions.common/utils.exception-common";
import { VersionEnum } from "src/utils.common/utils.enum.common/utils.version.enum";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from "@nestjs/swagger";
import { SwaggerResponse } from "src/utils.common/utils.swagger.common/utils.swagger.response";
import { GetUserFromToken } from "src/utils.common/utils.decorators.common/utils.decorators.common";
import { EmployeeUpdateDTO } from "./employee.dto/employee-update.dto";
import { EmployeeUpdatePasswordDTO } from "./employee.dto/employee-update-password.dto";
import { Password } from "src/utils.common/utils.password.common/utils.password.common";
import { EmployeeDetailResponse } from "./employee.response/employee-detail.response";
import { EmployeesResponse } from "./employee.response/employees.response";
import { EmployeeUpdateStatusDTO } from "./employee.dto/employee-update-status";
import { HandleBase64 } from "src/utils.common/utils.handle-base64.common/utils.handle-base64.common";

@Controller({
  version: VersionEnum.V1.toString(),
  path: "employees",
})
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post("/register")
  @UseGuards(ValidationPipe)
  @UsePipes()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath("EmployeeResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Đăng kí tài khoản" })
  async create(
    @Body(new ValidationPipe()) employeeDTO: EmployeeDTO,
    @Res() res: Response
  ): Promise<any> {
    let response: ResponseData = new ResponseData();
    let employee: Employee = await this.employeeService.findOneByPhone(
      employeeDTO.phone_number
    );
    if (employee) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Số điện thoại [${employee.phone_number}] này đã tồn tại!`
        ),
        HttpStatus.OK
      );
    }
    let newEmployee: Employee = new Employee();

    newEmployee.full_name = employeeDTO.full_name;
    newEmployee.phone_number = employeeDTO.phone_number;
    newEmployee.username = employeeDTO.username;
    newEmployee.password = await HandleBase64.decodePasswordBase64(
      employeeDTO.password
    );

    let createdEmployee = await this.employeeService.create(newEmployee);

    if (!createdEmployee) {
      response.setMessage(
        HttpStatus.BAD_REQUEST,
        "Tạo nhân viên không thành công"
      );
      return res.status(HttpStatus.BAD_REQUEST).send(response);
    }
    return res.status(HttpStatus.OK).send(response);
  }

  @Post("/:id/update")
  @UseGuards(ValidationPipe)
  @UsePipes()
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath("EmployeeResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Chỉnh sửa nhân viên" })
  async updateEmployee(
    @Body(new ValidationPipe()) employeeUpdateDTO: EmployeeUpdateDTO,
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    // Ktra user có tồn không?
    let existingEmployee: Employee = await this.employeeService.findOneById(
      employee.id
    );

    if (!existingEmployee) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Không tìm thấy nhân viên!`
        ),
        HttpStatus.OK
      );
    }

    existingEmployee.full_name = employeeUpdateDTO.full_name;
    existingEmployee.gender = employeeUpdateDTO.gender;
    existingEmployee.phone_number = employeeUpdateDTO.phone_number;

    let updatedEmployee: Employee = await this.employeeService.update(
      existingEmployee
    );

    if (!updatedEmployee) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Cập nhật nhân viên không thành công!`
        ),
        HttpStatus.OK
      );
    }

    response.setData(new EmployeeDetailResponse(updatedEmployee));
    return res.status(HttpStatus.OK).send(response);
  }

  @Post(":id/update-password")
  @UseGuards(ValidationPipe)
  @UsePipes()
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath("EmployeeResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Đổi mật khẩu" })
  async updateEmployeePassword(
    @Body(new ValidationPipe())
    employeeUpdatePasswordDTO: EmployeeUpdatePasswordDTO,
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    let existingEmployee: Employee = await this.employeeService.findOneById(
      employee.id
    );

    if (!existingEmployee) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Không tìm thấy nhân viên!`
        ),
        HttpStatus.OK
      );
    }

    let newPassword = await HandleBase64.decodePasswordBase64(
      employeeUpdatePasswordDTO.new_password
    );
    let oldPassword = await HandleBase64.decodePasswordBase64(
      employeeUpdatePasswordDTO.old_password
    );

    if (
      await Password.comparePassword(oldPassword, existingEmployee.password)
    ) {
      existingEmployee.password = await Password.bcryptPassword(newPassword);

      let updatedEmployee: Employee = await this.employeeService.updatePassword(
        existingEmployee
      );

      if (updatedEmployee) {
        return res.status(HttpStatus.OK).send("Chỉnh sửa thành công");
      } else {
        response.setMessage(HttpStatus.BAD_REQUEST, "Chỉnh sửa thất bại");
        return res.status(HttpStatus.BAD_REQUEST).send(response);
      }
    }

    response.setMessage(HttpStatus.BAD_REQUEST, "Mật khẩu không chính xác!");
    return res.status(HttpStatus.BAD_REQUEST).send(response);
  }

  @Post("/:id/update-status")
  @UseGuards(ValidationPipe)
  @UsePipes()
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath("EmployeeResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Đổi trạng thái nhân viên" })
  async updateStatus(
    @Body(new ValidationPipe())
    employeeUpdateStatusDTO: EmployeeUpdateStatusDTO,
    @Res() res: Response,
    @GetUserFromToken() employee: Employee,
    @Param("id") id: number
  ) {
    let response: ResponseData = new ResponseData();

    if (+employee.id !== +id) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Bạn không có quyền thay đổi trạng thái nhân viên này!`
        ),
        HttpStatus.OK
      );
    }

    let existingEmployee: Employee = await this.employeeService.findOneById(
      employee.id
    );

    if (!existingEmployee) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Không tìm thấy nhân viên!`
        ),
        HttpStatus.OK
      );
    }

    existingEmployee.status = employeeUpdateStatusDTO.status;

    let updatedEmployee: Employee = await this.employeeService.updateStatus(
      existingEmployee
    );

    if (updatedEmployee) {
      return res.status(HttpStatus.OK).send(response);
    } else {
      response.setMessage(400, "Chỉnh sửa thất bại");
      return res.status(HttpStatus.BAD_REQUEST).send(response);
    }
  }

  @Get("/:id")
  @UseGuards(ValidationPipe)
  @UsePipes()
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath("EmployeeResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Thông tin chi tiết nhân viên" })
  async employeeDetail(@Param("id") id: number, @Res() res: Response) {
    let response: ResponseData = new ResponseData();

    let existingEmployee: Employee =
      await this.employeeService.getEmployeeDetail(id);

    response.setData(new EmployeeDetailResponse(existingEmployee));
    return res.status(HttpStatus.OK).send(response);
  }

  @Get()
  @UseGuards(ValidationPipe)
  @UsePipes()
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath("EmployeeResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Danh sách nhân viên" })
  async employees(@Res() res: Response) {
    let response: ResponseData = new ResponseData();

    response.setData(
      new EmployeesResponse().mapToList(
        await this.employeeService.getEmployees()
      )
    );
    return res.status(HttpStatus.OK).send(response);
  }
}
