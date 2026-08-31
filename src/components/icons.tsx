export type IconName =
  | 'grid'
  | 'fleet'
  | 'hotspots'
  | 'spark'
  | 'activity'
  | 'chart'
  | 'shield';

const svg = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg {...svg} className={className}>
      {name === 'grid' ? (
        <>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </>
      ) : name === 'fleet' ? (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
        </>
      ) : name === 'hotspots' ? (
        <>
          <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.2" />
        </>
      ) : name === 'spark' ? (
        <path d="M12 3 13.8 9.2 20 11 13.8 12.8 12 19 10.2 12.8 4 11 10.2 9.2Z" />
      ) : name === 'activity' ? (
        <path d="M4 14h3l2-6 3 10 2-6h6" />
      ) : name === 'chart' ? (
        <>
          <path d="M4 19V5M4 19h16" />
          <path d="M8 15v-4M12 15V8M16 15v-6" />
        </>
      ) : (
        <path d="M12 3 19 6.5v5.2c0 4.1-2.8 7.7-7 8.8-4.2-1.1-7-4.7-7-8.8V6.5L12 3z" />
      )}
    </svg>
  );
}
