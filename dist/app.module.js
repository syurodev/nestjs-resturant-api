"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_v1_module_1 = require("./app.v1.module");
const app_v2_module_1 = require("./app.v2.module");
const health_check_module_1 = require("./health-check/health-check.module");
const utils_bearer_token_common_1 = require("./utils.common/utils.middleware.common/utils.bearer-token.common");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(utils_bearer_token_common_1.AuthenticationMiddleware)
            .exclude({ path: "/public/health-check", method: common_1.RequestMethod.GET }, {
            path: `v1/auth/login`,
            method: common_1.RequestMethod.POST,
        }, {
            path: "v1/employees/register",
            method: common_1.RequestMethod.POST,
        }, {
            path: `v2/auth/login`,
            method: common_1.RequestMethod.POST,
        }, {
            path: "v2/employees/register",
            method: common_1.RequestMethod.POST,
        })
            .forRoutes({ path: "*", method: common_1.RequestMethod.ALL });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ".env",
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: process.env.CONFIG_MYSQL_HOST,
                port: parseInt(process.env.CONFIG_MYSQL_PORT),
                username: process.env.CONFIG_MYSQL_USERNAME,
                password: process.env.CONFIG_MYSQL_PASSWORD,
                database: process.env.CONFIG_MYSQL_DB_NAME,
                entities: ["dist/**/*.entity{.ts,.js}"],
                multipleStatements: true,
                dateStrings: true,
            }),
            health_check_module_1.HealthCheckModule,
            app_v1_module_1.AppV1Module,
            app_v2_module_1.AppV2Module,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map