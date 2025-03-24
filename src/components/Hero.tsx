import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import bgImage from '../images/backgroundBeef.png';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      { threshold: 0.1 }
    );

    const current = heroRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden" id='home'>
      {/* Background image com overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-butcher-950/80 to-textColor-fundoDaMagia backdrop-blur-[0px]"></div>
      </div>

      {/* Conteúdo do Hero */}
      <div 
        ref={heroRef}
        className="absolute top-[35%] left-0 w-full px-8 flex flex-col items-center opacity-0 transition-all duration-700 text-center"
      >
        <div className="w-full">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-medium rounded-full bg-beef-100/10 text-beef-100 backdrop-blur-sm">
            TRADIÇÃO & QUALIDADE
          </span>
          <p className="text-lg text-textColor-marelo/80 mb-8 font-light tracking-[4px] font-instrument">
            CARNES SELECIONADAS PARA MOMENTOS ESPECIAIS
          </p>
          <h1 className="text-7xl md:text-5xl lg:text-8xl font-thin text-white mb-6 leading-tight tracking-widest font-instrument">
            AÇOUGUE MARUMBI
          </h1>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-beef-600 text-textColor-pretu font-medium hover:bg-beef-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Ver Produtos
            </Link>
            <a 
              href="#location" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-all"
            >
              Nossa Localização
            </a>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-0 sm:bottom-10 inset-x-0 flex justify-center">
        <button 
          onClick={scrollToNextSection}
          aria-label="Scroll down"
          className="text-white animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </div>
  );
};

export default Hero;
