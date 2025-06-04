import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function Counter({ end, suffix = "", prefix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (!inView || hasAnimated) return;

    let startTime = performance.now();
    let animationFrame: number;

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = Math.floor(end * progress);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setHasAnimated(true);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [inView, end, duration, hasAnimated]);

  return (
    <span ref={ref} className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-500">
      {prefix}
      {hasAnimated ? end : count}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Nuestros Números
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-500 hover:bg-white/20 group">
            <h3 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-500">
              <Counter end={500} suffix="+" />
            </h3>
            <p className="text-gray-300 mt-4 font-medium">Autos en Colección</p>
          </div>
          <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-500 hover:bg-white/20 group">
            <h3 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-500">
              <Counter end={10} suffix="K+" />
            </h3>
            <p className="text-gray-300 mt-4 font-medium">Usuarios Activos</p>
          </div>
          <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-500 hover:bg-white/20 group">
            <h3 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-500">
              <Counter prefix="$RACE " end={2.45} duration={1500} />
            </h3>
            <p className="text-gray-300 mt-4 font-medium">Valor del Token</p>
          </div>
          <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-500 hover:bg-white/20 group">
            <h3 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-500">
              <Counter end={1} suffix="M+" />
            </h3>
            <p className="text-gray-300 mt-4 font-medium">Transacciones</p>
          </div>
        </div>
      </div>
    </section>
  );
}
