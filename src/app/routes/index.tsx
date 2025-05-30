import {
  Navigate,
  Outlet,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import Home from "../features/home/Home";
import Game from "../features/game/Game";
import Exchange from "../features/exchange/Exchange";
import Profile from "../features/userDashboard/components/Profile";
import Navbar from "../UI/Navbar";
import RaceTrack from "../features/game/components/RaceTrack";
import AuthContainer from "../features/auth/AuthForm";
import Dashboard from "../features/userDashboard/Dashboard";
import DashboardHome from "../features/userDashboard/Home";
import Shop from "../features/shop/Shop";
import Billing from "../UI/Billing/Billing";

const Routes = () => {
  const MainLayout = () => {
    return (
      <Navbar>
        <Outlet />
      </Navbar>
    );
  };

  const router = createHashRouter(
    [
      // Auth route
      {
        path: "/auth",
        element: <AuthContainer />,
      },
      // Dashboard routes
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "billing",
            element: <Billing />,
          },
          {
            path: "profile",
            element: <Profile />,
          }
        ],
      },
      // Main routes with navbar
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "shop",
            element: <Shop />,
          },
          {
            path: "exchange",
            element: <Exchange />,
          },
          {
            path: "game",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Game />,
              },
              {
                path: "race",
                element: <RaceTrack isBetting={false} />,
              },
              {
                path: "betting",
                element: <RaceTrack isBetting={true} betAmount={100} />,
              },
              {
                path: "leaderboard",
                element: <div>Leaderboard - Coming Soon</div>,
              },
            ],
          },
          {
            path: "*",
            element: <Navigate to="/" />,
          },
        ],
      },
    ],
    {
      future: {
        // Remove unsupported flags
      }
    }
  );

  return <RouterProvider router={router} />;
};

export default Routes;
