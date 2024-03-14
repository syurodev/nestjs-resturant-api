"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaDetailResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const areas_entity_1 = require("../areas.entity/areas.entity");
class AreaDetailResponse {
    constructor(area) {
        this.area = area;
    }
    ;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        default: "",
        example: "",
        description: "thông tin của khu vực",
    }),
    __metadata("design:type", areas_entity_1.Areas)
], AreaDetailResponse.prototype, "area", void 0);
exports.AreaDetailResponse = AreaDetailResponse;
//# sourceMappingURL=area-detail.response.js.map