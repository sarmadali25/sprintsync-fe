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

export const apiRequest = async <T = any>({
  endpoint,
  body,
  reqType,
  paramId
}: ApiRequestOptions): Promise<ApiResponse<T>> => {
  try {
    // Construct the full URL
    let url = `${API_BASE_URL}${endpoint}`;
    if (paramId) {
      url = url.endsWith('/') ? `${url}${paramId}` : `${url}/${paramId}`;
    }

    // Prepare headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add token from localStorage if available
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Prepare request options
    const requestOptions: RequestInit = {
      method: reqType,
      headers,
    };

    // Add body for non-GET requests
    if (reqType !== 'GET' && body) {
      requestOptions.body = JSON.stringify(body);
    }

    // Make the request
    const response = await fetch(url, requestOptions);
    console.log('response', response);
    
    
    // Parse response
    let data: T;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text() as T;
    }

    return {
      data,
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