import { ValidationOptions } from "class-validator";
export declare const RequestHeaderVerifyApiKey: (...dataOrPipes: unknown[]) => ParameterDecorator;
export declare const GetUserFromToken: (...dataOrPipes: unknown[]) => ParameterDecorator;
export declare const GetAdminFromToken: (...dataOrPipes: unknown[]) => ParameterDecorator;
export declare function UserAuthentication(bubble?: boolean): (target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) => void;
export declare function IsNotEmptyString(validationOptions?: ValidationOptions): (object: unknown, propertyName: string) => void;
export declare function IsInt(validationOptions?: ValidationOptions): (object: unknown, propertyName: string) => void;
