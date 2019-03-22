export class Exception extends Error {

  public message: string;

  protected defaultMessage: string = 'Unknown error';

  constructor(message: string) {
    super(...arguments);
    this.message = message || this.defaultMessage;
  }
}
