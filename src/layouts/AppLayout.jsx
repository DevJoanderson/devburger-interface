// src/layouts/AppLayout.jsx
import { Outlet } from 'react-router-dom';
import AppProvider from '../hooks';
import styled from 'styled-components';

export function AppLayout() {
  return (
    <AppProvider>

      <Outlet />

    </AppProvider>
  );
}

