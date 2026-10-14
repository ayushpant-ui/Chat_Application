// src/components/chat/ChatWindow.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useChatStore } from '@/store/chat.store';
import Avatar from '@/components/ui/Avatar';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatWindow({ conversationId }: { conversationId: string }) {
  const conversation = useChatStore((s) =>
    s.conversations.find((c) => c.id === conversationId),
  );
  const markRead = useChatStore((s) => s.markRead);

  useEffect(() => {
    markRead(conversationId);
  }, [conversationId, markRead]);

  if (!conversation) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted">
        Conversation not found
      </div>
    );
  }

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col">
      <header className="flex items-center gap-3 border-b border-line bg-surface px-4 py-3">
        <Link href="/chat" className="text-muted md:hidden" aria-label="Back">
          ←
        </Link>
        <Avatar name={conversation.name} online={conversation.online} />
        <div>
          <p className="text-sm font-semibold text-fg">{conversation.name}</p>
          <p className="text-xs text-muted">
            {conversation.isGroup ? 'Group' : conversation.online ? 'Online' : 'Offline'}
          </p>
        </div>
      </header>

      <MessageList conversationId={conversationId} isGroup={conversation.isGroup} />
      <MessageInput conversationId={conversationId} />
    </div>
  );
}