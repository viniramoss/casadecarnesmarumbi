import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, MapPin } from 'lucide-react';
import logo from '../logo/LogoMarumbiSemfundoLB.png';
import { getOrderedStores, getStoreByCatalogo } from '../config/storeConfig';
import { lerUnidadeSalva } from '../config/catalogo';

// Primeira tela: o cliente escolhe a unidade antes de ver os preços.
// Em "/", quem já escolheu antes vai direto para o catálogo; "/unidades" sempre mostra a escolha.
const EscolherUnidade = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/') return;
    const salva = lerUnidadeSalva();
    if (salva && getStoreByCatalogo(salva)) {
      navigate(`/catalogo/${salva}`, { replace: true });
    }
  }, [pathname, navigate]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <main className="flex-1 w-full max-w-xl mx-auto px-4 py-10 sm:py-16 flex flex-col">
        <img
          src={logo}
          alt="Casa de Carnes Marumbi"
          className="h-20 sm:h-24 w-auto mx-auto mb-8"
        />

        <p className="text-center text-xs uppercase tracking-[0.25em] text-red-300/80 mb-2">
          Catálogo de preços
        </p>
        <h1 className="text-center text-2xl sm:text-3xl font-serif font-semibold mb-8">
          Selecione a unidade mais próxima de você
        </h1>

        <div className="space-y-4">
          {getOrderedStores().map(store => (
            <Link
              key={store.id}
              to={`/catalogo/${store.catalogo}`}
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-primary hover:bg-primary/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xl font-serif font-semibold">{store.displayName}</p>
                <p className="mt-2 flex items-start gap-2 text-sm text-neutral-300">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-red-400" />
                  <span>
                    {store.address1}
                    <br />
                    {store.address2}
                  </span>
                </p>
                <p className="mt-2 flex items-center gap-2 text-xs text-neutral-400">
                  <Clock size={14} className="shrink-0" />
                  Seg a sáb {store.hours.weekdays} · Dom {store.hours.sunday}
                </p>
              </div>
              <ChevronRight
                size={22}
                className="shrink-0 text-neutral-500 transition-transform group-hover:translate-x-1 group-hover:text-white"
              />
            </Link>
          ))}
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Casa de Carnes Marumbi
      </footer>
    </div>
  );
};

export default EscolherUnidade;
