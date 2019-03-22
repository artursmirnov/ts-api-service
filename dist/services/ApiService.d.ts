import { Method } from '../enums/Method';
import { ApiModel, IApiModelCtor } from '../models/ApiModel';
export declare class ApiService {
    protected baseUrl: string;
    protected namespace: string;
    protected ApiExceptionClass: AnyErrorClass;
    protected headers: HeadersInit;
    listRecords<T extends ApiModel>(modelClass: IApiModelCtor<T>, options?: RequestInit): Promise<T[]>;
    findRecord<T extends ApiModel>(modelClass: IApiModelCtor<T>, id: TModelKey, options?: RequestInit): Promise<T>;
    createRecord<T extends ApiModel>(modelClass: IApiModelCtor<T>, data: T, options?: RequestInit): Promise<T>;
    updateRecord<T extends ApiModel>(modelClass: IApiModelCtor<T>, id: TModelKey, data: T, options?: RequestInit): Promise<T>;
    deleteRecord<T extends ApiModel>(modelClass: IApiModelCtor<T>, id: number, options?: RequestInit): Promise<void>;
    request(uri: string, method?: Method, options?: RequestInit): Promise<Response>;
    configure(config: IApiServiceConfig): void;
    protected getPathForType<T extends ApiModel>(modelClass: IApiModelCtor<T>): string;
    protected buildRequestOptions(method: Method, options?: RequestInit): RequestInit;
    protected buildHeaders(headers?: HeadersInit): HeadersInit;
    protected buildResourceUri<T extends ApiModel>(modelClass: IApiModelCtor<T>, modelKey?: TModelKey): string;
    protected buildRequestUrl(uri: string): string;
    constructor(config?: IApiServiceConfig);
}
export interface IApiServiceConfig {
    baseUrl?: string;
    namespace?: string;
    ApiExceptionClass?: AnyErrorClass;
    headers?: HeadersInit;
}
export declare type TModelKey = string | number;
declare type AnyErrorClass = {
    new (error: any, ...args: any[]): any;
};
export {};
