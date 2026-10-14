// src/components/ui/Avatar.tsx
const COLORS = [
  'bg-blue-500', 'bg-green-500', 'bg-purple-500',
  'bg-pink-500', 'bg-orange-500', 'bg-teal-500',
];

export default function Avatar({
  name,
  online,
  size = 'md',
}: {
  name: string;
  online?: boolean;
  size?: 'sm' | 'md';
}) {
  const color = COLORS[name.charCodeAt(0) % COLORS.length];
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="relative shrink-0">
      <div
        className={`flex items-center justify-center rounded-full font-semibold text-white ${color} ${
          size === 'sm' ? 'h-8 w-8 text-xs' : 'h-11 w-11 text-sm'
        }`}
      >
        {initials}
      </div>
      {online && (
        <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-surface bg-green-500" />
      )}
    </div>
  );
}