"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreasResponse = void 0;
class AreasResponse {
    constructor(areas) {
        this.id = areas === null || areas === void 0 ? void 0 : areas.id;
        this.employee_id = areas === null || areas === void 0 ? void 0 : areas.employee_id;
        this.restaurant_id = areas === null || areas === void 0 ? void 0 : areas.restaurant_id;
        this.restaurant_brand_id = areas === null || areas === void 0 ? void 0 : areas.restaurant_brand_id;
        this.branch_id = areas === null || areas === void 0 ? void 0 : areas.branch_id;
        this.name = areas === null || areas === void 0 ? void 0 : areas.name;
        this.created_at = areas === null || areas === void 0 ? void 0 : areas.created_at;
    }
    mapToList(list) {
        const result = list.map((item) => (new AreasResponse(item)));
        return result;
    }
}
exports.AreasResponse = AreasResponse;
//# sourceMappingURL=areas.response.js.map