"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsResponse = void 0;
class RestaurantsResponse {
    constructor(restaurant) {
        this.id = restaurant === null || restaurant === void 0 ? void 0 : restaurant.id;
        this.employee_id = restaurant === null || restaurant === void 0 ? void 0 : restaurant.employee_id;
        this.name = restaurant === null || restaurant === void 0 ? void 0 : restaurant.name;
        this.created_at = restaurant === null || restaurant === void 0 ? void 0 : restaurant.created_at;
    }
    mapToList(list) {
        const result = list.map((item) => (new RestaurantsResponse(item)));
        return result;
    }
}
exports.RestaurantsResponse = RestaurantsResponse;
//# sourceMappingURL=restaurants.response.js.map