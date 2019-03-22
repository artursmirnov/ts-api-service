import { IException, Exception } from './Exception';
export interface IApiException extends IException {
}
export declare class ApiException extends Exception {
    protected defaultMessage: string;
}
