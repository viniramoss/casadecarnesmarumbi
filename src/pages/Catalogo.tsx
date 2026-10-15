import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeftRight, Clock, MapPin, MessageCircle, Navigation, Search, X } from 'lucide-react';
import logo from '../logo/LogoMarumbiSemfundoLB.png';
import { getStoreByCatalogo } from '../config/storeConfig';
import {
  ProductCategory,
  StoreTag,
  catalogo,
  categorias,
  formatAtualizadoEm,
  formatPrice,
  produtosDaLoja,
  salvarUnidade,
} from '../config/catalogo';

// Normaliza para a busca ignorar acento e maiúsculas
const normalizar = (texto: string) =>
  texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

const Catalogo = () => {
  const { loja = '' } = useParams();
  const store = getStoreByCatalogo(loja);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState<ProductCategory | 'todos'>('todos');

  useEffect(() => {
    if (!store) return;
    salvarUnidade(store.catalogo);
    window.scrollTo(0, 0);
    setBusca('');
    setCategoria('todos');
  }, [store]);

  const itens = useMemo(() => (store ? produtosDaLoja(store.catalogo) : []), [store]);

  // Só as categorias que a unidade tem
  const categoriasDaLoja = useMemo(
    () => categorias.filter(c => itens.some(item => item.categoria === c.id)),
    [itens],
  );

  const secoes = useMemo(() => {
    const termo = normalizar(busca);
    const filtrados = itens.filter(
      item =>
        (categoria === 'todos' || item.categoria === categoria) &&
        (!termo || normalizar(item.nome).includes(termo)),
    );
    return categoriasDaLoja
      .map(c => ({ ...c, itens: filtrados.filter(item => item.categoria === c.id) }))
      .filter(secao => secao.itens.length > 0);
  }, [itens, categoriasDaLoja, busca, categoria]);

  if (!store) return <Navigate to="/unidades" replace />;

  const atualizadoEm = formatAtualizadoEm(catalogo.lojas[store.catalogo as StoreTag]?.atualizadoEm ?? '');

  return (
    <div className="min-h-screen bg-background">
      {/* Cabeçalho da unidade */}
      <header className="bg-neutral-950 text-white">
        <div className="max-w-3xl mx-auto px-4 pt-4 pb-6">
          <div className="flex items-center justify-between gap-3">
            <Link to="/unidades" aria-label="Escolher unidade">
              <img src={logo} alt="Casa de Carnes Marumbi" className="h-12 w-auto" />
            </Link>
            <Link
              to="/unidades"
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ArrowLeftRight size={16} />
              Trocar unidade
            </Link>
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-red-300/80">Catálogo</p>
          <h1 className="mt-1 text-3xl font-serif font-semibold">{store.displayName}</h1>
          <p className="mt-2 flex items-start gap-2 text-sm text-neutral-300">
            <MapPin size={16} className="mt-0.5 shrink-0 text-red-400" />
            {store.address1} · {store.address2}
          </p>
        </div>
      </header>

      {/* Busca e categorias */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="max-w-3xl mx-auto px-4 py-3 space-y-3">
          <label className="relative block">
            <span className="sr-only">Buscar produto</span>
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar produto"
              className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {busca && (
              <button
                type="button"
                onClick={() => setBusca('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                aria-label="Limpar busca"
              >
                <X size={18} />
              </button>
            )}
          </label>

          <div className="-mx-4 px-4 flex gap-2 overflow-x-auto pb-1">
            {[{ id: 'todos' as const, nome: 'Todos' }, ...categoriasDaLoja].map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategoria(c.id)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  categoria === c.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent'
                }`}
              >
                {c.nome}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de preços */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {secoes.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">Nenhum produto encontrado.</p>
        ) : (
          <div className="space-y-8">
            {secoes.map(secao => (
              <section key={secao.id}>
                <h2 className="mb-2 text-lg font-serif font-semibold text-primary">{secao.nome}</h2>
                <ul className="divide-y rounded-xl border bg-white">
                  {secao.itens.map(item => (
                    <li key={item.id} className="flex items-baseline justify-between gap-4 px-4 py-3">
                      <span className="font-medium">{item.nome}</span>
                      <span className="shrink-0 whitespace-nowrap [font-variant-numeric:lining-nums_tabular-nums]">
                        <span className="font-semibold">{formatPrice(item.preco)}</span>
                        <span className="text-sm text-muted-foreground"> /{item.unidade}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Preços da unidade {store.displayName}, sujeitos a alteração sem aviso.
          {atualizadoEm && <> Atualizado em {atualizadoEm}.</>}
        </p>
      </main>

      {/* Informações da unidade */}
      <footer className="bg-neutral-950 text-neutral-300">
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-4 text-sm">
          <p className="flex items-center gap-2">
            <Clock size={16} className="shrink-0 text-red-400" />
            Seg a sáb {store.hours.weekdays} · Dom {store.hours.sunday}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={store.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
            >
              <MessageCircle size={16} />
              WhatsApp {store.phone}
            </a>
            <a
              href={store.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-medium text-white hover:bg-white/10"
            >
              <Navigation size={16} />
              Como chegar
            </a>
          </div>
          <p className="pt-2 text-xs text-neutral-500">© {new Date().getFullYear()} Casa de Carnes Marumbi</p>
        </div>
      </footer>
    </div>
  );
};

export default Catalogo;
