var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Adapter } from './Adapter';
import { Method } from '../enums/Method';
import { ApiException } from '../exceptions/ApiException';
export class RestAdapter extends Adapter {
    request(path, method = Method.GET, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = this.buildRequestOptions(method, options);
            const url = this.buildRequestUrl(path);
            const response = yield fetch(url, requestOptions);
            if (!response.ok) {
                const error = yield response.json();
                const { ApiExceptionClass = ApiException } = this.config;
                throw instantiateError(ApiExceptionClass, error);
            }
            return response;
        });
    }
    buildPath(modelClass, modelKey) {
        const path = this.getPathForType(modelClass);
        const uriParts = [path];
        if (modelKey)
            uriParts.push(modelKey.toString());
        return uriParts.join('/');
    }
    buildRequestUrl(uri) {
        const { baseUrl, namespace } = this.config;
        if (!baseUrl && !namespace)
            return `/${uri}`;
        else
            return [baseUrl, namespace, uri].filter(part => !!part).join('/');
    }
    getPathForType(modelClass) {
        return modelClass.getPath();
    }
}
function instantiateError(errorClass, error) {
    return new errorClass(error);
}
