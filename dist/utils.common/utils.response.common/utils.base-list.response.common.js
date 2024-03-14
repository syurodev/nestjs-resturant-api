"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseListResponseData = void 0;
class BaseListResponseData {
    constructor(list, limit, total_record) {
        this.list = list ? list : [];
        this.limit = limit ? +limit : 0;
        this.total_record = total_record ? +total_record : 0;
    }
    getData() {
        return this.list;
    }
    setData(list) {
        this.list = list;
    }
}
exports.BaseListResponseData = BaseListResponseData;
//# sourceMappingURL=utils.base-list.response.common.js.map