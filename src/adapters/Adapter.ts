import { ApiException } from '../exceptions/ApiException';
import { Method } from '../enums/Method';
import { ApiModel, IApiModelClass } from '../models/ApiModel';
import { TModelKey } from '../services/ApiService';

export interface IAdapterConfig {
  baseUrl?: string;
  namespace?: string;
  ApiExceptionClass?: AnyErrorClass;
  headers?: HeadersInit;
}

export abstract class Adapter {

  protected config: IAdapterConfig = {
    baseUrl: '/',
    namespace: '',
    ApiExceptionClass: ApiException
  }

  public configure(config?: IAdapterConfig): void {
    this.config = Object.assign({}, config, this.config);
  }

  constructor(config?: IAdapterConfig) {
    this.configure(config);
  }

  protected buildRequestOptions(method: Method, options: RequestInit = {}): RequestInit {
    const headers = this.buildHeaders(options.headers);
    return Object.assign({}, options, { method, headers });
  }

  protected buildHeaders(headers: HeadersInit = {}): HeadersInit {
    return Object.assign({}, this.config.headers, headers);
  }

  public abstract async request(path: string, method: Method, options: RequestInit): Promise<Response>

  public abstract buildPath<T extends ApiModel>(modelClass: IApiModelClass<T>, modelKey?: TModelKey): string;

}

type AnyErrorClass = { new(error: any, ...args: any[]): any; }
