import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/svg/guci.svg";
import { BASE_PATH } from "../../providers/AuthContext";

interface NavbarProps {
  children?: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ROUTES = [
    {
      name: "Game",
      path: `${BASE_PATH}/game`,
      subRoutes: [
        {
          name: "Race",
          path: `${BASE_PATH}/game/race`,
          description: "Compete in exciting races with other players",
        },
        {
          name: "Betting",
          path: `${BASE_PATH}/game/betting`,
          description: "Place your bets on upcoming races",
        },
        {
          name: "Leaderboard",
          path: `${BASE_PATH}/game/leaderboard`,
          description: "Check the top players rankings",
        },
      ],
    },
    {
      name: "Shop",
      path: `${BASE_PATH}/shop`,
      description: "Purchase items and upgrades for your cars",
    },
    {
      name: "Exchange",
      path: `${BASE_PATH}/exchange`,
      description: "Trade items with other players",
    },
    {
      name: "Profile",
      path: `${BASE_PATH}/profile`,
      subRoutes: [
        {
          name: "Wallet",
          path: `${BASE_PATH}/profile/wallet`,
          description: "Manage your in-game currency",
        },
      ],
    },
    {
      name: "Login",
      path: `${BASE_PATH}/auth?mode=login`,
    },
    {
      name: "Register",
      path: `${BASE_PATH}/auth?mode=register`,
    },
  ];

  const mainRoutes = ROUTES.filter(
    (route) => !["Login", "Register"].includes(route.name)
  );
  const authRoutes = ROUTES.filter((route) =>
    ["Login", "Register"].includes(route.name)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-black/10 backdrop-blur-lg fixed w-[97%] mx-auto left-0 right-0 top-5 rounded-[42px] z-50 border border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div
            className={`flex items-center ${
              isMenuOpen ? "justify-center" : "justify-between mx-10"
            }`}
          >
            <h1
              className="text-xl font-bold cursor-pointer text-white"
              onClick={() => navigate("/")}
            >
              <img src={Logo} alt="Logo" className="w-14 h-14" />
            </h1>

            <div className="hidden md:block flex-1 px-8">
              <ul className="flex justify-center space-x-8">
                {mainRoutes.map((route) => (
                  <button
                    key={route.path}
                    onClick={() => navigate(route.path)}
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    {route.name}
                  </button>
                ))}
              </ul>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {authRoutes.map((route) => (
                <button
                  key={route.path}
                  onClick={() => navigate(route.path)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {route.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 py-2 bg-gray-800 rounded-lg">
              <ul className="space-y-2">
                {mainRoutes.map((route) => (
                  <li key={route.path}>
                    <button
                      onClick={() => {
                        navigate(route.path);
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      {route.name}
                    </button>
                  </li>
                ))}
                {authRoutes.map((route) => (
                  <li key={route.path}>
                    <button
                      onClick={() => {
                        navigate(route.path);
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      {route.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
      {children}
    </div>
  );
}
