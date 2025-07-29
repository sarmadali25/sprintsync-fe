import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

interface ApiRequestOptions {
  endpoint: string;
  body?: any;
  reqType: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  paramId?: string | number;
}

interface ApiResponse<T = any> {
  data: T;
  status: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API request failed:', error);
    return Promise.reject(error);
  }
);

export const apiRequest = async <T = any>({
  endpoint,
  body,
  reqType,
  paramId
}: ApiRequestOptions): Promise<ApiResponse<T>> => {
  try {
    // Construct the full URL
    let url = endpoint;
    if (paramId) {
      url = url.endsWith('/') ? `${url}${paramId}` : `${url}/${paramId}`;
    }

    // Prepare request configuration
    const config: AxiosRequestConfig = {
      method: reqType,
      url,
    };

    // Add data for non-GET requests
    if (reqType !== 'GET' && body) {
      config.data = body;
    }

    // Make the request
    const response: AxiosResponse<T> = await apiClient(config);

    return {
      data: response.data,
      status: response.status,
    };

  } catch (error) {
    console.error('API request failed:', error);
    throw new Error(`API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Convenience functions for common HTTP methods
export const apiGet = <T = any>(endpoint: string, paramId?: string | number) =>
  apiRequest<T>({ endpoint, reqType: 'GET', paramId });

export const apiPost = <T = any>(endpoint: string, body?: any, paramId?: string | number) =>
  apiRequest<T>({ endpoint, body, reqType: 'POST', paramId });

export const apiPut = <T = any>(endpoint: string, body?: any, paramId?: string | number) =>
  apiRequest<T>({ endpoint, body, reqType: 'PUT', paramId });

export const apiPatch = <T = any>(endpoint: string, body?: any, paramId?: string | number) =>
  apiRequest<T>({ endpoint, body, reqType: 'PATCH', paramId });

export const apiDelete = <T = any>(endpoint: string, paramId?: string | number) =>
  apiRequest<T>({ endpoint, reqType: 'DELETE', paramId }); 