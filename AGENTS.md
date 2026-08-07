# AGENTS.md — Site Institucional Nutricionista

> Este arquivo existe para que qualquer agente de IA (ou desenvolvedor humano) entenda rapidamente o contexto, as decisões arquiteturais e o estado atual deste repositório antes de propor ou implementar qualquer mudança.

---

## 1. Visão Geral do Projeto

Site institucional para divulgação dos serviços de uma nutricionista. **Não é um sistema web** — é um site estático de apresentação profissional, portfólio e captação de pacientes, com forte foco em SEO, performance e baixo custo de manutenção.

**O que o site precisa fazer:**
- Apresentação profissional da nutricionista
- Divulgação de serviços
- Captação de novos pacientes
- Fortalecimento de presença digital
- Bom posicionamento no Google (SEO)

**O que o site explicitamente NÃO é:**
- Não é um sistema com login/autenticação
- Não tem painel administrativo
- Não tem banco de dados
- Não tem backend próprio
- Não usa WordPress

---

## 2. Stack Técnica (regras obrigatórias)

### Permitido
- HTML5 semântico
- CSS3 (com variáveis nativas / design tokens)
- JavaScript Vanilla (ES6+, módulos nativos)
- Vite (apenas como ferramenta de build/dev — não roda em produção)
- Tailwind CSS (opcional, ainda **não decidido/implementado** — o projeto está usando CSS puro com arquitetura ITCSS até o momento)

### Proibido (a menos que solicitado explicitamente pelo usuário)
- React, Vue, Angular, Next.js
- Node.js/Express como backend
- PHP, WordPress
- jQuery ou bibliotecas para funcionalidades simples
- `eval()`, `document.write()`, `new Function()`, uso desnecessário de `innerHTML`

### Arquitetura
Site 100% estático. Sem: login, autenticação, usuários, painel admin, banco de dados, backend, API própria, sessões, JWT, cookies de autenticação, CORS, CSRF, rate limiting, criptografia de senha. Esses tópicos só devem ser considerados se o projeto evoluir para ter backend — **não sugerir nem implementar preventivamente**.

---

## 3. Papel esperado do agente

Ao trabalhar neste repositório, atuar como: Arquiteto de Software + Dev Front-end Sênior + Especialista em UX/UI + Especialista em SEO + Especialista em Segurança Web. Priorizar sempre: simplicidade, performance, acessibilidade, SEO, segurança e manutenção mínima. Quando houver mais de uma solução possível, preferir a que tiver menos dependências, menos código, menor superfície de ataque e for mais fácil de manter.

Ao responder/implementar, seguir esta ordem de raciocínio:
1. Explicar rapidamente a solução proposta
2. Justificar a decisão técnica
3. Informar vantagens/desvantagens quando houver alternativas
4. Priorizar simplicidade
5. Pensar como projeto profissional de produção

---

## 4. Estado Atual do Repositório

### 4.1 Setup do projeto
- Projeto criado com `npm create vite@latest` → template **Vanilla + JavaScript** (sem TypeScript)
- Ambiente de desenvolvimento: Windows, terminal **CMD** (não PowerShell, não Git Bash) — importante para qualquer comando sugerido futuramente
- Boilerplate padrão do Vite já foi limpo (`counter.js`, `javascript.svg`, `vite.svg` removidos)

### 4.2 Estrutura de pastas atual

```
nutri-site/
├── node_modules/
├── public/
│   ├── favicon.svg
│   ├── robots.txt          [PENDENTE — instruído, não confirmado como criado]
│   └── sitemap.xml         [PENDENTE — instruído, não confirmado como criado]
├── src/
│   ├── assets/
│   │   ├── fonts/           [vazio — nenhuma fonte adicionada ainda]
│   │   ├── icons/           [vazio — ícones do site (whatsapp, redes sociais, serviços) ainda não existem fisicamente]
│   │   └── images/          [vazio — fotos reais (hero, sobre, depoimentos, og-image) ainda não existem]
│   ├── css/
│   │   ├── 01-settings/
│   │   │   └── tokens.css          ✅ criado
│   │   ├── 02-generic/
│   │   │   └── reset.css           ✅ criado
│   │   ├── 03-elements/
│   │   │   └── elements.css        ✅ criado
│   │   ├── 04-layout/
│   │   │   └── layout.css          ✅ criado
│   │   ├── 05-components/
│   │   │   ├── button.css          ✅ criado
│   │   │   ├── card.css            ✅ criado
│   │   │   ├── navbar.css          ✅ criado
│   │   │   ├── footer.css          ✅ criado
│   │   │   └── whatsapp-fab.css    ✅ criado
│   │   ├── 06-utilities/           [vazio — nenhuma utility criada ainda, criar sob demanda]
│   │   └── main.css                ✅ criado (importa tudo na ordem ITCSS)
│   ├── js/
│   │   ├── components/             [vazio — reservado para Web Components nativos, ex: whatsapp-button customElement, ainda não implementado]
│   │   ├── modules/
│   │   │   └── navbar.js           ✅ criado (controla toggle do menu mobile)
│   │   └── utils/                  [vazio — helpers puros, ex: debounce, formatPhone — nenhum criado ainda]
│   └── main.js                     ✅ criado (entry point, importa main.css e inicializa initNavbar)
├── index.html                      ✅ criado (draft completo — ver seção 4.4 sobre pendências)
├── package.json
├── package-lock.json
└── vite.config.js                  [PADRÃO do Vite — ainda não customizado para MPA]
```

