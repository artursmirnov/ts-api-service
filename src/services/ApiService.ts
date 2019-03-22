import { Method } from '../enums/Method';
import { ApiException } from '../exceptions/ApiException';
import { ApiModel, IApiModelClass } from '../models/ApiModel';
import { IAdapterConfig, Adapter } from '../adapters/Adapter';

export class ApiService {

  protected config: IApiServiceConfig = {
    baseUrl: '/',
    namespace: '',
    ApiExceptionClass: ApiException,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  public async listRecords<T extends ApiModel>(modelClass: IApiModelClass<T>, options: RequestInit = {}) : Promise<T[]> {
    const adapter = this.adapterFor(modelClass);
    const path = adapter.buildPath(modelClass);
    const response = await adapter.request(path, Method.GET, options);
    return await response.json() as T[];
  }

  public async findRecord<T extends ApiModel>(modelClass: IApiModelClass<T>, id: TModelKey, options: RequestInit = {}) : Promise<T> {
    const adapter = this.adapterFor(modelClass);
    const path = adapter.buildPath(modelClass, id);
    const response = await adapter.request(path, Method.GET, options);
    return await response.json() as T;
  }

  public async createRecord<T extends ApiModel>(modelClass: IApiModelClass<T>, data: T, options: RequestInit = {}) : Promise<T> {
    const adapter = this.adapterFor(modelClass);
    const path = adapter.buildPath(modelClass);
    const requestOptions = Object.assign({}, options, { body: JSON.stringify(data || {}) });
    const response = await adapter.request(path, Method.POST, requestOptions);
    return await response.json() as T;
  }

  public async updateRecord<T extends ApiModel>(modelClass: IApiModelClass<T>, id: TModelKey, data: T, options: RequestInit = {}) : Promise<T> {
    const adapter = this.adapterFor(modelClass);
    const path = adapter.buildPath(modelClass, id);
    const requestOptions = Object.assign({}, options, { body: JSON.stringify(data) });
    const response = await adapter.request(path, Method.PUT, requestOptions);
    return await response.json() as T;
  }

  public async deleteRecord<T extends ApiModel>(modelClass: IApiModelClass<T>, id: number, options: RequestInit = {}) : Promise<void> {
    const adapter = this.adapterFor(modelClass);
    const path = adapter.buildPath(modelClass, id);
    await adapter.request(path, Method.DELETE, options);
  }

  public adapterFor<T extends ApiModel>(modelClass: IApiModelClass<T>): Adapter {
    return modelClass.getAdapter(this.config);
  }

  public configure(config?: IApiServiceConfig): void {
    this.config = Object.assign({}, config, this.config);
  }

  constructor(config?: IApiServiceConfig) {
    this.configure(config);
  }

}

export interface IApiServiceConfig extends IAdapterConfig {
}

export type TModelKey = string | number;
