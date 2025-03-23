import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

const LocationMap = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const locations = {
    cajuru: {
      title: "Cajuru",
      address1: "Rua Crysostomo da Rosa, 258",
      address2: "Cajuru, Curitiba - PR",
      cep: "CEP: 82900-410",
      embedUrl:
        "https://www.google.com/maps?q=Rua%20Crysostomo%20da%20Rosa%2C%20258%2C%20Cajuru%2C%20Curitiba%20-%20PR&output=embed",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=Rua+Crysostomo+da+Rosa,+258,+Cajuru,+Curitiba+-+PR",
    },
    uberaba: {
      title: "Uberaba",
      address1: "Rua Eunice Bettini Bartoszeck, 1122",
      address2: "Uberaba, Curitiba - PR",
      cep: "CEP: 81590-180",
      embedUrl:
        "https://www.google.com/maps?q=Rua%20Eunice%20Bettini%20Bartoszeck%2C%201122%2C%20Uberaba%2C%20Curitiba%20-%20PR&output=embed",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=Rua+Eunice+Bettini+Bartoszeck,+1122,+Uberaba,+Curitiba+-+PR",
    },
  };

  const [selectedLocation, setSelectedLocation] = useState("cajuru");
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
      setSelectedLocation((prev) =>
        prev === "cajuru" ? "uberaba" : "cajuru"
      );
    }, 8000);
    return () => clearInterval(interval);
  }, [autoCycle]);

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
          <p className="max-w-2xl mx-auto text-textColor-marelo">
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
                  src={locations[selectedLocation].embedUrl} 
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
                <div 
                  className={`flex items-start cursor-pointer hover:bg-gray-800 p-3 rounded-md transition-all duration-200 ${selectedLocation === "cajuru" ? 'bg-black/40' : ''}`} 
                  onClick={() => handleLocationClick("cajuru")}
                >
                  <div className="flex-shrink-0 mt-1">
                    <MapPin className={`w-5 h-5 ${selectedLocation === "cajuru" ? "text-beef-600" : "text-white/90"}`} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-white/80">Cajuru</h4>
                    <p className="text-white/80">Rua Crysostomo da Rosa, 258</p>
                    <p className="text-white/80">Cajuru, Curitiba - PR</p>
                    <p className="text-white/80">CEP: 82900-410</p>
                  </div>
                </div>
                
                <div 
                  className={`flex items-start cursor-pointer hover:bg-gray-800 p-3 rounded-md transition-all duration-200 ${selectedLocation === "uberaba" ? 'bg-black/40' : ''}`} 
                  onClick={() => handleLocationClick("uberaba")}
                >
                  <div className="flex-shrink-0 mt-1">
                    <MapPin className={`w-5 h-5 ${selectedLocation === "uberaba" ? "text-beef-600" : "text-white/90"}`} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-white/80">Uberaba</h4>
                    <p className="text-white/80">Rua Eunice Bettini Bartoszeck, 1122</p>
                    <p className="text-white/80">Uberaba, Curitiba - PR</p>
                    <p className="text-white/80">CEP: 81590-180</p>
                  </div>
                </div>
              </div>
              
              <a 
                href={locations[selectedLocation].directionsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-8 w-full block text-center px-6 py-3 rounded-md bg-beef-600 text-black font-medium hover:bg-black hover:text-white/90 transition-colors"
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
