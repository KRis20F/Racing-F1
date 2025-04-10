import carWhite from "../../../../assets/car-white.png";
import carBlack from "../../../../assets/vista-frontal-coche-negro-moderno-generico-marca_110488-530.avif";
import { useEffect, useState, useRef } from "react";

export default function InfoCars({ isDark }: { isDark: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-12 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } w-full px-4`}
    >
      <div className="relative max-w-6xl mx-auto h-[500px]">
        <h2 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl font-bold z-10">
          Cars
        </h2>

        <div className="absolute top-[25%] left-[5%] w-[35%] z-10">
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>

        <div className="absolute bottom-0 right-0 w-[65%] md:w-[70%] max-h-full">
          <img
            className="w-full h-auto object-contain"
            src={isDark ? carWhite : carBlack}
            alt="car"
          />
        </div>
      </div>
    </section>
  );
}
