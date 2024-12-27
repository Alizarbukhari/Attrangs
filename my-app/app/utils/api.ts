import { getCookie } from 'cookies-next';

interface ApiOptions extends RequestInit {
  headers?: HeadersInit;
}

export const apiCall = async (endpoint: string, options: ApiOptions = {}) => {
  const token = getCookie('auth_token');
  
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers
  };

  return fetch(endpoint, {
    ...options,
    headers
  });
}; 