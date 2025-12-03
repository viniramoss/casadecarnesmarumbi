import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StoreTags from '../components/StoreTags';
import { ChevronDown, Search, Filter, X } from 'lucide-react';
import { allProducts } from '../data/productsData';


// Categorias
const categories = [
  { id: 'all', name: 'Todos os Cortes' },
  { id: 'bovinos', name: 'Bovinos' },
  { id: 'suinos', name: 'Suínos' },
  { id: 'aves', name: 'Aves' },
  { id: 'embutidos', name: 'Embutidos' },
  { id: 'miúdos', name: 'Miúdos' },
  { id: 'moídas', name: 'Moídas' }
];


const Products = () => {
  const [products, setProducts] = useState(allProducts);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [activeCategory, searchQuery]);

  const filterProducts = () => {
    let filtered = [...allProducts];
    
    // Aplica filtro de categoria primeiro
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    // Depois aplica a busca (se houver)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Remove duplicatas por ID (caso existam)
    const uniqueProducts = filtered.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );
    
    // Ordena para que os produtos com tag fiquem primeiro
    uniqueProducts.sort((a, b) => {
      if (a.tag && !b.tag) return -1;
      if (!a.tag && b.tag) return 1;
      return 0;
    });

    setProducts(uniqueProducts);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Se mudar de categoria, mantém a busca mas filtra dentro da nova categoria
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative pt-20 pb-10 bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        ></div>
        <div className="relative butcher-container pt-10 pb-6">
          <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-butcher-200 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-butcher-400">/</span>
                  <span className="text-white">Produtos</span>
                </div>
              </li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-3">
            Nossos Produtos
          </h1>
          <p className="text-butcher-200 max-w-2xl">
            Conheça nossa seleção de carnes. Cuidadosamente selecionadas para garantir qualidade e sabor em suas refeições.
          </p>
          <p className="text-butcher-200 max-w-2xl mt-2">
            Temos 2 unidades, os preços podem variar de acordo com cada loja, entre em contato por whatsapp para ter um atendimento mais direto. (Numero disponivel na pagina inicial.)
          </p>
        </div>
      </div>
      <div className="py-6 bg-textColor-fundoDaMagia border-b border-black/40">
        <div className="butcher-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <button 
              className="md:hidden flex items-center space-x-2 px-4 py-2 bg-butcher-50 rounded-md"
              onClick={toggleFilters}
            >
              <Filter size={18} />
              <span>Filtros</span>
              <ChevronDown 
                size={16} 
                className={`transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            <div className="hidden md:flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeCategory === category.id
                      ? 'bg-gold-500 text-black'
                      : ' bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-all'
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="w-full md:w-auto flex items-center gap-2">
              <div className="relative flex-1 md:w-64">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-butcher-400" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-10 py-2 border-black bg-white/10 rounded-md text-white placeholder:text-white/50 focus:ring-beef-200 focus:ring-opacity-50 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-butcher-400 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              {(activeCategory !== 'all' || searchQuery.trim() !== '') && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors flex items-center gap-1"
                  title="Limpar filtros"
                >
                  <X size={16} />
                  <span className="hidden md:inline">Limpar</span>
                </button>
              )}
            </div>
          </div>
          {isFiltersOpen && (
            <div className="md:hidden mt-4 grid grid-cols-2 gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeCategory === category.id
                      ? 'bg-gold-500 text-black'
                      : 'bg-butcher-50 text-butcher-700 hover:bg-butcher-100'
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <section className="py-12 bg-textColor-fundoDaMagia">
        <div className="butcher-container">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <div
                  key={product.id}
                  className={`premium-card product-transition h-full flex flex-col ${
                    product.id === 51 || product.id === 52 ? 'special-glow' : ''
                  }`}
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {product.tag && (
                        <span className="premium-badge">
                          {product.tag}
                        </span>
                      )}
                      <StoreTags product={product} />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-serif font-bold text-butcher-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-butcher-600 mb-4 text-sm flex-grow">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold text-gold-600">
                          R$ {product.price.default.toFixed(2).replace('.', ',')}
                        </span>
                        {/* Mostra variação de preços se houver */}
                        {(product.price.marumbi1 !== product.price.default || 
                          product.price.marumbi2 !== product.price.default || 
                          product.price.marumbi3 !== product.price.default) && (
                          <span className="text-xs text-gray-500">
                            *Preços podem variar por loja
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-butcher-700 mb-2">Nenhum produto encontrado</h3>
              <p className="text-butcher-500">
                Tente ajustar seus filtros ou busque por outro termo.
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Products;
