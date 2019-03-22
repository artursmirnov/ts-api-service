export class Exception extends Error {
    constructor(message) {
        super(...arguments);
        this.defaultMessage = 'Unknown error';
        this.message = message || this.defaultMessage;
    }
}
