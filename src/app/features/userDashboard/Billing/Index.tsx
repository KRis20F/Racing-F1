import { useQuery } from '@tanstack/react-query';
import type { UserProfile } from '../../../types/api/auth.types';
import type { Invoice } from '../../../types/api/billing.types';
import WalletCard from '../../../UI/WalletCard';
import CreditBalanceCard from '../../../UI/CreditBalanceCard';
import { SkeletonGroup, WalletCardSkeleton, CardSkeleton, TransactionSkeleton } from '../../../UI/Skeleton';
import { dashboardEndpoints } from '../../../api/endpoints/dashboard.endpoints';
import { billingEndpoints } from '../../../api/endpoints/billing.endpoints';
import { billingService } from '../../../services/billingService';
import { useState, useRef } from 'react';
import { Dialog } from '../../../UI/Dialog';
import bbvaLogo from '../../../../assets/svg/bbva-2019.svg';
import caixaLogo from '../../../../assets/svg/caixabank-logo.svg';
import { useWallets } from '../../../hooks/useWallets';
import mastercardLogo from '../../../../assets/svg/mastercard-svgrepo-com.svg';
import visaLogo from '../../../../assets/svg/visa-svgrepo-com.svg';
import { FaWallet } from 'react-icons/fa';
import Popup from '../../../UI/Popup';

interface Transaction {
  id: number;
  user_id: number;
  amount: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'BET' | 'WIN' | 'CAR_SALE';
  status: string;
  description?: string;
  created_at: string;
  transactionType?: string;
  carName?: string;
}

interface BalanceHistory {
  currentBalance: string;
  history: Array<{
    created_at: string;
    amount: string;
    type: string;
    description: string;
  }>;
}

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

// Detectar tipo de tarjeta por el número
const detectCardType = (number: string) => {
  if (/^4[0-9]{0,}$/.test(number)) return 'Visa';
  if (/^5[1-5][0-9]{0,}$/.test(number)) return 'MasterCard';
  if (/^3[47][0-9]{0,}$/.test(number)) return 'American Express';
  if (/^6(?:011|5[0-9]{2})[0-9]{0,}$/.test(number)) return 'Discover';
  return '';
};

