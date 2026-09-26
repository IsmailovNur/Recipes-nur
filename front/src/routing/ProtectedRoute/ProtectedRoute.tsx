import { AppRoutes } from "../routes.ts";
import { useAppSelector } from "../../app/hooks.ts";
import { Navigate, Outlet } from "react-router-dom";
import { selectUser } from "../../entities/User/userSlice.ts";

interface ProtectedRouteProps {
  isAllowed?: boolean;
  redirectPath?: string;
}

export const ProtectedRoute = (
  {
    isAllowed,
    redirectPath = AppRoutes.login
  }: ProtectedRouteProps) => {
  const user = useAppSelector(selectUser);

  const allowed = isAllowed !== undefined ? isAllowed : Boolean(user);

  if (!allowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};