import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
import Home from "../app/features/home/Home";
import Game from "../app/features/game/Game";
import Exchange from "../app/features/exchange/Exchange";
import Profile from "../app/features/profile/Profile";
import Navbar from "../app/UI/Navbar";
import RaceTrack from "../app/features/game/components/RaceTrack";
import { ThemeProvider, useTheme } from "../app/context/ThemeContext";

const Routes = () => {
  const Layout = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    return (
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
        <Outlet />
      </Navbar>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "exchange",
          element: <Exchange />,
        },
        {
          path: "profile",
          element: <Profile />,
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
  ]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default Routes;
