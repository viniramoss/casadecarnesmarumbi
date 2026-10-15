# Guia de Manutenção — Site Casa de Carnes Marumbi

Como mexer no site, testar e publicar.

---

## 1. Onde fica cada coisa

| O quê | Onde |
|---|---|
| **Pasta na máquina** | `C:\Users\casad\OneDrive\Desktop\Site MB\casadecarnesmarumbi` |
| **Código (GitHub)** | `viniramoss/casadecarnesmarumbi`, branch `main` |
| **Hospedagem** | Vercel, projeto `viniramoss-projects/casadecarnesmarumbi` |
| **Site no ar** | https://casadecarnesmarumbi.vercel.app |

O site é feito em **React + Vite + Tailwind**. Não tem banco de dados: preços, produtos e dados das lojas são arquivos de código. Mudar um preço = editar um arquivo e publicar.

---

## 2. O fluxo de uma mudança

```
editar arquivo  →  testar local  →  commit  →  push  →  Vercel publica sozinha
```

O passo final é automático: **todo `git push` na branch `main` dispara um deploy**. Leva cerca de 1 minuto. Você não precisa entrar no painel da Vercel para nada.

### Os comandos

```bash
cd "C:\Users\casad\OneDrive\Desktop\Site MB\casadecarnesmarumbi"
```

```bash
git add -A; git commit -m "Descreve o que mudou"; git push origin main
```

Depois é só esperar um minuto e conferir em https://casadecarnesmarumbi.vercel.app

> Se o site não atualizar, veja a seção **6. Quando algo dá errado**.

---

## 3. Os arquivos que importam

Quase tudo que você vai querer mudar está em **três arquivos**:

### `src/data/productsData.ts` — os produtos e preços
A lista dos 45 produtos. É aqui que se muda preço, nome, descrição e em quais lojas cada item aparece.

### `src/config/storeConfig.ts` — as lojas
Endereço, telefone, WhatsApp, horário e mapa de cada unidade. As seções de Localização, Informações e o rodapé do site leem tudo daqui — mudou aqui, mudou nos três lugares.

### `src/config/productsConfig.ts` — as regras
Os tipos e as funções auxiliares. Mexe-se pouco aqui, só quando a regra muda (unidade de venda, nova categoria, nova loja).

Os arquivos de tela (`src/pages/Products.tsx`, `src/components/FeaturedProducts.tsx`, `src/components/StoreTags.tsx`) normalmente não precisam ser tocados para mudanças de conteúdo.

---

## 4. Receitas

### Mudar o preço de um produto

Abra `src/data/productsData.ts`, ache o produto pelo nome e edite os números:

```typescript
{
  id: 11,
  name: "Coxão Mole",
  price: {
    default: 46.99,   // preço em destaque no card
    marumbi1: 46.99,  // Uberaba
    marumbi3: 59.99,  // Capão da Imbuia
  },
  ...
}
```

**Regra do `default`:** é o preço grande que aparece no card. Mantenha igual ao da loja mais barata. As etiquetas coloridas mostram o valor de cada unidade.

Se o preço é o mesmo nas duas lojas, pode usar a forma curta:

```typescript
price: createSimplePrice(39.99),
```

Quando todas as lojas têm o mesmo preço, o site não mostra etiqueta nem o aviso *"Preços podem variar por loja"* — isso é automático, não precisa configurar.

### Adicionar um produto

1. Coloque a foto em `src/images/carnes/`
2. Importe no topo do `productsData.ts`:
   ```typescript
   import novoCorte from '../images/carnes/novoCorte.jpg';
   ```
3. Adicione o item na lista:
   ```typescript
   {
     id: 100,                    // precisa ser único
     name: "Novo Corte",
     description: "Descrição que aparece no card.",
     price: {
       default: 49.99,
       marumbi1: 49.99,
       marumbi3: 54.99,
     },
     image: novoCorte,
     category: "bovinos",        // bovinos | suinos | aves | embutidos | miúdos | moídas
     tag: "Promoção",            // opcional, é o selo vermelho
     showLocationTags: true,     // mostra as etiquetas de loja
   }
   ```

**ID duplicado quebra os filtros da página** — confira que o número não existe ainda.

### Produto que só tem em uma loja

```typescript
availableAt: ['marumbi1'],   // só Uberaba
```

Sem essa linha, o produto aparece em todas as lojas. Com ela, o card ganha a etiqueta `📍 Marumbi 1`.

### Produto que não é vendido por quilo

Por padrão todo preço aparece como `R$ 39,99 / kg`. Para kits e combos:

```typescript
priceLabel: "6 por R$ 10,00",   // substitui o preço formatado
```

