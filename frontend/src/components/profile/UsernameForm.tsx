'use client';

import { useEffect, useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/Input';
import SubmitButton from '@/components/ui/SubmitButton';
import Section from '@/components/ui/Section';
import Notice from '@/components/ui/Notice';

import { getErrorMessage } from '@/lib/api';
import { updateProfile } from '@/lib/users';
import { useAuthStore } from '@/store/auth.store';
import { z } from 'zod';
// import { usernameSchema, type UsernameFormData } from '@/schemas/username.schema';

import type { User } from '@/types';
export const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must contain at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Only letters, numbers and underscores are allowed',
    ),
});

export type UsernameFormData = z.infer<typeof usernameSchema>;
export default function UsernameForm({ user }: { user: User }) {
  const updateUser = useAuthStore((s) => s.updateUser);

  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UsernameFormData>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: user.username,
    },
  });

  const username = watch('username');

  const changed = username.trim() !== user.username;

  // Update the form if the user prop changes
  useEffect(() => {
    reset({ username: user.username });
  }, [user.username, reset]);

  const onSubmit = async (data: UsernameFormData) => {
    setServerError('');
    setSuccess(false);

    try {
      const updatedUser = await updateProfile({
        username: data.username,
      });

      updateUser(updatedUser);
      reset({ username: updatedUser.username });
      setSuccess(true);
    } catch (error) {
      setServerError(getErrorMessage(error));
    }
  };

  return (
    <Section title="Account" description="How other people see you in chats.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {success && (
          <Notice type="success">
            Username updated successfully.
          </Notice>
        )}

        {serverError && (
          <Notice type="error">
            {serverError}
          </Notice>
        )}

        <div>
          <p className="text-sm font-medium text-fg">Email</p>
          <p className="mt-1 text-sm text-muted">{user.email}</p>
        </div>

        <Input
          id="username"
          label="Username"
          icon={<UserIcon size={18} />}
          error={errors.username?.message}
          {...register('username')}
          autoComplete="username"
        />

        <div className="sm:w-48">
          <SubmitButton
            loading={isSubmitting}
            loadingText="Saving..."
            disabled={!changed || isSubmitting}
          >
            Save changes
          </SubmitButton>
        </div>
      </form>
    </Section>
  );
}