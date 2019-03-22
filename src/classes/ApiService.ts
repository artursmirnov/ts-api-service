import { Method } from '../enums/Method';
import { ApiError } from './ApiError';
import { ApiModel, IApiModelCtor } from './ApiModel';

export class ApiService {

  protected baseUrl: string = '/';
  protected namespace: string = '';
  protected ApiExceptionClass: AnyErrorClass = ApiError;

  protected headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  public async listRecords<T extends ApiModel>(modelClass: IApiModelCtor<T>, options: RequestInit = {}) : Promise<T[]> {
    const uri = this.buildResourceUri(modelClass);
    const response = await this.request(uri, Method.GET, options);
    return await response.json() as T[];
  }

  public async findRecord<T extends ApiModel>(modelClass: IApiModelCtor<T>, id: TModelKey, options: RequestInit = {}) : Promise<T> {
    const uri = this.buildResourceUri(modelClass, id);
    const response = await this.request(uri, Method.GET, options);
    return await response.json() as T;
  }

  public async createRecord<T extends ApiModel>(modelClass: IApiModelCtor<T>, data: T, options: RequestInit = {}) : Promise<T> {
    const uri = this.buildResourceUri(modelClass);
    const requestOptions = Object.assign({}, options, { body: JSON.stringify(data) });
    const response = await this.request(uri, Method.POST, requestOptions);
    return await response.json() as T;
  }

  public async updateRecord<T extends ApiModel>(modelClass: IApiModelCtor<T>, id: TModelKey, data: T, options: RequestInit = {}) : Promise<T> {
    const uri = this.buildResourceUri(modelClass, id);
    const requestOptions = Object.assign({}, options, { body: JSON.stringify(data) });
    const response = await this.request(uri, Method.PUT, requestOptions);
    return await response.json() as T;
  }

  public async deleteRecord<T extends ApiModel>(modelClass: IApiModelCtor<T>, id: number, options: RequestInit = {}) : Promise<void> {
    const uri = this.buildResourceUri(modelClass, id);
    await this.request(uri, Method.DELETE);
  }

  public async request(uri: string, method: Method = Method.GET, options: RequestInit = {}): Promise<Response> {
    const requestOptions = this.buildRequestOptions(method, options);
    const url = this.buildRequestUrl(uri);

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const error = await response.json();
      throw new this.ApiExceptionClass(error);
    }

    return response;
  }

  public configure(config: IApiServiceConfig): void {
    this.baseUrl = config.baseUrl || this.baseUrl;
    this.namespace = config.namespace || this.namespace;
    this.ApiExceptionClass = config.ApiExceptionClass || this.ApiExceptionClass;
    this.headers = config.headers || this.headers;
  }

  protected getPathForType<T extends ApiModel>(modelClass: IApiModelCtor<T>): string {
    return modelClass.getPath();
  }

  protected buildRequestOptions(method: Method, options: RequestInit = {}): RequestInit {
    const headers = this.buildHeaders(options.headers);
    return Object.assign({}, options, { method, headers });
  }

  protected buildHeaders(headers: HeadersInit = {}): HeadersInit {
    return Object.assign({}, this.headers, headers);
  }

  protected buildResourceUri<T extends ApiModel>(modelClass: IApiModelCtor<T>, modelKey?: TModelKey): string {
    const path = this.getPathForType(modelClass);
    const uriParts = [ path ];
    if (modelKey)
      uriParts.push(modelKey.toString());
    return uriParts.join('/');
  }

  protected buildRequestUrl(uri: string): string {
    const { baseUrl, namespace } = this;
    if (!baseUrl && !namespace)
      return `/${uri}`;
    else
      return [ baseUrl, namespace, uri ].filter(part => !!part).join('/');
  }

  constructor(config?: IApiServiceConfig) {
    if (config)
      this.configure(config);
  }

}

export interface IApiServiceConfig {
  baseUrl?: string;
  namespace?: string;
  ApiExceptionClass?: AnyErrorClass;
  headers?: HeadersInit;
}

export type TModelKey = string | number;

type AnyErrorClass = { new(error: any, ...args: any[]): any; }
