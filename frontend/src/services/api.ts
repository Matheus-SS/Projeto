import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';
export const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,
});
