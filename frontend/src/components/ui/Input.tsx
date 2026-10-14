// src/components/ui/Input.tsx
'use client';

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, icon, id, type, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const isPassword = type === 'password';

    return (
      <div className="space-y-1.5">
        <label htmlFor={id} className="block text-sm font-medium text-fg">
          {label}
        </label>

        <div className="group relative">
          {icon && (
            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-muted transition-colors group-focus-within:text-primary">
              {icon}
            </span>
          )}

          <input
            id={id}
            ref={ref}
            type={isPassword && show ? 'text' : type}
            {...props}
            className={`w-full rounded-xl border bg-surface py-2.5 text-sm text-fg outline-none transition placeholder:text-muted/60 focus:ring-4 ${
              icon ? 'pl-10' : 'pl-3.5'
            } ${isPassword ? 'pr-11' : 'pr-3.5'} ${
              error
                ? 'border-red-500 focus:ring-red-500/15'
                : 'border-line focus:border-primary focus:ring-primary/15'
            }`}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute inset-y-0 right-3.5 flex items-center text-muted hover:text-fg"
              aria-label={show ? 'Hide password' : 'Show password'}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {error && <p className="animate-pop text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';