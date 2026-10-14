// src/components/auth/LoginForm.tsx
'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import SubmitButton from '@/components/ui/SubmitButton';
import { login } from '@/lib/auth';
import { getErrorMessage } from '@/lib/api';
import { useAuthStore } from '@/store/auth.store';

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export default function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user, accessToken } = await login(form);
      setAuth(user, accessToken);
      router.replace('/chat');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div
          key={error}
          className="animate-shake rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500"
        >
          {error}
        </div>
      )}

      <div className="animate-fade-up" style={delay(100)}>
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          icon={<Mail size={18} />}
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={onChange}
          required
        />
      </div>

      <div className="animate-fade-up" style={delay(200)}>
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          icon={<Lock size={18} />}
          placeholder="••••••••"
          autoComplete="current-password"
          value={form.password}
          onChange={onChange}
          required
        />
      </div>

      <div className="animate-fade-up" style={delay(300)}>
        <SubmitButton loading={loading} loadingText="Signing in...">
          Sign in
        </SubmitButton>
      </div>

      <p className="animate-fade-up text-center text-sm text-muted" style={delay(400)}>
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}