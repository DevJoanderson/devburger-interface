import { Outlet, Navigate } from 'react-router-dom';


export function AdminLayout() {
    const isAdmin = true;
    return isAdmin ? <Outlet /> : <Navigate to="/login" />
}