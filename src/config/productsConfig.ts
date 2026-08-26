// Configuração centralizada dos produtos Marumbi

// Tipos para melhor organização
export type StoreTag = 'marumbi1' | 'marumbi3';
export type ProductCategory = 'bovinos' | 'suinos' | 'aves' | 'embutidos' | 'miúdos' | 'moídas';

export interface ProductPrice {
  marumbi1?: number; // Uberaba
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

// Lojas onde o produto é vendido (todas, se não houver restrição)
export const getAvailableStores = (product: Product): StoreTag[] => {
  const ordem = allStoreTags;
  if (!product.availableAt) return ordem;
  return ordem.filter(store => product.availableAt!.includes(store));
};

// Verifica se o preço muda entre as lojas onde o produto é vendido.
// Ignora lojas sem preço próprio: ausente não significa preço diferente.
export const hasStorePriceVariation = (product: Product): boolean => {
  return getAvailableStores(product).some(store => {
    const storePrice = product.price[store];
    return storePrice !== undefined && storePrice !== product.price.default;
  });
};

// Tags das lojas para fácil manutenção
export const storeTags = {
  marumbi1: {
    name: 'Marumbi 1',
    location: 'Uberaba',
    color: 'bg-blue-500'
  },
  marumbi3: {
    name: 'Marumbi 3',
    location: 'Capão da Imbuia', 
    color: 'bg-purple-500'
  }
} as const;

// Ordem canonica das lojas, derivada de storeTags para nao repetir a lista
export const allStoreTags = Object.keys(storeTags) as StoreTag[];

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
    price: allStoreTags.reduce((acc, store) => {
      const preco = product.price[store];
      if (preco !== undefined) acc[store] = Math.round(preco * (1 + percentage / 100) * 100) / 100;
      return acc;
    }, {
      default: Math.round(product.price.default * (1 + percentage / 100) * 100) / 100,
    } as ProductPrice)
  }));
};
