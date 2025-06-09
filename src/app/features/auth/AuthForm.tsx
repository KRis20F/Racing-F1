import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../api/mutations/auth.mutations";
import { useWallet } from '../../hooks/useWallet';
import { WalletDialog } from '../../UI/WalletDialog';
import { BASE_PATH } from '../../providers/AuthContext';

const AuthForm = () => {
  const navigate = useNavigate();
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
    isLoadingUser
  } = useAuth();

  const isLoading = isLoggingIn || isRegisteringMutation;

  // Manejar el modo de autenticación (login/register)
  useEffect(() => {
    const mode = params.get("mode");
    setIsRegistering(mode === "register");
    
    if (params.get("registered") === "true") {
      setSuccessMessage("¡Registro exitoso! Por favor, inicia sesión.");
    } else {
      setSuccessMessage("");
    }
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");

    try {
      if (isRegistering) {
        const response = await register(form);
        if (response?.user?.welcomeGifts) {
          showGifts(response.user.welcomeGifts);
        }
        navigate(`${BASE_PATH}/auth?mode=login&registered=true`, { replace: true });
      } else {
        await login({ email: form.email, password: form.password });
      }
    } catch (err) {
      console.error('Error en autenticación:', err);
      setSuccessMessage(err instanceof Error ? err.message : 'Error en la autenticación');
    }
  };

  const toggleMode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextMode = isRegistering ? "login" : "register";
    setSuccessMessage("");
    navigate(`${BASE_PATH}/auth?mode=${nextMode}`, { replace: true });
  };

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
        <div className="absolute w-1/2 h-full p-10 flex flex-col items-center justify-center bg-white dark:bg-gray-800 z-10"
             style={{ left: isRegistering ? '50%' : '0', transition: 'left 0.5s ease-in-out' }}>
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
                className="input-style dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400" 
              />
            )}
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              value={form.email} 
              onChange={handleChange} 
              required 
              className="input-style dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400" 
            />
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              value={form.password} 
              onChange={handleChange} 
              required 
              className="input-style dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400" 
            />
            {isRegistering && (
              <input 
                name="fechaNacimiento" 
                type="date" 
                value={form.fechaNacimiento} 
                onChange={handleChange} 
                required 
                className="input-style dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600" 
              />
            )}
            {(loginError || registerError) && (
              <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-2 rounded">
                {loginError?.message || registerError?.message}
              </div>
            )}
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Loading...' : (isRegistering ? 'Sign Up' : 'Sign In')}
            </button>
          </form>
        </div>

        <div 
          className={`absolute top-0 w-1/2 h-full bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center transition-all duration-500 ${
            isRegistering ? 'left-0 rounded-r-[150px]' : 'right-0 rounded-l-[150px]'
          }`}
        >
          <div className="text-center p-6">
            <h2 className="text-3xl font-bold mb-2">
              {!isRegistering ? "Welcome Back!" : "Hello, Friend!"}
            </h2>
            <p className="mb-6 text-gray-200">
              {!isRegistering 
                ? "Enter your personal details and start your journey with us" 
                : "Already have an account?"}
            </p>
            <button 
              onClick={toggleMode}
              type="button"
              className="px-6 py-2 border-2 border-white rounded-full text-white hover:bg-white hover:text-indigo-600 transition-colors"
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

export default AuthForm;
