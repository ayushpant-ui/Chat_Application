// src/components/auth/AuthCard.tsx
import { ReactNode } from 'react';

export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-1 mb-6 text-sm text-gray-500">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}