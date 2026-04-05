import { Outlet, useNavigate } from "react-router";
import { useLoginStore } from "../store/LoginStore";

export function PrivateRoute({ allowedRoles = [] }) {
  const navigate = useNavigate();
  const token = useLoginStore((state) => state.accessToken);
  const role = useLoginStore((state) => state.role);

  if (!token) {
    navigate("/login");
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    navigate("/unauthorized");
  }

  return <Outlet />;
}
