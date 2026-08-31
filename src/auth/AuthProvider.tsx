import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type SessionUser = {
  name: string;
  email: string;
  role: 'owner' | 'admin';
};

const STORAGE_KEY = 'lisa-pam-web-v2-session';

function parseUser(value: unknown): SessionUser | null {
  if (!value || typeof value !== 'object') return null;
  const row = value as Record<string, unknown>;
  if (typeof row.email !== 'string' || typeof row.name !== 'string') return null;
  if (row.role !== 'owner' && row.role !== 'admin') return null;
  return { email: row.email, name: row.name, role: row.role };
}

function readSession(): SessionUser | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const user = parseUser(JSON.parse(raw));
    if (!user) sessionStorage.removeItem(STORAGE_KEY);
    return user;
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

const AuthContext = createContext<{
  user: SessionUser | null;
  signIn: (email: string) => void;
  signOut: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(readSession);

  const value = useMemo(
    () => ({
      user,
      signIn(email: string) {
        const next: SessionUser = {
          email: email.trim().toLowerCase(),
          name: email.split('@')[0]?.replace(/[._]/g, ' ') || 'Admin',
          role: 'admin',
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setUser(next);
      },
      signOut() {
        sessionStorage.removeItem(STORAGE_KEY);
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
