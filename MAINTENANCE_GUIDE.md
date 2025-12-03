# 🛠️ Guia de Manutenção - Sistema Marumbi

## 📋 Visão Geral

Este guia explica como manter e atualizar facilmente o sistema Casa de Carnes Marumbi, incluindo preços, produtos e informações das lojas.

## 🏪 Gerenciamento das Lojas

### Arquivo: `src/config/storeConfig.ts`

Todas as informações das lojas estão centralizadas neste arquivo:

```typescript
// Para adicionar uma nova loja:
export const storeLocations: Record<string, StoreLocation> = {
  novaLoja: {
    id: "novaLoja",
    title: "Nova Loja - Marumbi 4",
    displayName: "Marumbi 4",
    address1: "Rua Nova, 123",
    address2: "Bairro Novo, Curitiba - PR",
    cep: "CEP: 80000-000",
    phone: "(41) 99999-9999",
    whatsappNumber: "+5541999999999",
    whatsappLink: "https://wa.me/+5541999999999?text=Olá...",
    embedUrl: "https://www.google.com/maps?q=...",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=...",
    hours: {
      weekdays: "8:00 - 20:00",
      sunday: "9:00 - 14:00"
    },
    order: 4 // Define a ordem de exibição
  }
};
```

## 💰 Gerenciamento de Preços

### Arquivo: `src/config/productsConfig.ts`

#### 1. Multiplicadores Automáticos
```typescript
// Para produtos com preço único em todas as lojas:
price: createSimplePrice(29.99)
```

#### 2. Preços Específicos por Loja
```typescript
// Para produtos com preços diferentes em cada loja:
{
  id: 23,
  name: "Mignon",
  price: {
    default: 79.99,
    marumbi1: 82.99, // Preço específico Marumbi 1
    marumbi2: 79.99, // Preço específico Marumbi 2
    marumbi3: 75.99, // Preço específico Marumbi 3
  }
}

// Para produtos com preço simples:
{
  id: 1,
  name: "Bacon",
  price: createSimplePrice(44.99), // Preço único para todas as lojas
}
```

#### 3. Atualização de Preços em Massa
```typescript
// Para aumentar todos os preços em 10%:
const updatedProducts = updateAllPrices(allProducts, 10);

// Para diminuir todos os preços em 5%:
const updatedProducts = updateAllPrices(allProducts, -5);
```

## 🏷️ Sistema de Tags das Lojas

### Tags Disponíveis:
- `marumbi1` - Uberaba (Marumbi 1)
- `marumbi2` - Cajuru (Marumbi 2)  
- `marumbi3` - Capão da Imbuia (Marumbi 3)

### Aplicando Tags nos Produtos:

```typescript
{
  id: 50,
  name: "Kit Hamburgueres",
  availableAt: ['marumbi1', 'marumbi2'], // Disponível apenas nas lojas 1 e 2
  price: {
    default: 10.00,
    marumbi1: 10.00,
    marumbi2: 10.00,
    // marumbi3 não tem preço pois não está disponível
  }
}
```

## 📦 Adicionando Novos Produtos

### Arquivo: `src/data/productsData.ts`

```typescript
{
  id: 999, // ID único
  name: "Nome do Produto",
  description: "Descrição detalhada do produto",
  price: applyPriceMultipliers(29.99), // Preço base com multiplicadores
  // OU preços específicos:
  // price: {
  //   default: 29.99,
  //   marumbi1: 31.99,
  //   marumbi2: 29.99,
  //   marumbi3: 27.99,
  // },
  image: imagemProduto, // Importar a imagem
  category: "bovinos", // bovinos, suinos, aves, embutidos, miúdos, moídas
  tag: "Promoção", // Opcional: tag especial
  availableAt: ['marumbi1', 'marumbi2', 'marumbi3'] // Opcional: lojas específicas
}
```

## 🔧 Tarefas Comuns de Manutenção

