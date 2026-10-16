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

O site é feito em **React + Vite + Tailwind**. Não tem banco de dados: preços e produtos ficam em `src/data/catalogo.json` e os dados das lojas em `src/config/storeConfig.ts`. Mudar um preço = mudar esse arquivo e publicar.

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

### `src/data/catalogo.json` — produtos e preços por unidade
O site agora é um **catálogo de preços**: o cliente escolhe a unidade e vê nome e preço/kg, sem fotos. Cada produto tem um bloco por unidade, ligado ao **proCodigo** do GranMoney daquela unidade (os códigos não valem entre lojas):

```json
{
  "id": "picanha",
  "nome": "Picanha",
  "categoria": "bovinos",
  "lojas": {
    "marumbi1": { "codigo": "90", "nomeGranMoney": "PICANHA", "preco": 79.9 },
    "marumbi3": { "codigo": "214", "nomeGranMoney": "PICANHA BOV", "preco": 84.9 }
  }
}
```

- O nome no site é livre; o vínculo é pelo código.
- Produto sem bloco de uma unidade não aparece naquela unidade.
- `codigo: null` = veio do site antigo e ainda não foi ligado ao GranMoney (a sincronização ignora).
- Categorias: `bovinos | suinos | aves | moídas`. Embutidos entram em Suínos; miúdos entram em Bovinos, menos a moela, que fica em Aves.

Não edite à mão sem necessidade: use as ferramentas da seção 4.

### `src/config/storeConfig.ts` — as lojas
Endereço, telefone, WhatsApp e horário de cada unidade, mostrados na página inicial, no catálogo, nas abas Localização e Informações e no rodapé. O campo `catalogo` liga a loja à chave usada no `catalogo.json` (`marumbi1`, `marumbi3`). Em `contatos` ficam o link do Instagram (vazio = o botão não aparece) e o e-mail do rodapé.

### Telas
| Endereço | Arquivo | O que mostra |
|---|---|---|
| `/` | `src/pages/EscolherUnidade.tsx` | Página inicial: a pessoa escolhe a unidade toda vez que entra |
| `/catalogo/marumbi1`, `/catalogo/marumbi3` | `src/pages/Catalogo.tsx` | Preços da unidade, com a troca de unidade no topo e os dados dela no rodapé. Dá para mandar o link direto de uma unidade |
| `/localizacao` | `src/pages/Localizacao.tsx` | Mapa e endereço de todas as unidades |
| `/informacoes` | `src/pages/Informacoes.tsx` | Telefone, horário e WhatsApp de todas as unidades |

Durante a visita, o site lembra a unidade escolhida (no `sessionStorage` da guia do navegador): o link **Catálogo** e o logo voltam direto para ela. Numa nova visita a pessoa escolhe de novo.

Os endereços antigos `/products` e `/catalogo` levam para a página inicial.

O site fica claro ou escuro conforme o sistema da pessoa (sem preferência, fica claro). Quem decide é o script no `index.html`; as cores dos dois modos ficam em `src/index.css`.

---

## 4. Ferramentas de preço (pasta `tools/`)

Nenhuma delas grava no GranMoney: elas só **leem** o GranMoney e mudam o `catalogo.json`.

### Credenciais
Copie `tools/env.exemplo` para `tools/.env` e preencha email e senha do GranMoney de cada unidade. O `tools/.env` não vai para o GitHub.

### Dashboard (escolher o que entra no site)
```bash
npm run dashboard
```
Abre em **http://localhost:5174**. Escolha a unidade → **Puxar do GranMoney** → marque o que entra, dê o nome do site e a categoria → **Salvar escolhas** → **Publicar no site**. Para ligar um produto antigo do site a um código, escolha o nome dele no campo "Nome no site".

### Comando de preço (fluxo pelo chat)
```bash
npm run preco -- buscar picanha
npm run preco -- alterar --loja marumbi1 --codigo 90 --preco 79,90            # só mostra
npm run preco -- alterar --loja marumbi1 --codigo 90 --preco 79,90 --confirmar --publicar
```
Sem `--confirmar` nada é gravado: primeiro confere o produto, depois confirma.

### Sincronização com o GranMoney
```bash
npm run sincronizar -- --simular     # mostra o que mudaria
npm run sincronizar -- --publicar    # grava e publica
```
Para cada produto com código, lê o preço de venda no GranMoney da unidade e atualiza o site se mudou. Pula código repetido, inativo ou com preço zerado, e não faz nada se o GranMoney devolver 0 produtos.

O GitHub roda a mesma sincronização a cada 15 minutos (`.github/workflows/sincronizar-precos.yml`) quando os segredos `GM_MARUMBI1_EMAIL`, `GM_MARUMBI1_SENHA`, `GM_MARUMBI3_EMAIL` e `GM_MARUMBI3_SENHA` estão cadastrados em *Settings → Secrets and variables → Actions*. Sem eles, a unidade é pulada.

> Como a sincronização automática também faz push na `main`, rode `git pull` antes de mexer no código pelo PC. O botão Publicar da dashboard e o `--publicar` já fazem isso sozinhos.

### Fechar ou abrir uma unidade
Tire (ou devolva) o bloco em `storeConfig.ts`, a chave em `tools/lib/catalogo.mjs` (`LOJAS`), o tipo `StoreTag` em `src/config/catalogo.ts` e os blocos daquela unidade no `catalogo.json`.

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

Confira a página inicial, o catálogo de cada unidade (no modo claro e no escuro) e as abas Localização e Informações, no celular e no computador.

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
- Em outubro de 2026 o site virou catálogo de preços por unidade (sem fotos), com todos os produtos ligados a um código do GranMoney. A página inicial passou a ser a escolha da unidade
