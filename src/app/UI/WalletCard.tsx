import { type FC, useState } from 'react';

interface WalletCardProps {
  publicKey?: string | null;
  balance?: string;
  onClick?: () => void;
}

const letterToNumber: { [key: string]: string } = {
  'a': '1', 'b': '2', 'c': '3', 'd': '4', 'e': '5',
  'f': '6', 'g': '7', 'h': '8', 'i': '9', 'j': '0',
  'k': '1', 'l': '2', 'm': '3', 'n': '4', 'o': '5',
  'p': '6', 'q': '7', 'r': '8', 's': '9', 't': '0',
  'u': '1', 'v': '2', 'w': '3', 'x': '4', 'y': '5',
  'z': '6', 'A': '7', 'B': '8', 'C': '9', 'D': '0',
  'E': '1', 'F': '2', 'G': '3', 'H': '4', 'I': '5',
  'J': '6', 'K': '7', 'L': '8', 'M': '9', 'N': '0',
  'O': '1', 'P': '2', 'Q': '3', 'R': '4', 'S': '5',
  'T': '6', 'U': '7', 'V': '8', 'W': '9', 'X': '0',
  'Y': '1', 'Z': '2'
};

const formatPublicKey = (publicKey: string, isVisible: boolean): string => {
  if (!isVisible) {
    return '•••• •••• •••• ••••';
  }

  // Convierte letras a números y agrupa de 4 en 4
  const numbers = publicKey
    .split('')
    .map(char => letterToNumber[char] || char)
    .join('')
    .slice(0, 16);

  const groups = numbers.match(/.{1,4}/g) || [];
  return groups.join(' ');
};

const WalletCard: FC<WalletCardProps> = ({ publicKey, balance, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const currentDate = new Date();
  const expiryDate = `${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(currentDate.getFullYear() + 3).slice(-2)}`;

  // Si no hay publicKey, mostrar estado vacío
  if (!publicKey) {
    return (
      <div 
        onClick={onClick}
        className="relative w-full h-64 rounded-2xl overflow-hidden cursor-pointer bg-[#111C44] hover:bg-[#1a275b] transition-colors"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Crea tu Wallet</h3>
          <p className="text-gray-400 text-sm">
            Haz clic aquí para crear tu wallet y comenzar
          </p>
        </div>
      </div>
    );
  }

  const toggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  return (
    <div 
      onClick={onClick}
      className="relative w-full h-64 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg p-6"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[#0f1535] bg-opacity-90">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30" />
      </div>
      
      {/* Card Content */}
      <div className="relative z-10 h-full flex flex-col justify-between text-white">
        <div className="flex justify-between items-start">
          <span className="text-xl font-medium">Vision UI</span>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleVisibility}
              className="text-white/60 hover:text-white transition-colors"
            >
              {isVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/80" />
              <div className="w-8 h-8 rounded-full bg-white/40" />
            </div>
          </div>
        </div>

        <div className="font-mono text-2xl tracking-[0.3em] text-gray-200">
          {formatPublicKey(publicKey, isVisible)}
        </div>

        <div className="flex justify-between items-end">
          <div>
            <div className="text-sm text-gray-400 uppercase tracking-wider mb-1">VALID THRU</div>
            <div className="text-gray-300">{expiryDate}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 uppercase tracking-wider mb-1">CVV</div>
            <div className="text-gray-300">{isVisible ? '123' : '***'}</div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full transform -translate-x-1/3 translate-y-1/3" />
      </div>
    </div>
  );
};

export default WalletCard; 