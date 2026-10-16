import React from 'react';
import Navbar from '../components/Navbar';
import CabecalhoPagina from '../components/CabecalhoPagina';
import LocationMap from '../components/LocationMap';
import Footer from '../components/Footer';

const Localizacao = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <Navbar />
    <CabecalhoPagina rotulo="Açougue Marumbi" titulo="Nossa Localização">
      <p className="mt-3 max-w-2xl font-semibold text-gold-400">
        Visite nossas lojas e descubra a experiência completa dos nossos açougues.
      </p>
    </CabecalhoPagina>
    <main className="flex-1">
      <LocationMap />
    </main>
    <Footer />
  </div>
);

export default Localizacao;
