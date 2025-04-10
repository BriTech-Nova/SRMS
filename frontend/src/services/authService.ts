import axios from 'axios';
import { User } from '../types/auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const loginUser = async (username: string, password: string): Promise<User> => {
  const response = await axios.post(`${API_URL}/auth/login/`, { username, password });
  const { token, user } = response.data;
  
  // Store token in localStorage
  localStorage.setItem('token', token);
  
  // Set default Authorization header for all requests
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
  return user;
};

export const logoutUser = async (): Promise<void> => {
  try {
    await axios.post(`${API_URL}/auth/logout/`);
  } catch (error) {
    console.error('Logout error', error);
  } finally {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove Authorization header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const getCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found');
  }
  
  // Set default Authorization header
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
  const response = await axios.get(`${API_URL}/auth/user/`);
  return response.data;
};

export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
}): Promise<User> => {
  const response = await axios.post(`${API_URL}/auth/register/`, userData);
  return response.data;
};
