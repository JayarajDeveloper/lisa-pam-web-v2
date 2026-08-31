export type Species = 'aedes' | 'culex' | 'anopheles' | 'other';
export type DeviceStatus = 'online' | 'offline' | 'never_reported';
export type DeviceTier = 'b2c' | 'b2b' | 'b2g';
export type AlertSeverity = 'critical' | 'warning' | 'info';

export type Device = {
  id: string;
  status: DeviceStatus;
  lastSeenAt: string | null;
  tier: DeviceTier;
  fwVer: string;
  lat: number | null;
  lon: number | null;
};

export type Alert = {
  id: string;
  type: string;
  severity: AlertSeverity;
  deviceId: string | null;
  region: string | null;
  message: string | null;
  createdAt: string;
};

export type Hotspot = {
  localityId: string;
  locality: string;
  weekCaptures: number;
};

export type SpeciesCount = { species: Species; count: number };
export type TrendPoint = { x: number; y: number };
