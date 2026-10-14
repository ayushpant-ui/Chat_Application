// src/components/chat/ConversationList.tsx
'use client';

import { useMemo } from 'react';
import { useChatStore } from '@/store/chat.store';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import ConversationItem from './ConversationItem';

export default function ConversationList() {
  const conversations = useChatStore((s) => s.conversations);
  const messages = useChatStore((s) => s.messages);
  const search = useChatStore((s) => s.search);
  const setSearch = useChatStore((s) => s.setSearch);

  const items = useMemo(() => {
    return conversations
      .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
      .map((c) => ({ conversation: c, last: messages[c.id]?.at(-1) }))
      .sort((a, b) =>
        (b.last?.createdAt ?? '').localeCompare(a.last?.createdAt ?? ''),
      );
  }, [conversations, messages, search]);

  return (
    <>
      <div className="border-b border-line p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-fg">Chats</h2>
          <ThemeSwitcher />
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search conversations..."
          className="w-full rounded-lg bg-subtle px-3 py-2 text-sm text-fg outline-none placeholder:text-muted focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {items.length === 0 && (
          <p className="p-4 text-center text-sm text-muted">No conversations found</p>
        )}
        {items.map(({ conversation, last }) => (
          <ConversationItem key={conversation.id} conversation={conversation} last={last} />
        ))}
      </div>
    </>
  );
}