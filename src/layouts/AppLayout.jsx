import { Outlet } from 'react-router-dom';
import AppProvider from '../hooks';

export function AppLayout() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}
