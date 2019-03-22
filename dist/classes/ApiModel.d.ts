export interface IApiModelCtor<T extends ApiModel> {
    new (): T;
    getPath(): string;
}
export declare abstract class ApiModel {
    static getPath<T>(this: {
        new (): T;
    }): string;
}
