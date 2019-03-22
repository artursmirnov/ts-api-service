export interface IException {
    message: string;
}
export declare class Exception {
    message: string;
    protected defaultMessage: string;
    constructor(exception: IException);
}
