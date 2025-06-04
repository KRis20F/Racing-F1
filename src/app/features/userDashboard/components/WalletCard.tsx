import { User } from '../../../types/api/auth.types';

interface WalletCardProps {
  balance?: {
    usd: number;
    tokens: number;
  };
  wallet?: {
    address: string;
    balance: string;
  };
  limits?: {
    daily_limit: number;
    monthly_limit: number;
    max_transaction: number;
  };
  preferences?: {
    auto_pay: boolean;
    invoice_email: string | null;
    default_currency: string;
  };
}

export const WalletCard = ({ balance, wallet, limits, preferences }: WalletCardProps) => {
  // Formatear el balance en USD
  const formatUSD = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Formatear el balance de tokens
  const formatTokens = (amount: number | string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 8
    }).format(numAmount);
  };

  return (
    <div className="rounded-2xl bg-[#111C44] p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Wallet</h3>
        <div className="flex gap-0.5">
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* Balances */}
      <div className="space-y-4">
        <div className="bg-[#1B2559] rounded-xl p-4">
          <p className="text-gray-400 text-sm">Balance USD</p>
          <p className="text-2xl font-bold text-white">
            {formatUSD(balance?.usd || 0)}
          </p>
        </div>

        <div className="bg-[#1B2559] rounded-xl p-4">
          <p className="text-gray-400 text-sm">Balance Tokens</p>
          <p className="text-2xl font-bold text-indigo-400">
            {formatTokens(balance?.tokens || 0)} RCT
          </p>
        </div>

        {wallet && (
          <div className="bg-[#1B2559] rounded-xl p-4">
            <p className="text-gray-400 text-sm">Wallet Address</p>
            <p className="text-sm text-white break-all">
              {wallet.address}
            </p>
            <p className="text-gray-400 text-sm mt-2">Wallet Balance</p>
            <p className="text-sm text-indigo-400">
              {formatTokens(wallet.balance)} RCT
            </p>
          </div>
        )}
      </div>

      {/* Límites de Transacciones */}
      {limits && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-white mb-2">
            Transaction Limits
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Daily:</span>
              <span className="text-white">{formatUSD(limits.daily_limit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Monthly:</span>
              <span className="text-white">{formatUSD(limits.monthly_limit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Per Transaction:</span>
              <span className="text-white">{formatUSD(limits.max_transaction)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Preferencias */}
      {preferences && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-white mb-2">
            Preferences
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Auto-pay:</span>
              <span className="text-white">{preferences.auto_pay ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Currency:</span>
              <span className="text-white">{preferences.default_currency}</span>
            </div>
            {preferences.invoice_email && (
              <div className="flex justify-between">
                <span className="text-gray-400">Invoice Email:</span>
                <span className="text-white">{preferences.invoice_email}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 