const Billing = () => {
  // Query para obtener el perfil del usuario
  const userProfileQuery = useQuery<UserProfile>({
    queryKey: ['userProfile'],
    queryFn: dashboardEndpoints.getUserProfile,
    refetchOnWindowFocus: true,
    staleTime: 0
  });
  const userProfile = userProfileQuery.data;
  const isLoadingProfile = userProfileQuery.isLoading;

  // Query para obtener las transacciones
  const { data: transactions, isLoading: isLoadingTransactions } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: billingService.getTransactions,
    refetchOnWindowFocus: true,
    staleTime: 0
  });

  // Query para obtener el historial de balance
  const { data: balanceHistory, isLoading: isLoadingBalance } = useQuery<BalanceHistory>({
    queryKey: ['balanceHistory'],
    queryFn: billingService.getBalanceHistory,
    refetchOnWindowFocus: true,
    staleTime: 0
  });

  // Query para obtener las facturas
  const { data: invoices, isLoading: isLoadingInvoices } = useQuery<Invoice[]>({
    queryKey: ['invoices'],
    queryFn: billingEndpoints.getInvoices,
    refetchOnWindowFocus: true,
    staleTime: 0
  });

  const [showAddWallet, setShowAddWallet] = useState(false);
  const [showViewInvoices, setShowViewInvoices] = useState(false);
  // Estado para el formulario de añadir tarjeta/wallet
  const [addType, setAddType] = useState<'Wallet' | 'Tarjeta de crédito'>('Wallet');
  const [address, setAddress] = useState('');
  const [holder, setHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [ccv, setCCV] = useState('');
  const [cardType, setCardType] = useState<string>('');
  const [showBalance, setShowBalance] = useState(true);
  const csvLinkRef = useRef<HTMLAnchorElement | null>(null);
  const [popup, setPopup] = useState<{ isOpen: boolean; type: 'success' | 'error' | 'info'; title: string; message: string }>({ isOpen: false, type: 'info', title: '', message: '' });

  const { wallets, isLoadingWallets, createWallet, deleteWallet } = useWallets();

  // Detectar wallet principal (publicKey)
  const mainWallet = userProfile?.publicKey;

  const [selectedWalletId, setSelectedWalletId] = useState<number | null>(null);

  // Obtener el balance de la wallet/tarjeta seleccionada
  const selectedWallet = wallets?.find(w => w.id === selectedWalletId) || wallets?.find(w => w.address === mainWallet);
  const selectedBalance = selectedWallet ? selectedWallet.balance : userProfile?.finances?.tokenBalance || '0';

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    if (addType === 'Tarjeta de crédito') {
      setCardType(detectCardType(e.target.value.replace(/\s/g, '')));
    }
  };

  // Crear wallet/tarjeta ficticia con saldo aleatorio
  const handleAddWallet = () => {
    if (!address || (addType === 'Tarjeta de crédito' && address.replace(/\s/g, '').length < 12)) {
      setPopup({ isOpen: true, type: 'error', title: 'Datos inválidos', message: 'Debes ingresar una dirección o número de tarjeta válido.' });
      return;
    }
    const randomBalance = Math.floor(Math.random() * (3000 - 100 + 1)) + 100;
    createWallet({ address, balance: randomBalance });
    setShowAddWallet(false);
  };

  // Eliminar wallet solo si hay más de una y no es la principal
  const handleDeleteWallet = (wallet: { id: number; address: string }) => {
    if (wallet.address === mainWallet) {
      setPopup({ isOpen: true, type: 'error', title: 'No permitido', message: 'No puedes eliminar tu wallet principal.' });
      return;
    }
    if ((wallets?.length ?? 0) <= 1) {
      setPopup({ isOpen: true, type: 'error', title: 'No permitido', message: 'Debes tener al menos una wallet.' });
      return;
    }
    deleteWallet(wallet.id);
  };

  const handleExportCSV = () => {
    // Exportar solo el balance como CSV (puedes expandirlo a transacciones si quieres)
    const csvContent = `Balance\n${userProfile?.finances?.tokenBalance || '0'}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    if (csvLinkRef.current) {
      csvLinkRef.current.href = url;
      csvLinkRef.current.download = 'balance.csv';
      csvLinkRef.current.click();
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
  };

  const handleHideBalance = () => {
    setShowBalance((prev) => !prev);
  };

  if (isLoadingProfile || isLoadingTransactions || isLoadingBalance || isLoadingInvoices) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen text-white p-6">
      <Dialog
        isOpen={showAddWallet}
        onClose={() => setShowAddWallet(false)}
        title="Añadir Wallet/Tarjeta"
        description="Agrega una nueva wallet o tarjeta para realizar pagos."
        actions={
          <>
            <button
              className="px-4 py-2 bg-gray-600 rounded-xl text-sm hover:bg-gray-700 transition-colors"
              onClick={() => setShowAddWallet(false)}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-purple-600 rounded-xl text-sm hover:bg-purple-700 transition-colors"
              onClick={handleAddWallet}
            >
              Guardar
            </button>
          </>
        }
        panelClassName="max-w-2xl"
      >
        {/* Card Preview */}
        <div className="flex justify-center mb-6">
          <div className="relative w-[420px] h-[240px] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-900 to-purple-800">
            {/* Banco y logo dinámico */}
            <div className="absolute top-4 left-6 flex items-center gap-2">
              {addType === 'Tarjeta de crédito' && cardType === 'Visa' && <img src={bbvaLogo} alt="BBVA" className="h-7" />}
              {addType === 'Tarjeta de crédito' && cardType === 'MasterCard' && <img src={caixaLogo} alt="Caixa" className="h-7" />}
              {addType === 'Tarjeta de crédito' && address.replace(/\D/g, '').length >= 12 && !cardType && (
                <span className="text-red-400 font-bold">❌ Tarjeta no reconocida</span>
              )}
              {addType === 'Tarjeta de crédito' && address.length === 0 && <span className="text-white/60 font-bold">Tarjeta de ejemplo</span>}
              {addType === 'Wallet' && <span className="text-white/80 font-bold">WALLET</span>}
            </div>
            {/* Número de tarjeta o wallet */}
            <div className="absolute top-16 left-6 text-2xl font-mono tracking-widest text-white/90">
              {addType === 'Tarjeta de crédito'
                ? (address.length > 0
                    ? address.replace(/(.{4})/g, '$1 ').trim().padEnd(19, '•')
                    : '•••• •••• •••• ••••')
                : (address.length > 0 ? address.slice(0, 16) : '0x••••••••••••••••')}
            </div>
            {/* Nombre y fecha/ccv */}
            <div className="absolute bottom-8 left-6 right-6 flex justify-between items-end">
              <div>
                <div className="text-xs text-gray-300 uppercase mb-1">Titular</div>
                <div className="text-white font-semibold">{holder || 'NOMBRE APELLIDO'}</div>
              </div>
              {addType === 'Tarjeta de crédito' ? (
                <div className="flex flex-col items-end">
                  <div className="text-xs text-gray-300 uppercase mb-1">Expira</div>
                  <div className="text-white font-semibold">{expiry ? expiry.split('-').reverse().join('/') : 'MM/AA'}</div>
                  <div className="text-xs text-gray-300 uppercase mt-2">CCV</div>
                  <div className="text-white font-semibold">{ccv ? ccv.replace(/./g, '•') : '•••'}</div>
                </div>
              ) : null}
            </div>
            {/* Triste si el número es claramente inválido */}
            {addType === 'Tarjeta de crédito' && address.replace(/\D/g, '').length >= 12 && !cardType && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl text-red-400">😢</span>
              </div>
            )}
          </div>
        </div>
        {/* Formulario */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">Tipo:</label>
            <select
              className="w-full rounded-lg bg-[#1B254B] text-white px-4 py-2 border border-purple-500/30"
              value={addType}
              onChange={e => {
                setAddType(e.target.value as 'Wallet' | 'Tarjeta de crédito');
                setAddress(''); setHolder(''); setExpiry(''); setCCV(''); setCardType('');
              }}
            >
              <option>Wallet</option>
              <option>Tarjeta de crédito</option>
            </select>
          </div>
          {addType === 'Wallet' ? (
            <>
              <div>
                <label className="block text-gray-400 mb-1">Dirección de Wallet:</label>
                <input
                  className="w-full rounded-lg bg-[#1B254B] text-white px-4 py-2 border border-purple-500/30"
                  placeholder="0x..."
                  value={address}
                  onChange={handleAddressChange}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Nombre del titular:</label>
                <input
                  className="w-full rounded-lg bg-[#1B254B] text-white px-4 py-2 border border-purple-500/30"
                  placeholder="Nombre completo"
                  value={holder}
                  onChange={e => setHolder(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-gray-400 mb-1">Número de tarjeta:</label>
                <div className="relative">
                  <input
                    className="w-full rounded-lg bg-[#1B254B] text-white px-4 py-2 border border-purple-500/30 pr-12"
                    placeholder="1234 5678 9012 3456"
                    value={address}
                    onChange={handleAddressChange}
                    maxLength={19}
                  />
                  {cardType && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-300 flex items-center gap-1">
                      {cardType === 'Visa' && <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-5 inline" />}
                      {cardType === 'MasterCard' && <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-5 inline" />}
                      {cardType === 'American Express' && <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg" alt="Amex" className="h-5 inline" />}
                      {cardType === 'Discover' && <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Discover_Card_logo.svg" alt="Discover" className="h-5 inline" />}
                      {cardType}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Nombre del titular:</label>
                <input
                  className="w-full rounded-lg bg-[#1B254B] text-white px-4 py-2 border border-purple-500/30"
                  placeholder="Nombre completo"
                  value={holder}
                  onChange={e => setHolder(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-gray-400 mb-1">Fecha de expiración:</label>
                  <input
                    type="month"
                    className="w-full rounded-lg bg-[#1B254B] text-white px-4 py-2 border border-purple-500/30"
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                  />
                </div>
                <div className="w-28">
                  <label className="block text-gray-400 mb-1">CCV:</label>
                  <input
                    type="password"
                    maxLength={4}
                    className="w-full rounded-lg bg-[#1B254B] text-white px-4 py-2 border border-purple-500/30"
                    placeholder="123"
                    value={ccv}
                    onChange={e => setCCV(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                </div>
              </div>
            </>
          )}
        </form>
      </Dialog>
      <Dialog
        isOpen={showViewInvoices}
        onClose={() => setShowViewInvoices(false)}
        title="Facturas"
        description="Lista de todas tus facturas generadas."
        actions={
          <button
            className="px-4 py-2 bg-purple-600 rounded-xl text-sm hover:bg-purple-700 transition-colors"
            onClick={() => setShowViewInvoices(false)}
          >
            Cerrar
          </button>
        }
      >
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {(invoices && invoices.length > 0) ? invoices.map((invoice) => (
            <div key={invoice.id} className="bg-[#1B254B] rounded-xl p-4 flex justify-between items-center">
              <div>
                <div className="font-medium">Factura #{invoice.invoice_number}</div>
                <div className="text-sm text-gray-400">{new Date(invoice.created_at).toLocaleDateString()}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{invoice.amount} {invoice.currency}</div>
                <div className={`text-sm ${invoice.status === 'paid' ? 'text-green-500' : invoice.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>{invoice.status.toUpperCase()}</div>
              </div>
            </div>
          )) : <div className="text-gray-400 text-center">No hay facturas aún.</div>}
        </div>
      </Dialog>
      <Popup
        isOpen={popup.isOpen}
        onClose={() => setPopup(p => ({ ...p, isOpen: false }))}
        type={popup.type}
        title={popup.title}
        message={popup.message}
      />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-white/80 mb-4">
          <span>Páginas</span>
          <span>/</span>
          <span>Facturación</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Wallet Card */}
          <div className="mb-6 md:mb-0 md:col-span-4">
            <WalletCard
              publicKey={userProfile?.publicKey || 'RACINGF1DEFAULTWALLET'}
              balance={userProfile?.finances?.tokenBalance}
            />
          </div>
          {/* Credit Balance Card */}
          <div className="mb-6 md:mb-0 md:col-span-4">
            <CreditBalanceCard
              balance={showBalance ? selectedBalance : '••••'}
              lastTransaction={balanceHistory?.history?.[0] ? {
                type: balanceHistory.history[0].type,
                amount: parseFloat(balanceHistory.history[0].amount),
                date: balanceHistory.history[0].created_at
              } : undefined}
              onExport={handleExportCSV}
              onHide={handleHideBalance}
              onNotifications={() => {}}
            />
            {/* Hidden link for CSV download */}
            <a ref={csvLinkRef} style={{ display: 'none' }} />
          </div>
          {/* Invoices */}
          <div className="mb-6 md:mb-0 md:col-span-4 md:row-span-5 bg-[#111c44] h-auto md:h-[598px] rounded-2xl p-6">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Facturas</h3>
                <button className="px-4 py-2 bg-purple-600 rounded-xl text-sm hover:bg-purple-700 transition-colors cursor-pointer" onClick={() => setShowViewInvoices(true)}>
                  VER TODO
                </button>
              </div>
              <div className="flex-grow">
                {invoices && invoices.length > 0 ? (
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="bg-[#1B254B] rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Factura #{invoice.invoice_number}</p>
                            <p className="text-sm text-gray-400">{new Date(invoice.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{invoice.amount} {invoice.currency}</p>
                            <p className={`text-sm ${
                              invoice.status === 'paid' ? 'text-green-500' : 
                              invoice.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                            }`}>
                              {invoice.status.toUpperCase()}
                            </p>
                          </div>
                        </div>
                        {invoice.pdf_url && (
                          <a 
                            href={invoice.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 text-sm text-purple-500 hover:text-purple-400 flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Ver PDF
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                <EmptyInvoices />
                )}
              </div>
            </div>
          </div>
          {/* Payment Method Section */}
          <div className="mb-6 md:mb-0 md:col-span-4 md:row-span-3 md:w-[49.7vw] bg-[#111c44] rounded-2xl p-6">
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Método de Pago</h3>
                <button 
                  className="px-4 py-2 bg-purple-600 rounded-xl text-sm hover:bg-purple-700 transition-colors cursor-pointer"
                  onClick={() => setShowAddWallet(true)}
                >
                  AÑADIR TARJETA
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoadingWallets ? (
                  <div className="bg-[#1B254B] rounded-xl p-6 text-center text-gray-400 col-span-full">Loading...</div>
                ) : wallets && wallets.length > 0 ? (
                  wallets.map(wallet => {
                    // Detectar tipo de tarjeta
                    let cardType = '';
                    let isCard = false;
                    const cleanAddress = wallet.address.replace(/\s/g, '');
                    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cleanAddress)) {
                      cardType = 'Visa';
                      isCard = true;
                    } else if (/^5[1-5][0-9]{14}$/.test(cleanAddress)) {
                      cardType = 'MasterCard';
                      isCard = true;
                    }
                    const isSelected = selectedWalletId === wallet.id || (selectedWalletId === null && wallet.address === mainWallet);
                    const isMainWallet = wallet.address === mainWallet;
                    return (
                      <div
                        key={wallet.id}
                        className={`flex items-center justify-between bg-[#181F3A] rounded-2xl px-6 py-5 border-2 shadow-md transition-all cursor-pointer ${isSelected ? 'border-purple-500 ring-2 ring-purple-400' : 'border-[#2A3356]'}`}
                        onClick={() => setSelectedWalletId(wallet.id)}
                      >
                        <div className="flex items-center gap-3">
                          {isCard ? (
                            <>
                              {cardType === 'MasterCard' && <img src={mastercardLogo} alt="MasterCard" className="h-7" />}
                              {cardType === 'Visa' && <img src={visaLogo} alt="Visa" className="h-7" />}
                              <span className="font-mono text-lg tracking-widest text-white/90 overflow-hidden text-ellipsis whitespace-nowrap max-w-[180px] block">{wallet.address}</span>
                            </>
                          ) : (
                            <>
                              <FaWallet className="h-6 w-6 text-purple-400" />
                              <span className="font-mono text-lg tracking-widest text-white/90 overflow-hidden text-ellipsis whitespace-nowrap max-w-[180px] block">{wallet.address}</span>
                            </>
                          )}
                        </div>
                        {/* Mostrar balance de la tarjeta seleccionada al lado derecho */}
                        <div className="flex items-center gap-4">
                          {/* El balance ya no se muestra aquí, solo en la tarjeta de balance de crédito */}
                          <button
                            className={`text-white/60 hover:text-white transition-colors ${(isMainWallet || !isCard) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title="Edit"
                            disabled={isMainWallet || !isCard}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.414a1 1 0 01-1.263-1.263l1.414-4.243a4 4 0 01.828-1.414z" /></svg>
                          </button>
                          <button
                            onClick={e => { e.stopPropagation(); handleDeleteWallet(wallet); }}
                            className={`text-red-400 hover:text-red-600 transition-colors ${(isMainWallet || !isCard) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title="Delete"
                            disabled={isMainWallet || !isCard}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-[#1B254B] rounded-xl p-6 text-center col-span-full">
                    <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">No cards registered</h3>
                    <p className="text-gray-400 text-sm">
                      Add a card to make payments
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Transactions Section */}
          <div className="md:col-span-8">
            <div className="bg-[#111C44] rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Transacciones Recientes</h3>
              </div>
              {transactions && transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={`${transaction.transactionType}-${transaction.id}`} className="bg-[#1B254B] rounded-xl p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          transaction.type === 'DEPOSIT' || transaction.type === 'CAR_SALE' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                        }`}>
                          {transaction.type === 'DEPOSIT' || transaction.type === 'CAR_SALE' ? '+' : '-'}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.type}</p>
                          <p className="text-sm text-gray-400">
                            {transaction.transactionType === 'car' ? `${transaction.carName} - ` : ''}
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className={`font-medium ${
                        transaction.type === 'DEPOSIT' || transaction.type === 'CAR_SALE' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {transaction.type === 'DEPOSIT' || transaction.type === 'CAR_SALE' ? '+' : '-'}{transaction.amount} RACE
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
              <EmptyTransactions />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
  