### 1. Alterar Preço de um Produto Específico
```typescript
// Em src/data/productsData.ts, encontre o produto e altere:
{
  id: 23,
  name: "Mignon",
  price: {
    default: 85.99, // Novo preço base
    marumbi1: 88.99, // Novo preço Marumbi 1
    marumbi2: 85.99, // Novo preço Marumbi 2
    marumbi3: 82.99, // Novo preço Marumbi 3
  }
}
```

### 2. Alterar Preços Simples para Específicos
```typescript
// Converter de preço simples para preços específicos por loja:
// DE:
price: createSimplePrice(29.99)
// PARA:
price: {
  default: 29.99,
  marumbi1: 31.99, // Preço específico
  marumbi3: 27.99, // Preço promocional
}
```

### 3. Adicionar Nova Categoria
```typescript
// Em src/config/productsConfig.ts, adicione na type:
export type ProductCategory = 'bovinos' | 'suinos' | 'aves' | 'embutidos' | 'miúdos' | 'moídas' | 'nova-categoria';

// Em src/pages/Products.tsx, adicione no array categories:
const categories = [
  { id: 'all', name: 'Todos os Cortes' },
  { id: 'bovinos', name: 'Bovinos' },
  { id: 'suinos', name: 'Suínos' },
  { id: 'aves', name: 'Aves' },
  { id: 'nova-categoria', name: 'Nova Categoria' }
];
```

### 4. Alterar Horários de Funcionamento
```typescript
// Em src/config/storeConfig.ts:
uberaba: {
  // ... outras configurações
  hours: {
    weekdays: "7:00 - 22:00", // Novo horário
    sunday: "8:00 - 16:00"    // Novo horário domingo
  }
}
```

### 5. Alterar Telefones/WhatsApp
```typescript
// Em src/config/storeConfig.ts:
cajuru: {
  // ... outras configurações
  phone: "(41) 99999-9999", // Novo telefone formatado
  whatsappNumber: "+5541999999999", // Novo WhatsApp (formato internacional)
  whatsappLink: "https://wa.me/+5541999999999?text=Olá,%20vim%20pelo%20site..." // Novo link
}
```

## 🚀 Aplicando as Mudanças

1. **Edite os arquivos** conforme necessário
2. **Salve as alterações** - o Vite recarregará automaticamente
3. **Teste no navegador** em `http://localhost:8081/`
4. **Verifique todas as seções**:
   - Produtos (preços e disponibilidade)
   - Localização (informações das lojas)
   - Contato (telefones e horários)
   - Footer (telefones)

## ⚠️ Dicas Importantes

1. **Sempre faça backup** antes de grandes alterações
2. **Teste em ambiente local** antes de publicar
3. **Mantenha IDs únicos** para produtos
4. **Use preços com 2 casas decimais** (ex: 29.99)
5. **Verifique links do WhatsApp** após alterações
6. **Mantenha ordem das lojas** usando o campo `order`

## 📞 Estrutura dos Links WhatsApp

```
https://wa.me/+55DDNNNNNNNNN?text=Mensagem%20codificada
```

- `+55` - Código do Brasil
- `DD` - DDD (41 para Curitiba)
- `NNNNNNNNN` - Número do telefone
- `text=` - Mensagem pré-definida (URL encoded)

## 🎯 Exemplo Completo de Manutenção

Para aumentar todos os preços em 5% e adicionar um novo produto:

1. **Atualizar multiplicadores**:
```typescript
// src/config/productsConfig.ts
export const priceMultipliers = {
  marumbi1: 1.05,  // +5%
  marumbi2: 1.10,  // +10%
  marumbi3: 1.00,  // Base
};
```

2. **Adicionar novo produto**:
```typescript
// src/data/productsData.ts
{
  id: 100,
  name: "Novo Corte Premium",
  description: "Descrição do novo corte",
  price: applyPriceMultipliers(59.99),
  image: novoCorte,
  category: "bovinos",
  tag: "Novidade"
}
```

3. **Salvar e testar** no navegador!
