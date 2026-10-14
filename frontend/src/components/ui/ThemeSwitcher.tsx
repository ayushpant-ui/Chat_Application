// src/components/ui/ThemeSwitcher.tsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Palette, Check } from 'lucide-react';

const THEMES = [
  { id: 'light', label: 'Light', bg: '#ffffff', accent: '#2563eb' },
  { id: 'dark', label: 'Dark', bg: '#111a2e', accent: '#6366f1' },
  { id: 'ocean', label: 'Ocean', bg: '#ecfeff', accent: '#0891b2' },
  { id: 'forest', label: 'Forest', bg: '#12261c', accent: '#22c55e' },
  { id: 'sunset', label: 'Sunset', bg: '#fff7ed', accent: '#f97316' },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const buttonClass =
    'flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-muted transition hover:text-primary';

  if (!mounted) return <div className="h-9 w-9" />;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={buttonClass}
        aria-label="Change theme"
      >
        <Palette size={18} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-44 animate-pop rounded-xl border border-line bg-surface p-1.5 shadow-xl">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-fg transition hover:bg-subtle"
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-line"
                  style={{ background: t.bg }}
                >
                  <span className="h-3 w-3 rounded-full" style={{ background: t.accent }} />
                </span>
                <span className="flex-1 text-left">{t.label}</span>
                {theme === t.id && <Check size={16} className="text-primary" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}