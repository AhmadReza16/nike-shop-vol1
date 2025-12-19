// API Error Handling
// کلاس‌ها و توابع برای مدیریت errors

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: any;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// خطاهای معمول
export const API_ERRORS = {
  NOT_FOUND: {
    status: 404,
    message: 'منبع پیدا نشد',
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'احراز هویت الزامی است',
  },
  FORBIDDEN: {
    status: 403,
    message: 'دسترسی غیرمجاز',
  },
  BAD_REQUEST: {
    status: 400,
    message: 'درخواست نامعتبر',
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'خطای سرور داخلی',
  },
  SERVICE_UNAVAILABLE: {
    status: 503,
    message: 'سرویس موقتاً دسترس‌پذیر نیست',
  },
  TIMEOUT: {
    status: 408,
    message: 'درخواست منقضی شد',
  },
  NETWORK_ERROR: {
    status: 0,
    message: 'خطای اتصال شبکه',
  },
};

// تابع برای دریافت پیام خطا
export const getErrorMessage = (error: any): string => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'خطای نامشخصی رخ داد';
};

// تابع برای handle کردن API errors
export const handleApiError = (error: any) => {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return {
      status: error.status,
      message: error.message,
      data: error.data,
    };
  }

  if (error?.response?.status) {
    return {
      status: error.response.status,
      message: getErrorMessage(error),
      data: error.response.data,
    };
  }

  return {
    status: 0,
    message: getErrorMessage(error),
    data: null,
  };
};

// Retry logic برای failed requests
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  baseDelay = 1000
): Promise<T> => {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt < maxAttempts - 1) {
        // Exponential backoff
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('All retry attempts failed');
};

// Validation errors
export const validateApiResponse = <T>(
  response: any,
  expectedFields?: (keyof T)[]
): response is ApiSuccessResponse<T> => {
  if (!response || typeof response !== 'object') {
    return false;
  }

  if (response.success !== true) {
    return false;
  }

  if (!response.data) {
    return false;
  }

  if (expectedFields && expectedFields.length > 0) {
    return expectedFields.every((field) => field in response.data);
  }

  return true;
};
