'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/Input';
import SubmitButton from '@/components/ui/SubmitButton';
import { login } from '@/lib/auth';
import { getErrorMessage } from '@/lib/api';
import { useAuthStore } from '@/store/auth.store';

// 1. Define validation schema
const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// 2. Derive TypeScript type from schema
type LoginFormData = z.infer<typeof loginSchema>;

const delay = (ms: number) => ({
  animationDelay: `${ms}ms`,
});

export default function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [error, setError] = useState('');

  // 3. Initialize useForm
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 4. Handle form submission
  const onSubmit = async (data: LoginFormData) => {
    setError('');

    try {
      const { user, accessToken } = await login(data);

      setAuth(user, accessToken);

      router.replace('/chat');
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };
//   const onSubmit = async (data: LoginFormData) => {
//   setError('');

//   try {
//     const response = await login(data);

//     console.log('Login response:', response);
//     console.log('Access token:', response.accessToken);

//     setAuth(response.user, response.accessToken);

//     console.log('Zustand state:', useAuthStore.getState());

//     console.log(
//       'Persisted state:',
//       localStorage.getItem('chat-auth'),
//     );

//     router.replace('/chat');
//   } catch (err) {
//     setError(getErrorMessage(err));
//   }
// };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {error && (
        <div
          key={error}
          className="animate-shake rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500"
        >
          {error}
        </div>
      )}

      {/* Email */}
      <div className="animate-fade-up" style={delay(100)}>
        <Input
          id="email"
          type="email"
          label="Email"
          icon={<Mail size={18} />}
          placeholder="you@example.com"
          autoComplete="email"
          {...register('email')}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="animate-fade-up" style={delay(200)}>
        <Input
          id="password"
          type="password"
          label="Password"
          icon={<Lock size={18} />}
          placeholder="••••••••"
          autoComplete="current-password"
          {...register('password')}
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="animate-fade-up" style={delay(300)}>
        <SubmitButton
          loading={isSubmitting}
          loadingText="Signing in..."
        >
          Sign in
        </SubmitButton>
      </div>

      <p
        className="animate-fade-up text-center text-sm text-muted"
        style={delay(400)}
      >
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-semibold text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
}