export interface IApiError {
  message: string;
}

export class ApiError {
  public message: string;

  constructor(apiError: IApiError) {
    this.message = apiError.message || 'Unknown API error';
  }
}
