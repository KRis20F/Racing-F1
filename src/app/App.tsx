import { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { QueryProvider } from './providers/QueryProvider';
import { WalletConnectionProvider } from './providers/WalletConnectionProvider';
import AppRoutes from './routes';
import '../assets/css/index.css';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryProvider>
        <HashRouter>
          <WalletConnectionProvider>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </WalletConnectionProvider>
        </HashRouter>
      </QueryProvider>
    </Suspense>
  );
}

export default App; 