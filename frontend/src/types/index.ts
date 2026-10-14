// src/types/index.ts
export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string | null;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface Conversation {
  id: string;
  name: string;
  isGroup: boolean;
  online?: boolean;
  unread: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string; // ISO string
}