import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ROUTES = [
    {
      name: "Game",
      path: "/game",
      subRoutes: [
        {
          name: "Race",
          path: "/game/race",
          description: "Compete in exciting races with other players",
        },
        {
          name: "Betting",
          path: "/game/betting",
          description: "Place your bets on upcoming races",
        },
        {
          name: "Leaderboard",
          path: "/game/leaderboard",
          description: "Check the top players rankings",
        },
      ],
    },
    {
      name: "Shop",
      path: "/shop",
      description: "Purchase items and upgrades for your cars",
    },
    {
      name: "Exchange",
      path: "/exchange",
      description: "Trade items with other players",
    },
    {
      name: "Profile",
      path: "/profile",
      subRoutes: [
        {
          name: "Wallet",
          path: "/profile/wallet",
          description: "Manage your in-game currency",
        },
      ],
    },
    {
      name: "Login",
      path: "/login",
    },
    {
      name: "Register",
      path: "/register",
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
      <nav className="bg-gray-800 text-white fixed w-[97%] mx-auto left-0 right-0 top-5 rounded-[42px] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div
            className={`flex items-center ${
              isMenuOpen ? "justify-center" : "justify-between mx-10"
            }`}
          >
            <h1
              className="text-xl font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              Racing F1
            </h1>

            <div className="hidden md:block flex-1 px-8">
              <ul className="flex justify-center space-x-8">
                {mainRoutes.map((route) => (
                  <li key={route.path} className="relative group">
                    <button
                      onClick={() => navigate(route.path)}
                      className="px-3 py-2 text-sm font-medium hover:text-gray-300 transition-colors"
                    >
                      {route.name}
                    </button>

                    {route.subRoutes && (
                      <div className="absolute hidden group-hover:block w-80 left-0 pt-2 z-50">
                        <div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="p-4">
                            {route.subRoutes.map((subRoute) => (
                              <button
                                key={subRoute.path}
                                onClick={() => navigate(subRoute.path)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                              >
                                <div className="font-medium">
                                  {subRoute.name}
                                </div>
                                {subRoute.description && (
                                  <p className="text-gray-500 text-xs mt-1">
                                    {subRoute.description}
                                  </p>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:flex space-x-4">
              {authRoutes.map((route) => (
                <button
                  key={route.path}
                  onClick={() => navigate(route.path)}
                  className="px-4 py-2 text-sm font-medium hover:text-gray-300 transition-colors"
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
                className="w-6 h-6"
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

          <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} pt-4`}>
            <ul className="space-y-2">
              {ROUTES.map((route) => (
                <li key={route.path}>
                  <button
                    onClick={() => {
                      navigate(route.path);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md"
                  >
                    {route.name}
                  </button>

                  {route.subRoutes && (
                    <ul className="pl-4 space-y-2 mt-2">
                      {route.subRoutes.map((subRoute) => (
                        <li key={subRoute.path}>
                          <button
                            onClick={() => {
                              navigate(subRoute.path);
                              setIsMenuOpen(false);
                            }}
                            className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md"
                          >
                            {subRoute.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="flex-1 mt-24">{children}</div>
    </div>
  );
}
