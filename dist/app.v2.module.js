"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppV2Module = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./v2/auth/auth.module");
const employee_module_1 = require("./v2/employee/employee.module");
const restaurant_module_1 = require("./v2/restaurant/restaurant.module");
const restaurant_brand_module_1 = require("./v2/restaurant-brand/restaurant-brand.module");
const branches_module_1 = require("./v2/branches/branches.module");
const areas_module_1 = require("./v2/areas/areas.module");
const tables_module_1 = require("./v2/tables/tables.module");
let AppV2Module = class AppV2Module {
};
AppV2Module = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ".env",
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            employee_module_1.EmployeeModule,
            restaurant_module_1.RestaurantModule,
            restaurant_brand_module_1.RestaurantBrandModule,
            branches_module_1.BranchesModule,
            areas_module_1.AreasModule,
            tables_module_1.TablesModule,
        ],
        controllers: [],
        providers: [],
    })
], AppV2Module);
exports.AppV2Module = AppV2Module;
//# sourceMappingURL=app.v2.module.js.map