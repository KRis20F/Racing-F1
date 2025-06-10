import { type FC, useState, useRef, useEffect } from 'react';

interface CreditBalanceCardProps {
  balance: string;
  lastTransaction?: {
    type: string;
    amount: number;
    date: string;
  };
  onExport?: () => void;
  onHide?: () => void;
  onNotifications?: () => void;
}

const CreditBalanceCard: FC<CreditBalanceCardProps> = ({ 
  balance, 
  lastTransaction,
  onExport,
  onHide,
  onNotifications 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && 
          buttonRef.current && 
          !menuRef.current.contains(event.target as Node) && 
          !buttonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (callback?: () => void) => {
    if (callback) callback();
    setIsMenuOpen(false);
  };

  return (
    <div className="relative bg-[#0B1437] rounded-[20px] p-6 h-full overflow-hidden">
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-[20px] p-[1px] bg-gradient-to-br from-purple-600/50 via-blue-500/50 to-emerald-500/50">
        <div className="absolute inset-0 rounded-[20px] backdrop-blur-xl" />
      </div>

      {/* Content Container */}
      <div className="relative">
        {/* Top Section with Balance */}
        <div className="bg-[#111C44] rounded-[16px] p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white text-lg mb-1">Balance de Crédito</h3>
              <div className="text-[32px] font-bold text-white">
                ${(Number(balance) * 13).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">
                {Number(balance).toLocaleString(undefined, { maximumFractionDigits: 3 })} RCT
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  ref={buttonRef}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-2xl text-white/60 hover:text-white transition-colors p-2"
                >
                  •••
                </button>
                
                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div 
                    ref={menuRef}
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-[#111C44] shadow-lg ring-1 ring-black ring-opacity-5 z-10"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => handleOptionClick(onExport)}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-white hover:bg-[#1A275B] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Exportar CSV
                      </button>
                      <button
                        onClick={() => handleOptionClick(onHide)}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-white hover:bg-[#1A275B] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                        Ocultar Balance
                      </button>
                      <button
                        onClick={() => handleOptionClick(onNotifications)}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-white hover:bg-[#1A275B] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        Notificaciones
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* Wave Animation */}
              <svg 
                className="w-8 h-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 12C2 12 5.63636 7 12 7C18.3636 7 22 12 22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="animate-wave-1"
                />
                <path
                  d="M2 12C2 12 5.63636 17 12 17C18.3636 17 22 12 22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="animate-wave-2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Section with Transaction */}
        <div>
          <h4 className="text-sm text-gray-400 uppercase mb-4">RECIENTE</h4>
          {lastTransaction ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-emerald-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium text-white">{lastTransaction.type}</div>
                <div className="text-sm text-gray-400">{lastTransaction.date}</div>
              </div>
              <div className="text-red-500 text-lg font-medium">
                -${Math.abs(lastTransaction.amount).toLocaleString()}
              </div>
            </div>
          ) : (
            <div className="text-gray-400">No hay transacciones recientes</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditBalanceCard; 