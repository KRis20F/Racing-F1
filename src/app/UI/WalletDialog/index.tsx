import { Dialog } from '../Dialog';
import type { WalletCreationStep } from '../../hooks/useWallet';

interface WalletDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWallet: () => void;
  isCreating?: boolean;
  isBillingSection?: boolean;
  currentStep?: WalletCreationStep;
  error?: string | null;
}

export const WalletDialog = ({ 
  isOpen, 
  onClose, 
  onCreateWallet, 
  isCreating = false, 
  isBillingSection = false,
  currentStep = 0,
  error = null
}: WalletDialogProps) => {
  const steps = [
    { title: 'Creando Wallet', description: 'Generando tu wallet en la blockchain...' },
    { title: 'Wallet Creada', description: '¡Tu wallet ha sido creada exitosamente!' },
    { title: 'Creando Cuenta Token', description: 'Configurando tu cuenta de tokens RCT...' },
    { title: 'Cuenta Token Creada', description: '¡Tu cuenta de tokens está lista!' }
  ];

  const handleCreateWallet = async () => {
    try {
      console.log('🎯 [WalletDialog] Iniciando creación de wallet...');
      await onCreateWallet();
      console.log('✅ [WalletDialog] Creación de wallet completada');
    } catch (error) {
      console.error('❌ [WalletDialog] Error en la creación:', error);
    }
  };

  const renderSuccessPage = () => (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-medium text-white mb-2">¡Felicidades!</h3>
        <p className="text-gray-400 text-center mb-6">Tu wallet ha sido creada exitosamente</p>
        
        <div className="w-full bg-purple-600/10 rounded-xl p-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Bonus de Bienvenida</p>
            <p className="text-3xl font-bold text-white mb-1">10 RCT</p>
            <p className="text-lg text-green-500">≈ $50.00 USD</p>
          </div>
        </div>

        <div className="w-full bg-purple-600/10 rounded-xl p-4">
          <div className="flex items-center gap-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">Tus tokens estarán disponibles en tu wallet en unos minutos</p>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full px-6 py-3 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all"
      >
        ¡Genial!
      </button>
    </div>
  );

  const showSuccessPage = !isCreating && currentStep === 3;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => !isCreating && onClose()}
      title={isBillingSection ? "¡Listo para ganar!" : "¡Bienvenido a Racing F1!"}
      description={isBillingSection 
        ? "Crea tu wallet ahora y comienza a ganar dinero real participando en carreras. Gestiona tus ganancias, realiza transacciones y accede a recompensas exclusivas."
        : "Para comenzar a disfrutar de todas las funcionalidades, necesitas crear una wallet. Con ella podrás realizar transacciones, participar en carreras y ganar recompensas."
      }
      actions={!showSuccessPage ? (
        <div className="mt-6 flex flex-col gap-3">
          {error && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onClose}
              disabled={isCreating}
            >
              Más tarde
            </button>
            <button
              type="button"
              className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCreateWallet}
              disabled={isCreating}
            >
              {isCreating ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creando...</span>
                </div>
              ) : (
                'Crear Wallet'
              )}
            </button>
          </div>
        </div>
      ) : null}
    >
      <div className="flex flex-col items-center">
        {!isCreating && !showSuccessPage ? (
          <>
            <div className="w-24 h-24 bg-purple-600/20 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            
            <div className="w-full max-w-sm bg-purple-600/10 rounded-xl p-6">
              <h4 className="text-white text-lg font-medium text-center mb-4">Beneficios de tu Wallet</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Participa en carreras y gana recompensas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Realiza transacciones de forma segura</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Gestiona tus tokens RCT</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Compra y vende autos poderosos</span>
                </li>
              </ul>
            </div>
          </>
        ) : showSuccessPage ? (
          renderSuccessPage()
        ) : (
          <div className="w-full max-w-sm">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-4">
                <svg className="animate-spin h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{steps[currentStep].title}</h3>
              <p className="text-gray-400 text-sm text-center">{steps[currentStep].description}</p>
            </div>

            <div className="bg-purple-600/10 rounded-xl p-4">
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      index < currentStep 
                        ? 'bg-green-500' 
                        : index === currentStep 
                          ? 'bg-purple-600 animate-pulse' 
                          : 'bg-gray-700'
                    }`}>
                      {index < currentStep ? (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-xs text-white">{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-sm ${
                      index < currentStep 
                        ? 'text-green-500' 
                        : index === currentStep 
                          ? 'text-white' 
                          : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}; 