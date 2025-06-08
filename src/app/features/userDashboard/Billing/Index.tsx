import { useQuery } from '@tanstack/react-query';
import type { UserData } from '../../../types/api/auth.types';
import WalletCard from '../../../UI/WalletCard';
import CreditBalanceCard from '../../../UI/CreditBalanceCard';
import { SkeletonGroup, WalletCardSkeleton, CardSkeleton, TransactionSkeleton } from '../../../UI/Skeleton';
import { dashboardEndpoints } from '../../../api/endpoints/dashboard.endpoints';

const EmptyTransactions = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">Sin transacciones</h3>
    <p className="text-gray-400 text-sm">Aquí aparecerán tus transacciones cuando las realices</p>
  </div>
);

const EmptyInvoices = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">Sin facturas</h3>
    <p className="text-gray-400 text-sm">Tus facturas aparecerán aquí cuando realices compras</p>
  </div>
);

const LoadingState = () => (
  <SkeletonGroup>
    <div className="grid grid-cols-12 gap-6">
      {/* Credit Card Skeleton */}
      <div className="col-span-4">
        <WalletCardSkeleton />
      </div>

      {/* Credit Balance Skeleton */}
      <div className="col-span-4">
        <CardSkeleton />
      </div>

      {/* Invoices Skeleton */}
      <div className="col-span-4 row-span-5">
        <CardSkeleton />
      </div>

      {/* Payment Method Skeleton */}
      <div className="col-span-4 row-span-3">
        <div className="bg-[#111C44] rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-2">
              <div className="h-5 w-32 bg-[#1B254B] rounded-md" />
            </div>
            <div className="h-8 w-28 bg-[#1B254B] rounded-xl" />
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-[#1B254B] rounded-xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#111C44] rounded-lg" />
                  <div className="h-4 w-32 bg-[#111C44] rounded-md" />
                </div>
                <div className="h-4 w-12 bg-[#111C44] rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Transactions Skeleton */}
    <div className="mt-6 grid grid-cols-12 gap-6">
      <div className="col-span-12 bg-[#111C44] rounded-[20px] p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-48 bg-[#1B254B] rounded-md" />
          <div className="h-4 w-32 bg-[#1B254B] rounded-md" />
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <TransactionSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  </SkeletonGroup>
);

const Billing = () => {
  // Query para obtener el perfil del usuario
  const { data: userProfile, isLoading: isLoadingProfile } = useQuery<UserData>({
    queryKey: ['userProfile'],
    queryFn: dashboardEndpoints.getUserProfile,
    refetchOnWindowFocus: true,
    staleTime: 0 // Siempre obtener datos frescos
  });

  if (isLoadingProfile) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-white/80 mb-4">
          <span>Páginas</span>
          <span>/</span>
          <span>Facturación</span>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Wallet Card */}
          <div className="col-span-4">
            <WalletCard
              publicKey={userProfile?.profile?.publicKey}
              balance={userProfile?.finances?.tokenBalance}
            />
          </div>

          {/* Credit Balance Card */}
          <div className="col-span-4">
            <CreditBalanceCard
              balance={userProfile?.finances?.tokenBalance || '0'}
              lastTransaction={undefined}
              onExport={() => {}}
              onHide={() => {}}
              onNotifications={() => {}}
            />
          </div>

          {/* Invoices */}
          <div className="col-span-4 row-span-5 bg-[#111c44] rounded-2xl p-6">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Facturas</h3>
                <button className="px-4 py-2 bg-purple-600 rounded-xl text-sm hover:bg-purple-700 transition-colors cursor-pointer">
                  VER TODO
                </button>
              </div>
              <div className="flex-grow">
                <EmptyInvoices />
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="col-span-4 row-span-3 bg-[#111c44] rounded-2xl p-6">
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Método de Pago</h3>
                <button 
                  className="px-4 py-2 bg-purple-600 rounded-xl text-sm hover:bg-purple-700 transition-colors cursor-pointer"
                >
                  AÑADIR TARJETA
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-[#1B254B] rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">No hay tarjetas registradas</h3>
                  <p className="text-gray-400 text-sm">
                    Añade una tarjeta para realizar pagos
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Section */}
          <div className="col-span-8">
            <div className="bg-[#111C44] rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Transacciones Recientes</h3>
              </div>
              <EmptyTransactions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
  