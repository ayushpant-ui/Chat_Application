'use client';

import { FormEvent, useState } from 'react';
import { Lock } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import SubmitButton from '@/components/ui/SubmitButton';
import Section from '@/components/ui/Section';
import Notice from '@/components/ui/Notice';
import { getErrorMessage } from '@/lib/api';
import { changePassword } from '@/lib/users';

const EMPTY = { currentPassword: '', newPassword: '', confirmPassword: '' };

export default function PasswordForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.currentPassword) e.currentPassword = 'Enter your current password';
    if (form.newPassword.length < 8) e.newPassword = 'At least 8 characters';
    else if (form.newPassword.length > 72) e.newPassword = 'At most 72 characters';
    else if (form.newPassword === form.currentPassword)
      e.newPassword = 'Must be different from the current password';
    if (form.newPassword !== form.confirmPassword)
      e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError('');
    setSuccess(false);
    if (!validate()) return;

    setLoading(true);
    try {
      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setForm(EMPTY);
      setSuccess(true);
    } catch (err) {
      setServerError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section title="Password" description="Use at least 8 characters.">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {success && <Notice type="success">Password changed.</Notice>}
        {serverError && (
          <div key={serverError} className="animate-shake">
            <Notice type="error">{serverError}</Notice>
          </div>
        )}

        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          label="Current password"
          icon={<Lock size={18} />}
          autoComplete="current-password"
          value={form.currentPassword}
          onChange={onChange}
          error={errors.currentPassword}
        />
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          label="New password"
          icon={<Lock size={18} />}
          autoComplete="new-password"
          value={form.newPassword}
          onChange={onChange}
          error={errors.newPassword}
        />
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm new password"
          icon={<Lock size={18} />}
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword}
        />

        <div className="sm:w-48">
          <SubmitButton loading={loading} loadingText="Updating...">
            Update password
          </SubmitButton>
        </div>
      </form>
    </Section>
  );
}