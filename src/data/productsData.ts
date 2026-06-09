// Dados dos produtos com novo sistema de preços e tags
import { Product, createSimplePrice } from '../config/productsConfig';

// Importação das imagens (mantendo as existentes)
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
import hamburguer from '../images/aborgue.png';
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

// Lista completa de produtos organizados por categoria
export const allProducts: Product[] = [
  // ==================== BOVINOS ====================
    {
    id: 6,
    name: "Contra Filé com Osso",
    description: "Corte bovino com osso, sabor intenso, ideal para grelha.",
    price: {
      default: 34.99,
      marumbi1: 34.99,
      marumbi2: 29.99,
      marumbi3: 36.99,
    },
    image: contraComOsso,
    category: "bovinos",
    showLocationTags: true,
  },
    {
    id: 7,
    name: "Costela Ponta",
    description: "Costela macia e suculenta, ideal para longos assados.",
    price: {
      default: 22.99,
      marumbi1: 22.99,
      marumbi2: 24.99,
      marumbi3: 29.99,
    },
    image: costelaPonta,
    category: "bovinos",
    showLocationTags: true,
  },
    {
    id: 8,
    name: "Costela Ripa",
    description: "Costela com ossos largos, excelente para churrascos.",
    price: {
      default: 22.99,
      marumbi1: 22.99,
      marumbi2: 25.99,
      marumbi3: 29.99,
    },
    image: costelaRipa,
    category: "bovinos",
    showLocationTags: true,
  },
    {
    id: 11,
    name: "Coxão Mole",
    description: "Corte nobre bovino, ideal para assados, bifes ou refogados.",
    price: {
      default: 44.99,
      marumbi1: 44.99,
      marumbi2: 44.99,
      marumbi3: 49.99,
    },
    image: coxaomole,
    category: "bovinos",
    showLocationTags: true,
  },
    {
    id: 14,
    name: "Filé com Mignon",
    description: "Combinação de cortes nobres, muito macio e suculento.",
    price: {
      default: 38.99,
      marumbi1: 38.99,
    },
    image: fileComMignon,
    category: "bovinos",
    availableAt: ['marumbi1'],
    showLocationTags: true,
  },
    {
    id: 16,
    name: "Fraldinha",
    description: "Corte suculento e versátil, muito usado em churrascos.",
    price: {
      default: 37.99,
      marumbi1: 37.99,
      marumbi2: 37.99,
      marumbi3: 49.99,
    },
    image: fraldinha,
    category: "bovinos",
    showLocationTags: true,
  },
    {
    id: 23,
    name: "Mignon",
    description: "Corte nobre bovino extremamente macio, ideal para medalhões.",
    price: {
      default: 59.99,
      marumbi1: 59.99,
      marumbi2: 59.99,
      marumbi3: 79.99,
    },
    image: mignon,
    category: "bovinos",
    showLocationTags: true,
  },
    {
    id: 24,
    name: "Miolo da Alcatra",
    description: "Parte mais macia da alcatra, ótima para bifes suculentos.",
    price: {
      default: 69.99,
      marumbi1: 69.99,
    },
    image: mioloDaAlcatra,
    category: "bovinos",
    availableAt: ['marumbi1'],
    showLocationTags: true,
  },
    {
    id: 28,
    name: "Músculo com Osso",
    description: "Ideal para sopas e caldos nutritivos, cheio de colágeno.",
    price: {
      default: 27.99,
      marumbi1: 27.99,
      marumbi2: 24.99,
      marumbi3: 29.99,
    },
    image: musculo,
    category: "bovinos",
    showLocationTags: true,
  },
    {
    id: 29,
    name: "Músculo sem Osso",
    description: "Corte firme e saboroso, ótimo para cozidos e ensopados.",
    price: createSimplePrice(39.99),
    image: musculoSemOsso,
    category: "bovinos",
  },
    {
    id: 33,
    name: "Patinho sem Osso",
    description: "Corte magro e versátil, ótimo para bifes e moídos.",
    price: {
      default: 44.99,
      marumbi1: 44.99,
    },
    image: patinho,
    category: "bovinos",
    availableAt: ['marumbi1'],
    showLocationTags: true,
  },
    {
    id: 39,
    name: "Picanha",
    description: "Corte nobre e muito saboroso, estrela do churrasco.",
    price: {
      default: 59.99,
      marumbi1: 59.99,
      marumbi2: 59.99,
    },
    image: picanha,
    category: "bovinos",
    availableAt: ['marumbi1', 'marumbi2'],
    showLocationTags: true,
  },
    {
    id: 40,
    name: "Ponta de Peito",
    description: "Corte bovino usado em churrascos ou defumados.",
    price: {
      default: 19.99,
      marumbi1: 19.99,
      marumbi2: 21.99,
      marumbi3: 26.99,
    },
    image: pontaPeito,
    category: "bovinos",
    showLocationTags: true,
  },
    {
    id: 41,
    name: "Posta Branca",
    description: "Corte de carne ótimo para assados e bifes.",
    price: {
      default: 36.99,
      marumbi1: 36.99,
      marumbi2: 37.99,
      marumbi3: 37.99,
    },
    image: postaBranca,
    category: "bovinos",
    showLocationTags: true,
  },
    {
    id: 42,
    name: "Posta Vermelha",
    description: "Ótimo para bifes, super saboroso.",
    price: {
      default: 38.99,
      marumbi1: 38.99,
      marumbi2: 38.99,
      marumbi3: 42.99,
    },
    image: postaVermelha,
    category: "bovinos",
    showLocationTags: true,
  },
    {
    id: 44,
    name: "Setinho",
    description: "Corte bovino, ótimo para fritar e assar.",
    price: {
      default: 29.99,
      marumbi1: 29.99,
      marumbi2: 29.99,
      marumbi3: 32.99,
    },
    image: setinho,
    category: "bovinos",
    showLocationTags: true,
  },
    {
    id: 45,
    name: "Strogonoff de Carne",
    description: "Carne cortada em tiras finas, pronta para strogonoff.",
    price: {
      default: 42.99,
      marumbi1: 42.99,
      marumbi2: 39.99,
      marumbi3: 49.99,
    },
    image: strogonoff,
    category: "bovinos",
    showLocationTags: true,
  },
    {
    id: 50,
    name: "Kit 6 Hamburgueres - LJ1 e LJ2",
    description: "Delicioso kit com 6 hamburgueres artesanais.",
    price: {
      default: 10.00,
      marumbi1: 10.00,
      marumbi2: 10.00,
    },
    image: hamburguer,
    category: "bovinos",
    availableAt: ['marumbi1', 'marumbi2'],
    showLocationTags: true,
  },

  // ==================== SUÍNOS ====================
    {
    id: 1,
    name: "Bacon",
    description: "Tiras suculentas de bacon defumado, perfeito para receitas e petiscos.",
    price: {
      default: 43.99,
      marumbi1: 43.99,
      marumbi2: 44.99,
      marumbi3: 44.99,
    },
    image: bacon,
    category: "suinos",
    showLocationTags: true,
  },
    {
    id: 2,
    name: "Bisteca Suína",
    description: "Corte com osso e gordura equilibrada, ideal para fritar.",
    price: {
      default: 18.99,
      marumbi1: 18.99,
      marumbi2: 16.99,
      marumbi3: 16.99,
    },
    image: bisteca,
    category: "suinos",
    tag: "Promoção",
    showLocationTags: true,
  },
    {
    id: 22,
    name: "Lombo Agulha",
    description: "Corte suculento do lombo suíno com osso.",
    price: {
      default: 24.99,
      marumbi1: 24.99,
      marumbi2: 22.99,
      marumbi3: 25.99,
    },
    image: lomboAgulhajpg,
    category: "suinos",
    tag: "Promoção",
    showLocationTags: true,
  },
    {
    id: 30,
    name: "Paleta Suína",
    description: "Corte dianteiro do porco, ótimo para assados e desfiados.",
    price: {
      default: 11.99,
      marumbi1: 11.99,
      marumbi2: 11.99,
      marumbi3: 12.99,
    },
    image: paletaSuina,
    category: "suinos",
    showLocationTags: true,
  },
    {
    id: 31,
    name: "Panceta Suína",
    description: "Barriga do porco, muito saborosa e ótima para torresmo.",
    price: {
      default: 18.99,
      marumbi1: 18.99,
      marumbi2: 29.90,
      marumbi3: 25.99,
    },
    image: panceta,
    category: "suinos",
    showLocationTags: true,
  },
    {
    id: 35,
    name: "Pé de Porco",
    description: "Corte tradicional para feijoadas e caldos robustos.",
    price: {
      default: 17.99,
      marumbi1: 17.99,
      marumbi2: 18.99,
      marumbi3: 18.99,
    },
    image: pePorco,
    category: "suinos",
    showLocationTags: true,
  },
    {
    id: 37,
    name: "Pernil Suíno",
    description: "Corte traseiro do porco, muito usado em assados.",
    price: {
      default: 11.99,
      marumbi1: 11.99,
      marumbi2: 11.99,
      marumbi3: 13.99,
    },
    image: pernilSuino,
    category: "suinos",
    showLocationTags: true,
  },
    {
    id: 38,
    name: "Picadão Suíno",
    description: "Carne suína picada com osso, ideal para refogados rápidos.",
    price: {
      default: 15.99,
      marumbi1: 15.99,
      marumbi2: 11.99,
      marumbi3: 15.99,
    },
    image: picadoPorco,
    category: "suinos",
    showLocationTags: true,
  },
    {
    id: 46,
    name: "Suan Suíno",
    description: "Espinhaço do porco, perfeito para arroz com suã.",
    price: createSimplePrice(7.99),
    image: suan,
    category: "suinos",
  },

  // ==================== AVES ====================
    {
    id: 9,
    name: "Coxa com Sobrecoxa",
    description: "Corte de frango suculento, ótimo para assar ou fritar.",
    price: createSimplePrice(10.99),
    image: coxaSobre,
    category: "aves",
  },
    {
    id: 10,
    name: "Coxa Espalmada",
    description: "Corte plano da coxa, cozinha rápido e é bem temperável.",
    price: {
      default: 12.99,
      marumbi1: 12.99,
      marumbi2: 12.99,
      marumbi3: 14.99,
    },
    image: coxaEspalmada,
    category: "aves",
    showLocationTags: true,
  },
    {
    id: 12,
    name: "Coxinha da Asa",
    description: "Parte suculenta da asa, perfeita para frituras e churrasco.",
    price: {
      default: 15.99,
      marumbi1: 15.99,
      marumbi2: 13.99,
      marumbi3: 16.99,
    },
    image: coxinhaAsa,
    category: "aves",
    showLocationTags: true,
  },
    {
    id: 15,
    name: "Filé de Frango",
    description: "Corte magro e versátil, ótimo para grelhar ou empanar.",
    price: createSimplePrice(29.99),
    image: fileteFrago,
    category: "aves",
  },
    {
    id: 18,
    name: "Frango Inteiro",
    description: "Ideal para assados de domingo ou receitas especiais.",
    price: {
      default: 13.99,
      marumbi1: 13.99,
      marumbi2: 15.99,
      marumbi3: 15.99,
    },
    image: frangoInteiro,
    category: "aves",
    showLocationTags: true,
  },
    {
    id: 34,
    name: "Pé de Frango",
    description: "Muito usado em caldos e sopas, colágeno natural.",
    price: {
      default: 11.99,
      marumbi1: 11.99,
      marumbi2: 14.99,
      marumbi3: 14.99,
    },
    image: peDeFrango,
    category: "aves",
    tag: "Promoção",
    showLocationTags: true,
  },
    {
    id: 36,
    name: "Peito sem Osso",
    description: "Peito de frango desossado, ideal para grelhar ou empanar.",
    price: {
      default: 25.99,
      marumbi1: 25.99,
      marumbi2: 22.99,
      marumbi3: 25.99,
    },
    image: fileFrango,
    category: "aves",
    showLocationTags: true,
  },
    {
    id: 47,
    name: "Tulipa",
    description: "Parte média da asa, muito usada em aperitivos.",
    price: createSimplePrice(29.99),
    image: tulipa,
    category: "aves",
  },

  // ==================== EMBUTIDOS ====================
    {
    id: 4,
    name: "Calabresa Frimesa",
    description: "Linguiça calabresa defumada Frimesa, sabor marcante e versátil.",
    price: {
      default: 36.99,
      marumbi1: 36.99,
      marumbi2: 36.90,
      marumbi3: 36.99,
    },
    image: calabresa,
    category: "embutidos",
    showLocationTags: true,
  },
    {
    id: 19,
    name: "Linguiça Fininha",
    description: "Linguiça fina para grelha ou pratos do dia a dia.",
    price: {
      default: 34.99,
      marumbi1: 34.99,
      marumbi2: 34.99,
      marumbi3: 36.99,
    },
    image: linguiçaFina,
    category: "embutidos",
    showLocationTags: true,
  },
    {
    id: 20,
    name: "Linguiça Friela",
    description: "Sabor tradicional da Friela, ideal para o churrasco.",
    price: {
      default: 28.99,
      marumbi1: 28.99,
      marumbi2: 28.99,
      marumbi3: 29.99,
    },
    image: linguiçaFriela,
    category: "embutidos",
    showLocationTags: true,
  },
    {
    id: 21,
    name: "Linguiça Frimesa Toscana",
    description: "Linguiça toscana da Frimesa, temperada e pronta pra grelha.",
    price: {
      default: 29.90,
      marumbi1: 29.90,
      marumbi2: 29.99,
      marumbi3: 29.99,
    },
    image: linguiçaFrimesa,
    category: "embutidos",
    showLocationTags: true,
  },
    {
    id: 49,
    name: "Vina Perdigão",
    description: "Salsicha Perdigão, sabor tradicional para o dia a dia.",
    price: createSimplePrice(13.99),
    image: vina,
    category: "embutidos",
  },

  // ==================== MIÚDOS ====================
    {
    id: 3,
    name: "Bucho",
    description: "Miúdo bovino tradicional, ideal para dobradinha e ensopados.",
    price: createSimplePrice(23.99),
    image: bucho,
    category: "miúdos",
  },
    {
    id: 13,
    name: "Fígado de Boi",
    description: "Fonte rica em ferro, ideal para grelhar ou refogar.",
    price: {
      default: 19.99,
      marumbi1: 19.99,
    },
    image: figado,
    category: "miúdos",
    availableAt: ['marumbi1'],
    showLocationTags: true,
  },
    {
    id: 25,
    name: "Mocotó",
    description: "Pé do boi, muito usado em caldos e receitas nordestinas.",
    price: {
      default: 15.99,
      marumbi1: 15.99,
      marumbi2: 15.99,
      marumbi3: 18.99,
    },
    image: mocoto,
    category: "miúdos",
    showLocationTags: true,
  },

  // ==================== MOÍDAS ====================
    {
    id: 26,
    name: "Moída de Primeira",
    description: "Carne moída nobre, ideal para pratos refinados e hambúrgueres.",
    price: {
      default: 29.99,
      marumbi1: 29.99,
    },
    image: moidaPrimeira,
    category: "moídas",
    availableAt: ['marumbi1'],
    showLocationTags: true,
  },
    {
    id: 27,
    name: "Moída de Segunda",
    description: "Carne moída econômica, excelente para molhos e recheios.",
    price: {
      default: 12.99,
      marumbi1: 12.99,
    },
    image: moidaSegunda,
    category: "moídas",
    availableAt: ['marumbi1'],
    showLocationTags: true,
  },
    {
    id: 51,
    name: "Moída ESPECIAL - Loja 3",
    description: "Carne moída sequinha, feita com coxao mole e patinho.",
    price: {
      default: 29.99,
      marumbi2: 29.99,
      marumbi3: 34.99,
    },
    image: moidaPrimeira,
    category: "moídas",
    availableAt: ['marumbi2', 'marumbi3'],
    showLocationTags: true,
  },
    {
    id: 52,
    name: "Moída BLEND - Loja 3",
    description: "Carne com sabor intenso, feita com costela e acem",
    price: {
      default: 16.99,
      marumbi1: 16.99,
      marumbi2: 16.99,
      marumbi3: 24.99,
    },
    image: moidaSegunda,
    category: "moídas",
    showLocationTags: true,
  }
];

// Função para buscar produtos
export const getProductsByCategory = (category: string) => {
  if (category === 'all') return allProducts;
  return allProducts.filter(product => product.category === category);
};

// Função para buscar produtos por loja
export const getProductsByStore = (storeTag: 'marumbi1' | 'marumbi2' | 'marumbi3') => {
  return allProducts.filter(product => 
    !product.availableAt || product.availableAt.includes(storeTag)
  );
};
