import type { Alert, Device, Hotspot, SpeciesCount, TrendPoint } from '../types';

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

function daysAgo(days: number): string {
  const d = new Date();
  d.setHours(8, 0, 0, 0);
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

export const MOCK_DEVICES: Device[] = [
  { id: 'lisa-pam-001', status: 'online', lastSeenAt: hoursAgo(0.2), tier: 'b2c', fwVer: '1.4.2', lat: 43.2965, lon: 5.3698 },
  { id: 'lisa-pam-002', status: 'online', lastSeenAt: hoursAgo(0.4), tier: 'b2c', fwVer: '1.4.2', lat: 43.6047, lon: 1.4442 },
  { id: 'lisa-pam-003', status: 'offline', lastSeenAt: hoursAgo(18), tier: 'b2b', fwVer: '1.3.8', lat: 48.8566, lon: 2.3522 },
  { id: 'lisa-pam-004', status: 'online', lastSeenAt: hoursAgo(1.1), tier: 'b2c', fwVer: '1.4.2', lat: 45.764, lon: 4.8357 },
  { id: 'lisa-pam-005', status: 'online', lastSeenAt: hoursAgo(0.7), tier: 'b2g', fwVer: '1.4.1', lat: 43.7102, lon: 7.262 },
  { id: 'lisa-pam-006', status: 'never_reported', lastSeenAt: null, tier: 'b2c', fwVer: '1.4.2', lat: null, lon: null },
  { id: 'lisa-pam-007', status: 'online', lastSeenAt: hoursAgo(2.4), tier: 'b2b', fwVer: '1.4.0', lat: 47.2184, lon: -1.5536 },
  { id: 'lisa-pam-008', status: 'offline', lastSeenAt: hoursAgo(36), tier: 'b2c', fwVer: '1.3.8', lat: 44.8378, lon: -0.5792 },
];

export const MOCK_SPECIES: SpeciesCount[] = [
  { species: 'aedes', count: 148 },
  { species: 'culex', count: 92 },
  { species: 'anopheles', count: 31 },
  { species: 'other', count: 17 },
];

const WAVE = [18, 22, 19, 27, 31, 24, 21, 29, 34, 38, 33, 28, 36, 41];

export const MOCK_TREND: TrendPoint[] = WAVE.map((y, i) => ({
  x: new Date(daysAgo(13 - i)).getTime(),
  y,
}));

export const MOCK_HOTSPOTS: Hotspot[] = [
  { localityId: 'loc-1', locality: 'Marseille — Prado', weekCaptures: 86 },
  { localityId: 'loc-2', locality: 'Nice — Cimiez', weekCaptures: 61 },
  { localityId: 'loc-3', locality: 'Toulouse — Capitole', weekCaptures: 44 },
];

export const MOCK_ALERTS: Alert[] = [
  { id: 'a1', type: 'trap_offline', severity: 'critical', deviceId: 'lisa-pam-003', region: null, message: 'No telemetry for 18 hours — check power and LTE.', createdAt: hoursAgo(4) },
  { id: 'a2', type: 'catch_spike', severity: 'warning', deviceId: 'lisa-pam-005', region: null, message: 'Aedes captures 2.4× the 7-day mean.', createdAt: hoursAgo(7) },
  { id: 'a3', type: 'never_reported', severity: 'warning', deviceId: 'lisa-pam-006', region: null, message: 'Factory flash complete, no first heartbeat yet.', createdAt: hoursAgo(11) },
  { id: 'a4', type: 'firmware_lag', severity: 'info', deviceId: 'lisa-pam-008', region: null, message: 'Running 1.3.8 — 1.4.2 is available.', createdAt: hoursAgo(20) },
  { id: 'a5', type: 'hotspot_rise', severity: 'info', deviceId: null, region: 'PACA', message: 'Week-on-week captures up 18% across the coast.', createdAt: hoursAgo(28) },
];
