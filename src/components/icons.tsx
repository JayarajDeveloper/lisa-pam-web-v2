import type { ReactNode } from 'react';

export type IconName =
  | 'grid'
  | 'fleet'
  | 'hotspots'
  | 'search'
  | 'trap'
  | 'spark'
  | 'activity'
  | 'chart'
  | 'shield'
  | 'user'
  | 'eye';

const common = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  switch (name) {
    case 'grid':
      return (
        <svg {...common} className={className}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case 'fleet':
      return (
        <svg {...common} className={className}>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
        </svg>
      );
    case 'hotspots':
      return (
        <svg {...common} className={className}>
          <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      );
    case 'search':
      return (
        <svg {...common} className={className}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16.5 16.5 21 21" />
        </svg>
      );
    case 'trap':
      return (
        <svg {...common} className={className}>
          <path d="M12 3v4M8 7h8l1.5 13H6.5L8 7z" />
          <path d="M9 12h6M10 16h4" />
        </svg>
      );
    case 'spark':
      return (
        <svg {...common} className={className}>
          <path d="M12 3 13.8 9.2 20 11 13.8 12.8 12 19 10.2 12.8 4 11 10.2 9.2Z" />
        </svg>
      );
    case 'activity':
      return (
        <svg {...common} className={className}>
          <path d="M4 14h3l2-6 3 10 2-6h6" />
        </svg>
      );
    case 'chart':
      return (
        <svg {...common} className={className}>
          <path d="M4 19V5M4 19h16" />
          <path d="M8 15v-4M12 15V8M16 15v-6" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common} className={className}>
          <path d="M12 3 19 6.5v5.2c0 4.1-2.8 7.7-7 8.8-4.2-1.1-7-4.7-7-8.8V6.5L12 3z" />
        </svg>
      );
    case 'user':
      return (
        <svg {...common} className={className}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5.5 19c1.2-3 3.5-4.5 6.5-4.5s5.3 1.5 6.5 4.5" />
        </svg>
      );
    case 'eye':
      return (
        <svg {...common} className={className}>
          <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12z" />
          <circle cx="12" cy="12" r="2.4" />
        </svg>
      );
    default:
      return null;
  }
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

export function Gauge({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const r = 42;
  const start = Math.PI;
  const end = 0;
  const cx = 52;
  const cy = 50;
  const arc = (t: number) => {
    const a = start + (end - start) * t;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };
  const from = arc(0);
  const to = arc(clamped / 100);
  const large = clamped > 50 ? 1 : 0;
  const trackTo = arc(1);

  return (
    <div className="gauge">
      <svg viewBox="0 0 104 62">
        <path
          d={`M ${from.x} ${from.y} A ${r} ${r} 0 1 1 ${trackTo.x} ${trackTo.y}`}
          fill="none"
          stroke="var(--ground-deep)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {clamped > 0 && (
          <path
            d={`M ${from.x} ${from.y} A ${r} ${r} 0 ${large} 1 ${to.x} ${to.y}`}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
          />
        )}
      </svg>
      <strong>{clamped}%</strong>
      <span>{label}</span>
    </div>
  );
}
