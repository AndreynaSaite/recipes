import axios from 'axios';

const API_BASE = 'http://localhost:8085';



export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE}/client/login`, { email, password });
    console.log(email, password)
    return response.data;
  },
  register: async (name: string, email: string, password: string) => {
    const response = await axios.post(`${API_BASE}/client/register`, { name, email, password });
    return response.data;
  },
  checkAuth: async () => {
    const response = await axios.get(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  }
};