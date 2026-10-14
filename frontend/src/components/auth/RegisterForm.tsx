// src/components/auth/RegisterForm.tsx
'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import SubmitButton from '@/components/ui/SubmitButton';
import { register } from '@/lib/auth';
import { getErrorMessage } from '@/lib/api';
import { useAuthStore } from '@/store/auth.store';

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

const BAR_COLORS = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
const LABELS = ['Weak', 'Fair', 'Good', 'Strong'];

function getStrength(pw: string) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.max(s, 1);
}

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

  const strength = getStrength(form.password);

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
        <div
          key={serverError}
          className="animate-shake rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500"
        >
          {serverError}
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
          error={errors.email}
        />
      </div>

      <div className="animate-fade-up" style={delay(180)}>
        <Input
          id="username"
          name="username"
          label="Username"
          icon={<User size={18} />}
          placeholder="your_username"
          autoComplete="username"
          value={form.username}
          onChange={onChange}
          error={errors.username}
        />
      </div>

      <div className="animate-fade-up" style={delay(260)}>
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          icon={<Lock size={18} />}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          value={form.password}
          onChange={onChange}
          error={errors.password}
        />
        {form.password && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex flex-1 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    i < strength ? BAR_COLORS[strength - 1] : 'bg-subtle'
                  }`}
                />
              ))}
            </div>
            <span className="w-12 text-right text-xs text-muted">{LABELS[strength - 1]}</span>
          </div>
        )}
      </div>

      <div className="animate-fade-up" style={delay(340)}>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm password"
          icon={<Lock size={18} />}
          placeholder="Repeat your password"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword}
        />
      </div>

      <div className="animate-fade-up pt-1" style={delay(420)}>
        <SubmitButton loading={loading} loadingText="Creating account...">
          Create account
        </SubmitButton>
      </div>

      <p className="animate-fade-up text-center text-sm text-muted" style={delay(500)}>
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}