'use client';

import { FormEvent, useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import SubmitButton from '@/components/ui/SubmitButton';
import Section from '@/components/ui/Section';
import Notice from '@/components/ui/Notice';
import { getErrorMessage } from '@/lib/api';
import { updateProfile } from '@/lib/users';
import { useAuthStore } from '@/store/auth.store';
import type { User } from '@/types';

export default function UsernameForm({ user }: { user: User }) {
  const updateUser = useAuthStore((s) => s.updateUser);
  const [username, setUsername] = useState(user.username);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const changed = username.trim() !== user.username;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const value = username.trim();
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
      setError('3-20 characters: letters, numbers, underscore');
      return;
    }

    setLoading(true);
    try {
      updateUser(await updateProfile({ username: value }));
      setSuccess(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section title="Account" description="How other people see you in chats.">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {success && <Notice type="success">Username updated.</Notice>}

        <div>
          <p className="text-sm font-medium text-fg">Email</p>
          <p className="mt-1 text-sm text-muted">{user.email}</p>
        </div>

        <Input
          id="username"
          name="username"
          label="Username"
          icon={<UserIcon size={18} />}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={error}
          autoComplete="username"
        />

        <div className="sm:w-48">
          <SubmitButton loading={loading} loadingText="Saving..." disabled={!changed}>
            Save changes
          </SubmitButton>
        </div>
      </form>
    </Section>
  );
}