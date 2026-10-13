// src/app/(main)/layout.tsx
'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { accessToken, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (hasHydrated && !accessToken) router.replace('/login');
  }, [hasHydrated, accessToken, router]);

  if (!hasHydrated || !accessToken) return null; // or a spinner

  return <div className="flex h-screen">{children}</div>;
}