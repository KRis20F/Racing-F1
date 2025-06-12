import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useAuth } from "../../api/mutations/auth.mutations";
import { useWallet } from '../../hooks/useWallet';
import { WalletDialog } from '../../UI/WalletDialog/index';
import { useAuthContext } from '../../providers/hooks/useAuthContext';
import { BASE_PATH } from '../../providers/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "", fechaNacimiento: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const { showWelcomeGifts, welcomeGifts, hideGifts } = useWallet();
  const { isAuthenticated } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [ageError, setAgeError] = useState("");

  const {
    login,
    register,
    isLoggingIn,
    isRegistering: isRegisteringMutation,
    loginError,
    registerError,
    isLoadingUser
  } = useAuth();

  useEffect(() => {
    const mode = params.get("mode") || "login";
    setIsRegistering(mode === "register");
    
    if (params.get("registered") === "true") {
      setSuccessMessage("¡Registro exitoso! Por favor, inicia sesión.");
    } else {
      setSuccessMessage("");
    }
  }, [params]);

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from || `${BASE_PATH}/dashboard`;
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");
    setAgeError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      if (isRegistering) {
        const username = formData.get('username') as string;
        const fechaNacimiento = formData.get('fechaNacimiento') as string;
        // Validar edad
        const birthDate = new Date(fechaNacimiento);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear() - (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);
        if (age < 18) {
          setAgeError("Debes tener al menos 18 años para registrarte.");
          console.log('Error de edad:', ageError);
          return;
        }
        const response = await register({ username, email, password, fechaNacimiento });
        console.log('Registro exitoso:', response);
        navigate(`${BASE_PATH}/auth?mode=login&registered=true`, { replace: true });
      } else {
        await login({ email, password });
      }
    } catch (err) {
      console.error('Error en autenticación:', err);
      setSuccessMessage(err instanceof Error ? err.message : 'Error en la autenticación');
    }
  };

  const toggleMode = () => {
    setSuccessMessage("");
    const nextMode = isRegistering ? "login" : "register";
    navigate(`${BASE_PATH}/auth?mode=${nextMode}`, { replace: true });
  };

  const error = loginError || registerError;
  const isLoading = isLoggingIn || isRegisteringMutation;

  // Función para traducir errores a mensajes amigables
  const getFriendlyError = (error: unknown) => {
    if (!error) return null;
    // Si es un error de Axios con response.data.msg
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const msg = (error as { response?: { data?: { msg?: string } } }).response?.data?.msg;
      if (msg) {
        if (msg.includes('Credenciales inválidas')) {
          return 'La contraseña es incorrecta o el correo no existe.';
        }
        if (msg.includes('El usuario ya existe')) {
          return 'El correo ya está registrado.';
        }
        if (msg.includes('Usuario no encontrado')) {
          return 'No se encontró tu cuenta.';
        }
        return msg;
      }
    }
    // Fallback para otros errores
    const msg = (error as Error).message || error;
    if (msg && typeof msg === 'string') {
      if (msg.includes('Credenciales inválidas') || msg.toLowerCase().includes('invalid credentials')) {
        return 'La contraseña es incorrecta o el correo no existe.';
      }
      if (msg.includes('El usuario ya existe') || msg.toLowerCase().includes('already exists')) {
        return 'El correo ya está registrado.';
      }
      if (msg.includes('Usuario no encontrado') || msg.toLowerCase().includes('not found')) {
        return 'No se encontró tu cuenta.';
      }
      if (msg.includes('contraseña')) {
        return 'La contraseña es incorrecta.';
      }
      if (msg.includes('email') && msg.includes('válido')) {
        return 'Por favor, introduce un correo válido.';
      }
    }
    return 'Ocurrió un error. Intenta de nuevo.';
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
      <div className="relative w-full max-w-7xl md:w-[900px] h-auto md:h-[500px] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500">
        {/* Panel de formulario */}
        <div
          className={`w-full md:absolute md:w-1/2 h-full p-6 md:p-10 flex flex-col items-center justify-center bg-white dark:bg-gray-800 z-10 transition-all duration-700 animate-fade-in
            ${isRegistering ? 'md:right-0 md:left-1/2 md:rounded-tr-3xl md:rounded-br-3xl' : 'md:left-0 md:right-1/2 md:rounded-tl-3xl md:rounded-bl-3xl'}
          `}
          style={window.innerWidth >= 768 ? { left: isRegistering ? '50%' : '0' } : {}}
        >
          {/* Validaciones frontend */}
          {form.email && !/^\S+@\S+\.\S+$/.test(form.email) && (
            <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-2 rounded mb-2">Por favor, introduce un correo válido.</div>
          )}
          {form.password && form.password.length > 0 && form.password.length < 8 && (
            <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-2 rounded mb-2">La contraseña debe tener al menos 8 caracteres.</div>
          )}
          {isRegistering && form.fechaNacimiento && (() => {
            const birthDate = new Date(form.fechaNacimiento);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear() - (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);
            if (age < 18) {
              return <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-2 rounded mb-2">Debes tener al menos 18 años para registrarte.</div>;
            }
            return null;
          })()}
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            {isRegistering ? "Crear cuenta" : "Iniciar sesión"}
          </h2>
          <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4 animate-fade-in">
            {successMessage && successMessage.includes('¡Registro exitoso!') && (
              <div className="text-green-500 text-sm text-center bg-green-50 dark:bg-green-900/10 p-2 rounded">
                {successMessage}
              </div>
            )}
            {isRegistering && (
              <input 
                name="username" 
                type="text" 
                placeholder="Nombre de usuario" 
                value={form.username} 
                onChange={handleChange} 
                required 
                autoComplete="username"
                aria-label="Nombre de usuario"
                className="input-style dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400 focus:dark:border-indigo-500" 
              />
            )}
            <input 
              name="email" 
              type="email" 
              placeholder="Correo electrónico" 
              value={form.email} 
              onChange={handleChange} 
              required 
              autoComplete="email"
              aria-label="Correo electrónico"
              className="input-style dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400 focus:dark:border-indigo-500" 
            />
            <div className="relative">
              <input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="Contraseña" 
                value={form.password} 
                onChange={handleChange} 
                required 
                autoComplete={isRegistering ? "new-password" : "current-password"}
                aria-label="Contraseña"
                className="input-style dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400 focus:dark:border-indigo-500 pr-10" 
              />
              <button
                type="button"
                tabIndex={-1}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {isRegistering && (
              <input 
                name="fechaNacimiento" 
                type="date" 
                value={form.fechaNacimiento} 
                onChange={handleChange} 
                required 
                autoComplete="bday"
                aria-label="Fecha de nacimiento"
                className="input-style dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:dark:border-indigo-500" 
              />
            )}
            {error && (
              <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-2 rounded">
                {getFriendlyError(error)}
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
                <span>Cargando...</span>
              ) : (
                isRegistering ? "Registrarse" : "Entrar"
              )}
            </button>
          </form>
          {/* Botón para alternar entre login y registro en móvil */}
          <div className="flex md:hidden justify-center mt-4">
            <button
              onClick={toggleMode}
              className="btn-secondary px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow transition-all duration-300 hover:bg-indigo-700"
            >
              {isRegistering ? "Iniciar sesión" : "Registrarse"}
            </button>
          </div>
        </div>
        {/* Panel morado solo en PC/tablet */}
        <div
          className={`hidden md:flex absolute top-0 w-1/2 h-full bg-gradient-to-br from-indigo-600 to-purple-700 text-white items-center justify-center transition-all duration-700 animate-fade-in
            ${isRegistering ? 'md:left-0 md:right-1/2 md:rounded-tl-3xl md:rounded-bl-3xl' : 'md:right-0 md:left-1/2 md:rounded-tr-3xl md:rounded-br-3xl'}
          `}
          style={{ left: isRegistering ? '0' : '50%' }}
        >
          <div className="text-center p-6 w-full flex flex-col gap-4 md:gap-6">
            <h2 className="text-3xl font-bold mb-2 text-white">
              {!isRegistering ? "¡Bienvenido de nuevo!" : "¡Hola, piloto!" }
            </h2>
            <p className="mb-6 text-gray-200">
              {!isRegistering 
                ? "Ingresa tus datos personales y comienza tu viaje con nosotros" 
                : "¿Ya tienes una cuenta?"}
            </p>
            <div className="flex flex-row md:flex-col gap-4 md:gap-4 justify-center items-center w-full">
              <button 
                onClick={toggleMode}
                className="btn-secondary transition-transform duration-300 hover:scale-105 w-full md:w-auto"
              >
                {!isRegistering ? "Registrarse" : "Iniciar sesión"}
              </button>
              <button
                type="button"
                onClick={() => navigate(BASE_PATH)}
                className="px-6 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full md:w-auto"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </div>

        {/* Animaciones y estilos para el slide y bordes dinámicos */}
        <style>{`
          .animate-fade-in {
            animation: fadeIn 0.7s ease;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 768px) {
            .relative { flex-direction: column !important; }
            .w-full { width: 100% !important; }
          }
        `}</style>
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
