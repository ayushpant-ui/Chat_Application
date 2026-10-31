'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export function useLogout() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  return () => {
    logout(); // clears user + token (and the saved copy in localStorage)
    router.replace('/login');
  };
}