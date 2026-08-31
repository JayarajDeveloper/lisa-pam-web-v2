import {
  MOCK_ALERTS,
  MOCK_DEVICES,
  MOCK_HOTSPOTS,
  MOCK_SPECIES,
  MOCK_TREND,
} from '../data/mock';
import { Gauge, LineChart, SpeciesDonut } from '../components/charts';
import { Card, CardHead, Chip, Empty, PageToolbar, StatusChip, relativeTime } from '../components/ui';

export function DashboardPage() {
  const rows = MOCK_DEVICES;
  const online = rows.filter((d) => d.status === 'online').length;
  const offline = rows.filter((d) => d.status === 'offline').length;
  const silent = rows.filter((d) => d.status === 'never_reported').length;
  const attention = offline + silent;
  const healthPct = rows.length === 0 ? 0 : Math.round((online / rows.length) * 100);
  const catchTotal = MOCK_SPECIES.reduce((sum, row) => sum + row.count, 0);
  const maxHotspot = Math.max(1, ...MOCK_HOTSPOTS.map((h) => h.weekCaptures));
  const critical = MOCK_ALERTS.filter((a) => a.severity === 'critical').length;
  const reachablePct =
    rows.length === 0 ? 0 : Math.round((1 - offline / Math.max(rows.length, 1)) * 100);
  const clearPct = Math.max(0, 100 - Math.round((critical / Math.max(MOCK_ALERTS.length, 1)) * 100));

  return (
    <>
      <PageToolbar title="Overview" icon="grid">
        <Chip tone="accent">{rows.length} traps</Chip>
      </PageToolbar>

      <div className="bento">
        <section className="kpi-hero span-4">
          <p className="eyebrow">Fleet health</p>
          <div className="metric">{online}</div>
          <div className="trend">
            {healthPct}% reporting · {offline} silent
          </div>
          <div className="bar">
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${healthPct}%` }} />
            </div>
            <div className="bar-meta">
              <span>Online coverage</span>
              <span>{healthPct}% achieved</span>
            </div>
          </div>
        </section>

        <Card className="kpi-mini span-4">
          <div className="stat-label">Captures (window)</div>
          <div className="metric">{catchTotal}</div>
          <div className="delta up">Species mix across the fleet</div>
        </Card>

        <Card className="kpi-mini span-4">
          <div className="stat-label">Attention needed</div>
          <div className={`metric${attention > 0 ? ' danger' : ''}`}>{attention}</div>
          <div className={`delta ${attention > 0 ? 'down' : 'up'}`}>
            {offline} offline · {silent} never reported
          </div>
        </Card>

        <Card className="span-8">
          <CardHead icon="chart" extra={<Chip>14 days</Chip>}>
            Catch trend
          </CardHead>
          <div className="mt">
            <LineChart points={MOCK_TREND} label="Captures" />
          </div>
        </Card>

        <Card className="span-4">
          <CardHead icon="spark">Species mix</CardHead>
          <SpeciesDonut counts={MOCK_SPECIES} />
        </Card>

        <Card className="span-4">
          <CardHead icon="hotspots">Top localities</CardHead>
          {MOCK_HOTSPOTS.length === 0 ? (
            <Empty>No localities scored yet</Empty>
          ) : (
            <ul className="rank-list">
              {MOCK_HOTSPOTS.map((row) => (
                <li key={row.localityId}>
                  <div className="bar-wrap">
                    <div className="name">
                      <strong>{row.locality}</strong>
                      <span>{row.weekCaptures}</span>
                    </div>
                    <div className="track">
                      <div
                        className="fill"
                        style={{ width: `${(row.weekCaptures / maxHotspot) * 100}%` }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="span-4">
          <CardHead icon="shield">Coverage</CardHead>
          <div className="gauge-row">
            <Gauge value={healthPct} label="Online" color="var(--ok)" />
            <Gauge value={reachablePct} label="Reachable" color="var(--info)" />
            <Gauge value={clearPct} label="Clear" color="var(--warn)" />
          </div>
        </Card>

        <Card className="span-4">
          <CardHead icon="activity">Recent alerts</CardHead>
          <ul className="activity">
            {MOCK_ALERTS.slice(0, 5).map((alert) => (
              <li key={alert.id}>
                <span
                  className={`dot ${
                    alert.severity === 'critical'
                      ? 'danger'
                      : alert.severity === 'warning'
                        ? 'warn'
                        : 'info'
                  }`}
                >
                  !
                </span>
                <div className="body">
                  <strong>{alert.type.replace(/_/g, ' ')}</strong>
                  <span>
                    {alert.deviceId ?? alert.region ?? 'org'}
                    {alert.message ? ` · ${alert.message.slice(0, 64)}` : ''}
                  </span>
                </div>
                <time>{relativeTime(alert.createdAt)}</time>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="span-12">
          <CardHead icon="fleet">Traps</CardHead>
          <div className="scroll mt">
            <table>
              <thead>
                <tr>
                  <th>Trap</th>
                  <th>Status</th>
                  <th>Last seen</th>
                  <th>Tier</th>
                  <th>Firmware</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((device) => (
                  <tr key={device.id}>
                    <td>
                      <code>{device.id}</code>
                    </td>
                    <td>
                      <StatusChip status={device.status} />
                    </td>
                    <td className="muted">{relativeTime(device.lastSeenAt)}</td>
                    <td>
                      <Chip>{device.tier}</Chip>
                    </td>
                    <td className="num">{device.fwVer}</td>
                    <td className="num muted">
                      {device.lat !== null && device.lon !== null
                        ? `${device.lat.toFixed(4)}, ${device.lon.toFixed(4)}`
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
