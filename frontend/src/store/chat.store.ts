// src/store/chat.store.ts
import { create } from 'zustand';
import type { Conversation, Message } from '@/types';
import { mockConversations, mockMessages, ME_ID, ME_NAME } from '@/lib/mock-data';

interface ChatState {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  search: string;
  setSearch: (v: string) => void;
  sendMessage: (conversationId: string, content: string) => void;
  markRead: (conversationId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: mockConversations,
  messages: mockMessages,
  search: '',

  setSearch: (search) => set({ search }),

  // later: emit socket 'message:send' and add the server's response instead
  sendMessage: (conversationId, content) =>
    set((state) => {
      const msg: Message = {
        id: crypto.randomUUID(),
        conversationId,
        senderId: ME_ID,
        senderName: ME_NAME,
        content,
        createdAt: new Date().toISOString(),
      };
      return {
        messages: {
          ...state.messages,
          [conversationId]: [...(state.messages[conversationId] ?? []), msg],
        },
      };
    }),

  markRead: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, unread: 0 } : c,
      ),
    })),
}));