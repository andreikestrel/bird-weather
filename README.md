# Bird Weather

Plataforma de clima em tempo real para qualquer cidade do mundo — com alertas personalizados, blog de meteorologia e visual moderno.

![Bird Weather](https://github.com/andreikestrel/bird-weather/assets/96220262/ca85995a-ea1f-47e5-8a50-8ce7fe181ce5)

---

## Funcionalidades

- **Busca com autocomplete** — sugestões de cidades enquanto você digita
- **Clima atual** — temperatura, sensação térmica, umidade, vento, pressão e visibilidade
- **Previsão de 5 dias**
- **Background dinâmico** — foto da cidade selecionada como plano de fundo
- **Histórico de cidades** — últimas 5 cidades consultadas salvas localmente
- **Alertas push** — receba notificação no browser quando a temperatura, chuva ou vento atingir o limite definido
- **Login com Google** — acesso restrito por allowlist de emails
- **CMS** — editor rico para publicar posts no blog diretamente pela interface
- **Blog** — artigos sobre meteorologia e fenômenos climáticos
- **Dark / Light mode**

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript (strict) |
| Estilo | Tailwind CSS + shadcn/ui |
| Estado | Zustand |
| ORM | Prisma + SQLite (dev) / PostgreSQL (prod) |
| Auth | NextAuth v5 — Google OAuth |
| Push | web-push + Service Worker |
| Editor | TipTap |
| Blog estático | MDX + gray-matter + marked |

---

## Como rodar

### 1. Clone e instale

```bash
git clone https://github.com/andreikestrel/bird-weather.git
cd bird-weather
npm install
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Preencha o `.env.local` com suas chaves:

| Variável | Onde obter |
|----------|-----------|
| `OPENWEATHER_API_KEY` | [openweathermap.org/api](https://openweathermap.org/api) |
| `UNSPLASH_ACCESS_KEY` | [unsplash.com/developers](https://unsplash.com/developers) |
| `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` | [console.cloud.google.com](https://console.cloud.google.com) — OAuth 2.0 |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `ALLOWED_EMAILS` | Emails autorizados, separados por vírgula |

Para push notifications, gere as VAPID keys:
```bash
npx web-push generate-vapid-keys
```

### 3. Banco de dados

```bash
npx prisma migrate dev
```

### 4. Rode

```bash
npm run dev
```

Acesse `http://localhost:3000`.

---

## Google OAuth — URIs necessários

No Google Cloud Console, adicione em **Origens JavaScript autorizadas** e **URIs de redirecionamento**:

```
# Desenvolvimento
http://localhost:3000
http://localhost:3000/api/auth/callback/google

# Produção
https://seu-dominio.com
https://seu-dominio.com/api/auth/callback/google
```

---

## Deploy (Vercel)

1. Conecte o repositório na Vercel
2. Crie um banco PostgreSQL (recomendado: **Neon** via Vercel Storage)
3. Configure todas as variáveis de ambiente no painel da Vercel
4. Troque o provider no `prisma/schema.prisma` para `postgresql`
5. Após o primeiro deploy, rode: `npx prisma migrate deploy`

---

Desenvolvido por [Andrei Barbosa](https://www.linkedin.com/in/barbosaandrei/)
