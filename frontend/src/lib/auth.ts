// src/lib/auth.ts
import { api } from './api';
import type { AuthResponse } from '@/types';

export const login = async (data: { email: string; password: string }) =>
  (await api.post<AuthResponse>('/auth/login', data)).data;

export const register = async (data: {
  email: string;
  username: string;
  password: string;
}) => (await api.post<AuthResponse>('/auth/register', data)).data;