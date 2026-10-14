// src/components/chat/MessageList.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useChatStore } from '@/store/chat.store';
import { ME_ID } from '@/lib/mock-data';
import MessageBubble from './MessageBubble';
import type { Message } from '@/types';

const EMPTY: Message[] = [];

export default function MessageList({
  conversationId,
  isGroup,
}: {
  conversationId: string;
  isGroup: boolean;
}) {
  const messages = useChatStore((s) => s.messages[conversationId]) ?? EMPTY;
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, conversationId]);

  return (
    <div className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
      {messages.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted">
          No messages yet. Say hello!
        </p>
      )}

      {messages.map((m, i) => {
        const prev = messages[i - 1];
        const showName = isGroup && m.senderId !== ME_ID && prev?.senderId !== m.senderId;
        return (
          <MessageBubble key={m.id} message={m} own={m.senderId === ME_ID} showName={showName} />
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}