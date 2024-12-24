import api from './config';

export const register = (userData) => api.post('users/register', userData);
export const login = (credentials) => api.post('users/login', credentials);
export const getUsers = () => api.get('/users');
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);