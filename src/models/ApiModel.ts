import { Adapter, IAdapterConfig } from '../adapters/Adapter';
import { ConfigurationException } from '../exceptions/ConfigurationException';
import { RestAdapter } from '../adapters/RestAdapter';

export interface IApiModelClass<T extends ApiModel> {
  new(): T;
  getPath(): string;
  getAdapter(config?: IAdapterConfig): Adapter;
}

export abstract class ApiModel {

  public static getPath(): string {
    throw new ConfigurationException("Path is not defined for model");
  }

  public static getAdapter(config?: IAdapterConfig): Adapter {
    return new RestAdapter(config);
  }

}
