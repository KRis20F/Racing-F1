import { useRef, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    text: "RaceGame es el mejor producto que he usado en mucho tiempo - es una plataforma potenciada por IA. Le pedí que me recomendara una estrategia de carrera y analizó mi estilo de conducción perfectamente a la primera.",
    name: "Zeke Sikelianos",
    company: "Replicate",
  },
  {
    text: "RaceGame es 🏎️-ed de verdad",
    name: "Steven Tey",
    company: "Dub",
  },
  {
    text: "Me encanta correr y RaceGame es una necesidad. RaceGame está varios pasos por delante de mi cerebro, sugiriendo líneas de carrera perfectas antes de que yo las piense.",
    name: "Andrew Milich",
    company: "OpenAI",
  },
  {
    text: "Voy a aplicar a YC y listar RaceGame como mi proyecto estrella",
    name: "Sam Whitmore",
    company: "New Racing",
  },
  {
    text: "Me gusta mucho cómo RaceGame sugiere mejoras en mi estilo de conducción. Notó que era inconsistente en las curvas y me sugirió ajustes que coincidían con mi estilo!",
    name: "Sawyer Hood",
    company: "Speed Masters",
  },
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const animate = useCallback((timestamp: number) => {
    const container = containerRef.current;
    if (!container || !inView) return;

    const scrollHeight = container.scrollHeight - container.clientHeight;
    const scrollDuration = 30000; // 30 segundos
    const normalizedScroll = (timestamp % scrollDuration) / scrollDuration * scrollHeight;
    
    container.scrollTop = normalizedScroll;
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [inView]);

  useEffect(() => {
    if (inView) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [inView, animate]);

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h2 className="text-6xl font-display mb-4 bg-gradient-to-b from-white to-[#666] bg-clip-text text-transparent">
          Amado por pilotos de clase mundial
        </h2>
        <p className="text-lg font-mono text-gray-400">
          Pilotos de todo el mundo eligen RaceGame como su plataforma preferida.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div
          ref={(el) => {
            containerRef.current = el;
            inViewRef(el);
          }}
          className="grid grid-cols-3 gap-6 h-[800px] overflow-y-hidden px-4"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          }}
        >
          <div className="space-y-6">
            {[...testimonials, ...testimonials]
              .slice(0, 4)
              .map((testimonial, index) => (
                <TestimonialCard key={`col1-${index}`} {...testimonial} />
              ))}
          </div>
          <div className="space-y-6 mt-12">
            {[...testimonials, ...testimonials]
              .slice(2, 6)
              .map((testimonial, index) => (
                <TestimonialCard key={`col2-${index}`} {...testimonial} />
              ))}
          </div>
          <div className="space-y-6 mt-24">
            {[...testimonials, ...testimonials]
              .slice(1, 5)
              .map((testimonial, index) => (
                <TestimonialCard key={`col3-${index}`} {...testimonial} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  text,
  name,
  company,
}: {
  text: string;
  name: string;
  company: string;
}) {
  return (
    <div
      className="bg-[rgba(0,0,0,0.4)] rounded-xl p-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(39,39,42,0.4) 0%, rgba(39,39,42,0.1) 100%)",
        backdropFilter: "blur(6px)",
      }}
    >
      <p className="text-[17px] text-gray-300 font-mono mb-8 whitespace-normal leading-relaxed">
        {text}
      </p>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D1B69] to-[#7834BE]" />
        <div>
          <h3 className="font-mono text-gray-200 text-[15px] font-medium">
            {name}
          </h3>
          <p className="font-mono text-gray-500 text-[15px]">{company}</p>
        </div>
      </div>
    </div>
  );
}
