import { Adapter } from './Adapter';
import { Method } from '../enums/Method';
import { TModelKey } from '../services/ApiService';
import { ApiModel, IApiModelClass } from '../models/ApiModel';
export declare class RestAdapter extends Adapter {
    request(path: string, method?: Method, options?: RequestInit): Promise<Response>;
    buildPath<T extends ApiModel>(modelClass: IApiModelClass<T>, modelKey?: TModelKey): string;
    protected buildRequestUrl(uri: string): string;
    protected getPathForType<T extends ApiModel>(modelClass: IApiModelClass<T>): string;
}
