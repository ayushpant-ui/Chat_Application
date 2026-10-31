'use client';

import { useState } from 'react';
import { assetUrl } from '@/lib/utils';

const COLORS = [
  'bg-blue-500', 'bg-green-500', 'bg-purple-500',
  'bg-pink-500', 'bg-orange-500', 'bg-teal-500',
];

const SIZES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-24 w-24 text-3xl',
};

export default function Avatar({
  name,
  src,
  online,
  size = 'md',
}: {
  name: string;
  src?: string | null;
  online?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const url = src && src !== failedSrc ? assetUrl(src) : null;

  const color = COLORS[name.charCodeAt(0) % COLORS.length];
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="relative shrink-0">
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={name}
          onError={() => setFailedSrc(src ?? null)}
          className={`rounded-full object-cover ${SIZES[size]}`}
        />
      ) : (
        <div
          className={`flex items-center justify-center rounded-full font-semibold text-white ${color} ${SIZES[size]}`}
        >
          {initials}
        </div>
      )}
      {online && (
        <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-surface bg-green-500" />
      )}
    </div>
  );
}