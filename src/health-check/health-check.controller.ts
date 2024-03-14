import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { Response } from "express";
import { ResponseData } from "src/utils.common/utils.response.common/utils.response.common";
import { HealthCheckResponse } from "./health-check.response/health-check.response";

@Controller("/public/health-check")
export class HealthCheckController {
  @Get("")
  public healthCheck(@Res() res: Response) {
    let response: ResponseData = new ResponseData();
    response.setData(
      new HealthCheckResponse(
        process.env.CONFIG_BUILD_NUMBER,
        process.env.CONFIG_BUILD_TIME
      )
    );
    return res.status(HttpStatus.OK).send(response);
  }
}
