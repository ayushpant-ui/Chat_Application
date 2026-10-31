import { ReactNode } from 'react';

export default function Notice({
  type,
  children,
}: {
  type: 'success' | 'error';
  children: ReactNode;
}) {
  const styles =
    type === 'success'
      ? 'border-green-500/30 bg-green-500/10 text-green-600'
      : 'border-red-500/30 bg-red-500/10 text-red-500';

  return (
    <div className={`animate-pop rounded-xl border p-3 text-sm ${styles}`}>{children}</div>
  );
}