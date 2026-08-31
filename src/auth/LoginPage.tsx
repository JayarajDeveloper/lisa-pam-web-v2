import { useState, type FormEvent } from 'react';
import { useAuth } from './AuthProvider';
import { BrandLogo } from '../components/BrandLogo';

export function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    if (!email.trim() || password.length < 4) {
      setError('Enter an email and a password (4+ characters).');
      return;
    }
    signIn(email, password);
  }

  return (
    <div className="auth">
      <aside className="auth-hero">
        <div className="auth-hero-inner">
          <BrandLogo variant="light" />
          <p className="eyebrow">Ops console</p>
          <h1>
            Run LISA PAM from <span style={{ color: '#ffffff' }}>one cockpit</span>
          </h1>
          <p>
            Fleet, alerts, intelligence, and reports for Manureva admins. Customers use Lisa-App on
            the borne.
          </p>
        </div>
      </aside>

      <div className="auth-panel">
        <form className="auth-card" onSubmit={handleSubmit}>
          <BrandLogo />
          <h2>Admin sign in</h2>
          <p className="sub">Owners and admins only.</p>

          {error && (
            <div className="notice danger" role="alert">
              {error}
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn" type="submit" style={{ width: '100%' }}>
            Continue
          </button>
          <p className="hint">UI only — any email and password signs you in locally.</p>
        </form>
      </div>
    </div>
  );
}
