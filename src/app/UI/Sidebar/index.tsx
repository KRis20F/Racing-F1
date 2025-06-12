import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../../assets/svg/guci.svg";
import { useAuthContext } from "../../providers/hooks/useAuthContext";
import { BASE_PATH } from "../../providers/AuthContext";
import React from "react";

interface SidebarProps {
  isDrawer?: boolean;
  show?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isDrawer = false, show = false, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const location = useLocation();

  // Solo mostrar el sidebar en rutas que incluyan el dashboard real
  if (!location.pathname.startsWith(`${BASE_PATH}/dashboard`)) {
    return null;
  }

  const MENU_ITEMS = [
    {
      title: "MAIN",
      items: [
        {
          name: "Principal",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          ),
          path: "/",
          onClick: () => navigate("/")
        },
        {
          name: "Dashboard",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          ),
          path: "/Racing-F1/dashboard",
          onClick: () => navigate("/Racing-F1/dashboard")
        },
        {
          name: "Garage",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
          ),
          path: "/Racing-F1/dashboard/garage",
          onClick: () => navigate("/Racing-F1/dashboard/garage")
        },
        {
          name: "Profile",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
          path: "/Racing-F1/dashboard/profile",
          onClick: () => navigate("/Racing-F1/dashboard/profile")
        },
        {
          name: "Billing",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          ),
          path: "/Racing-F1/dashboard/billing",
          onClick: () => navigate("/Racing-F1/dashboard/billing")
        }
      ]
    },
    {
      title: "ACCOUNT",
      items: [
        {
          name: "Logout",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          ),
          path: "/auth",
          onClick: () => {
            console.log("Cerrando sesión...");
            logout();
          }
        }
      ]
    }
  ];

  // Clases para drawer móvil
  const drawerClasses = isDrawer
    ? `fixed top-0 left-0 h-screen w-64 bg-[#111C44] text-white p-4 z-30 flex flex-col transform transition-transform duration-300 ${show ? 'translate-x-0' : '-translate-x-64'} md:translate-x-0 md:static md:h-full md:z-20`
    : 'fixed top-0 left-0 h-screen w-64 bg-[#111C44] text-white p-4 z-20 flex flex-col hidden md:flex';

  return (
    <aside className={drawerClasses}>
      {/* Botón cerrar solo en drawer móvil */}
      {isDrawer && (
        <button
          className="absolute top-4 right-4 md:hidden text-white bg-[#222] rounded-full p-1 z-40"
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <img src={Logo} alt="Logo" className="w-8 h-8" />
        <span className="text-lg font-semibold">RACING F1</span>
      </div>
      {/* Divider */}
      <div className="h-px bg-gray-700/50 my-4" />
      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto">
        {MENU_ITEMS.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 px-4 mb-4">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={item.onClick}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-indigo-600/10 rounded-lg transition-colors"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 