"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const areas_entity_1 = require("./areas.entity/areas.entity");
const areas_service_1 = require("./areas.service");
const areas_controller_1 = require("./areas.controller");
let AreasModule = class AreasModule {
};
AreasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([areas_entity_1.Areas]),
        ],
        providers: [areas_service_1.AreasService],
        controllers: [areas_controller_1.AreasController],
    })
], AreasModule);
exports.AreasModule = AreasModule;
//# sourceMappingURL=areas.module.js.map