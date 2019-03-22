export interface IApiError {
    message: string;
}
export declare class ApiError {
    message: string;
    constructor(apiError: IApiError);
}
