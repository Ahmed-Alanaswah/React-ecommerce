import { useAppSelector } from "@store/hooks";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  if (!accessToken) {
    Navigate({ to: "/login?message=login_required", replace: true });
  }
  return <>{children}</>;
};

export default ProtectedRoute;
