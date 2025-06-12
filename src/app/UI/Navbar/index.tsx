import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../../assets/svg/guci.svg";
import { BASE_PATH } from "../../providers/AuthContext";
import { useAuthContext } from '../../providers/hooks/useAuthContext';
import { FaGamepad, FaShoppingCart, FaExchangeAlt, FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

interface NavbarProps {
  children?: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, userData, logout } = useAuthContext();
  const [scrolled, setScrolled] = useState(false);

  // Solo aplicar efecto en el index
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Clases para el fondo del navbar
  const navBgClass = isHome
    ? (scrolled ? 'bg-black/10 backdrop-blur-lg border border-white/20' : 'bg-transparent border-transparent backdrop-blur-0')
    : 'bg-black/10 backdrop-blur-lg border border-white/20';

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

  const ICONS: Record<string, JSX.Element> = {
    Game: <FaGamepad className="inline mr-2 mb-1" />,
    Shop: <FaShoppingCart className="inline mr-2 mb-1" />,
    Exchange: <FaExchangeAlt className="inline mr-2 mb-1" />,
    Profile: <FaUser className="inline mr-2 mb-1" />,
    Login: <FaSignInAlt className="inline mr-2 mb-1" />,
    Register: <FaUserPlus className="inline mr-2 mb-1" />,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav
        className={`fixed w-[97%] mx-auto left-0 right-0 top-5 rounded-[42px] z-50 transition-all duration-500 ${navBgClass}`}
      >
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
                    className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    {ICONS[route.name]}{route.name}
                  </button>
                ))}
              </ul>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* Avatar del usuario */}
                  <button
                    onClick={() => navigate(`${BASE_PATH}/dashboard/profile`)}
                    className="flex items-center focus:outline-none cursor-pointer"
                    title={userData?.username || 'Perfil'}
                  >
                    {userData?.avatar ? (
                      <img
                        src={userData.avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      />
                    ) : (
                      <svg className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </button>
                  {/* Icono de logout */}
                  <button
                    onClick={logout}
                    className="ml-2 p-2 rounded-full hover:bg-red-100 transition-colors cursor-pointer"
                    title="Cerrar sesión"
                  >
                    <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </>
              ) : (
                authRoutes.map((route) => (
                  <button
                    key={route.path}
                    onClick={() => navigate(route.path)}
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    {ICONS[route.name]}{route.name}
                  </button>
                ))
              )}
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
                      {ICONS[route.name]}{route.name}
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
                      {ICONS[route.name]}{route.name}
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