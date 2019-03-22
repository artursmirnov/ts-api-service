import { ApiException } from '../exceptions/ApiException';
export class Adapter {
    constructor(config) {
        this.config = {
            baseUrl: '/',
            namespace: '',
            ApiExceptionClass: ApiException
        };
        this.configure(config);
    }
    configure(config) {
        this.config = Object.assign({}, config, this.config);
    }
    buildRequestOptions(method, options = {}) {
        const headers = this.buildHeaders(options.headers);
        return Object.assign({}, options, { method, headers });
    }
    buildHeaders(headers = {}) {
        return Object.assign({}, this.config.headers, headers);
    }
}
