const BASE_URL = process.env.API_BASE_URL || 'https://api.example.com';

const request = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
};

export const api = {
  get: (endpoint, headers) => request(endpoint, { method: 'GET', headers }),
  post: (endpoint, body, headers) =>
    request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    }),
  put: (endpoint, body, headers) =>
    request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers,
    }),
  delete: (endpoint, headers) =>
    request(endpoint, { method: 'DELETE', headers }),
};
