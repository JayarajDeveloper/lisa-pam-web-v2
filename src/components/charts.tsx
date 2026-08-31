import { useId } from 'react';
import { SPECIES_COLOUR } from './ui';
import type { Species } from '../data/mock';

export function LineChart({
  points,
  height = 120,
  label,
  colour = 'var(--accent)',
}: {
  points: { x: number; y: number }[];
  height?: number;
  label: string;
  colour?: string;
}) {
  const gradientId = useId();
  if (points.length < 2) {
    return <p className="empty">Not enough {label.toLowerCase()} data yet</p>;
  }

  const width = 600;
  const pad = { top: 8, right: 4, bottom: 16, left: 30 };
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  let yMin = Math.min(...ys);
  let yMax = Math.max(...ys);
  if (yMax - yMin < 1e-9) {
    yMax += 1;
    yMin -= 1;
  }
  const padY = (yMax - yMin) * 0.1;
  yMin -= padY;
  yMax += padY;

  const sx = (x: number): number =>
    pad.left + ((x - xMin) / (xMax - xMin || 1)) * (width - pad.left - pad.right);
  const sy = (y: number): number =>
    pad.top + (1 - (y - yMin) / (yMax - yMin)) * (height - pad.top - pad.bottom);

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${sx(p.x)},${sy(p.y)}`).join(' ');
  const last = points[points.length - 1]!;
  const area = `${path} L${sx(last.x)},${height - pad.bottom} L${sx(points[0]!.x)},${height - pad.bottom} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label={`${label}: ${points.length} readings, latest ${last.y}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colour} stopOpacity="0.28" />
          <stop offset="100%" stopColor={colour} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path d={path} fill="none" stroke={colour} strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx={sx(last.x)} cy={sy(last.y)} r="3.5" fill={colour} />
    </svg>
  );
}

export function SpeciesDonut({
  counts,
  size = 132,
}: {
  counts: { species: Species; count: number }[];
  size?: number;
}) {
  const total = counts.reduce((sum, row) => sum + row.count, 0);
  if (total === 0) return <p className="empty">No captures yet</p>;

  const r = 42;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const cx = 56;
  const cy = 56;

  return (
    <div>
      <svg width={size} height={size} viewBox="0 0 112 112" role="img" aria-label="Species mix">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--ground-deep)" strokeWidth="14" />
        {counts.map((row) => {
          const len = (row.count / total) * c;
          const dash = `${len} ${c - len}`;
          const el = (
            <circle
              key={row.species}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={SPECIES_COLOUR[row.species]}
              strokeWidth="14"
              strokeDasharray={dash}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${cx} ${cy})`}
              strokeLinecap="butt"
            />
          );
          offset += len;
          return el;
        })}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fontSize="16"
          fontWeight="800"
          fill="var(--ink)"
        >
          {total}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="8" fill="var(--muted)">
          captures
        </text>
      </svg>
      <ul className="species-legend">
        {counts.map((row) => (
          <li key={row.species}>
            <span className="swatch" style={{ background: SPECIES_COLOUR[row.species] }} />
            {row.species}
            <span className="count">{row.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
