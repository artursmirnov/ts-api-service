import { Method } from '../enums/Method';
import { ApiModel, IApiModelClass } from '../models/ApiModel';
import { TModelKey } from '../services/ApiService';
export interface IAdapterConfig {
    baseUrl?: string;
    namespace?: string;
    ApiExceptionClass?: AnyErrorClass;
    headers?: HeadersInit;
}
export declare abstract class Adapter {
    protected config: IAdapterConfig;
    configure(config?: IAdapterConfig): void;
    constructor(config?: IAdapterConfig);
    protected buildRequestOptions(method: Method, options?: RequestInit): RequestInit;
    protected buildHeaders(headers?: HeadersInit): HeadersInit;
    abstract request(path: string, method: Method, options: RequestInit): Promise<Response>;
    abstract buildPath<T extends ApiModel>(modelClass: IApiModelClass<T>, modelKey?: TModelKey): string;
}
declare type AnyErrorClass = {
    new (error: any, ...args: any[]): any;
};
export {};
