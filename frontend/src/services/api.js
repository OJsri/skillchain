import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createTask = (taskData) => axios.post(`${API_URL}/tasks/create`, taskData);
export const depositPayment = (paymentData) => axios.post(`${API_URL}/tasks/deposit`, paymentData);
export const searchTask = (searchTerm) => axios.post(`${API_URL}/tasks/search`, searchTerm);
