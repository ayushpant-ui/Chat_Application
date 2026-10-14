// src/components/chat/ConversationItem.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Avatar from '@/components/ui/Avatar';
import type { Conversation, Message } from '@/types';

export default function ConversationItem({
  conversation,
  last,
}: {
  conversation: Conversation;
  last?: Message;
}) {
  const pathname = usePathname();
  const active = pathname === `/chat/${conversation.id}`;

  return (
    <Link
      href={`/chat/${conversation.id}`}
      className={`flex items-center gap-3 px-4 py-3 transition hover:bg-subtle ${
        active ? 'bg-soft' : ''
      }`}
    >
      <Avatar name={conversation.name} online={conversation.online} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold text-fg">{conversation.name}</p>
          {last && (
            <span className="shrink-0 text-xs text-muted" suppressHydrationWarning>
              {new Date(last.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm text-muted">
            {last
              ? `${conversation.isGroup && last.senderName !== 'You' ? last.senderName + ': ' : ''}${last.content}`
              : 'No messages yet'}
          </p>
          {conversation.unread > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-on-primary">
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}