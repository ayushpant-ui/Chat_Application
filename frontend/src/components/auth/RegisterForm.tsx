// src/components/auth/RegisterForm.tsx
'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { register } from '@/lib/auth';
import { getErrorMessage } from '@/lib/api';
import { useAuthStore } from '@/store/auth.store';

export default function RegisterForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username))
      e.username = '3-20 characters: letters, numbers, underscore';
    if (form.password.length < 8) e.password = 'At least 8 characters';
    if (form.password !== form.confirmPassword)
      e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const { email, username, password } = form;
      const { user, accessToken } = await register({ email, username, password });
      setAuth(user, accessToken);
      router.replace('/chat');
    } catch (err) {
      setServerError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {serverError && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{serverError}</div>
      )}

      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        value={form.email}
        onChange={onChange}
        error={errors.email}
      />
      <Input
        id="username"
        name="username"
        label="Username"
        autoComplete="username"
        value={form.username}
        onChange={onChange}
        error={errors.username}
      />
      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        autoComplete="new-password"
        value={form.password}
        onChange={onChange}
        error={errors.password}
      />
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm password"
        autoComplete="new-password"
        value={form.confirmPassword}
        onChange={onChange}
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? 'Creating account...' : 'Create account'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}