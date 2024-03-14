"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablesResponse = void 0;
class TablesResponse {
    constructor(table) {
        this.id = table === null || table === void 0 ? void 0 : table.id;
        this.employee_id = table === null || table === void 0 ? void 0 : table.employee_id;
        this.restaurant_id = table === null || table === void 0 ? void 0 : table.restaurant_id;
        this.restaurant_brand_id = table === null || table === void 0 ? void 0 : table.restaurant_brand_id;
        this.area_id = table === null || table === void 0 ? void 0 : table.area_id;
        this.name = table === null || table === void 0 ? void 0 : table.name;
        this.created_at = table === null || table === void 0 ? void 0 : table.created_at;
    }
    mapToList(list) {
        const result = list.map((item) => (new TablesResponse(item)));
        return result;
    }
}
exports.TablesResponse = TablesResponse;
//# sourceMappingURL=tables.response.js.map