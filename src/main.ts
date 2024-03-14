import {
  HttpException,
  HttpStatus,
  LogLevel,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as moment from "moment-timezone";
import { AppModule } from "./app.module";
import { ExceptionResponseDetail } from "./utils.common/utils.exception.common/utils.exception.common";

async function bootstrap() {
  let app = await NestFactory.create(AppModule, {
    logger: process.env.CONFIG_LOGGER_LEVEL.split(",").filter(
      (level: string): level is LogLevel => {
        return ["log", "error", "warn", "debug", "verbose"].includes(
          level as LogLevel
        );
      }
    ),
  });

  //Thêm config retry GRPC client 3 lần
  const retryOptions = {
    max_retries: 3, // Set the maximum number of retries
    initial_backoff_ms: 1000, // Initial backoff time in milliseconds
    max_backoff_ms: 5000, // Maximum backoff time in milliseconds
    backoff_multiplier: 1.5, // Backoff multiplier
    retryable_status_codes: [14], // Status codes to retry
  };

  moment.tz.setDefault("Asia/Ho_Chi_Minh");
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${process.env.GRPC_SERVICE_PORT}`,
      package: [
        // "vn.techres.microservice.grpc.nestjs_health_check.check_update_temporary_price.token"
      ],
      protoPath: [
        // join(__dirname, "v1/food-health-check/food-health-check-proto/food-update-temporary-price.proto")
      ],
      keepalive: {
        keepaliveTimeMs: 60000,
        keepaliveTimeoutMs: 20000,
        keepalivePermitWithoutCalls: 0,
        ...(retryOptions && { retry: retryOptions }),
      },
      loader: {
        keepCase: true,
      },
    },
  });
  app.startAllMicroservices();

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix("/api");

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        throw new HttpException(
          new ExceptionResponseDetail(
            HttpStatus.BAD_REQUEST,
            Object.values(validationErrors[0].constraints)[0]
          ),
          HttpStatus.OK
        );
      },
    })
  );

  const config = new DocumentBuilder()
    .setTitle("TRAINING-NESTJS")
    .setDescription(``)
    .setVersion("1.0")
    .setBasePath("api")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "access-token"
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.enableCors();
  await app.listen(process.env.SERVICE_PORT, "0.0.0.0");

  console.log(
    `Application is run ${await app.getUrl()}`
  );

  console.log(`==============================ENV===============
    SERVICE_PORT:${process.env.SERVICE_PORT}, 
    GRPC_SERVICE_PORT :${process.env.GRPC_SERVICE_PORT},

    SERVICE_PORT:${process.env.CONFIG_MYSQL_HOST}, 
    GRPC_SERVICE_PORT :${process.env.CONFIG_MYSQL_PORT},
    SERVICE_PORT:${process.env.CONFIG_MYSQL_USERNAME}, 
    SERVICE_PORT:${process.env.CONFIG_MYSQL_DB_NAME}, 

    GRPC_SERVICE_PORT :${process.env.CONFIG_BUILD_NUMBER}
    GRPC_SERVICE_PORT :${process.env.CONFIG_BUILD_TIME}
    
    GRPC_SERVICE_PORT :${process.env.CONFIG_LOGGER_LEVEL}

==============================ENV==============================`);
}

bootstrap();
