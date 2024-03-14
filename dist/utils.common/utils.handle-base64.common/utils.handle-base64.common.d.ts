export declare class HandleBase64 {
    private api_key;
    private password;
    constructor(api_key?: string, password?: string);
    static generateApiKey(api_key: string): string;
    static verifyApiKey(api_key: string): string;
    static splitRefeshToken(api_key: string): string;
    static decodePasswordBase64(password: string): Promise<string>;
    static decodeSecretKey(api_key: string): string;
    getApi_key(): string;
    setApi_key(api_key: string): void;
    getPassword(): string;
    setPassword(password: string): void;
}
