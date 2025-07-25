import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/auth";

interface ProtectedRouteProps {
  allowedRole: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRole, children }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Toujours rediriger vers login sauf si on est déjà sur /login
  if (location.pathname !== '/login') {
    // Si pas d'utilisateur ou changement de route, redirection vers login
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Vérification du rôle
    if (user.userRole !== allowedRole) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
