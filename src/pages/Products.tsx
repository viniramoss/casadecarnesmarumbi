import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronDown, Search, Filter } from 'lucide-react';

import bacon from '../images/carnes/bacon.jpg';
import bisteca from '../images/carnes/bisteca.jpg';
import bucho from '../images/carnes/bucho.jpg';
import calabresa from '../images/carnes/calabresa.png';
import contraComOsso from '../images/carnes/contraComOsso.jpg';
import costelaPonta from '../images/carnes/costelaPonta.png';
import costelaRipa from '../images/carnes/costelaRipa.png';
import coxaSobre from '../images/cuxa.png';
import coxaEspalmada from '../images/carnes/coxaEspalmada.jpg';
import coxaomole from '../images/carnes/coxaomole.jpg';
import coxinhaAsa from '../images/carnes/coxinhaAsa.jpg';
import figado from '../images/carnes/figado.jpg';
import fileComMignon from '../images/carnes/fileComMignon.jpg';
import fileFrango from '../images/carnes/fileFrango.jpg';
import fraldinha from '../images/carnes/fraldinha.jpg';
import frangoInteiro from '../images/carnes/frangoInteiro.jpg';
import hamburguer from '../images/aborgue.png'
import linguiçaFina from '../images/carnes/linguiçaFina.jpg';
import linguiçaFriela from '../images/carnes/linguiçaFriela.jpg';
import linguiçaFrimesa from '../images/carnes/linguiçaFrimesa.jpg';
import lomboAgulhajpg from '../images/carnes/lomboAgulhajpg.jpg';
import mignon from '../images/carnes/mignon.jpg';
import mioloDaAlcatra from '../images/carnes/mioloDaAlcatra.jpg';
import mocoto from '../images/carnes/mocoto.jpg';
import moidaPrimeira from '../images/carnes/moidaPrimeira.jpg';
import moidaSegunda from '../images/carnes/moidaSegunda.jpg';
import musculo from '../images/musclo.png';
import musculoSemOsso from '../images/carnes/musculoSemOsso.jpg';
import paletaSuina from '../images/carnes/paletaSuina.jpg';
import panceta from '../images/carnes/panceta.jpg';
import fileteFrago from '../images/carnes/filete.jpg';
import patinho from '../images/carnes/patinho.jpg';
import peDeFrango from '../images/carnes/peDeFrango.jpg';
import pePorco from '../images/carnes/pePorco.jpg';
import pernilSuino from '../images/carnes/pernilSuino.jpg';
import picadoPorco from '../images/carnes/picadoPorco.jpg';
import picanha from '../images/carnes/picanha.jpg';
import pontaPeito from '../images/carnes/pontaPeito.jpg';
import postaBranca from '../images/carnes/postaBranca.jpg';
import rabada from '../images/carnes/rabada.jpg';
import postaVermelha from '../images/carnes/postaVermelha.jpg';
import setinho from '../images/carnes/setinho.jpg';
import strogonoff from '../images/carnes/strogonoffCarne.jpg';
import suan from '../images/carnes/suan.png';
import tulipa from '../images/carnes/tulipa.jpg';
import vina from '../images/carnes/vina.jpg';

// Categorias
const categories = [
  { id: 'all', name: 'Todos os Cortes' },
  { id: 'bovinos', name: 'Bovinos' },
  { id: 'suinos', name: 'suinos' },
  { id: 'aves', name: 'Aves' }
];

