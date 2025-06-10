import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../../assets/imgs/background-hero.png';
import SmokeEffect from './components/SmokeEffect';
import InfoCars from "./components/InfoCars";
import { FeatureCoin } from "./components/FeatureCoin";
import { Stats } from "./components/Stats";
import { Testimonials } from "./components/Testimonials";
import Navbar from '../../UI/Navbar';
import logo from '../../../assets/imgs/logo.png';
import { useEffect, useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 2200); // Duración de la animación (2.2s)
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col">
      {/* ANIMACIÓN DE ENTRADA SOLO PARA INDEX */}
      {isAnimating && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 transition-transform duration-1000 ease-in-out ">
          <img src={logo} alt="Logo" className="w-32 h-32 md:w-44 md:h-44 object-contain drop-shadow-2xl animate-fadeIn" />
        </div>
      )}
      {/* CONTENIDO NORMAL SOLO CUANDO TERMINA LA ANIMACIÓN */}
      {!isAnimating && (
        <Navbar>
          {/* Hero Section */}
          <section className="relative w-full h-screen">
            {/* Background Image Container */}
            <div className="absolute inset-0">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundPosition: 'center 65%',
                  backgroundSize: '100% auto',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              
              {/* Smoke Effect */}
              <SmokeEffect />
            </div>

            {/* Content Container */}
            <div className="relative h-full">
              {/* Hero Content */}
              <div className="h-full max-w-7xl mx-auto px-16 flex flex-col justify-center">
                <div className="max-w-2xl space-y-8">
                  <h1 className="text-8xl font-bold text-white leading-tight">
                    Pista Virtual
                  </h1>
                  <p className="text-2xl text-gray-200 max-w-xl">
                    Únete a la revolución del gaming y las criptomonedas. 
                    Compite en carreras épicas, gana NFTs exclusivos y 
                    convierte tu pasión por los autos en recompensas reales.
                  </p>
                  <div className="flex gap-6 pt-4">
                    <button 
                      onClick={() => navigate('/shop')}
                      className="bg-white text-black px-10 py-4 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                    >
                      Mercado NFT
                    </button>
                    <button 
                      onClick={() => navigate('/game')}
                      className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-white hover:text-black transition-all duration-300"
                    >
                      Jugar Ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Info Cars Section */}
          <section className="w-full">
            <InfoCars />
          </section>

          {/* Stats Section */}
          <section className="w-full">
            <Stats />
          </section>

          {/* Feature Coin Section */}
          <section className="w-full">
            <FeatureCoin />
          </section>

          {/* Testimonials Section */}
          <section className="w-full">
            <Testimonials />
          </section>
        </Navbar>
      )}
      {/* Animaciones Tailwind personalizadas */}
      <style>{`
        .animate-slideDown {
          animation: slideDown 2s cubic-bezier(0.77,0,0.175,1) forwards;
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s ease-in;
        }
      `}</style>
    </div>
  );
};

export default Home;
