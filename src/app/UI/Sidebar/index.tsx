import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/svg/guci.svg";
import { useAuthContext } from "../../providers/hooks/useAuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

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
          path: "/dashboard",
          onClick: () => navigate("/dashboard")
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

  return (
    <div className="fixed left-0 top-0 h-screen w-64 text-white p-4 flex flex-col bg-[#111C44]/40">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <img src={Logo} alt="Logo" className="w-8 h-8" />
        <span className="text-lg font-semibold">RACING F1</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-700/50 my-4" />

      {/* Menu Items */}
      <nav className="flex-1">
        {MENU_ITEMS.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 px-4 mb-4">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>
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

      {/* Help Box */}
      <div className="mt-auto">
        <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-600/20 rounded-lg mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-white font-semibold mb-1">Need help?</h4>
          <p className="text-sm text-gray-400">Please check our docs</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 