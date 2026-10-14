// src/lib/mock-data.ts
import type { Conversation, Message } from '@/types';

export const ME_ID = 'me';
export const ME_NAME = 'You';

export const mockConversations: Conversation[] = [
  { id: 'c1', name: 'Sita Sharma', isGroup: false, online: true, unread: 2 },
  { id: 'c2', name: 'Project Team', isGroup: true, unread: 0 },
  { id: 'c3', name: 'Ram Thapa', isGroup: false, online: false, unread: 0 },
  { id: 'c4', name: 'Study Group', isGroup: true, unread: 5 },
];

export const mockMessages: Record<string, Message[]> = {
  c1: [
    { id: 'm1', conversationId: 'c1', senderId: 'u1', senderName: 'Sita Sharma', content: 'Hey! Did you finish the assignment?', createdAt: '2026-10-13T08:30:00.000Z' },
    { id: 'm2', conversationId: 'c1', senderId: ME_ID, senderName: ME_NAME, content: 'Almost, just the last question left.', createdAt: '2026-10-13T08:32:00.000Z' },
    { id: 'm3', conversationId: 'c1', senderId: 'u1', senderName: 'Sita Sharma', content: 'Nice, send it over when you are done 🙌', createdAt: '2026-10-13T08:33:00.000Z' },
    { id: 'm4', conversationId: 'c1', senderId: 'u1', senderName: 'Sita Sharma', content: 'Also are we meeting tomorrow?', createdAt: '2026-10-13T08:34:00.000Z' },
  ],
  c2: [
    { id: 'm5', conversationId: 'c2', senderId: 'u2', senderName: 'Bikash', content: 'Deployment is scheduled for Friday.', createdAt: '2026-10-12T14:00:00.000Z' },
    { id: 'm6', conversationId: 'c2', senderId: ME_ID, senderName: ME_NAME, content: 'Got it. I will finish the login page by Thursday.', createdAt: '2026-10-12T14:05:00.000Z' },
  ],
  c3: [
    { id: 'm7', conversationId: 'c3', senderId: ME_ID, senderName: ME_NAME, content: 'Thanks for the notes!', createdAt: '2026-10-10T18:00:00.000Z' },
    { id: 'm8', conversationId: 'c3', senderId: 'u3', senderName: 'Ram Thapa', content: 'Anytime.', createdAt: '2026-10-10T18:10:00.000Z' },
  ],
  c4: [
    { id: 'm9', conversationId: 'c4', senderId: 'u4', senderName: 'Anita', content: 'Who has the Prisma notes?', createdAt: '2026-10-13T06:00:00.000Z' },
  ],
};