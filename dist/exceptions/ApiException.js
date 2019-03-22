import { Exception } from './Exception';
export class ApiException extends Exception {
    constructor(exception) {
        super(exception.message);
        this.defaultMessage = 'Unknown API error';
    }
}
