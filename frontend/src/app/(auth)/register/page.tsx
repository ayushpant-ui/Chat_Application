// src/app/(auth)/register/page.tsx
import AuthCard from '@/components/auth/AuthCard';
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthCard title="Create an account" subtitle="Join and start chatting">
      <RegisterForm />
    </AuthCard>
  );
}