// src/app/(auth)/login/page.tsx
import AuthCard from '@/components/auth/AuthCard';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthCard title="Welcome back" subtitle="Sign in to continue chatting">
      <LoginForm />
    </AuthCard>
  );
}