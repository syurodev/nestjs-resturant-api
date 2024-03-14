"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesResponse = void 0;
class BranchesResponse {
    constructor(branches) {
        this.id = branches === null || branches === void 0 ? void 0 : branches.id;
        this.employee_id = branches === null || branches === void 0 ? void 0 : branches.employee_id;
        this.restaurant_id = branches === null || branches === void 0 ? void 0 : branches.restaurant_id;
        this.restaurant_brand_id = branches === null || branches === void 0 ? void 0 : branches.restaurant_brand_id;
        this.name = branches === null || branches === void 0 ? void 0 : branches.name;
        this.created_at = branches === null || branches === void 0 ? void 0 : branches.created_at;
    }
    mapToList(list) {
        const result = list.map((item) => (new BranchesResponse(item)));
        return result;
    }
}
exports.BranchesResponse = BranchesResponse;
//# sourceMappingURL=branches.response.js.map