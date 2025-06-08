import { useTransactions } from '../../../hooks/useTransactions';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const TransactionHistory = () => {
  const {
    transactionHistory,
    isLoadingTransactions,
    shopHistory,
    isLoadingShopHistory
  } = useTransactions();

  if (isLoadingTransactions || isLoadingShopHistory) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Historial de Transacciones Generales */}
      <div>
        <h2 className="text-xl font-bold mb-4">Historial de Transacciones</h2>
        <div className="space-y-4">
          {transactionHistory?.map((tx) => (
            <div key={tx.id} className="bg-[#1B254B] rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">
                    De: {tx.from_username} → Para: {tx.to_username}
                  </p>
                  <p className="font-medium">{tx.amount} RCT</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">
                    {format(new Date(tx.created_at), 'PPP', { locale: es })}
                  </p>
                  <span className={`text-sm ${tx.type === 'token_exchange' ? 'text-purple-400' : 'text-blue-400'}`}>
                    {tx.type === 'token_exchange' ? 'Exchange' : 'Transacción'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historial de Compras */}
      <div>
        <h2 className="text-xl font-bold mb-4">Historial de Compras</h2>
        <div className="space-y-4">
          {shopHistory?.map((tx) => (
            <div key={tx.id} className="bg-[#1B254B] rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{tx.car_name}</p>
                  <p className="text-sm text-gray-400">{tx.car_category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{tx.price} {tx.currency}</p>
                  <p className="text-sm text-gray-400">
                    {format(new Date(tx.created_at), 'PPP', { locale: es })}
                  </p>
                  <span className={`text-sm ${
                    tx.status === 'completed' ? 'text-green-400' : 
                    tx.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 