// src/components/auth/AuthCard.tsx
import { ReactNode } from 'react';
import { MessageCircle } from 'lucide-react';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen bg-app">
      <div className="absolute top-4 right-4 z-20">
        <ThemeSwitcher />
      </div>

      {/* Brand panel */}
      <aside className="relative hidden w-1/2 overflow-hidden bg-linear-to-br from-primary to-primary-hover p-12 text-on-primary lg:flex lg:flex-col lg:justify-between">
        <div className="animate-blob absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/25 blur-3xl" />
        <div className="animate-blob absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-black/20 blur-3xl [animation-delay:-7s]" />

        <div className="relative z-10 flex items-center gap-2 text-xl font-bold">
          <MessageCircle size={28} /> ChatApp
        </div>

        <div className="relative z-10 space-y-4">
          <div className="animate-float w-fit rounded-2xl rounded-bl-sm bg-white/90 px-4 py-2.5 text-sm text-gray-800 shadow-xl">
            Hey! Are we still on for today? 👋
          </div>
          <div className="animate-float ml-16 w-fit rounded-2xl rounded-br-sm bg-black/30 px-4 py-2.5 text-sm text-white shadow-xl backdrop-blur [animation-delay:-2s]">
            Yes! See you at 5 🎉
          </div>
          <div className="animate-float flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white/90 px-4 py-3 shadow-xl [animation-delay:-4s]">
            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500" />
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl leading-tight font-bold">Talk to anyone,<br />in real time.</h2>
          <p className="mt-3 max-w-sm text-on-primary/80">
            Private chats, group conversations, and instant delivery.
          </p>
        </div>
      </aside>

      {/* Form side */}
      <main className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-8 flex items-center gap-2 text-xl font-bold text-primary lg:hidden">
            <MessageCircle size={26} /> ChatApp
          </div>
          <h1 className="text-3xl font-bold text-fg">{title}</h1>
          <p className="mt-1.5 text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}