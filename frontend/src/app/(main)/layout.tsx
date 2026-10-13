import { ReactNode } from 'react';
import AuthGuard from '@/components/auth/AuthGuard';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard mode="private">
      <div className="flex h-screen">{children}</div>
    </AuthGuard>
  );
}