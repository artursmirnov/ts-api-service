import { Adapter } from './Adapter';
import { Method } from '../enums/Method';
import { TModelKey } from '../services/ApiService';
import { ApiModel, IApiModelClass } from '../models/ApiModel';
import { ApiException, IApiException } from '../exceptions/ApiException';

export class RestAdapter extends Adapter {

  public async request(path: string, method: Method = Method.GET, options: RequestInit = {}): Promise<Response> {
    const requestOptions = this.buildRequestOptions(method, options);
    const url = this.buildRequestUrl(path);

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const error = await response.json();
      const { ApiExceptionClass = ApiException } = this.config;
      throw instantiateError(ApiExceptionClass, error);
    }

    return response;
  }

  public buildPath<T extends ApiModel>(modelClass: IApiModelClass<T>, modelKey?: TModelKey): string {
    const path = this.getPathForType(modelClass);
    const uriParts = [ path ];
    if (modelKey)
      uriParts.push(modelKey.toString());
    return uriParts.join('/');
  }

  protected buildRequestUrl(uri: string): string {
    const { baseUrl, namespace } = this.config;
    if (!baseUrl && !namespace)
      return `/${uri}`;
    else
      return [ baseUrl, namespace, uri ].filter(part => !!part).join('/');
  }

  protected getPathForType<T extends ApiModel>(modelClass: IApiModelClass<T>): string {
    return modelClass.getPath();
  }

}

function instantiateError<T>(errorClass: { new(error: IApiException): T }, error: IApiException): T {
  return new errorClass(error);
}
