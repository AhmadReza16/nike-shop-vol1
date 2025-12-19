const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

async function apiCall(endpoint: string, options: FetchOptions = {}) {
  const { method = 'GET', body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error( error);
    throw error;
  }
}

// Products API
export const productsAPI = {
  getAll: (filters?: Record<string, any>) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    return apiCall(`/products?${params.toString()}`);
  },

  getById: (id: string) => apiCall(`/products/${id}`),

  create: (data: any) => apiCall('/products', { method: 'POST', body: data }),

  update: (id: string, data: any) => apiCall(`/products/${id}`, { method: 'PUT', body: data }),

  delete: (id: string) => apiCall(`/products/${id}`, { method: 'DELETE' }),
};

// Brands API
export const brandsAPI = {
  getAll: () => apiCall('/brands'),

  getById: (id: string) => apiCall(`/brands/${id}`),

  create: (data: any) => apiCall('/brands', { method: 'POST', body: data }),

  update: (id: string, data: any) => apiCall(`/brands/${id}`, { method: 'PUT', body: data }),

  delete: (id: string) => apiCall(`/brands/${id}`, { method: 'DELETE' }),
};

// Categories API
export const categoriesAPI = {
  getAll: () => apiCall('/categories'),

  getById: (id: string) => apiCall(`/categories/${id}`),

  create: (data: any) => apiCall('/categories', { method: 'POST', body: data }),

  update: (id: string, data: any) => apiCall(`/categories/${id}`, { method: 'PUT', body: data }),

  delete: (id: string) => apiCall(`/categories/${id}`, { method: 'DELETE' }),
};

// Colors API
export const colorsAPI = {
  getAll: () => apiCall('/colors'),

  create: (data: any) => apiCall('/colors', { method: 'POST', body: data }),

  update: (id: string, data: any) => apiCall(`/colors/${id}`, { method: 'PUT', body: data }),

  delete: (id: string) => apiCall(`/colors/${id}`, { method: 'DELETE' }),
};

// Sizes API
export const sizesAPI = {
  getAll: () => apiCall('/sizes'),

  create: (data: any) => apiCall('/sizes', { method: 'POST', body: data }),

  update: (id: string, data: any) => apiCall(`/sizes/${id}`, { method: 'PUT', body: data }),

  delete: (id: string) => apiCall(`/sizes/${id}`, { method: 'DELETE' }),
};

// Genders API
export const gendersAPI = {
  getAll: () => apiCall('/genders'),

  create: (data: any) => apiCall('/genders', { method: 'POST', body: data }),

  update: (id: string, data: any) => apiCall(`/genders/${id}`, { method: 'PUT', body: data }),

  delete: (id: string) => apiCall(`/genders/${id}`, { method: 'DELETE' }),
};

// Variants API
export const variantsAPI = {
  getByProduct: (productId: string) => apiCall(`/variants/product/${productId}`),

  create: (data: any) => apiCall('/variants', { method: 'POST', body: data }),

  update: (id: string, data: any) => apiCall(`/variants/${id}`, { method: 'PUT', body: data }),

  delete: (id: string) => apiCall(`/variants/${id}`, { method: 'DELETE' }),
};

// Images API
export const imagesAPI = {
  getByProduct: (productId: string) => apiCall(`/images/product/${productId}`),

  upload: (data: any) => apiCall('/images', { method: 'POST', body: data }),

  update: (id: string, data: any) => apiCall(`/images/${id}`, { method: 'PUT', body: data }),

  delete: (id: string) => apiCall(`/images/${id}`, { method: 'DELETE' }),
};
