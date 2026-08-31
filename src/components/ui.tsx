import type { ReactNode } from 'react';
import type { DeviceStatus, Species } from '../data/mock';

export function Chip({
  tone = 'neutral',
  dot = false,
  children,
}: {
  tone?: 'neutral' | 'ok' | 'warn' | 'danger' | 'accent';
  dot?: boolean;
  children: ReactNode;
}) {
  return (
    <span className={`chip ${tone === 'neutral' ? '' : tone}`}>
      {dot && <span className="dot" />}
      {children}
    </span>
  );
}

export function StatusChip({ status }: { status: DeviceStatus }) {
  if (status === 'online')
    return (
      <Chip tone="ok" dot>
        online
      </Chip>
    );
  if (status === 'offline')
    return (
      <Chip tone="danger" dot>
        offline
      </Chip>
    );
  return <Chip tone="warn">never reported</Chip>;
}

export const SPECIES_COLOUR: Record<Species, string> = {
  aedes: 'var(--species-aedes)',
  culex: 'var(--species-culex)',
  anopheles: 'var(--species-anopheles)',
  other: 'var(--species-other)',
};

export function Card({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className ? `card ${className}` : 'card'}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="empty">{children}</p>;
}

export function relativeTime(iso: string | null): string {
  if (!iso) return 'never';
  const delta = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(delta / 60_000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}
