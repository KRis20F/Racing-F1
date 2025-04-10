import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
import Home from "../app/features/home/Home";
import Game from "../app/features/game/Game";
import Exchange from "../app/features/exchange/components/Exchange";
import Navbar from "../app/UI/Navbar";
import RaceTrack from "../app/features/game/components/RaceTrack";

const Routes = () => {
  const Layout = () => (
    <Navbar>
      <Outlet />
    </Navbar>
  );

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
          path: "game",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <Game />
            },
            {
              path: "race",
              element: <RaceTrack isBetting={false} trackId={0} />
            },
            {
              path: "betting",
              element: <RaceTrack isBetting={true} betAmount={100} />
            },
            {
              path: "leaderboard",
              element: <div>Leaderboard - Coming Soon</div>
            }
          ]
        },
        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;