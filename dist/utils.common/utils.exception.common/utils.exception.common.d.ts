import { HttpStatus } from "@nestjs/common";
export declare class ExceptionResponseDetail {
    private status;
    private message;
    private data;
    constructor(status?: HttpStatus, message?: string, data?: object);
    getStatus(): HttpStatus;
    setStatus(status: HttpStatus): void;
    getMessage(status: HttpStatus, message: string): string;
    setMessage(message: string): void;
    getData(): object;
    setData(data: object): void;
}
