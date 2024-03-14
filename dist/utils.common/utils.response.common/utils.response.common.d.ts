import { HttpStatus } from "@nestjs/common";
export declare class ResponseData {
    private status;
    private message;
    private data;
    constructor(status?: number, message?: string, data?: Object);
    getStatus(): HttpStatus;
    setStatus(status: HttpStatus): void;
    getMessage(): string;
    setMessage(status: HttpStatus, message: string): void;
    getData(): Object;
    setData(data: Object): void;
}
