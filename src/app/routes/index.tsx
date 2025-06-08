import {
  Navigate,
  Outlet,
  Routes as RouterRoutes,
  Route,
  useLocation
} from "react-router-dom";
import Game from "../features/game/Game";
import Exchange from "../features/exchange/Exchange";
import Profile from "../features/userDashboard/components/Profile";
import Navbar from "../UI/Navbar";
import RaceTrack from "../features/game/components/RaceTrack";
import AuthContainer from "../features/auth/AuthForm";
import Dashboard from "../features/userDashboard/Dashboard";
import Billing from "../features/userDashboard/Billing/Index";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../features/home/Home";
import { ShopPage } from "../features/shopv2/ShopV2";
import Garage from "../features/userDashboard/components/Garage";
import { ShopContextProvider } from "../features/shopv2/services/shop.context";
import { useAuthContext } from "../providers/AuthProvider";

// Componente para manejar la redirección de autenticación
const AuthRoute = () => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (isAuthenticated) {
    const from = location.state?.from || '/dashboard';
    return <Navigate to={from} replace />;
  }

  return <AuthContainer />;
};

const Routes = () => {
  return (
    <RouterRoutes>
      {/* Public routes */}
      <Route path="/" element={<Navbar><Outlet /></Navbar>}>
        <Route index element={<Home />} />
        <Route path="shop" element={
          <ShopContextProvider>
            <ShopPage />
          </ShopContextProvider>
        } />
      </Route>

      {/* Auth routes - No Navbar */}
      <Route path="/auth" element={<AuthRoute />} />

      {/* Protected routes - With Navbar */}
      <Route element={
        <ProtectedRoute>
          <Navbar>
            <Outlet />
          </Navbar>
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<div />} />
          <Route path="billing" element={<Billing />} />
          <Route path="profile" element={<Profile />} />
          <Route path="garage" element={<Garage />} />
        </Route>

        <Route path="/exchange" element={<Exchange />} />
        
        <Route path="/game">
          <Route index element={<Game />} />
          <Route path="race" element={<RaceTrack isBetting={false} betAmount={0} isSubmittingResult={false} />} />
          <Route path="betting" element={<RaceTrack isBetting={true} betAmount={100} isSubmittingResult={false} />} />
          <Route path="leaderboard" element={<div>Leaderboard - Coming Soon</div>} />
        </Route>
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  );
};

export default Routes;
