import { Navigate, Outlet } from 'react-router';
import { useLoginStore } from '../store/LoginStore';

export function PrivateRoute ({ allowedRoles = [] }) {
  const token = useLoginStore((state) => state.accessToken)
  const role = useLoginStore((state) => state.role)

  if (!token) {
    return <Navigate to='/' replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to='/unauthorized' replace />
  }

  return <Outlet />
}
