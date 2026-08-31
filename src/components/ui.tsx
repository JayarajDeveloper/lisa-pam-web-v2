import type { ReactNode } from 'react';
import type { DeviceStatus, Species } from '../types';
import { Icon, type IconName } from './icons';

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
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={className ? `card ${className}` : 'card'}>{children}</section>;
}

export function CardHead({
  icon,
  extra,
  children,
}: {
  icon: IconName;
  extra?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="card-head">
      <h2>
        <Icon name={icon} />
        {children}
      </h2>
      {extra}
    </div>
  );
}

export function PageToolbar({
  title,
  icon,
  children,
}: {
  title: string;
  icon: IconName;
  children?: ReactNode;
}) {
  return (
    <div className="page-toolbar">
      <h1>
        <Icon name={icon} />
        {title}
      </h1>
      <div className="actions">{children}</div>
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="empty">{children}</p>;
}

export function relativeTime(iso: string | null): string {
  if (!iso) return 'never';
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60_000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}
