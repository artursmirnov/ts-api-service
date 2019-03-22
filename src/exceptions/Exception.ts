export interface IException {
  message: string;
}

export class Exception {

  public message: string;

  protected defaultMessage: string = 'Unknown error';

  constructor(exception: IException) {
    this.message = exception.message || this.defaultMessage;
  }
}
