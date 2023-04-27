export class ApiResponse<T> {
  success: boolean;

  data: T[] | T;

  message?: string;
}
