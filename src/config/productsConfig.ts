// Configuração centralizada dos produtos Marumbi

// Tipos para melhor organização
export type StoreTag = 'marumbi1' | 'marumbi2' | 'marumbi3';
export type ProductCategory = 'bovinos' | 'suinos' | 'aves' | 'embutidos' | 'miúdos' | 'moídas';

export interface ProductPrice {
  marumbi1?: number; // Uberaba
  marumbi2?: number; // Cajuru  
  marumbi3?: number; // Capão da Imbuia
  default: number;   // Preço padrão se não especificado
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: ProductPrice;
  image: string;
  category: ProductCategory;
  tag?: string;
  availableAt?: StoreTag[]; // Em quais lojas está disponível
  showLocationTags?: boolean; // Se deve mostrar tags de localização com preços
}

// Função para obter preço por loja
export const getPriceForStore = (product: Product, storeTag: StoreTag): number => {
  return product.price[storeTag] || product.price.default;
};

// Função para formatar preço
export const formatPrice = (price: number): string => {
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
};

// Função para verificar se produto está disponível na loja
export const isAvailableAtStore = (product: Product, storeTag: StoreTag): boolean => {
  if (!product.availableAt) return true; // Se não especificado, disponível em todas
  return product.availableAt.includes(storeTag);
};

// Tags das lojas para fácil manutenção
export const storeTags = {
  marumbi1: {
    name: 'Marumbi 1',
    location: 'Uberaba',
    color: 'bg-blue-500'
  },
  marumbi2: {
    name: 'Marumbi 2', 
    location: 'Cajuru',
    color: 'bg-green-500'
  },
  marumbi3: {
    name: 'Marumbi 3',
    location: 'Capão da Imbuia', 
    color: 'bg-purple-500'
  }
} as const;

// Função para criar preço simples (apenas preço padrão)
export const createSimplePrice = (price: number): ProductPrice => {
  return {
    default: price,
  };
};

// Função para atualizar preços em massa (para manutenção)
export const updateAllPrices = (products: Product[], percentage: number): Product[] => {
  return products.map(product => ({
    ...product,
    price: {
      default: Math.round(product.price.default * (1 + percentage / 100) * 100) / 100,
      marumbi1: product.price.marumbi1 ? Math.round(product.price.marumbi1 * (1 + percentage / 100) * 100) / 100 : undefined,
      marumbi2: product.price.marumbi2 ? Math.round(product.price.marumbi2 * (1 + percentage / 100) * 100) / 100 : undefined,
      marumbi3: product.price.marumbi3 ? Math.round(product.price.marumbi3 * (1 + percentage / 100) * 100) / 100 : undefined,
    }
  }));
};
