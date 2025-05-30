import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ProtectedRoute } from './routes/ProtectedRoute';
import AuthContainer from './features/auth/AuthForm';
import Dashboard from './features/userDashboard/Dashboard';
import { Toaster } from 'react-hot-toast';

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
      <BrowserRouter>
        <QueryProvider>
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<AuthContainer />} />
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </QueryProvider>
      </BrowserRouter>
    </>
  );
}

export default App; 