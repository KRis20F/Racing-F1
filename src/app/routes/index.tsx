import {
  Navigate,
  Outlet,
  Routes as RouterRoutes,
  Route
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
import { Garage } from "../features/userDashboard/components/Garage";
import { ShopContextProvider } from "../features/shopv2/services/shop.context";

const LandingPage = () => {
  return (
    <Home />
  );
};

const Routes = () => {
  const MainLayout = () => {
    return (
      <Navbar>
        <Outlet />
      </Navbar>
    );
  };

  return (
    <RouterRoutes>
      {/* Public routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      {/* Auth route */}
      <Route path="/auth" element={<AuthContainer />} />

      {/* Dashboard routes (protegidas) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<div />} />
        <Route path="billing" element={<Billing />} />
        <Route path="profile" element={<Profile />} />
        <Route path="garage" element={<Garage />} />
      </Route>

      {/* Protected routes with navbar */}
      <Route path="/" element={<MainLayout />}>
        <Route
          path="shop"
          element={
            <ShopContextProvider>
              <ShopPage />
            </ShopContextProvider>
          }
        />
        <Route
          path="exchange"
          element={
            <ProtectedRoute>
              <Exchange />
            </ProtectedRoute>
          }
        />
        <Route
          path="game"
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<Game />} />
          <Route
            path="race"
            element={<RaceTrack isBetting={false} betAmount={0} isSubmittingResult={false} />}
          />
          <Route
            path="betting"
            element={<RaceTrack isBetting={true} betAmount={100} isSubmittingResult={false} />}
          />
          <Route
            path="leaderboard"
            element={<div>Leaderboard - Coming Soon</div>}
          />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </RouterRoutes>
  );
};

export default Routes;
