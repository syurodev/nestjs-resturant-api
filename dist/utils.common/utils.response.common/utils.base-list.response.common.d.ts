export declare class BaseListResponseData<T> {
    private list;
    private limit;
    private total_record;
    constructor(list?: any, limit?: number, total_record?: number);
    getData(): Object;
    setData(list: T[]): void;
}