`src/style.css` (arquivo antigo do boilerplate) foi instruído para remoção — **confirmar se foi de fato apagado**.

### 4.3 Metodologia CSS: ITCSS + BEM

O CSS é organizado em camadas invertidas (do mais genérico ao mais específico), importadas nesta ordem obrigatória em `main.css`:

```
01-settings (tokens, zero CSS visual)
  → 02-generic (reset)
    → 03-elements (tags HTML puras)
      → 04-layout (containers, grid, wrappers estruturais)
        → 05-components (peças reutilizáveis, nomenclatura BEM)
          → 06-utilities (classes utilitárias — maior especificidade, sempre por último)
```

**Regra para qualquer novo componente:** seguir BEM (`.bloco`, `.bloco__elemento`, `.bloco--modificador`), usar exclusivamente os design tokens definidos em `01-settings/tokens.css` (nunca hardcodar cor/espaçamento/fonte direto), e respeitar mobile-first (estilos base = mobile, `@media (min-width: ...)` expande para telas maiores).

**Tokens já definidos** (`tokens.css`): cores de marca/neutras/feedback, tipografia (`--font-primary` sans-serif para UI, `--font-secondary` serif para headings), escala de espaçamento (`2xs` a `4xl`), bordas, sombras, transições, `--container-max-width`, `--header-height`, e z-index centralizados (`--z-header`, `--z-modal`, `--z-whatsapp-fab`) para evitar conflito de camadas.

### 4.4 HTML — `index.html`

O projeto já foi implantado (deploy) e está publicamente acessível em `https://nutri-site-nine.vercel.app/` (hospedagem provisória — ver nota de migração abaixo). Estrutura confirmada ao vivo, single-page com seções via âncora (`#inicio`, `#sobre`, `#servicos`, `#diferenciais`, `#avaliacoes`, `#faq`, `#contato`). Inclui:
- Navbar responsiva (desktop: lista horizontal / mobile: hambúrguer + drawer)
- Hero, Sobre, Serviços (grid 3 colunas), Diferenciais (grid 2 colunas), Avaliações (cards de depoimento), FAQ (via `<details>/<summary>` nativo)
- Contato **sem formulário de envio** — decisão tomada para evitar a necessidade de proteção contra flood/spam/bots (rate limiting, captcha), que exigiria backend próprio ou serviço de terceiros. Contato feito diretamente por telefone, WhatsApp, e-mail e localização.
- Footer com grid de 3 colunas (marca / navegação / contato), incluindo links para Política de Privacidade, Termos de Uso e Responsabilidade Profissional (páginas `.html` separadas, já existentes no repositório)
- Botão flutuante do WhatsApp
- JSON-LD `MedicalBusiness` no `<head>`

**⚠️ Nota sobre hospedagem:** o deploy atual está no Vercel, plano Hobby (gratuito). Esse plano é restrito a uso pessoal/não-comercial nos termos do Vercel, e este projeto é remunerado — portanto tecnicamente já se enquadra como uso comercial. **Migração planejada para Cloudflare Pages**, que não tem essa restrição, e que também vai hospedar o domínio (registro no Cloudflare Registrar). Migração ainda não confirmada como executada.

**Estado da auditoria de SEO — confirmado ao vivo no deploy atual:**

| Item | Status confirmado |
|---|---|
| `og:image:width`, `og:image:height`, `og:image:alt` | ✅ Presentes no HTML publicado |
| `<meta name="robots" content="index, follow">` | ✅ Presente |
| `canonical` e metadados Open Graph/Twitter | ✅ Presentes |
| `robots.txt` | ✅ Confirmado — conteúdo padrão (`Allow: /` + linha de Sitemap) |
| `sitemap.xml` | ✅ Confirmado — uma única URL (site single-page) |
| Schema JSON-LD `FAQPage` | Não confirmado se foi inserido — verificar |

**Pendências ainda abertas (placeholders a substituir por dados reais da cliente):**

