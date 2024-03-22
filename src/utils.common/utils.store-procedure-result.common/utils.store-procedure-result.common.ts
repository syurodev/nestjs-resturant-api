import { HttpException, HttpStatus } from "@nestjs/common";
import { ExceptionResponseDetail } from "../utils.exceptions.common/utils.exception-common";
import { StoreProcedureStatusEnum } from "./utils.store-procedure-status-enum.common";

export class StoreProcedureResult<T> {
  result: T[];

  constructor(result?: T[]) {
    this.result = result ? null : result;
  }

  public getResultPagination(data: any) {
    if (
      data.length < 3 &&
      (parseInt(data[1][0].status) === StoreProcedureStatusEnum.ERROR ||
        parseInt(data[1][0].status) === StoreProcedureStatusEnum.FAIL_LOGIC)
    ) {
      throw new HttpException(
        new ExceptionResponseDetail(HttpStatus.BAD_REQUEST, data[0][0].message),
        HttpStatus.OK
      );
    }

    return {
      data: data[0],
      total_record: +data[2][0].total_record,
    };
  }

  public getResultList(data: any) {
    console.log(data);
    if (
      data.length < 3 &&
      (parseInt(data[1][0].status) === StoreProcedureStatusEnum.ERROR ||
        parseInt(data[1][0].status) === StoreProcedureStatusEnum.FAIL_LOGIC)
    ) {
      const jsonString = convertMySQLStringToJSON(data[1][0].message);
      if (checkMessageType(jsonString) === 0) {
        throw new HttpException(
          new ExceptionResponseDetail(
            HttpStatus.BAD_REQUEST,
            data[1][0].message
          ),
          HttpStatus.OK
        );
      } else {
        throw new HttpException(
          new ExceptionResponseDetail(
            HttpStatus.BAD_REQUEST,
            JSON.parse(jsonString)
          ),
          HttpStatus.OK
        );
      }
    }
    if (data[0][0] && data[0][0]?.data) {
      return JSON.parse(data[0][0].data);
    } else {
      return data[0];
    }
  }

  public getResultDetail(data: any) {
    if (
      data.length < 3 &&
      (parseInt(data[1][0].status) === StoreProcedureStatusEnum.ERROR ||
        parseInt(data[1][0].status) === StoreProcedureStatusEnum.FAIL_LOGIC)
    ) {
      throw new HttpException(
        new ExceptionResponseDetail(HttpStatus.BAD_REQUEST, data[1][0].message),
        HttpStatus.OK
      );
    }
    return data[0][0];
  }
}

function convertMySQLStringToJSON(mysqlString: string) {
  if (
    mysqlString.includes("[") &&
    mysqlString.includes("]") &&
    mysqlString.includes("{") &&
    mysqlString.includes("}")
  ) {
    mysqlString = mysqlString.slice(1, -1);

    mysqlString = mysqlString.replace(/'/g, '"');

    mysqlString = "[" + mysqlString + "]";

    return mysqlString;
  }
  return mysqlString;
}

function checkMessageType(data: string): 0 | 1 {
  try {
    const parsedMessage = JSON.parse(data);
    if (Array.isArray(parsedMessage)) {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
}
