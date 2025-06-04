import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './providers/AuthProvider';
import Routes from './routes';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

// Obtener el base path de Vite y asegurarnos de que no termine en /
const BASE_PATH = import.meta.env.BASE_URL.endsWith('/') 
  ? import.meta.env.BASE_URL.slice(0, -1) 
  : import.meta.env.BASE_URL;

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <QueryProvider>
        <BrowserRouter basename={BASE_PATH}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </BrowserRouter>
      </QueryProvider>
    </>
  );
}

export default App; 