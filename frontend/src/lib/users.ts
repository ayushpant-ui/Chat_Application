// src/lib/users.ts
import { api } from './api';
import type { User } from '@/types';

export const updateProfile = async (data: { username: string }) =>
  (await api.patch<User>('/users/me', data)).data;

export const uploadAvatar = async (file: File) => {
  const form = new FormData();
  form.append('avatar', file);
  return (await api.post<User>('/users/me/avatar', form)).data;
};

export const removeAvatar = async () =>
  (await api.delete<User>('/users/me/avatar')).data;

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => (await api.patch<{ message: string }>('/users/me/password', data)).data;