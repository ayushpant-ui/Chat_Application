// src/components/ui/SubmitButton.tsx
import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export default function SubmitButton({
  loading,
  loadingText,
  children,
}: {
  loading: boolean;
  loadingText: string;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-on-primary shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/40 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {loading ? loadingText : children}
    </button>
  );
}