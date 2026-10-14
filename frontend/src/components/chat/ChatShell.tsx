// src/components/chat/ChatShell.tsx
'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import ConversationList from './ConversationList';

export default function ChatShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isRoot = pathname === '/chat';

  return (
    <div className="flex h-full w-full">
      <aside
        className={`w-full flex-col border-r border-line bg-surface md:flex md:w-80 ${
          isRoot ? 'flex' : 'hidden'
        }`}
      >
        <ConversationList />
      </aside>
      <main className={`min-w-0 flex-1 bg-app md:flex ${isRoot ? 'hidden' : 'flex'}`}>
        {children}
      </main>
    </div>
  );
}