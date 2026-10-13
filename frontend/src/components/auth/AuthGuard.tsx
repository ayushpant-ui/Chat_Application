// src/components/auth/AuthGuard.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
    </div>
  );
}

export default function AuthGuard({
  mode,
  children,
}: {
  mode: 'private' | 'public';
  children: ReactNode;
}) {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const [ready, setReady] = useState(false);

  // wait for persisted state to load from localStorage
  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) setReady(true);
    const unsub = useAuthStore.persist.onFinishHydration(() => setReady(true));
    return unsub;
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (mode === 'private' && !accessToken) router.replace('/login');
    if (mode === 'public' && accessToken) router.replace('/chat');
  }, [ready, accessToken, mode, router]);

  if (!ready) return <Loading />;
  if (mode === 'private' && !accessToken) return <Loading />;
  if (mode === 'public' && accessToken) return <Loading />;

  return <>{children}</>;
}