Para outra unidade (bandeja, unidade):

```typescript
unit: 'un',    // vira "R$ 4,00 / un"
```

### Mudar telefone, horário ou endereço de uma loja

Tudo em `src/config/storeConfig.ts`. Ao trocar o telefone, **lembre de trocar nos três campos**, senão o botão do WhatsApp continua ligando para o número antigo:

```typescript
phone: "(41) 99203-7766",
whatsappNumber: "+5541992037766",
whatsappLink: "https://wa.me/+5541992037766?text=Olá,%20vim%20pelo%20site...",
```

### Fechar ou reabrir uma loja

Apague (ou devolva) o bloco inteiro da loja em `storeConfig.ts`. Localização, Informações e rodapé acompanham sozinhos.

Mas **não para por aí**. Ao fechar uma unidade, confira também:

- Em `productsData.ts`, apague as linhas de preço daquela loja e tire a chave dos `availableAt`
- Se algum produto só era vendido naquela unidade, decida se sai do site ou troca de loja
- Se o `default` de algum produto vinha do preço daquela loja, atualize — senão o site anuncia um valor que não existe mais
- Em `productsConfig.ts`, ajuste o tipo `StoreTag` e o objeto `storeTags`

> **Já aconteceu:** quando a Cajuru fechou, a Moída ESPECIAL ficou com o preço da Cajuru em destaque, um valor que nenhuma loja praticava.

---

## 5. Testar antes de publicar

Para mudanças de preço simples, dá para publicar direto — o risco é baixo. Para qualquer coisa estrutural, vale rodar local primeiro:

```bash
npm install
```

```bash
npm run dev
```

Abre em **http://localhost:8080**. A página recarrega sozinha a cada arquivo salvo.

Para checar se não quebrou nada antes de subir:

```bash
npx tsc --noEmit -p tsconfig.app.json
```

Esse comando pega erros de digitação e campos inválidos. **Vale rodar porque o build da Vercel não faz essa checagem** — ela roda só `vite build`, que ignora erros de tipo. Ou seja, dá para publicar código com erro de tipo sem a Vercel reclamar.

Confira sempre as quatro seções: Produtos, Localização, Informações e rodapé.

---

## 6. Quando algo dá errado

### O site não atualizou depois do push

Confira se o commit chegou ao GitHub:

```bash
git log origin/main --oneline -1
```

Se o commit está lá mas o site continua velho, o gatilho da Vercel pode ter caído. Já aconteceu: a conexão aparecia como ativa mas não disparava. O site passou a servir conteúdo de **dezembro de 2025 até agosto de 2026**, e uma atualização de preços e telefones feita em junho ficou dois meses sem ir ao ar. A correção é desconectar e reconectar o repositório:

```bash
vercel git disconnect --yes; vercel git connect https://github.com/viniramoss/casadecarnesmarumbi.git --yes
```

Se mesmo assim não disparar, o problema está do lado do GitHub — reinstale o app da Vercel em https://github.com/settings/installations

### O push pede login e trava

O Windows abre uma janela do GitHub pedindo autenticação. Se ela não aparecer, rode o push direto no PowerShell (não em terminal automatizado) para a janela surgir.

### Publicar sem depender do gatilho

```bash
vercel --prod --yes
```

Publica direto da pasta local. **Use só como emergência** — o que vai pro ar deixa de corresponder ao que está no GitHub, que foi exatamente o problema dos 8 meses.

---

## 7. Acessos

| Serviço | Como entrar |
|---|---|
| **GitHub** | Primeiro `git push` abre a janela de login. Fica salvo depois disso. |
| **Vercel (CLI)** | `vercel login` — a sessão expira de tempos em tempos e precisa ser refeita |
| **Vercel (painel)** | https://vercel.com/viniramoss-projects/casadecarnesmarumbi |

Comandos úteis da CLI, depois de logado:

```bash
vercel ls
```

Lista os últimos deploys com status e data — serve para confirmar se o push virou publicação.

```bash
vercel inspect <url-do-deploy> --logs
```

Mostra o log completo do build, para achar a causa quando um deploy falha.

---

## 8. O que fica fora do site

Fechou ou mudou uma loja? O site é só uma das pontas. Lembre também do **Google Meu Negócio** e do **Instagram** — nenhum dos dois é atualizado por aqui.

---

## Estado atual

- **2 unidades ativas:** Marumbi 1 (Uberaba) e Marumbi 3 (Capão da Imbuia)
- A Marumbi 2 (Cajuru) foi removida do site em agosto de 2026
- A numeração segue 1 e 3 de propósito, para o Capão continuar com o nome que os clientes conhecem
- **45 produtos** cadastrados
