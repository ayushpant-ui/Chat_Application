'use client';

import { ChangeEvent, useRef, useState } from 'react';
import Avatar from '@/components/ui/Avatar';
import Section from '@/components/ui/Section';
import Notice from '@/components/ui/Notice';
import { getErrorMessage } from '@/lib/api';
import { removeAvatar, uploadAvatar } from '@/lib/users';
import { useAuthStore } from '@/store/auth.store';
import type { User } from '@/types';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

export default function AvatarSection({ user }: { user: User }) {
  const updateUser = useAuthStore((s) => s.updateUser);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // lets the same file be picked again
    if (!file) return;

    if (!ALLOWED.includes(file.type)) {
      setNotice({ type: 'error', text: 'Please choose a JPG, PNG or WebP image.' });
      return;
    }
    if (file.size > MAX_SIZE) {
      setNotice({ type: 'error', text: 'Image must be smaller than 2 MB.' });
      return;
    }

    setLoading(true);
    setNotice(null);
    try {
      updateUser(await uploadAvatar(file));
      setNotice({ type: 'success', text: 'Profile photo updated.' });
    } catch (err) {
      setNotice({ type: 'error', text: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  const onRemove = async () => {
    setLoading(true);
    setNotice(null);
    try {
      updateUser(await removeAvatar());
      setNotice({ type: 'success', text: 'Profile photo removed.' });
    } catch (err) {
      setNotice({ type: 'error', text: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section title="Photo" description="JPG, PNG or WebP, up to 2 MB.">
      <div className="flex items-center gap-5">
        <Avatar name={user.username} src={user.avatarUrl} size="lg" />

        <div className="flex flex-wrap gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onFile}
            className="hidden"
          />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={loading}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition hover:bg-primary-hover disabled:opacity-60"
          >
            {loading ? 'Working...' : 'Upload photo'}
          </button>
          {user.avatarUrl && (
            <button
              onClick={onRemove}
              disabled={loading}
              className="rounded-xl border border-line px-4 py-2 text-sm font-medium text-fg transition hover:bg-subtle disabled:opacity-60"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {notice && (
        <div className="mt-4">
          <Notice type={notice.type}>{notice.text}</Notice>
        </div>
      )}
    </Section>
  );
}