export class ApiException {
    constructor(exception) {
        this.message = exception.message || 'Unknown API error';
    }
}
