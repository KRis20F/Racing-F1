import Logo from "../../../assets/guci.svg";
import InfoCars from "./components/InfoCars";
import { FeatureCoin } from "./components/FeatureCoin";
import { Stats } from "./components/Stats";
import { Testimonials } from "./components/Testimonials";

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full min-h-screen relative">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url('/src/assets/fast-cars.gif')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="absolute inset-0 m-auto max-w-[1169px] rounded-lg bg-black/50 z-10" />

        <div className="relative z-20 flex flex-col items-center justify-center h-screen p-8">
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
    </div>
  );
};

export default Home;
