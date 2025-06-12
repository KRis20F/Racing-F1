import { type FC, useState, useRef, useEffect } from 'react';
import { Dialog } from './Dialog';

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
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Estado para los modals
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');

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

  // Abre modal de detalles de cuenta
  const handleAccountDetails = () => {
    setShowAccountDetails(true);
  };
  // Abre modal de recarga
  const handleTopUp = () => {
    setShowTopUp(true);
  };

  return (
    <div className="relative bg-[#0B1437] rounded-[20px] p-6 h-full overflow-hidden">
      {/* Modals */}
      <Dialog
        isOpen={showAccountDetails}
        onClose={() => setShowAccountDetails(false)}
        title="Detalles de la cuenta"
        description="Información de tu cuenta y wallet."
        actions={
          <button
            className="px-4 py-2 bg-purple-600 rounded-xl text-sm hover:bg-purple-700 transition-colors"
            onClick={() => setShowAccountDetails(false)}
          >
            Cerrar
          </button>
        }
      >
        <div className="space-y-2">
          <div><span className="text-gray-400">Usuario:</span> <span className="text-white font-medium">krisfuk</span></div>
          <div><span className="text-gray-400">Email:</span> <span className="text-white font-medium">kris@gmail.com</span></div>
          <div><span className="text-gray-400">Wallet:</span> <span className="text-white font-mono">0x1234...abcd</span></div>
          <div><span className="text-gray-400">Balance:</span> <span className="text-white font-medium">{balance} RCT</span></div>
        </div>
      </Dialog>
      <Dialog
        isOpen={showTopUp}
        onClose={() => setShowTopUp(false)}
        title="Recargar saldo"
        description="Ingresa el monto a recargar en tu cuenta."
        actions={
          <>
            <button
              className="px-4 py-2 bg-gray-600 rounded-xl text-sm hover:bg-gray-700 transition-colors"
              onClick={() => setShowTopUp(false)}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-purple-600 rounded-xl text-sm hover:bg-purple-700 transition-colors"
              onClick={() => { setShowTopUp(false); setTopUpAmount(''); }}
            >
              Recargar
            </button>
          </>
        }
      >
        <form onSubmit={e => { e.preventDefault(); setShowTopUp(false); setTopUpAmount(''); }}>
          <label className="block text-gray-400 mb-2">Monto a recargar (RCT):</label>
          <input
            type="number"
            min="1"
            value={topUpAmount}
            onChange={e => setTopUpAmount(e.target.value)}
            className="w-full rounded-lg bg-[#1B254B] text-white px-4 py-2 mb-4 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ej: 100"
            required
          />
        </form>
      </Dialog>
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
                        onClick={() => handleOptionClick(handleAccountDetails)}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-white hover:bg-[#1A275B] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Ver detalles de la cuenta
                      </button>
                      <button
                        onClick={() => handleOptionClick(handleTopUp)}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-white hover:bg-[#1A275B] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8m12 4a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Recargar saldo
                      </button>
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