import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { storeLocations, getOrderedStores } from '../config/storeConfig';

const LocationMap = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const orderedStores = getOrderedStores();
  const [selectedLocation, setSelectedLocation] = useState("uberaba"); // Marumbi 1 como padrão
  const [autoCycle, setAutoCycle] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sectionCurrent = sectionRef.current;
    const mapCurrent = mapRef.current;
    const infoCurrent = infoRef.current;

    if (sectionCurrent) observer.observe(sectionCurrent);
    if (mapCurrent) observer.observe(mapCurrent);
    if (infoCurrent) observer.observe(infoCurrent);

    return () => {
      if (sectionCurrent) observer.unobserve(sectionCurrent);
      if (mapCurrent) observer.unobserve(mapCurrent);
      if (infoCurrent) observer.unobserve(infoCurrent);
    };
  }, []);

  useEffect(() => {
    if (!autoCycle) return;
    const interval = setInterval(() => {
      setSelectedLocation((prev) => {
        const currentIndex = orderedStores.findIndex(store => store.id === prev);
        const nextIndex = (currentIndex + 1) % orderedStores.length;
        return orderedStores[nextIndex].id;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [autoCycle, orderedStores]);

  const handleLocationClick = (location: string) => {
    setSelectedLocation(location);
    setAutoCycle(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#111111] via-[#111111] to-[#0B0B0B] flex items-center justify-center" id="location">
      <div 
        ref={sectionRef}
        className="butcher-container opacity-0 translate-y-10 transition-all duration-700 w-full"
      >
        <div className="text-center mb-16">
          <h2 className="section-title text-center text-white">Nossa Localização</h2>
          <p className="max-w-2xl mx-auto text-textColor-douradoClaro">
            Visite nossa loja física e descubra a experiência completa dos nossos açougues.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          <div 
            ref={mapRef}
            className="lg:col-span-3 opacity-0 translate-y-10 transition-all duration-700 delay-100"
          >
            <div className="rounded-lg shadow-md h-full overflow-hidden">
              <div className="relative h-full bg-transparent">
                <iframe 
                  src={storeLocations[selectedLocation].embedUrl} 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
          
          <div 
            ref={infoRef}
            className="lg:col-span-2 opacity-0 translate-y-10 transition-all duration-700 delay-200"
          >
            <div className="bg-black/60 p-8 rounded-lg shadow-md h-full">
              <h3 className="font-serif text-2xl font-bold text-white/90 mb-6">Informações</h3>
              
              <div className="space-y-6">
                {orderedStores.map((store) => (
                  <div 
                    key={store.id}
                    className={`flex items-start cursor-pointer hover:bg-gray-800 p-3 rounded-md transition-all duration-200 ${selectedLocation === store.id ? 'bg-black/40' : ''}`} 
                    onClick={() => handleLocationClick(store.id)}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <MapPin className={`w-5 h-5 ${selectedLocation === store.id ? "text-gold-500" : "text-white/90"}`} />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-white/80">{store.title}</h4>
                      <p className="text-white/80">{store.address1}</p>
                      <p className="text-white/80">{store.address2}</p>
                      <p className="text-white/80">{store.cep}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <a 
                href={storeLocations[selectedLocation].directionsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-8 w-full block text-center px-6 py-3 rounded-md bg-gold-500 text-black font-medium hover:bg-gold-600 hover:text-white transition-colors"
              >
                Como Chegar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
