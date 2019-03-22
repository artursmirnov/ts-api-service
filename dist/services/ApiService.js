var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Method } from '../enums/Method';
import { ApiException } from '../exceptions/ApiException';
export class ApiService {
    constructor(config) {
        this.baseUrl = '/';
        this.namespace = '';
        this.ApiExceptionClass = ApiException;
        this.headers = {
            'Content-Type': 'application/json'
        };
        if (config)
            this.configure(config);
    }
    listRecords(modelClass, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = this.buildResourceUri(modelClass);
            const response = yield this.request(uri, Method.GET, options);
            return yield response.json();
        });
    }
    findRecord(modelClass, id, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = this.buildResourceUri(modelClass, id);
            const response = yield this.request(uri, Method.GET, options);
            return yield response.json();
        });
    }
    createRecord(modelClass, data, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = this.buildResourceUri(modelClass);
            const requestOptions = Object.assign({}, options, { body: JSON.stringify(data) });
            const response = yield this.request(uri, Method.POST, requestOptions);
            return yield response.json();
        });
    }
    updateRecord(modelClass, id, data, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = this.buildResourceUri(modelClass, id);
            const requestOptions = Object.assign({}, options, { body: JSON.stringify(data) });
            const response = yield this.request(uri, Method.PUT, requestOptions);
            return yield response.json();
        });
    }
    deleteRecord(modelClass, id, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = this.buildResourceUri(modelClass, id);
            yield this.request(uri, Method.DELETE);
        });
    }
    request(uri, method = Method.GET, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = this.buildRequestOptions(method, options);
            const url = this.buildRequestUrl(uri);
            const response = yield fetch(url, requestOptions);
            if (!response.ok) {
                const error = yield response.json();
                throw new this.ApiExceptionClass(error);
            }
            return response;
        });
    }
    configure(config) {
        this.baseUrl = config.baseUrl || this.baseUrl;
        this.namespace = config.namespace || this.namespace;
        this.ApiExceptionClass = config.ApiExceptionClass || this.ApiExceptionClass;
        this.headers = config.headers || this.headers;
    }
    getPathForType(modelClass) {
        return modelClass.getPath();
    }
    buildRequestOptions(method, options = {}) {
        const headers = this.buildHeaders(options.headers);
        return Object.assign({}, options, { method, headers });
    }
    buildHeaders(headers = {}) {
        return Object.assign({}, this.headers, headers);
    }
    buildResourceUri(modelClass, modelKey) {
        const path = this.getPathForType(modelClass);
        const uriParts = [path];
        if (modelKey)
            uriParts.push(modelKey.toString());
        return uriParts.join('/');
    }
    buildRequestUrl(uri) {
        const { baseUrl, namespace } = this;
        if (!baseUrl && !namespace)
            return `/${uri}`;
        else
            return [baseUrl, namespace, uri].filter(part => !!part).join('/');
    }
}
