import { ApiModel, IApiModelClass } from '../models/ApiModel';
import { IAdapterConfig, Adapter } from '../adapters/Adapter';
export declare class ApiService {
    protected config: IApiServiceConfig;
    listRecords<T extends ApiModel>(modelClass: IApiModelClass<T>, options?: RequestInit): Promise<T[]>;
    findRecord<T extends ApiModel>(modelClass: IApiModelClass<T>, id: TModelKey, options?: RequestInit): Promise<T>;
    createRecord<T extends ApiModel>(modelClass: IApiModelClass<T>, data: T, options?: RequestInit): Promise<T>;
    updateRecord<T extends ApiModel>(modelClass: IApiModelClass<T>, id: TModelKey, data: T, options?: RequestInit): Promise<T>;
    deleteRecord<T extends ApiModel>(modelClass: IApiModelClass<T>, id: number, options?: RequestInit): Promise<void>;
    adapterFor<T extends ApiModel>(modelClass: IApiModelClass<T>): Adapter;
    configure(config?: IApiServiceConfig): void;
    constructor(config?: IApiServiceConfig);
}
export interface IApiServiceConfig extends IAdapterConfig {
}
export declare type TModelKey = string | number;
