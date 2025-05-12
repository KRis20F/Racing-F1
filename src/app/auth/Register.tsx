import React from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#512da8]">
      <div className="bg-white rounded-[50px] p-16 w-[500px] max-w-full flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
        <p className="text-gray-600 mb-8">
          Register with your personal details to use all of site features
        </p>
        <button 
          onClick={() => navigate('/login')}
          className="border-2 border-[#512da8] text-[#512da8] hover:bg-[#512da8] hover:text-white transition-colors duration-300 px-12 py-3 rounded-full uppercase tracking-wider font-semibold"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;