// Lista de produtos
const allProducts = [
  {
    "id": 1,
    "name": "Bacon",
    "description": "Tiras suculentas de bacon defumado, perfeito para receitas e petiscos.",
    "price": 43.99,
    "image": bacon,
    "category": "suinos"
  },
  {
    "id": 2,
    "name": "Bisteca Suína",
    "description": "Corte com osso e gordura equilibrada, ideal para fritar.",
    "price": 20.99,
    "image": bisteca,
    "category": "suinos"
  },
  {
    "id": 3,
    "name": "Bucho",
    "description": "Miúdo bovino tradicional, ideal para dobradinha e ensopados.",
    "price": 11.99,
    "image": bucho,
    "category": "miúdos"
  },
  {
    "id": 4,
    "name": "Calabresa Frimesa",
    "description": "Linguiça calabresa defumada Frimesa, sabor marcante e versátil.",
    "price": 31.90,
    "image": calabresa,
    "category": "embutidos"
  },
  {
    "id": 6,
    "name": "Contra Filé com Osso",
    "description": "Corte bovino com osso, sabor intenso, ideal para grelha.",
    "price": 39.90,
    "tag": "Churrasco",
    "image": contraComOsso,
    "category": "bovinos"
  },
  {
    "id": 7,
    "name": "Costela Ponta",
    "description": "Costela macia e suculenta, ideal para longos assados.",
    "price": 29.99,
    "image": costelaPonta,
    "category": "bovinos"
  },
  {
    "id": 8,
    "name": "Costela Ripa",
    "description": "Costela com ossos largos, excelente para churrascos.",
    "price": 29.99,
    "image": costelaRipa,
    "category": "bovinos"
  },
  {
    "id": 9,
    "name": "Coxa com Sobrecoxa",
    "description": "Corte de frango suculento, ótimo para assar ou fritar.",
    "price": 12.99,
    "image": coxaSobre,
    "category": "aves"
  },
  {
    "id": 10,
    "name": "Coxa Espalmada",
    "description": "Corte plano da coxa, cozinha rápido e é bem temperável.",
    "price": 14.99,
    "image": coxaEspalmada,
    "category": "aves"
  },
  {
    "id": 11,
    "name": "Coxão Mole",
    "description": "Corte nobre bovino, ideal para assados, bifes ou refogados.",
    "price": 47.99,
    "image": coxaomole,
    "category": "bovinos"
  },
  {
    "id": 12,
    "name": "Coxinha da Asa",
    "description": "Parte suculenta da asa, perfeita para frituras e churrasco.",
    "price": 18.99,
    "image": coxinhaAsa,
    "category": "aves"
  },
  {
    "id": 13,
    "name": "Fígado de Boi",
    "description": "Fonte rica em ferro, ideal para grelhar ou refogar.",
    "price": 11.99,
    "image": figado,
    "category": "miúdos"
  },
  {
    "id": 14,
    "name": "Filé com Mignon",
    "description": "Combinação de cortes nobres, muito macio e suculento.",
    "price": 49.90,
    "image": fileComMignon,
    "category": "bovinos"
  },
  {
    "id": 15,
    "name": "Filé de Frango",
    "description": "Corte magro e versátil, ótimo para grelhar ou empanar.",
    "price": 25.99,
    "image": fileteFrago,
    "category": "aves"
  },
  {
    "id": 16,
    "name": "Fraldinha",
    "description": "Corte suculento e versátil, muito usado em churrascos.",
    "price": 44.99,
    "image": fraldinha,
    "category": "bovinos"
  },
  {
    "id": 18,
    "name": "Frango Inteiro",
    "description": "Ideal para assados de domingo ou receitas especiais.",
    "price": 13.99,
    "image": frangoInteiro,
    "category": "aves"
  },
  {
    "id": 50,
    "name": "Kit 5 Hamburgueres",
    "description": "Delicioso kit com 5 hamburgueres artesanais",
    "price": 10,
    "tag": "Promoção",
    "image": hamburguer,
    "category": "bovinos"
  },
  {
    "id": 19,
    "name": "Linguiça Fininha",
    "description": "Linguiça fina para grelha ou pratos do dia a dia.",
    "price": 34.99,
    "image": linguiçaFina,
    "category": "embutidos"
  },
  {
    "id": 20,
    "name": "Linguiça Friela",
    "description": "Sabor tradicional da Friela, ideal para o churrasco.",
    "price": 25.99,
    "image": linguiçaFriela,
    "category": "embutidos"
  },
  {
    "id": 21,
    "name": "Linguiça Frimesa Toscana",
    "description": "Linguiça toscana da Frimesa, temperada e pronta pra grelha.",
    "price": 27.99,
    "image": linguiçaFrimesa,
    "category": "embutidos"
  },
  {
    "id": 22,
    "name": "Lombo Agulha",
    "description": "Corte suculento do lombo suíno com osso.",
    "price": 22.99,
    "image": lomboAgulhajpg,
    "category": "bovinos"
  },
  {
    "id": 23,
    "name": "Mignon",
    "description": "Corte nobre bovino extremamente macio, ideal para medalhões.",
    "price": 54.99,
    "image": mignon,
    "category": "bovinos"
  },
  {
    "id": 24,
    "name": "Miolo da Alcatra",
    "description": "Parte mais macia da alcatra, ótima para bifes suculentos.",
    "price": 69.90,
    "image": mioloDaAlcatra,
    "category": "bovinos"
  },
  {
    "id": 25,
    "name": "Mocotó",
    "description": "Pé do boi, muito usado em caldos e receitas nordestinas.",
    "price": 10.99,
    "image": mocoto,
    "category": "miúdos"
  },
  {
    "id": 26,
    "name": "Moída de Primeira",
    "description": "Carne moída nobre, ideal para pratos refinados e hambúrgueres.",
    "price": 22.99,
    "image": moidaPrimeira,
    "category": "moídas"
  },
  {
    "id": 27,
    "name": "Moída de Segunda",
    "description": "Carne moída econômica, excelente para molhos e recheios.",
    "price": 14.99,
    "image": moidaSegunda,
    "category": "moídas"
  },
  {
    "id": 28,
    "name": "Músculo com Osso",
    "description": "Ideal para sopas e caldos nutritivos, cheio de colágeno.",
    "price": 22.99,
    "image": musculo,
    "category": "bovinos"
  },
  {
    "id": 29,
    "name": "Músculo sem Osso",
    "description": "Corte firme e saboroso, ótimo para cozidos e ensopados.",
    "price": 39.99,
    "image": musculoSemOsso,
    "category": "bovinos"
  },
  {
    "id": 30,
    "name": "Paleta Suína",
    "description": "Corte dianteiro do porco, ótimo para assados e desfiados.",
    "price": 19.90,
    "image": paletaSuina,
    "category": "suinos"
  },
  {
    "id": 31,
    "name": "Panceta Suína",
    "description": "Barriga do porco, muito saborosa e ótima para torresmo.",
    "price": 27.99,
    "image": panceta,
    "category": "suinos"
  },
  {
    "id": 33,
    "name": "Patinho sem Osso",
    "description": "Corte magro e versátil, ótimo para bifes e moídos.",
    "price": 45.99,
    "image": patinho,
    "category": "bovinos"
  },
  {
    "id": 34,
    "name": "Pé de Frango",
    "description": "Muito usado em caldos e sopas, colágeno natural.",
    "price": 11.99,
    "image": peDeFrango,
    "category": "aves"
  },
  {
    "id": 35,
    "name": "Pé de Porco",
    "description": "Corte tradicional para feijoadas e caldos robustos.",
    "price": 18.99,
    "image": pePorco,
    "category": "suinos"
  },
  {
    "id": 36,
    "name": "Peito sem Osso",
    "description": "Peito de frango desossado, ideal para grelhar ou empanar.",
    "price": 23.99,
    "image": fileFrango,
    "category": "aves"
  },
  {
    "id": 37,
    "name": "Pernil Suíno",
    "description": "Corte traseiro do porco, muito usado em assados.",
    "price": 19.90,
    "image": pernilSuino,
    "category": "suinos"
  },
  {
    "id": 38,
    "name": "Picadão Suíno",
    "description": "Carne suína picada com osso, ideal para refogados rápidos.",
    "price": 19.99,
    "image": picadoPorco,
    "category": "suinos"
  },
  {
    "id": 39,
    "name": "Picanha",
    "description": "Corte nobre e muito saboroso, estrela do churrasco.",
    "price": 59.90,
    "image": picanha,
    "category": "bovinos"
  },
  {
    "id": 40,
    "name": "Ponta de Peito",
    "description": "Corte bovino usado em churrascos ou defumados.",
    "price": 24.99,
    "image": pontaPeito,
    "category": "bovinos"
  },
  {
    "id": 41,
    "name": "Posta Branca",
    "description": "Corte de carne otimo para assados e bifes.",
    "price": 41.99,
    "image": postaBranca,
    "category": "bovinos"
  },
  {
    "id": 42,
    "name": "Posta Vermelha",
    "description": "Otimo para bifes, super saboroso",
    "price": 42.99,
    "image": postaVermelha,
    "category": "bovinos"
  },
  {
    "id": 43,
    "name": "Rabada",
    "description": "Rabo bovino, corte tradicional para cozidos e caldos.",
    "price": 26.99,
    "image": rabada,
    "category": "miúdos"
  },
  {
    "id": 44,
    "name": "Setinho",
    "description": "Corte bovino, otimo para fritar e assar.",
    "price": 36.99,
    "image": setinho,
    "category": "bovinos"
  },
  {
    "id": 45,
    "name": "Strogonoff de Carne",
    "description": "Carne cortada em tiras finas, pronta para strogonoff.",
    "price": 44.99,
    "image": strogonoff,
    "category": "bovinos"
  },
  {
    "id": 46,
    "name": "Suan Suíno",
    "description": "Espinhaço do porco, perfeito para arroz com suã.",
    "price": 5.99,
    "image": suan,
    "category": "suinos"
  },
  {
    "id": 47,
    "name": "Tulipa",
    "description": "Parte média da asa, muito usada em aperitivos.",
    "price": 29.99,
    "image": tulipa,
    "category": "aves"
  },
  {
    "id": 49,
    "name": "Vina Perdigão",
    "description": "Salsicha Perdigão, sabor tradicional para o dia a dia.",
    "price": 13.99,
    "image": vina,
    "category": "embutidos"
  }
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
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Ordena para que os produtos com tag fiquem primeiro
    filtered.sort((a, b) => {
      if (a.tag && !b.tag) return -1;
      if (!a.tag && b.tag) return 1;
      return 0;
    });

    setProducts(filtered);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
                      ? 'bg-beef-600 text-black'
                      : ' bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-all'
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="w-full md:w-auto">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-butcher-400" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full md:w-64 pl-10 pr-4 py-2 border-black bg-white/10 rounded-md text-white focus:ring-beef-200 focus:ring-opacity-50 transition-colors"
                />
              </div>
            </div>
          </div>
          {isFiltersOpen && (
            <div className="md:hidden mt-4 grid grid-cols-2 gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeCategory === category.id
                      ? 'bg-beef-600 text-white'
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
                  className="premium-card product-transition h-full flex flex-col"
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    {product.tag && (
                      <span className="absolute top-4 right-4 premium-badge">
                        {product.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-serif font-bold text-butcher-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-butcher-600 mb-4 text-sm flex-grow">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-lg font-semibold text-beef-700">
                        R$ {product.price.toFixed(2)}
                      </span>
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
