import icon from "../../../../assets/guci.svg";

export function FeatureCoin() {
  return (
    <article className="relative py-24 px-4 overflow-hidden ">
      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-pink-400 mb-4">
            Feature Coin
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light">
            La ventaja de tenernos en tu garage virtual
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Feature cards container */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="feature-card backdrop-blur-lg bg-white/80 dark:bg-white/10 p-8 rounded-2xl border border-purple-100 dark:border-white/20 hover:border-purple-300 dark:hover:border-white/40 transition-all duration-300 group shadow-lg hover:shadow-xl">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                🏎️
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Modelos exclusivos de alta gama
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Accede a autos premium que no encontrarás en otras plataformas.
              </p>
            </div>

            {/* Card 2 */}
            <div className="feature-card backdrop-blur-lg bg-white/80 dark:bg-white/10 p-8 rounded-2xl border border-purple-100 dark:border-white/20 hover:border-purple-300 dark:hover:border-white/40 transition-all duration-300 group shadow-lg hover:shadow-xl">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                💰
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Sin comisiones ocultas
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Todas nuestras transacciones son transparentes, sin sorpresas.
              </p>
            </div>

            {/* Card 3 */}
            <div className="feature-card backdrop-blur-lg bg-white/80 dark:bg-white/10 p-8 rounded-2xl border border-purple-100 dark:border-white/20 hover:border-purple-300 dark:hover:border-white/40 transition-all duration-300 group shadow-lg hover:shadow-xl">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                🔒
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Seguridad garantizada
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Transacciones protegidas con la última tecnología blockchain.
              </p>
            </div>

            {/* Card 4 */}
            <div className="feature-card backdrop-blur-lg bg-white/80 dark:bg-white/10 p-8 rounded-2xl border border-purple-100 dark:border-white/20 hover:border-purple-300 dark:hover:border-white/40 transition-all duration-300 group shadow-lg hover:shadow-xl">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                🚀
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Velocidad en tus operaciones
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Compra, vende e intercambia autos virtuales en segundos.
              </p>
            </div>
          </div>

          {/* Logo section */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-600 dark:to-pink-600 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white/30 dark:bg-black/30 backdrop-blur-xl p-8 rounded-2xl border border-purple-100 dark:border-white/20">
                <img
                  className="w-full max-w-[280px] transform transition-transform duration-500 group-hover:scale-110"
                  src={icon}
                  alt="Feature Coin Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
