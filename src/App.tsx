import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';
import { LoginPage } from './auth/LoginPage';
import { AppShell } from './components/AppShell';
import { DashboardPage } from './pages/DashboardPage';

export function App() {
  const { user } = useAuth();

  if (!user) return <LoginPage />;

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
