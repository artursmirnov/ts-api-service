import { IException, Exception } from './Exception';

export interface IApiException extends IException {
}

export class ApiException extends Exception {
  protected defaultMessage: string = 'Unknown API error';
}
