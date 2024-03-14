"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const moment = require("moment-timezone");
const app_module_1 = require("./app.module");
const utils_exception_common_1 = require("./utils.common/utils.exception.common/utils.exception.common");
async function bootstrap() {
    let app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: process.env.CONFIG_LOGGER_LEVEL.split(",").filter((level) => {
            return ["log", "error", "warn", "debug", "verbose"].includes(level);
        }),
    });
    const retryOptions = {
        max_retries: 3,
        initial_backoff_ms: 1000,
        max_backoff_ms: 5000,
        backoff_multiplier: 1.5,
        retryable_status_codes: [14],
    };
    moment.tz.setDefault("Asia/Ho_Chi_Minh");
    await app.connectMicroservice({
        transport: microservices_1.Transport.GRPC,
        options: {
            url: `0.0.0.0:${process.env.GRPC_SERVICE_PORT}`,
            package: [],
            protoPath: [],
            keepalive: Object.assign({ keepaliveTimeMs: 60000, keepaliveTimeoutMs: 20000, keepalivePermitWithoutCalls: 0 }, (retryOptions && { retry: retryOptions })),
            loader: {
                keepCase: true,
            },
        },
    });
    app.startAllMicroservices();
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.setGlobalPrefix("/api");
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: (validationErrors = []) => {
            throw new common_1.HttpException(new utils_exception_common_1.ExceptionResponseDetail(common_1.HttpStatus.BAD_REQUEST, Object.values(validationErrors[0].constraints)[0]), common_1.HttpStatus.OK);
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("TRAINING-NESTJS")
        .setDescription(``)
        .setVersion("1.0")
        .setBasePath("api")
        .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT" }, "access-token")
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    app.enableCors();
    await app.listen(process.env.SERVICE_PORT, "0.0.0.0");
    console.log(`Application is run ${await app.getUrl()}`);
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
//# sourceMappingURL=main.js.map