import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = !!sessionStorage.getItem("access_token");
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};
const ProtectedAuth = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = !!sessionStorage.getItem("access_token");
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
export { ProtectedLayout, ProtectedAuth };
