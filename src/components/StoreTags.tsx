import React from 'react';
import { Product, StoreTag, getPriceForStore, getAvailableStores, hasStorePriceVariation } from '../config/productsConfig';
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

  // Lojas onde o produto é vendido, já na ordem 1, 2, 3
  const sortedAvailableStores = getAvailableStores(product);

  // O preço muda de uma loja para outra?
  const hasPriceVariation = hasStorePriceVariation(product);

  // Verifica se tem disponibilidade limitada (não está em todas as 3 lojas)
  const hasLimitedAvailability = sortedAvailableStores.length < 3;

  // Se o preço é o mesmo em todas E não tem disponibilidade limitada, não mostra tags
  if (!hasPriceVariation && !hasLimitedAvailability) {
    return null;
  }

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

  // Havendo variação, mostra o preço de TODAS as lojas: se listasse só as
  // diferentes do padrão, a loja do preço em destaque sumiria da etiqueta.
  return (
    <div className="flex flex-col gap-1">
      {hasPriceVariation
        ? sortedAvailableStores.map(store => renderPriceTag(store))
        : renderAvailabilityTag()}
    </div>
  );
};

export default StoreTags;
