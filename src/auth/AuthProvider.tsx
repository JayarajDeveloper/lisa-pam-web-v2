import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type SessionUser = {
  name: string;
  email: string;
  role: 'owner' | 'admin';
};

const STORAGE_KEY = 'lisa-pam-web-v2-session';

function readSession(): SessionUser | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

const AuthContext = createContext<{
  user: SessionUser | null;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(() => readSession());

  const value = useMemo(
    () => ({
      user,
      signIn(email: string, _password: string) {
        const next: SessionUser = {
          email: email.trim(),
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
