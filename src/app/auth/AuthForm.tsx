import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login, register } from "./core/api/apiProvides";
import './AuthForm.css';

interface ApiError {
  msg?: string;
  message?: string;
  response?: {
    data?: {
      msg?: string;
      message?: string;
    }
  }
}

const AuthContainer = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", fechaNacimiento: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDashboardButton, setShowDashboardButton] = useState(false);

  useEffect(() => {
    const mode = params.get("mode");
    setIsRegistering(mode === "register");
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem("token");
    setShowDashboardButton(!!token);
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validación básica
    const trimmedEmail = form.email.trim();
    const trimmedPassword = form.password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Email y contraseña son requeridos");
      setIsLoading(false);
      return;
    }

    if (trimmedPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    try {
      if (isRegistering) {
        const trimmedName = form.name.trim();
        if (!trimmedName) {
          setError("El nombre es requerido");
          setIsLoading(false);
          return;
        }

        console.log('Enviando datos de registro:', { 
          name: trimmedName, 
          email: trimmedEmail,
          passwordLength: trimmedPassword.length,
          fechaNacimiento: form.fechaNacimiento 
        });

        const data = await register(
          trimmedName, 
          trimmedEmail, 
          trimmedPassword, 
          form.fechaNacimiento
        );
        console.log('Respuesta del registro:', data);
        if (data?.token && data?.user) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setShowDashboardButton(true);
          navigate("/dashboard");
        } else {
          throw new Error("Respuesta inválida del servidor");
        }
      } else {
        console.log('Enviando datos de login:', { 
          email: trimmedEmail,
          passwordLength: trimmedPassword.length 
        });
        
        const data = await login(trimmedEmail, trimmedPassword);
        console.log('Respuesta del login:', data);
        if (data?.token && data?.user) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setShowDashboardButton(true);
          navigate("/dashboard");
        } else {
          throw new Error("Respuesta inválida del servidor");
        }
      }
    } catch (err: unknown) {
      console.error('Error completo:', err);
      const error = err as ApiError;
      const errorMessage = error.msg || error.message || 
                         error.response?.data?.msg || 
                         error.response?.data?.message ||
                         (isRegistering ? "Error en el registro" : "Error en el inicio de sesión");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    const nextMode = isRegistering ? "login" : "register";
    navigate(`/auth?mode=${nextMode}`);
  };

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
            {isRegistering && (
              <input 
                name="name" 
                type="text" 
                placeholder="Name" 
                value={form.name} 
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
            <p className="text-sm mb-4 text-gray-100">
              {!isRegistering
                ? "Already have an account? Sign in to continue"
                : "Start your journey with us today!"}
            </p>
            <button 
              onClick={toggleMode} 
              className="border-2 border-white px-8 py-2 rounded-full text-white text-sm font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-200"
            >
              {!isRegistering ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>

        {/* Dashboard Button */}
        {showDashboardButton && (
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => navigate('/dashboard')}
              className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-lg shadow-2xl bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 hover:scale-105"
            >
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
              <span className="relative flex items-center">
                Dashboard
                <svg 
                  className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-2 rounded-lg text-sm z-50 backdrop-blur-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthContainer;
