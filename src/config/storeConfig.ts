// Configuração centralizada das lojas Marumbi
export interface StoreLocation {
  id: string;
  title: string;
  displayName: string;
  address1: string;
  address2: string;
  cep: string;
  phone: string;
  whatsappNumber: string;
  whatsappLink: string;
  embedUrl: string;
  directionsUrl: string;
  hours: {
    weekdays: string;
    sunday: string;
  };
  order: number;
}

// Configuração das 3 unidades Marumbi
export const storeLocations: Record<string, StoreLocation> = {
  uberaba: {
    id: "uberaba",
    title: "Uberaba - Marumbi 1",
    displayName: "Marumbi 1",
    address1: "Rua Eunice Bettini Bartoszeck, 1122",
    address2: "Uberaba, Curitiba - PR",
    cep: "CEP: 81590-180",
    phone: "(41) 99853-2456",
    whatsappNumber: "+5541998532456",
    whatsappLink: "https://wa.me/+5541998532456?text=Olá,%20vim%20pelo%20site,%20pode%20me%20passar%20algumas%20informações??%20:)%20",
    embedUrl: "https://www.google.com/maps?q=Rua%20Eunice%20Bettini%20Bartoszeck%2C%201122%2C%20Uberaba%2C%20Curitiba%20-%20PR&output=embed",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Rua+Eunice+Bettini+Bartoszeck,+1122,+Uberaba,+Curitiba+-+PR",
    hours: {
      weekdays: "8:00 - 21:00",
      sunday: "9:00 - 14:00"
    },
    order: 1
  },
  cajuru: {
    id: "cajuru",
    title: "Cajuru - Marumbi 2",
    displayName: "Marumbi 2",
    address1: "Rua Crysostomo da Rosa, 258",
    address2: "Cajuru, Curitiba - PR",
    cep: "CEP: 82900-410",
    phone: "(41) 99858-3196",
    whatsappNumber: "+5541998583196",
    whatsappLink: "https://wa.me/+5541998583196?text=Olá,%20vim%20pelo%20site,%20pode%20me%20passar%20algumas%20informações??%20:)%20",
    embedUrl: "https://www.google.com/maps?q=Rua%20Crysostomo%20da%20Rosa%2C%20258%2C%20Cajuru%2C%20Curitiba%20-%20PR&output=embed",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Rua+Crysostomo+da+Rosa,+258,+Cajuru,+Curitiba+-+PR",
    hours: {
      weekdays: "8:00 - 20:00",
      sunday: "9:00 - 14:00"
    },
    order: 2
  },
  capao: {
    id: "capao",
    title: "Capão da Imbuia - Marumbi 3",
    displayName: "Marumbi 3",
    address1: "Rua Delegado Leopoldo Belczak, 2045",
    address2: "Capão da Imbuia, Curitiba - PR",
    cep: "CEP: 82810-060",
    phone: "(41) 99735-3725",
    whatsappNumber: "+5541997353725",
    whatsappLink: "https://wa.me/+5541997353725?text=Olá,%20vim%20pelo%20site,%20pode%20me%20passar%20algumas%20informações??%20:)%20",
    embedUrl: "https://www.google.com/maps?q=Rua%20Delegado%20Leopoldo%20Belczak%2C%202045%2C%20Cap%C3%A3o%20da%20Imbuia%2C%20Curitiba%20-%20PR&output=embed",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Rua+Delegado+Leopoldo+Belczak,+2045,+Capao+da+Imbuia,+Curitiba+-+PR",
    hours: {
      weekdays: "8:00 - 20:00",
      sunday: "8:00 - 13:00"
    },
    order: 3
  }
};

// Função para obter lojas ordenadas
export const getOrderedStores = (): StoreLocation[] => {
  return Object.values(storeLocations).sort((a, b) => a.order - b.order);
};

// Função para obter loja por ID
export const getStoreById = (id: string): StoreLocation | undefined => {
  return storeLocations[id];
};
