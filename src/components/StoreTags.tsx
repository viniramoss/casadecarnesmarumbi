import React from 'react';
import { Product, StoreTag, getPriceForStore } from '../config/productsConfig';
import { storeTags } from '../config/productsConfig';

interface StoreTagsProps {
  product: Product;
  className?: string;
}

const StoreTags: React.FC<StoreTagsProps> = ({ product, className = "" }) => {
  // Se showLocationTags não está definido ou é false, não mostra nenhuma tag
  if (!product.showLocationTags) {
    return null;
  }

  // Se não tem availableAt definido, está disponível em todas as lojas
  const availableStores: StoreTag[] = product.availableAt || ['marumbi1', 'marumbi2', 'marumbi3'];
  
  // Encontra lojas com preços especiais (diferentes do default)
  const storesWithSpecialPrices = availableStores.filter(store => {
    const storePrice = getPriceForStore(product, store);
    return storePrice !== product.price.default;
  });

  // Verifica se tem disponibilidade limitada (não está em todas as 3 lojas)
  const hasLimitedAvailability = availableStores.length < 3;

  // Se não há preços especiais E não tem disponibilidade limitada, não mostra tags
  if (storesWithSpecialPrices.length === 0 && !hasLimitedAvailability) {
    return null;
  }

  // Ordena as lojas para sempre mostrar na ordem correta
  const sortedSpecialPrices = storesWithSpecialPrices.sort((a, b) => {
    const order = { marumbi1: 1, marumbi2: 2, marumbi3: 3 };
    return order[a] - order[b];
  });

  const sortedAvailableStores = availableStores.sort((a, b) => {
    const order = { marumbi1: 1, marumbi2: 2, marumbi3: 3 };
    return order[a] - order[b];
  });

  // Cor específica para cada loja
  const getStoreColor = (storeTag: StoreTag): string => {
    switch(storeTag) {
      case 'marumbi1': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'marumbi2': return 'bg-green-100 text-green-800 border-green-300';
      case 'marumbi3': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Gera uma tag individual para cada loja com preço especial
  const renderPriceTag = (store: StoreTag) => {
    const storeNumber = store === 'marumbi1' ? '1' : store === 'marumbi2' ? '2' : '3';
    const price = getPriceForStore(product, store);
    const storeName = storeTags[store].name;

    return (
      <span 
        key={`price-${store}`}
        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getStoreColor(store)} ${className} cursor-help`}
        title={`${storeName}: R$ ${price.toFixed(2).replace('.', ',')}`}
      >
        💰 Marumbi {storeNumber} - R$ {price.toFixed(2).replace('.', ',')}
      </span>
    );
  };

  // Gera uma tag de disponibilidade (quando não está em todas as lojas)
  const renderAvailabilityTag = () => {
    if (!hasLimitedAvailability) return null;

    const storeNumbers = sortedAvailableStores.map(store => {
      switch(store) {
        case 'marumbi1': return '1';
        case 'marumbi2': return '2';
        case 'marumbi3': return '3';
        default: return '';
      }
    });

    const storeNames = sortedAvailableStores.map(store => storeTags[store].name);

    return (
      <span 
        key="availability"
        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border bg-gold-100 text-gold-800 border-gold-300 ${className} cursor-help`}
        title={`Disponível nas lojas: ${storeNames.join(', ')}`}
      >
        📍 Marumbi {storeNumbers.join(', ')}
      </span>
    );
  };

  // Retorna todas as tags individuais em um container flex
  return (
    <div className="flex flex-col gap-1">
      {/* Tags de preços especiais */}
      {sortedSpecialPrices.map(store => renderPriceTag(store))}
      
      {/* Tag de disponibilidade (só se não há preços especiais) */}
      {storesWithSpecialPrices.length === 0 && renderAvailabilityTag()}
    </div>
  );
};

export default StoreTags;
