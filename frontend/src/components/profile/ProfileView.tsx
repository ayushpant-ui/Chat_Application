'use client';

import Link from 'next/link';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useLogout } from '@/hooks/useLogout';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import Section from '@/components/ui/Section';
import AvatarSection from './AvatarSection';
import UsernameForm from './UsernameForm';
import PasswordForm from './PasswordForm';

export default function ProfileView() {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  if (!user) return null;

  return (
    <div className="h-full min-w-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-8">
        <header className="flex items-center justify-between">
          <Link
            href="/chat"
            className="flex items-center gap-1.5 text-sm text-muted transition hover:text-fg"
          >
            <ArrowLeft size={18} /> Back to chats
          </Link>
          <ThemeSwitcher />
        </header>

        <h1 className="text-2xl font-bold text-fg">Profile</h1>

        <AvatarSection user={user} />
        <UsernameForm user={user} />
        <PasswordForm />

        <Section title="Session" description="Sign out of this device.">
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-xl border border-red-500/40 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500/10"
          >
            <LogOut size={16} /> Log out
          </button>
        </Section>
      </div>
    </div>
  );
}