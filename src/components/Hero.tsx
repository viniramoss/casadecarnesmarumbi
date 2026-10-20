import React from 'react';
import { ChevronDown, ChevronRight, MapPin } from 'lucide-react';
import bgImage from '../images/backgroundBeef.png';
import { getOrderedStores } from '../config/storeConfig';

// Primeira tela: a pessoa escolhe a unidade e vai para o catálogo de preços dela.
// Os preços ficam só nos sites de cada unidade (catalogoUrl em src/config/storeConfig.ts).
const Hero = () => {
  const lojas = getOrderedStores();

  const scrollToNextSection = () => {
    document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full overflow-hidden bg-black" id="home">
      {/* Background image com overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgImage}')` }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-butcher-950/80 to-textColor-fundoDaMagia"></div>
      </div>

      {/* Conteúdo do Hero */}
      <div className="relative butcher-container flex min-h-[100svh] flex-col items-center justify-center pb-20 pt-28 text-center md:pt-32">
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gold-100/10 text-gold-100 backdrop-blur-sm">
          TRADIÇÃO & QUALIDADE
        </span>
        <h1 className="mt-5 font-instrument text-[clamp(2.25rem,11vw,4.5rem)] leading-tight tracking-widest text-white lg:text-8xl">
          AÇOUGUE MARUMBI
        </h1>
        <p className="mt-3 text-lg font-bold uppercase tracking-[0.2em] text-gold-400 sm:text-xl">
          Catálogo de preços
        </p>
        <p className="mt-2 text-base font-semibold text-white/90 sm:text-lg">
          Selecione a unidade mais próxima de você
        </p>

        <div id="precos" className="mt-8 grid w-full max-w-3xl scroll-mt-28 gap-3 sm:grid-cols-2 sm:gap-4">
          {lojas.map(store => (
            <a
              key={store.id}
              href={store.catalogoUrl}
              className="group flex items-center gap-4 rounded-2xl border border-white/20 bg-black/55 p-4 text-left backdrop-blur-sm transition-colors hover:border-gold-400 hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 sm:p-5"
            >
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-2xl font-bold text-white sm:text-3xl">{store.displayName}</span>
                <span className="mt-0.5 block text-sm font-bold uppercase tracking-wider text-gold-400">{store.bairro}</span>
                <span className="mt-2 flex items-start gap-1.5 text-sm font-medium text-white/80">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  {store.address1}
                </span>
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500 text-black transition-transform group-hover:translate-x-1">
                <ChevronRight className="h-6 w-6" />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-4 sm:bottom-8 inset-x-0 flex justify-center">
        <button
          onClick={scrollToNextSection}
          aria-label="Ver a localização das lojas"
          className="text-white animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </div>
  );
};

export default Hero;
