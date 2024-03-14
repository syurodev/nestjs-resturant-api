import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppV1Module } from "./app.v1.module";
import { AppV2Module } from "./app.v2.module";
import { HealthCheckModule } from "./health-check/health-check.module";
import { AuthenticationMiddleware } from "./utils.common/utils.middleware.common/utils.bearer-token.common";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
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
    HealthCheckModule,
    AppV1Module,
    AppV2Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude(
        { path: "/public/health-check", method: RequestMethod.GET },
        {
          path: `v1/auth/login`,
          method: RequestMethod.POST,
        },
        {
          path: "v1/employees/register",
          method: RequestMethod.POST,
        },
        {
          path: `v2/auth/login`,
          method: RequestMethod.POST,
        },
        {
          path: "v2/employees/register",
          method: RequestMethod.POST,
        }
      )
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
