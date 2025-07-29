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

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};

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

    const fullUrl = `${API_BASE_URL}${url}`;

    // Prepare request configuration
    const config: RequestInit = {
      method: reqType,
      headers: getAuthHeaders(),
    };

    // Add body for non-GET requests
    if ((reqType !== 'GET' && reqType !== 'DELETE') && body) {
      config.body = JSON.stringify(body);
    }

    // Make the request
    const response = await fetch(fullUrl, config);
    const responseData = await response.json();

    return {
      data: responseData,
      status: response.status,
    };

  } catch (error: any) {
    console.error('API request failed:', error);
    throw error;
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