| Placeholder | Status |
|---|---|
| Domínio real (`seudominio.com.br` nos metadados) | Ainda placeholder — trocar quando o domínio definitivo for registrado |
| Todos os assets visuais (logo, ícones, fotos de hero/sobre/depoimentos, og-image) | Ainda SVGs/imagens genéricas de placeholder, não fotos reais da cliente |
| Nome da nutricionista | Placeholder ("Nome da Nutricionista" / "Nome da Nutri") |
| Telefone/WhatsApp (`5585999999999`) | Placeholder — trocar pelo número real |
| E-mail (`seuemail@dominio.com`) | Placeholder — trocar pelo e-mail real |
| Instagram (`instagram.com/seuinstagram`) | Placeholder |
| CRN (registro profissional) | Placeholder no footer (`000000/CE`) — preencher número real |
| Google Maps embed | Placeholder (`SEU_EMBED_AQUI`) — trocar pelo embed real do endereço |

### 4.5 JavaScript

Módulo único implementado até agora: `navbar.js` (exporta `initNavbar()`), chamado em `main.js` dentro de `DOMContentLoaded`. Controla abrir/fechar do menu mobile via classes CSS (`--open`), fecha ao clicar em link, ao clicar fora, e ao pressionar `Esc`. Usa `aria-expanded` dinamicamente para acessibilidade.

**Padrão de projeto para JS:** Module Pattern (funções puras exportadas, sem estado global vazando), guard clauses no início de cada função de inicialização, zero `console.log`/`eval`/`innerHTML` desnecessário.

**Ainda não implementado:**
- Nenhum Web Component nativo em `js/components/` (planejado, ex: `<whatsapp-button>`)
- Nenhuma função utilitária em `js/utils/`
- Nenhum smooth-scroll customizado (atualmente depende só de `scroll-behavior: smooth` no CSS)

**Decisão registrada — formulário de contato removido:** o formulário de contato (FormSubmit) previsto inicialmente foi retirado do site. Motivo: implementar as proteções necessárias contra flood/spam/bots (rate limiting, captcha) exigiria backend próprio ou dependência de serviço de terceiros mais robusto — contra a diretriz de manter a menor superfície de ataque possível. O contato foi centralizado em telefone, WhatsApp, e-mail e localização. Se um formulário for reintroduzido no futuro, considerar soluções que mantenham a arquitetura estática, como campo honeypot (via FormSubmit) ou Cloudflare Turnstile (compatível com a hospedagem planejada).

---

## 5. Backlog / Próximos Passos

Em ordem de discussão com o usuário (mais recente primeiro):

1. Confirmar se o Schema JSON-LD `FAQPage` foi inserido no HTML publicado
2. **Migrar hospedagem de Vercel (Hobby) para Cloudflare Pages** — motivo: plano gratuito do Vercel não permite uso comercial, e este é um projeto remunerado
3. Registrar domínio definitivo no Cloudflare Registrar, em nome da cliente
4. Substituir todos os placeholders restantes (tabela da seção 4.4) por dados reais fornecidos pela cliente
5. Customizar `vite.config.js` para build correto, se necessário (hoje o site é single-page, padrão do Vite deve bastar)
6. Popular `06-utilities/` conforme necessidade real aparecer (evitar criar utilities especulativas)
7. Decidir se Tailwind será usado ou se o projeto segue 100% CSS puro (ainda em aberto — o projeto permite ambos)
8. Configurar headers de segurança na hospedagem final (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy, X-Content-Type-Options) — ajustar conforme configuração específica do Cloudflare Pages
9. Rodar auditoria Lighthouse (Performance/SEO/Acessibilidade/Boas práticas) antes de considerar o projeto pronto para produção
10. Se um formulário de contato for reintroduzido no futuro, avaliar honeypot (FormSubmit) ou Cloudflare Turnstile como proteção contra spam/bots, mantendo a arquitetura estática

---

## 6. Convenções e Preferências do Usuário (importante seguir)

- Usuário prefere avançar em **etapas pequenas e confirmadas** — não pular passos, não assumir que uma etapa foi concluída sem confirmação explícita
- Terminal do usuário é **CMD no Windows** — comandos de terminal sugeridos devem ser compatíveis (não usar sintaxe Bash/PowerShell sem adaptar)
- Usuário valoriza arquitetura "de verdade" (componentização, design patterns, ITCSS, BEM) — evitar soluções simplistas demais mesmo em projeto "simples"
- Sempre explicar o porquê técnico de cada decisão, não só entregar código
- Quando houver trade-offs, apresentar vantagens/desvantagens antes de decidir

---

## 7. Checklist de Segurança (lembrete permanente)

Ao adicionar qualquer código novo neste repositório, confirmar:
- [ ] Nenhum uso de `eval()`, `document.write()`, `new Function()`
- [ ] Nenhum `innerHTML` desnecessário (preferir `textContent`/`createElement`)
- [ ] Todo link externo com `target="_blank"` tem `rel="noopener noreferrer"`
- [ ] Nenhum `console.log`/dado sensível deixado em código de produção
- [ ] Nenhuma API key, token, senha ou secret no código frontend (tudo é público)
- [ ] Nenhuma dependência nova adicionada sem necessidade real comprovada

---

*Última atualização deste arquivo: reflete o estado da conversa até a criação do `index.html` e a auditoria de SEO (correções ainda pendentes de aplicação).*