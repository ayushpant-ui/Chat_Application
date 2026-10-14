// src/components/ThemeProvider.tsx
'use client';

import { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      themes={['light', 'dark', 'ocean', 'forest', 'sunset']}
    >
      {children}
    </NextThemesProvider>
  );
}