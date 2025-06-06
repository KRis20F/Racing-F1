import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useAuth } from "../../api/mutations/auth.mutations";
import { useWallet } from '../../hooks/useWallet';
import { WalletDialog } from '../../UI/WalletDialog';
import type { WelcomeGifts } from '../../services/walletService';

interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    publicKey?: string;
    welcomeGifts?: WelcomeGifts;
  };
}

// Obtener el base path de Vite
const BASE_PATH = import.meta.env.BASE_URL || '/';

const AuthContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "", fechaNacimiento: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const { showWelcomeGifts, welcomeGifts, showGifts, hideGifts } = useWallet();

  const {
    login,
    register,
    isLoggingIn,
    isRegistering: isRegisteringMutation,
    loginError,
    registerError,
    user,
    isLoadingUser
  } = useAuth();

  useEffect(() => {
    const mode = params.get("mode");
    const registered = params.get("registered");
    setIsRegistering(mode === "register");
    
    if (registered === "true" && !isRegistering) {
      setSuccessMessage("¡Registro exitoso! Por favor, inicia sesión.");
      navigate(`${BASE_PATH}auth?mode=login`, { replace: true });
    } else {
      setSuccessMessage("");
    }
  }, [params, navigate, isRegistering]);

  useEffect(() => {
    // Si el usuario está autenticado y no está cargando, redirigir al dashboard
    if (user && !isLoadingUser) {
      const from = location.state?.from || `${BASE_PATH}dashboard`;
      navigate(from, { replace: true });
    }
  }, [user, isLoadingUser, navigate, location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      if (isRegistering) {
        const username = formData.get('username') as string;
        const fechaNacimiento = formData.get('fechaNacimiento') as string;
        
        const response = await register({ username, email, password, fechaNacimiento });
        
        // Mostrar los regalos de bienvenida si existen
        if (response?.user?.welcomeGifts) {
          showGifts(response.user.welcomeGifts);
        }
        
        // Navegar al dashboard después de mostrar los regalos o inmediatamente si no hay
        navigate(`${BASE_PATH}dashboard`, { replace: true });
      } else {
        await login({ email, password });
        navigate(`${BASE_PATH}dashboard`, { replace: true });
      }
    } catch (err) {
      setSuccessMessage(err instanceof Error ? err.message : 'Error en la autenticación');
    }
  };

  const toggleMode = () => {
    setSuccessMessage("");
    const nextMode = isRegistering ? "login" : "register";
    navigate(`${BASE_PATH}auth?mode=${nextMode}`);
  };

  const error = loginError || registerError;
  const isLoading = isLoggingIn || isRegisteringMutation;

  // Si está cargando el usuario inicial, mostrar loading
  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative w-[900px] h-[500px] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Active Form */}
        <div className="absolute w-1/2 h-full p-10 flex flex-col items-center justify-center bg-white dark:bg-gray-800 z-10"
             style={{ left: isRegistering ? '50%' : '0' }}>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            {isRegistering ? "Create Account" : "Sign In"}
          </h2>
          <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
            {successMessage && (
              <div className="text-green-500 text-sm text-center bg-green-50 dark:bg-green-900/10 p-2 rounded">
                {successMessage}
              </div>
            )}
            {isRegistering && (
              <input 
                name="username" 
                type="text" 
                placeholder="Username" 
                value={form.username} 
                onChange={handleChange} 
                required 
                className="input-style dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400 focus:dark:border-indigo-500" 
              />
            )}
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              value={form.email} 
              onChange={handleChange} 
              required 
              className="input-style dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400 focus:dark:border-indigo-500" 
            />
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              value={form.password} 
              onChange={handleChange} 
              required 
              autoComplete="current-password"
              className="input-style dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400 focus:dark:border-indigo-500" 
            />
            {isRegistering && (
              <input 
                name="fechaNacimiento" 
                type="date" 
                value={form.fechaNacimiento} 
                onChange={handleChange} 
                required 
                className="input-style dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:dark:border-indigo-500" 
              />
            )}
            {error && (
              <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-2 rounded">
                {error.message}
              </div>
            )}
            <button 
              className={`btn-primary dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-white transition-colors duration-200 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`} 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Loading...</span>
              ) : (
                isRegistering ? "Sign Up" : "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Slide panel */}
        <div 
          className={`absolute top-0 w-1/2 h-full bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center transition-all duration-700 ${
            isRegistering ? "left-0 rounded-r-[150px]" : "right-0 rounded-l-[150px]"
          }`}
        >
          <div className="text-center p-6">
            <h2 className="text-3xl font-bold mb-2 text-white">
              {!isRegistering ? "Welcome Back!" : "Hello, Friend!" }
            </h2>
            <p className="mb-6 text-gray-200">
              {!isRegistering 
                ? "Enter your personal details and start your journey with us" 
                : "Already have an account?"}
            </p>
            <button 
              onClick={toggleMode}
              className="btn-secondary"
            >
              {!isRegistering ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>

      <WalletDialog
        isOpen={showWelcomeGifts}
        onClose={hideGifts}
        welcomeGifts={welcomeGifts || undefined}
      />
    </div>
  );
};

export default AuthContainer;
