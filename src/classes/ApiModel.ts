export interface IApiModelCtor<T extends ApiModel> {
  new(): T;
  getPath(): string;
}

export abstract class ApiModel {

  public static getPath<T>(this: { new(): T }): string {
    return this.name;
  }

}
