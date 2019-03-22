import { Exception } from './Exception';
export interface IApiException {
    message: string;
}
export declare class ApiException extends Exception {
    protected defaultMessage: string;
    constructor(exception: IApiException);
}
