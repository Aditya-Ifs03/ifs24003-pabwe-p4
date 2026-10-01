export const ACCESS_TOKEN_KEY = 'accessToken';

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
export const putAccessToken = (token) => localStorage.setItem(ACCESS_TOKEN_KEY, token);
export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

export const getBaseUrl = () => {
  if (typeof DELCOM_BASEURL !== 'undefined') return DELCOM_BASEURL;
  return import.meta.env.VITE_DELCOM_BASEURL || 'https://open-api.delcom.org/api/v1';
};

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = getAccessToken();
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const url = endpoint.startsWith('http') ? endpoint : `${getBaseUrl()}${endpoint}`;
  const response = await fetch(url, { ...options, headers });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Terjadi kesalahan pada permintaan API');
  }

  return data;
};