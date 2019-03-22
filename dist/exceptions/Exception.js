export class Exception {
    constructor(exception) {
        this.defaultMessage = 'Unknown error';
        this.message = exception.message || this.defaultMessage;
    }
}
