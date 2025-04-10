import Logo from "../../../assets/guci.svg";
import InfoCars from "./components/InfoCars";
import { useState, useEffect } from "react";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Verificar el modo oscuro inicial
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);

    // Escuchar cambios en el modo oscuro del sistema
    const darkModeListener = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    darkModeQuery.addEventListener("change", darkModeListener);

    return () => darkModeQuery.removeEventListener("change", darkModeListener);
  }, []);

  return (
    <div className={`flex flex-col ${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen relative">
        <div
          className="absolute inset-0 h-full z-0 rounded-2xl"
          style={{
            backgroundImage: `url('/src/assets/fast-cars.gif')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="absolute inset-0 m-auto max-w-[1169px] rounded-lg  bg-black/50 z-10" />

        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-8">
          <div className="max-w-4xl w-full text-center">
            <h1 className="text-5xl font-bold text-white mb-12">
              Welcome to Race Game
            </h1>
            <div className="w-64 h-64 mx-auto">
              <img src={Logo} alt="Logo" className="w-full h-full" />
            </div>
            <p className="text-5xl font-bold text-white mb-12">
              Es hora de ganar dinero
            </p>
          </div>
        </div>
      </div>
      <InfoCars isDark={isDarkMode} />
    </div>
  );
};

export default Home;
