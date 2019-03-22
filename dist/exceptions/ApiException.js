import { Exception } from './Exception';
export class ApiException extends Exception {
    constructor() {
        super(...arguments);
        this.defaultMessage = 'Unknown API error';
    }
}
