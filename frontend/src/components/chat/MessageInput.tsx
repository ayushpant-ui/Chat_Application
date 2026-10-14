// src/components/chat/MessageInput.tsx
'use client';

import { KeyboardEvent, useState } from 'react';
import { useChatStore } from '@/store/chat.store';

export default function MessageInput({ conversationId }: { conversationId: string }) {
  const [text, setText] = useState('');
  const sendMessage = useChatStore((s) => s.sendMessage);

  const send = () => {
    const content = text.trim();
    if (!content) return;
    sendMessage(conversationId, content);
    setText('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex items-end gap-2 border-t border-line bg-surface p-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        rows={1}
        placeholder="Type a message..."
        className="max-h-32 min-h-10 flex-1 resize-none rounded-2xl bg-subtle px-4 py-2.5 text-sm text-fg outline-none placeholder:text-muted focus:ring-2 focus:ring-primary/20"
      />
      <button
        onClick={send}
        disabled={!text.trim()}
        className="h-10 rounded-full bg-primary px-5 text-sm font-semibold text-on-primary transition hover:bg-primary-hover disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
}