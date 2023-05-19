// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/', // replace with your base URL
});

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
}

export const register = (email, password) => {
  return api.post('/auth/register', { email, password });
}

export const getAPIs = () => {
  return api.get('/api');
}

export const createAPI = (apiData) => {
  return api.post('/api', apiData);
}

export const updateAPI = (apiId, updatedData) => {
  return api.put(`/api/${apiId}`, updatedData);
}

export const deleteAPI = (apiId) => {
  return api.delete(`/api/${apiId}`);
}
