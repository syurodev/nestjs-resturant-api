import { DecodeBearerTokenInterFace } from "./utils.decode-token.interface.common";
export declare class DecodeToken {
    token: string;
    secret_key: string;
    constructor(token?: string, secret_key?: string);
    verifyBearerToken: (bearerToken: string, secretKey: string) => Promise<DecodeBearerTokenInterFace>;
    splitBearerToken: (token: string) => string;
}
