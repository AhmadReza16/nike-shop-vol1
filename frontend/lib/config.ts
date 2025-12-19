// Frontend Configuration
// API settings و environment variables

export const API_CONFIG = {
  // Backend API URL
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  
  // Timeout برای requests (ms)
  timeout: 30000,
  
  // Retry attempts
  retryAttempts: 3,
  retryDelay: 1000,
  
  // Endpoints
  endpoints: {
    products: '/products',
    brands: '/brands',
    categories: '/categories',
    colors: '/colors',
    sizes: '/sizes',
    genders: '/genders',
    variants: '/variants',
    images: '/images',
  },
};

export const APP_CONFIG = {
  // نام اپلیکیشن
  appName: 'Nike Shop',
  
  // توضیح اپلیکیشن
  description: 'فروشگاه آنلاین کفش‌های Nike',
  
  // محدودیت‌های محصولات
  products: {
    defaultLimit: 10,
    maxLimit: 100,
    defaultPage: 1,
  },
  
  // تنظیمات caching
  cache: {
    enabled: true,
    duration: 5 * 60 * 1000, // 5 دقیقه
  },
  
  // تنظیمات pagination
  pagination: {
    defaultPageSize: 10,
    pageSizes: [10, 20, 50],
  },
};

export const UI_CONFIG = {
  // رنگ‌های اصلی
  colors: {
    primary: '#000000', // dark-900
    secondary: '#FFFFFF',
    accent: '#FF6B6B',
  },
  
  // اندازه‌های عنصرها
  sizes: {
    header: '64px',
    sidebar: '280px',
    containerMax: '1280px',
  },
  
  // breakpoints
  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

// Helper functions
export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};

export const getProductsUrl = (filters?: Record<string, any>) => {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
  }
  return `${getApiUrl(API_CONFIG.endpoints.products)}?${params.toString()}`;
};
