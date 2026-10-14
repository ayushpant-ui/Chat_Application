// src/components/chat/MessageBubble.tsx
import type { Message } from '@/types';

export default function MessageBubble({
  message,
  own,
  showName,
}: {
  message: Message;
  own: boolean;
  showName: boolean;
}) {
  return (
    <div className={`flex animate-pop ${own ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${
          own
            ? 'rounded-br-sm bg-primary text-on-primary'
            : 'rounded-bl-sm bg-surface text-fg shadow-sm'
        }`}
      >
        {showName && (
          <p className="mb-0.5 text-xs font-semibold text-primary">{message.senderName}</p>
        )}
        <p className="break-words whitespace-pre-wrap">{message.content}</p>
        <p
          className={`mt-1 text-right text-[10px] ${own ? 'text-on-primary/70' : 'text-muted'}`}
          suppressHydrationWarning
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}