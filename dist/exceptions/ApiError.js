export class ApiError {
    constructor(apiError) {
        this.message = apiError.message || 'Unknown API error';
    }
}
