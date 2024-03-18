"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantBrandsResponse = void 0;
class RestaurantBrandsResponse {
    constructor(brand) {
        this.id = brand === null || brand === void 0 ? void 0 : brand.id;
        this.employee_id = brand === null || brand === void 0 ? void 0 : brand.employee_id;
        this.restaurant_id = brand === null || brand === void 0 ? void 0 : brand.restaurant_id;
        this.name = brand === null || brand === void 0 ? void 0 : brand.name;
        this.created_at = brand === null || brand === void 0 ? void 0 : brand.created_at;
    }
    mapToList(list) {
        const result = list.map((item) => (new RestaurantBrandsResponse(item)));
        return result;
    }
}
exports.RestaurantBrandsResponse = RestaurantBrandsResponse;
//# sourceMappingURL=restaurant-brands.response.js.map