import { Adapter, IAdapterConfig } from '../adapters/Adapter';
export interface IApiModelClass<T extends ApiModel> {
    new (): T;
    getPath(): string;
    getAdapter(config?: IAdapterConfig): Adapter;
}
export declare abstract class ApiModel {
    static getPath(): string;
    static getAdapter(config?: IAdapterConfig): Adapter;
}
