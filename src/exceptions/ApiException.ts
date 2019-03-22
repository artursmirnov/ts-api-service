import { Exception } from './Exception';

export interface IApiException {
  message: string;
}

export class ApiException extends Exception {
  protected defaultMessage: string = 'Unknown API error';

  constructor(exception: IApiException) {
    super(exception.message);
  }
}
