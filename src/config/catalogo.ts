// Catálogo de preços por unidade.
// Os dados ficam em src/data/catalogo.json, que é editado pelas ferramentas em tools/
// (dashboard, comando de preço e sincronização com o GranMoney). Não edite à mão sem necessidade.
import dados from '../data/catalogo.json';

export type StoreTag = 'marumbi1' | 'marumbi3';
export type ProductCategory = 'bovinos' | 'suinos' | 'aves' | 'embutidos' | 'miúdos' | 'moídas';

// Preço de um produto em uma unidade, ligado ao proCodigo do GranMoney daquela unidade
export interface PrecoNaLoja {
  codigo: string | null;    // proCodigo no GranMoney da unidade; null enquanto não vinculado
  nomeGranMoney?: string;   // nome como está no GranMoney, só para conferência
  preco: number;            // R$ por kg (ou pela unidade informada)
}

export interface ProdutoCatalogo {
  id: string;
  nome: string;
  categoria: ProductCategory;
  unidade?: string; // kg quando não informado
  lojas: Partial<Record<StoreTag, PrecoNaLoja>>;
}

export interface Catalogo {
  lojas: Record<StoreTag, { atualizadoEm: string }>;
  produtos: ProdutoCatalogo[];
}

export const catalogo = dados as Catalogo;

export const categorias: { id: ProductCategory; nome: string }[] = [
  { id: 'bovinos', nome: 'Bovinos' },
  { id: 'suinos', nome: 'Suínos' },
  { id: 'aves', nome: 'Aves' },
  { id: 'embutidos', nome: 'Embutidos' },
  { id: 'miúdos', nome: 'Miúdos' },
  { id: 'moídas', nome: 'Moídas' },
];

export interface ItemDaLoja {
  id: string;
  nome: string;
  categoria: ProductCategory;
  unidade: string;
  preco: number;
}

// Produtos vendidos na unidade, em ordem alfabética
export const produtosDaLoja = (loja: StoreTag): ItemDaLoja[] => {
  return catalogo.produtos
    .filter(produto => produto.lojas[loja])
    .map(produto => ({
      id: produto.id,
      nome: produto.nome,
      categoria: produto.categoria,
      unidade: produto.unidade ?? 'kg',
      preco: produto.lojas[loja]!.preco,
    }))
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
};

export const formatPrice = (price: number): string => {
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
};

export const formatAtualizadoEm = (iso: string): string => {
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return '';
  return data.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Última unidade escolhida, para abrir direto nela na próxima visita
const CHAVE_UNIDADE = 'marumbi_unidade';

export const lerUnidadeSalva = (): string | null => {
  try {
    return localStorage.getItem(CHAVE_UNIDADE);
  } catch {
    return null;
  }
};

export const salvarUnidade = (loja: StoreTag): void => {
  try {
    localStorage.setItem(CHAVE_UNIDADE, loja);
  } catch {
    // navegação privada: só não lembra a escolha
  }
};
