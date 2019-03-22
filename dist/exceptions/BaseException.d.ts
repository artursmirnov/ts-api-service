export interface IApiException {
    message: string;
}
export declare class ApiException {
    message: string;
    constructor(exception: IApiException);
}
