import { useMemo, type ReactNode } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { BrandLogo } from './BrandLogo';
import { Icon } from './icons';

export function AppShell({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth();

  const initials = useMemo(() => {
    const parts = (user?.name ?? 'U').trim().split(/\s+/);
    return ((parts[0]?.[0] ?? 'U') + (parts[1]?.[0] ?? '')).toUpperCase();
  }, [user?.name]);

  return (
    <div className="shell">
      <aside className="sidebar">
        <a href="/" className="brand" aria-label="LISA PAM ops">
          <BrandLogo />
        </a>

        <nav className="nav-section nav" aria-label="Operations">
          <div className="nav-label">Operations</div>
          <a href="/" className="active">
            <Icon name="grid" />
            Overview
          </a>
        </nav>

        <div className="sidebar-foot">
          <strong>Ops cockpit</strong>
          <p>Admin overview of trap health and catch signals.</p>
        </div>
      </aside>

      <div className="shell-main">
        <header className="topbar">
          <div className="breadcrumb" aria-label="Breadcrumb">
            <span>Ops</span>
            <span className="sep">/</span>
            <strong>Overview</strong>
          </div>

          <div className="topbar-right">
            <div className="user-pill" title={user?.email}>
              <span className="avatar">{initials}</span>
              <span className="meta">
                <strong>{user?.name}</strong>
                <span>{user?.role}</span>
              </span>
            </div>
            <button className="btn secondary small" type="button" onClick={signOut}>
              Sign out
            </button>
          </div>
        </header>

        <main className="page">{children}</main>
      </div>
    </div>
  );
}
