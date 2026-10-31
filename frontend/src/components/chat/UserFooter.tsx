'use client';

import Link from 'next/link';
import { LogOut } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { useAuthStore } from '@/store/auth.store';
import { useLogout } from '@/hooks/useLogout';

export default function UserFooter() {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  if (!user) return null;

  return (
    <div className="flex items-center gap-2 border-t border-line p-3">
      <Link
        href="/profile"
        className="flex min-w-0 flex-1 items-center gap-3 rounded-lg p-1.5 transition hover:bg-subtle"
      >
        <Avatar name={user.username} src={user.avatarUrl} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-fg">{user.username}</p>
          <p className="truncate text-xs text-muted">View profile</p>
        </div>
      </Link>

      <button
        onClick={logout}
        title="Log out"
        aria-label="Log out"
        className="rounded-lg p-2 text-muted transition hover:bg-subtle hover:text-red-500"
      >
        <LogOut size={18} />
      </button>
    </div>
  );
}