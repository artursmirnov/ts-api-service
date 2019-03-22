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
        this.config = {
            baseUrl: '/',
            namespace: '',
            ApiExceptionClass: ApiException,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        this.configure(config);
    }
    listRecords(modelClass, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const adapter = this.adapterFor(modelClass);
            const path = adapter.buildPath(modelClass);
            const response = yield adapter.request(path, Method.GET, options);
            return yield response.json();
        });
    }
    findRecord(modelClass, id, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const adapter = this.adapterFor(modelClass);
            const path = adapter.buildPath(modelClass, id);
            const response = yield adapter.request(path, Method.GET, options);
            return yield response.json();
        });
    }
    createRecord(modelClass, data, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const adapter = this.adapterFor(modelClass);
            const path = adapter.buildPath(modelClass);
            const requestOptions = Object.assign({}, options, { body: JSON.stringify(data || {}) });
            const response = yield adapter.request(path, Method.POST, requestOptions);
            return yield response.json();
        });
    }
    updateRecord(modelClass, id, data, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const adapter = this.adapterFor(modelClass);
            const path = adapter.buildPath(modelClass, id);
            const requestOptions = Object.assign({}, options, { body: JSON.stringify(data) });
            const response = yield adapter.request(path, Method.PUT, requestOptions);
            return yield response.json();
        });
    }
    deleteRecord(modelClass, id, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const adapter = this.adapterFor(modelClass);
            const path = adapter.buildPath(modelClass, id);
            yield adapter.request(path, Method.DELETE, options);
        });
    }
    adapterFor(modelClass) {
        return modelClass.getAdapter(this.config);
    }
    configure(config) {
        this.config = Object.assign({}, config, this.config);
    }
}
