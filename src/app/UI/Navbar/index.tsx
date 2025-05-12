import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Logo from "../../../assets/guci.svg";
interface NavbarProps {
  children?: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();
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
      path: "/auth?mode=login",
    },
    {
      name: "Register",
      path: "/auth?mode=register",
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
      <nav className="bg-white/10 backdrop-blur-lg dark:bg-black/10 fixed w-[97%] mx-auto left-0 right-0 top-5 rounded-[42px] z-50 border border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div
            className={`flex items-center ${
              isMenuOpen ? "justify-center" : "justify-between mx-10"
            }`}
          >
            <h1
              className="text-xl font-bold cursor-pointer text-gray-800 dark:text-white"
              onClick={() => navigate("/")}
            >
              <img src={Logo} alt="Logo" className="w-14 h-14" />
            </h1>

            <div className="hidden md:block flex-1 px-8">
              <ul className="flex justify-center space-x-8">
                {mainRoutes.map((route) => (
                  <li key={route.path} className="relative group">
                    <button
                      onClick={() => navigate(route.path)}
                      className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {route.name}
                    </button>

                    {route.subRoutes && (
                      <div className="absolute hidden group-hover:block w-80 left-0 pt-2 z-50">
                        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-lg rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                          <div className="p-4">
                            {route.subRoutes.map((subRoute) => (
                              <button
                                key={subRoute.path}
                                onClick={() => navigate(subRoute.path)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-white/10 rounded-md"
                              >
                                <div className="font-medium">
                                  {subRoute.name}
                                </div>
                                {subRoute.description && (
                                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
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

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>

              {authRoutes.map((route) => (
                <button
                  key={route.path}
                  onClick={() => navigate(route.path)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
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
                className="w-6 h-6 text-gray-700 dark:text-white"
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
              <li>
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center w-full px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md"
                >
                  {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
                  <span className="ml-2">
                    {isDarkMode ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                    )}
                  </span>
                </button>
              </li>

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
