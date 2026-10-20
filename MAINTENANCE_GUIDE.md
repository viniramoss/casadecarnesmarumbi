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

O site é feito em **React + Vite + Tailwind**. Não tem banco de dados: os dados das lojas são arquivos de código.

**Este site não tem preços.** A primeira tela pede a unidade mais próxima e leva para o catálogo de preços dela:

| Unidade | Catálogo de preços |
|---|---|
| Marumbi 1 (Uberaba) | https://catalogomarumbiuberaba.vercel.app |
| Marumbi 3 (Capão da Imbuia) | https://catalogomarumbiimbuia.vercel.app |

Os dois catálogos ficam em outro repositório, `viniramoss/catalogomarumbi`, com o próprio guia. Mudança de preço ou de produto é feita lá, não aqui.

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

### `src/config/storeConfig.ts` — as lojas
Endereço, bairro, telefone, WhatsApp, horário, mapa e endereço do catálogo de preços (`catalogoUrl`) de cada unidade. A escolha da unidade na primeira tela, as seções de Localização e Informações e o rodapé leem tudo daqui — mudou aqui, mudou em todos os lugares.

### As telas
| Parte do site | Arquivo |
|---|---|
| Primeira tela, com a escolha da unidade | `src/components/Hero.tsx` |
| Localização (mapa) | `src/components/LocationMap.tsx` |
| Informações (telefone e horário) | `src/components/Contact.tsx` |
| Rodapé | `src/components/Footer.tsx` |

O endereço antigo `/products` leva para a primeira tela.

---

## 4. Receitas

### Mudar telefone, horário ou endereço de uma loja

Tudo em `src/config/storeConfig.ts`. Ao trocar o telefone, **lembre de trocar nos três campos**, senão o botão do WhatsApp continua ligando para o número antigo:

```typescript
phone: "(41) 99203-7766",
whatsappNumber: "+5541992037766",
whatsappLink: linkDoWhatsApp("+5541992037766"),
```

A mensagem que já vem escrita quando a pessoa chama a loja no WhatsApp fica em `mensagemWhatsApp`, no mesmo arquivo, e vale para todos os botões de WhatsApp do site.

Os catálogos de preços têm uma cópia desses dados (em `src/config/storeConfig.ts` do repositório `viniramoss/catalogomarumbi`). Mudou aqui, mude lá também.

### Mudar o endereço de um catálogo de preços

Se o site de uma unidade mudar de endereço, troque o `catalogoUrl` dela em `src/config/storeConfig.ts`.

### Fechar ou reabrir uma loja

Apague (ou devolva) o bloco inteiro da loja em `storeConfig.ts`. A escolha da unidade, Localização, Informações e rodapé acompanham sozinhos. Do lado dos catálogos, veja o guia do repositório `viniramoss/catalogomarumbi`.

---

## 5. Testar antes de publicar

Para mudanças simples de texto, dá para publicar direto — o risco é baixo. Para qualquer coisa estrutural, vale rodar local primeiro:

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

Confira sempre a escolha da unidade (os dois botões abrem o catálogo certo), Localização, Informações e rodapé.

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

Fechou ou mudou uma loja? O site é só uma das pontas. Lembre também dos **catálogos de preços** (repositório `viniramoss/catalogomarumbi`), do **Google Meu Negócio** e do **Instagram** — nenhum deles é atualizado por aqui.

---

## Estado atual

- **2 unidades ativas:** Marumbi 1 (Uberaba) e Marumbi 3 (Capão da Imbuia)
- A Marumbi 2 (Cajuru) foi removida do site em agosto de 2026
- A numeração segue 1 e 3 de propósito, para o Capão continuar com o nome que os clientes conhecem
- Desde outubro de 2026 este site não mostra produtos nem preços: a página de produtos e os destaques saíram, e a primeira tela leva para o catálogo de preços de cada unidade
