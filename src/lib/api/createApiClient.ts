import axios, { AxiosError } from "axios";

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function createApiClient(baseURL?: string) {
  const client = axios.create({
    baseURL,
    timeout: 15_000,
    headers: { Accept: "application/json" },
  });
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string }>) =>
      Promise.reject(
        new ApiError(
          error.response?.data?.message ?? "Không thể kết nối máy chủ.",
          error.response?.status,
        ),
      ),
  );
  return client;
}

export function getApiErrorMessage(error: unknown) {
  return error instanceof ApiError ? error.message : "Đã có lỗi xảy ra. Vui lòng thử lại.";
}
