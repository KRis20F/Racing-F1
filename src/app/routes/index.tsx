import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../providers/hooks/useAuthContext';
import { BASE_PATH } from '../providers/AuthContext';
import AuthForm from '../features/auth/AuthForm';
import Dashboard from '../features/userDashboard/Dashboard';
import Game from '../features/game/Game';
import Exchange from '../features/exchange/Exchange';
import { ShopPage as ShopV2 } from '../features/shopv2/ShopV2';
import Profile from '../features/userDashboard/components/Profile';
import Garage from '../features/userDashboard/components/Garage';
import Billing from '../features/userDashboard/Billing/Index';
import Home from '../features/home/Home';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B1437] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#4318FF]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`${BASE_PATH}/auth?mode=login`} replace />;
  }

  return <>{children}</>;
};

// Componente para rutas de autenticación
const AuthRoute = () => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <AuthForm />;
  };

const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta raíz */}
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path={BASE_PATH} element={<Navigate to="/" replace />} />

      {/* Rutas de autenticación */}
      <Route path={`${BASE_PATH}/auth`} element={<AuthRoute />} />

      {/* Rutas del dashboard */}
      <Route path={`${BASE_PATH}/dashboard`} element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
      }>
        <Route path="profile" element={<Profile />} />
        <Route path="garage" element={<Garage />} />
        <Route path="billing" element={<Billing />} />
      </Route>

      <Route path={`${BASE_PATH}/game`} element={
        <ProtectedRoute>
          <Game />
        </ProtectedRoute>
      } />

      <Route path={`${BASE_PATH}/exchange`} element={
            <ProtectedRoute>
              <Exchange />
            </ProtectedRoute>
      } />

      <Route path={`${BASE_PATH}/shop`} element={
            <ProtectedRoute>
          <ShopV2 />
            </ProtectedRoute>
      } />

      {/* Ruta 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
