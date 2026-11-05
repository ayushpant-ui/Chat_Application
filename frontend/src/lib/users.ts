import { api } from './api';
import type { User } from '@/types';

interface UpdateProfileResponse {
  message: string;
  user: Pick<User, 'id' | 'username' | 'email'>;
}

export const updateProfile = async (data: { username: string }) => {
  return (
    await api.patch<UpdateProfileResponse>(
      '/users/change-username',
      data,
    )
  ).data;
};

// export const uploadAvatar = async (file: File) => {
//   const form = new FormData();
//   form.append('avatar', file);
//   return (await api.post<User>('/users/me/avatar', form)).data;
// };
export const uploadAvatar = async (file: File) => {
  const form = new FormData();
  form.append('avatar', file);

  return (await api.post<User>('/users/me/avatar', form)).data;
};

export const removeAvatar = async () =>
  (await api.delete<User>('/users/change-profile')).data;

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => (await api.patch<{ message: string }>('/users/change-password', data)).data;