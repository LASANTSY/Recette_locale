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
import { useAuth } from './context/auth';

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
  switch (user.userRole) {
    case 'Administrateur':
      return (
        <Routes>
          <Route 
            path="/administrateur/*" 
            element={
              <ProtectedRoute allowedRole="Administrateur">
                <AdministrateurLayout />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/administrateur/tableau_de_bord" replace />} />
        </Routes>
      );
    case 'SuperAdministrateur':
      return (
        <Routes>
          <Route 
            path="/*" 
            element={
              <ProtectedRoute allowedRole="SuperAdministrateur">
                <SuperAdministrateurLayout />
              </ProtectedRoute>
            } 
          />
        </Routes>
      );
    case 'Caissier':
      return (
        <Routes>
          <Route 
            path="/*" 
            element={
              <ProtectedRoute allowedRole="Caissier">
                <CaissierLayout />
              </ProtectedRoute>
            } 
          />
        </Routes>
      );
    case 'Maire':
      return (
        <Routes>
          <Route 
            path="/*" 
            element={
              <ProtectedRoute allowedRole="Maire">
                <MaireLayout />
              </ProtectedRoute>
            } 
          />
        </Routes>
      );
    case 'Ordonnateur':
      return (
        <Routes>
          <Route 
            path="/*" 
            element={
              <ProtectedRoute allowedRole="Ordonnateur">
                <OrdonnateurLayout />
              </ProtectedRoute>
            } 
          />
        </Routes>
      );
    case 'Percepteur':
      return (
        <Routes>
          <Route 
            path="/*" 
            element={
              <ProtectedRoute allowedRole="Percepteur">
                <PercepteurLayout />
              </ProtectedRoute>
            } 
          />
        </Routes>
      );
    case 'Tresorier':
      return (
        <Routes>
          <Route 
            path="/*" 
            element={
              <ProtectedRoute allowedRole="Tresorier">
                <TresorierLayout />
              </ProtectedRoute>
            } 
          />
        </Routes>
      );
    case 'Contribuable':
      return (
        <Routes>
          <Route 
            path="/*" 
            element={
              <ProtectedRoute allowedRole="Contribuable">
                <ContribuableLayout />
              </ProtectedRoute>
            } 
          />
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
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
