import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdministrateurLayout from './components/layouts/AdministrateurLayout';
import CaissierLayout from "./components/layouts/CaissierLayout";
import MaireLayout from "./components/layouts/MaireLayout";
import OrdonnateurLayout from "./components/layouts/OrdonnateurLayout";
import PercepteurLayout from "./components/layouts/PercepteurLayout";
import TresorierLayout from "./components/layouts/TresorierLayout";
import ContribuableLayout from "./components/layouts/ContribuableLayout";
import SuperAdministrateurLayout from "./components/layouts/SuperAdministrateurLayout";
import Login from "./pages/Login";
import ProtectedRoute from "./components/common/auth/ProtectedRoute";
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContextV2';
import { UserProvider } from './pages/superAdmin/userManagement/context/UserContext';
import { useAuth } from './context/auth';

// Import des routes
import type { AppRoute } from './routes/types';
import AdministrateurRoutes from './routes/Administrateur.routes';
import SuperAdministrateurRoutes from './routes/SuperAdministrateur.routes';
import CaissierRoutes from './routes/Caissier.routes';
import MaireRoutes from './routes/Maire.routes';
import OrdonnateurRoutes from './routes/Ordonnateur.routes';
import PercepteurRoutes from './routes/Percepteur.routes';
import TresorierRoutes from './routes/Tresorier.routes';
import ContribuableRoutes from './routes/Contribuable.routes';
// import SuperAdministrateurRoutes from './routes/SuperAdministrateur.routes';
// import CaissierRoutes from './routes/Caissier.routes';
// import MaireRoutes from './routes/Maire.routes';
// import OrdonnateurRoutes from './routes/Ordonnateur.routes';
// import PercepteurRoutes from './routes/Percepteur.routes';
// import TresorierRoutes from './routes/Tresorier.routes';
// import ContribuableRoutes from './routes/Contribuable.routes';

function AppRoutes() {
  const { user } = useAuth();
  const location = useLocation();

  // Si l'utilisateur n'est pas connecté ou si on est sur la racine, rediriger vers login
  if (!user || location.pathname === '/') {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" state={{ from: location }} replace />} />
      </Routes>
    );
  }
  switch (user.role) {
    case 'Administrateur':
      return (
        <Routes>
          <Route 
            path="/administrateur" 
            element={
              <ProtectedRoute allowedRole="Administrateur">
                <AdministrateurLayout />
              </ProtectedRoute>
            }
          >
            {AdministrateurRoutes.map((route: AppRoute, index: number) => (
              <Route
                key={index}
                index={route.index}
                path={route.path?.replace('/administrateur/', '')}
                element={route.element}
              />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/administrateur/tableau-de-bord" replace />} />
        </Routes>
      );
    case 'SuperAdministrateur':
      return (
        <Routes>
          <Route 
            path="/super-administrateur" 
            element={
              <ProtectedRoute allowedRole="SuperAdministrateur">
                <SuperAdministrateurLayout />
              </ProtectedRoute>
            }
          >
            {SuperAdministrateurRoutes.map((route: AppRoute, index: number) => (
              <Route
                key={index}
                index={route.index}
                path={route.path?.replace('/super-administrateur/', '')}
                element={route.element}
              />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/super-administrateur/configuration" replace />} />
        </Routes>
      );
    case 'Caissier':
      return (
        <Routes>
          <Route 
            path="/caissier" 
            element={
              <ProtectedRoute allowedRole="Caissier">
                <CaissierLayout />
              </ProtectedRoute>
            }
          >
            {CaissierRoutes.map((route: AppRoute, index: number) => (
              <Route
                key={index}
                index={route.index}
                path={route.path?.replace('/caissier/', '')}
                element={route.element}
              />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/caissier" replace />} />
        </Routes>
      );
    case 'Maire':
      return (
        <Routes>
          <Route 
            path="/maire" 
            element={
              <ProtectedRoute allowedRole="Maire">
                <MaireLayout />
              </ProtectedRoute>
            }
          >
            {MaireRoutes.map((route: AppRoute, index: number) => (
              <Route
                key={index}
                index={route.index}
                path={route.path?.replace('/maire/', '')}
                element={route.element}
              />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/maire" replace />} />
        </Routes>
      );
    case 'Ordonnateur':
      return (
        <Routes>
          <Route 
            path="/ordonnateur" 
            element={
              <ProtectedRoute allowedRole="Ordonnateur">
                <OrdonnateurLayout />
              </ProtectedRoute>
            }
          >
            {OrdonnateurRoutes.map((route: AppRoute, index: number) => (
              <Route
                key={index}
                index={route.index}
                path={route.path?.replace('/ordonnateur/', '')}
                element={route.element}
              />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/ordonnateur" replace />} />
        </Routes>
      );
    case 'Percepteur':
      return (
        <Routes>
          <Route 
            path="/percepteur" 
            element={
              <ProtectedRoute allowedRole="Percepteur">
                <PercepteurLayout />
              </ProtectedRoute>
            }
          >
            {PercepteurRoutes.map((route: AppRoute, index: number) => (
              <Route
                key={index}
                index={route.index}
                path={route.path?.replace('/percepteur/', '')}
                element={route.element}
              />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/percepteur" replace />} />
        </Routes>
      );
    case 'Tresorier':
      return (
        <Routes>
          <Route 
            path="/tresorier" 
            element={
              <ProtectedRoute allowedRole="Tresorier">
                <TresorierLayout />
              </ProtectedRoute>
            }
          >
            {TresorierRoutes.map((route: AppRoute, index: number) => (
              <Route
                key={index}
                index={route.index}
                path={route.path?.replace('/tresorier/', '')}
                element={route.element}
              />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/tresorier" replace />} />
        </Routes>
      );
    case 'Contribuable':
      return (
        <Routes>
          <Route 
            path="/contribuable" 
            element={
              <ProtectedRoute allowedRole="Contribuable">
                <ContribuableLayout />
              </ProtectedRoute>
            }
          >
            {ContribuableRoutes.map((route: AppRoute, index: number) => (
              <Route
                key={index}
                index={route.index}
                path={route.path?.replace('/contribuable/', '')}
                element={route.element}
              />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/contribuable" replace />} />
        </Routes>
      );
    default:
      return <div>Rôle non supporté</div>;
  }
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
