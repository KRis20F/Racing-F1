import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login, register } from "./core/api/apiProvides";
import { FaFacebookF, FaGithub, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import './AuthForm.css';


const AuthContainer = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", fechaNacimiento: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const mode = params.get("mode");
    setIsRegistering(mode === "register");
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegistering) {
        const data = await register(form.name, form.email, form.password, form.fechaNacimiento);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        const data = await login(form.email, form.password);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || (isRegistering ? "Registration failed" : "Login failed"));
    }
  };

  const toggleMode = () => {
    const nextMode = isRegistering ? "login" : "register";
    navigate(`/auth?mode=${nextMode}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-indigo-100">
      <div className="relative w-[900px] h-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden flex">

        {/* Forms container */}
        <div className={`flex w-full h-full transition-transform duration-700 ${isRegistering ? "-translate-x-1/2" : ""}`}>
          
          {/* Sign In */}
          <div className="w-1/2 p-10 flex flex-col items-center justify-center bg-white">
            <h2 className="text-3xl font-bold mb-4">Sign In</h2>
            <div className="flex gap-2 mb-4">
              <SocialIcons />
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-3">
              <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="input-style" />
              <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="input-style" />
              <button className="btn-primary" type="submit">Sign In</button>
            </form>
          </div>

          {/* Sign Up */}
          <div className="w-1/2 p-10 flex flex-col items-center justify-center bg-white">
            <h2 className="text-3xl font-bold mb-4">Create Account</h2>
            <div className="flex gap-2 mb-4">
              <SocialIcons />
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-3">
              <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required className="input-style" />
              <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="input-style" />
              <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="input-style" />
              <input name="fechaNacimiento" type="date" value={form.fechaNacimiento} onChange={handleChange} required className="input-style" />
              <button className="btn-primary" type="submit">Sign Up</button>
            </form>
          </div>
        </div>

        {/* Slide panel */}
        <div className={`absolute top-0 w-1/2 h-full bg-gradient-to-r from-indigo-500 to-purple-700 text-white flex items-center justify-center transition-transform duration-700 ${isRegistering ? "translate-x-full right-0 rounded-l-[150px]" : "left-0 rounded-r-[150px]"}`}>
          <div className="text-center p-6">
            <h2 className="text-3xl font-bold mb-2">{isRegistering ? "Welcome Back!" : "Hello, Friend!"}</h2>
            <p className="text-sm mb-4">
              {isRegistering
                ? "Enter your personal details to use all of site features"
                : "Register with your personal details to use all of site features"}
            </p>
            <button onClick={toggleMode} className="border border-white px-6 py-2 rounded-full text-white hover:bg-white hover:text-indigo-600 transition">
              {isRegistering ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm z-50">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

const SocialIcons = () => (
  <>
    <a href="#" className="icon-style"><FaGooglePlusG /></a>
    <a href="#" className="icon-style"><FaFacebookF /></a>
    <a href="#" className="icon-style"><FaGithub /></a>
    <a href="#" className="icon-style"><FaLinkedinIn /></a>
  </>
);

export default AuthContainer;
