import axios from 'axios';
import keycloak from './keycloak';

const apiClient = axios.create({
  baseURL: 'http://54.83.193.128x:8080',
});

// Request interceptor to add the token
apiClient.interceptors.request.use(async (config) => {
  try {
    await keycloak.updateToken(30); // Refresh token if needed
    config.headers.Authorization = `Bearer ${keycloak.token}`;
    return config;
  } catch (error) {
    console.error('Failed to refresh token', error);
    throw error;
  }
});

export const postRequest = async (url, data) => {
  return await apiClient.post(url, data);
};

export default apiClient;