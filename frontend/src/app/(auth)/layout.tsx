// src/app/(auth)/layout.tsx
import { ReactNode } from 'react';
import AuthGuard from '@/components/auth/AuthGuard';

// export const instant = false;

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthGuard mode="public">{children}</AuthGuard>;
}