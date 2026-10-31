import { ReactNode } from 'react';

export default function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="animate-fade-up rounded-2xl border border-line bg-surface p-6">
      <h2 className="text-lg font-semibold text-fg">{title}</h2>
      {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}