import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../app/features/auth/Login";
import Home from "../app/features/home/Home";
import Game from "../app/features/game/Game";
import Exchange from "../app/features/exchange/components/Exchange";
import Navbar from "../app/UI/Navbar";

const Routes = () => {
  // Definir el layout principal que incluye el Navbar
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
          path: "login",
          element: <Login />,
        },
        {
          path: "exchange",
          element: <Exchange />,
        },
        {
          path: "game",
          element: (
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          ),
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
