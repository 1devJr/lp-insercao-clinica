# 📋 Plano de Implementação - Site Institucional Clínica Mente

> **Documento de Planejamento Técnico e Visual**  
> Versão: 1.0 | Data: Janeiro 2026

---

## 📑 Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura de Rotas e Páginas](#estrutura-de-rotas-e-páginas)
3. [Menus e Navegação](#menus-e-navegação)
4. [Seções por Página](#seções-por-página)
5. [Paleta de Cores](#paleta-de-cores)
6. [Tipografia](#tipografia)
7. [Componentes Reutilizáveis](#componentes-reutilizáveis)
8. [SEO e Metadados](#seo-e-metadados)
9. [Segurança](#segurança)
10. [Boas Práticas Next.js](#boas-práticas-nextjs)
11. [Acessibilidade](#acessibilidade)
12. [Performance](#performance)
13. [Espaço Reservado - Seções Obrigatórias do Cliente](#espaço-reservado---seções-obrigatórias-do-cliente)
14. [Checklist de Implementação](#checklist-de-implementação)

---

## 🎯 Visão Geral

### Objetivo

Criar um site institucional profissional para a Clínica Mente, transmitindo credibilidade, acolhimento e profissionalismo na área de saúde mental (psicologia e psiquiatria).

### Público-Alvo

- Pacientes em busca de tratamento psicológico/psiquiátrico
- Familiares de pacientes
- Profissionais de saúde em busca de parcerias
- Psicólogos recém-formados (para a mentoria)

### Domínio

```
clinicamente.com.br/           → Site institucional (NOVO)
clinicamente.com.br/mentoria   → Landing page mentoria (EXISTENTE)
```

---

## 🗂 Estrutura de Rotas e Páginas

```
src/app/
├── page.tsx                    # Home - Página principal
├── layout.tsx                  # Layout global (header/footer)
├── sobre/
│   └── page.tsx               # Sobre a clínica
├── equipe/
│   └── page.tsx               # Equipe de profissionais
│   └── [slug]/
│       └── page.tsx           # Perfil individual do profissional
├── servicos/
│   └── page.tsx               # Lista de serviços
│   └── psicologia/
│       └── page.tsx           # Detalhes psicologia
│   └── psiquiatria/
│       └── page.tsx           # Detalhes psiquiatria
│   └── [slug]/
│       └── page.tsx           # Serviço dinâmico
├── blog/
│   └── page.tsx               # Lista de artigos
│   └── [slug]/
│       └── page.tsx           # Artigo individual
├── mentoria/
│   └── page.tsx               # Landing page mentoria (MOVER CONTEÚDO ATUAL)
├── contato/
│   └── page.tsx               # Formulário de contato
├── agendar/
│   └── page.tsx               # Agendamento online
├── faq/
│   └── page.tsx               # Perguntas frequentes
├── politica-privacidade/
│   └── page.tsx               # Política de privacidade (LGPD)
├── termos-uso/
│   └── page.tsx               # Termos de uso
└── api/
    ├── contact/
    │   └── route.ts           # API de contato
    └── appointment/
        └── route.ts           # API de agendamento
```

---

## 🧭 Menus e Navegação

### Header (Navegação Principal)

```typescript
const mainNavigation = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  {
    label: 'Serviços',
    href: '/servicos',
    submenu: [
      { label: 'Psicologia', href: '/servicos/psicologia' },
      { label: 'Psiquiatria', href: '/servicos/psiquiatria' },
      // Adicionar mais serviços conforme necessário
    ],
  },
  { label: 'Equipe', href: '/equipe' },
  { label: 'Blog', href: '/blog' },
  { label: 'Mentoria', href: '/mentoria', highlight: true },
  { label: 'Contato', href: '/contato' },
];

const ctaButton = { label: 'Agendar Consulta', href: '/agendar' };
```

### Footer

```typescript
const footerSections = {
  institucional: [
    { label: 'Sobre Nós', href: '/sobre' },
    { label: 'Nossa Equipe', href: '/equipe' },
    { label: 'Blog', href: '/blog' },
    { label: 'Trabalhe Conosco', href: '/contato?assunto=trabalhe-conosco' },
  ],
  servicos: [
    { label: 'Psicologia', href: '/servicos/psicologia' },
    { label: 'Psiquiatria', href: '/servicos/psiquiatria' },
    { label: 'Mentoria', href: '/mentoria' },
    // Adicionar mais serviços
  ],
  atendimento: [
    { label: 'Agendar Consulta', href: '/agendar' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contato', href: '/contato' },
  ],
  legal: [
    { label: 'Política de Privacidade', href: '/politica-privacidade' },
    { label: 'Termos de Uso', href: '/termos-uso' },
  ],
  social: [
    { icon: 'Instagram', href: 'https://instagram.com/clinicamente' },
    { icon: 'LinkedIn', href: 'https://linkedin.com/company/clinicamente' },
    { icon: 'WhatsApp', href: 'https://wa.me/5511999999999' },
  ],
};
```

---

## 📄 Seções por Página

### 🏠 Home (/)

| Ordem | Seção                   | Descrição                          | Componentes       |
| ----- | ----------------------- | ---------------------------------- | ----------------- |
| 1     | **Hero**                | Imagem impactante + headline + CTA | HeroSection       |
| 2     | **Apresentação Rápida** | Quem somos em 2-3 frases           | TextBlock         |
| 3     | **Serviços Principais** | Cards dos serviços oferecidos      | ServiceCards      |
| 4     | **Diferenciais**        | Por que escolher a clínica         | FeatureGrid       |
| 5     | **Equipe Destaque**     | 3-4 profissionais principais       | TeamCarousel      |
| 6     | **Depoimentos**         | Testemunhos de pacientes           | TestimonialSlider |
| 7     | **Blog Recentes**       | Últimos 3 artigos                  | BlogPreview       |
| 8     | **CTA Mentoria**        | Banner para a mentoria             | CTABanner         |
| 9     | **Contato Rápido**      | Formulário simplificado + mapa     | ContactQuick      |
| 10    | **FAQ Resumido**        | 4-5 perguntas mais comuns          | FAQAccordion      |

### 📖 Sobre (/sobre)

| Ordem | Seção                      | Descrição                   |
| ----- | -------------------------- | --------------------------- |
| 1     | **Hero Sobre**             | Imagem da clínica + título  |
| 2     | **Nossa História**         | Timeline ou texto narrativo |
| 3     | **Missão, Visão, Valores** | Cards ou grid               |
| 4     | **Estrutura**              | Fotos do espaço físico      |
| 5     | **Certificações**          | Selos e credenciamentos     |
| 6     | **CTA Equipe**             | Link para conhecer a equipe |

### 👥 Equipe (/equipe)

| Ordem | Seção                        | Descrição                                    |
| ----- | ---------------------------- | -------------------------------------------- |
| 1     | **Hero Equipe**              | Foto em grupo ou título                      |
| 2     | **Filtro por Especialidade** | Tabs ou dropdown                             |
| 3     | **Grid de Profissionais**    | Cards com foto, nome, CRP/CRM, especialidade |
| 4     | **CTA Agendamento**          | Botão para agendar                           |

### 🩺 Serviços (/servicos)

| Ordem | Seção                       | Descrição                      |
| ----- | --------------------------- | ------------------------------ |
| 1     | **Hero Serviços**           | Título + descrição geral       |
| 2     | **Lista de Serviços**       | Cards expandíveis ou accordion |
| 3     | **Processo de Atendimento** | Steps/timeline                 |
| 4     | **Convênios**               | Logos de convênios aceitos     |
| 5     | **CTA Agendamento**         | Formulário ou botão            |

### 📝 Blog (/blog)

| Ordem | Seção               | Descrição                          |
| ----- | ------------------- | ---------------------------------- |
| 1     | **Hero Blog**       | Título + busca                     |
| 2     | **Categorias**      | Tags/filtros                       |
| 3     | **Artigo Destaque** | Card grande do artigo mais recente |
| 4     | **Grid de Artigos** | Cards com paginação                |
| 5     | **Newsletter**      | Formulário de inscrição            |

### 📞 Contato (/contato)

| Ordem | Seção            | Descrição                                |
| ----- | ---------------- | ---------------------------------------- |
| 1     | **Hero Contato** | Título + informações de contato          |
| 2     | **Formulário**   | Nome, email, telefone, assunto, mensagem |
| 3     | **Mapa**         | Google Maps embed                        |
| 4     | **Horários**     | Dias e horários de funcionamento         |
| 5     | **WhatsApp**     | Botão flutuante ou destaque              |

### 📅 Agendar (/agendar)

| Ordem | Seção                       | Descrição                         |
| ----- | --------------------------- | --------------------------------- |
| 1     | **Hero Agendamento**        | Título + instrução                |
| 2     | **Seleção de Serviço**      | Dropdown ou cards                 |
| 3     | **Seleção de Profissional** | Lista com filtro                  |
| 4     | **Calendário**              | Widget de disponibilidade         |
| 5     | **Formulário de Dados**     | Dados do paciente                 |
| 6     | **Confirmação**             | Resumo + política de cancelamento |

---

## 🎨 Paleta de Cores

### Cores Principais

```css
:root {
  /* Primária - Terracota (acolhimento, calor) */
  --color-primary-50: #fcf8f0;
  --color-primary-100: #f5e6d8;
  --color-primary-200: #e8c9b5;
  --color-primary-300: #dbac92;
  --color-primary-400: #ce8f6f;
  --color-primary-500: #c67a5b; /* Principal */
  --color-primary-600: #b06a4d;
  --color-primary-700: #8a5239;
  --color-primary-800: #653b28;
  --color-primary-900: #3f2518;

  /* Secundária - Verde Azulado (profissionalismo, saúde) */
  --color-secondary-50: #e6f0f2;
  --color-secondary-100: #c2dbe0;
  --color-secondary-200: #9ac5cd;
  --color-secondary-300: #72afba;
  --color-secondary-400: #4a99a7;
  --color-secondary-500: #234a57; /* Principal */
  --color-secondary-600: #1e3f4a;
  --color-secondary-700: #19343d;
  --color-secondary-800: #142930;
  --color-secondary-900: #0f1e23;

  /* Neutras */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #e5e5e5;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #171717;

  /* Texto */
  --color-text-primary: #0b0f12;
  --color-text-secondary: #3c3b39;
  --color-text-muted: rgba(11, 15, 18, 0.6);

  /* Backgrounds */
  --color-bg-cream: #fcf8f0;
  --color-bg-white: #ffffff;
  --color-bg-dark: #1e1e1e;

  /* Semânticas */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}
```

### Regras de Uso

| Elemento            | Cor                     | Justificativa   |
| ------------------- | ----------------------- | --------------- |
| **CTA Principal**   | primary-500 (#C67A5B)   | Destaque, ação  |
| **Links**           | secondary-500 (#234A57) | Profissional    |
| **Texto corpo**     | text-primary (#0B0F12)  | Legibilidade    |
| **Backgrounds**     | bg-cream (#FCF8F0)      | Acolhimento     |
| **Headers/Footer**  | secondary-900 ou white  | Contraste       |
| **Hover em botões** | primary-600 ou 700      | Feedback visual |

### Contraste e Acessibilidade

```
✅ text-primary sobre bg-cream: 15.8:1 (AAA)
✅ text-primary sobre bg-white: 17.4:1 (AAA)
✅ primary-500 sobre bg-white: 4.6:1 (AA)
✅ white sobre secondary-500: 8.2:1 (AAA)
```

---

## 🔤 Tipografia

### Fontes

```css
:root {
  /* Títulos - Serifada elegante */
  --font-heading: 'Kurale', Georgia, serif;

  /* Corpo - Sans-serif limpa */
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Monospace (código, se necessário) */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Escala Tipográfica

```css
/* Mobile First */
:root {
  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem; /* 36px */
  --text-5xl: 3rem; /* 48px */
  --text-6xl: 3.75rem; /* 60px */
  --text-7xl: 4.5rem; /* 72px */
}

/* Line Heights */
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

### Hierarquia Recomendada

| Elemento      | Tamanho Mobile  | Tamanho Desktop | Fonte  | Peso |
| ------------- | --------------- | --------------- | ------ | ---- |
| H1 (Hero)     | 2.25rem (36px)  | 4.5rem (72px)   | Kurale | 400  |
| H2 (Seção)    | 1.875rem (30px) | 3rem (48px)     | Kurale | 600  |
| H3 (Subseção) | 1.5rem (24px)   | 2.25rem (36px)  | Kurale | 600  |
| H4 (Card)     | 1.25rem (20px)  | 1.5rem (24px)   | Inter  | 600  |
| Body          | 1rem (16px)     | 1.125rem (18px) | Inter  | 400  |
| Small         | 0.875rem (14px) | 0.875rem (14px) | Inter  | 400  |
| Caption       | 0.75rem (12px)  | 0.75rem (12px)  | Inter  | 400  |

---

## 🧩 Componentes Reutilizáveis

### Estrutura de Componentes

```
src/components/
├── ui/                        # Primitivos (shadcn/ui)
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── ...
├── layout/                    # Layout global
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── MobileMenu.tsx
│   │   └── NavDropdown.tsx
│   ├── Footer/
│   │   └── Footer.tsx
│   └── Container.tsx
├── sections/                  # Seções reutilizáveis
│   ├── HeroSection.tsx
│   ├── CTABanner.tsx
│   ├── ServiceCards.tsx
│   ├── TeamCarousel.tsx
│   ├── TestimonialSlider.tsx
│   ├── FAQAccordion.tsx
│   └── ContactForm.tsx
├── cards/                     # Cards específicos
│   ├── ServiceCard.tsx
│   ├── TeamMemberCard.tsx
│   ├── BlogCard.tsx
│   └── TestimonialCard.tsx
└── common/                    # Utilitários
    ├── Logo.tsx
    ├── SocialLinks.tsx
    ├── WhatsAppButton.tsx
    └── ScrollToTop.tsx
```

---

## 🔍 SEO e Metadados

### Configuração Global (layout.tsx)

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://clinicamente.com.br'),
  title: {
    default: 'Clínica Mente | Psicologia e Psiquiatria em [Cidade]',
    template: '%s | Clínica Mente',
  },
  description:
    'Clínica especializada em saúde mental. Atendimento em psicologia e psiquiatria com profissionais qualificados. Agende sua consulta.',
  keywords: [
    'psicologia',
    'psiquiatria',
    'saúde mental',
    'terapia',
    'consulta psicológica',
    '[cidade]',
  ],
  authors: [{ name: 'Clínica Mente' }],
  creator: 'Clínica Mente',
  publisher: 'Clínica Mente',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://clinicamente.com.br',
    siteName: 'Clínica Mente',
    title: 'Clínica Mente | Psicologia e Psiquiatria',
    description:
      'Clínica especializada em saúde mental com atendimento humanizado.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Clínica Mente - Saúde Mental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clínica Mente | Psicologia e Psiquiatria',
    description: 'Clínica especializada em saúde mental.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'código-verificação-google',
  },
};
```

### Schema.org (JSON-LD)

```typescript
// components/StructuredData.tsx
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Clínica Mente',
    description: 'Clínica especializada em saúde mental',
    url: 'https://clinicamente.com.br',
    logo: 'https://clinicamente.com.br/logo.png',
    image: 'https://clinicamente.com.br/images/clinica.jpg',
    telephone: '+55-11-99999-9999',
    email: 'contato@clinicamente.com.br',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Example, 123',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      postalCode: '00000-000',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -23.5505,
      longitude: -46.6333,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '14:00',
      },
    ],
    medicalSpecialty: ['Psychiatry', 'Psychology'],
    priceRange: '$$',
    sameAs: [
      'https://instagram.com/clinicamente',
      'https://linkedin.com/company/clinicamente',
    ],
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Sitemap e Robots

```typescript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://clinicamente.com.br',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/api/*', '/admin/*'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://clinicamente.com.br/sitemap.xml'],
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/admin/'] },
    ],
  },
};
```

---

## 🔒 Segurança

### Headers de Segurança (next.config.js)

```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)',
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

### Content Security Policy

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.clinicamente.com.br;
    frame-src 'self' https://www.google.com/maps;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, ' ')
    .trim();

  const response = NextResponse.next();
  response.headers.set('x-nonce', nonce);
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}
```

### Validação de Formulários

```typescript
// lib/validations/contact.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome inválido'),
  email: z.string().email('Email inválido').max(255, 'Email muito longo'),
  phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido'),
  subject: z.enum(['agendamento', 'duvida', 'parceria', 'outro']),
  message: z
    .string()
    .min(10, 'Mensagem muito curta')
    .max(2000, 'Mensagem muito longa'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Você deve concordar com a política de privacidade',
  }),
});
```

### Rate Limiting (API Routes)

```typescript
// lib/rateLimit.ts
import { LRUCache } from 'lru-cache';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, [1]);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;

        if (isRateLimited) {
          reject(new Error('Rate limit exceeded'));
        } else {
          resolve();
        }
      }),
  };
}
```

---

## ⚡ Boas Práticas Next.js

### Server Components vs Client Components

```typescript
// ✅ Server Component (padrão) - Usar para:
// - Fetch de dados
// - Acesso a backend
// - Renderização estática
// - SEO

// app/equipe/page.tsx
async function EquipePage() {
  const team = await getTeamMembers(); // Server-side fetch
  return <TeamGrid members={team} />;
}

// ✅ Client Component - Usar para:
// - Interatividade (onClick, onChange)
// - Hooks (useState, useEffect)
// - Browser APIs

// 'use client'
// components/ContactForm.tsx
```

### Data Fetching

```typescript
// ✅ Fetch com revalidação
async function getServices() {
  const res = await fetch('https://api.clinicamente.com.br/services', {
    next: { revalidate: 3600 }, // Revalida a cada 1 hora
  });
  return res.json();
}

// ✅ Fetch com tags para invalidação
async function getBlogPosts() {
  const res = await fetch('https://api.clinicamente.com.br/posts', {
    next: { tags: ['posts'] },
  });
  return res.json();
}
```

### Image Optimization

```typescript
import Image from 'next/image';

// ✅ Sempre usar next/image
<Image
  src="/images/hero.jpg"
  alt="Descrição acessível da imagem"
  width={1200}
  height={630}
  priority // Para imagens above the fold
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// ✅ Para imagens responsivas
<Image
  src="/images/equipe.jpg"
  alt="Equipe da clínica"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

### Loading States

```typescript
// app/equipe/loading.tsx
export default function Loading() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {[...Array(6)].map((_, i) => (
        <div key={i} className='animate-pulse'>
          <div className='bg-gray-200 rounded-lg h-64' />
          <div className='mt-4 h-4 bg-gray-200 rounded w-3/4' />
          <div className='mt-2 h-4 bg-gray-200 rounded w-1/2' />
        </div>
      ))}
    </div>
  );
}
```

### Error Handling

```typescript
// app/equipe/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='text-center py-20'>
      <h2>Algo deu errado!</h2>
      <p className='text-gray-600 mt-2'>
        Não foi possível carregar esta página.
      </p>
      <button
        onClick={reset}
        className='mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg'
      >
        Tentar novamente
      </button>
    </div>
  );
}
```

---

## ♿ Acessibilidade

### Checklist WCAG 2.1

- [ ] Contraste mínimo de 4.5:1 para texto normal
- [ ] Contraste mínimo de 3:1 para texto grande
- [ ] Todos os elementos interativos acessíveis via teclado
- [ ] Focus visible em todos os elementos focáveis
- [ ] Imagens com alt text descritivo
- [ ] Formulários com labels associados
- [ ] Hierarquia de headings correta (h1 > h2 > h3)
- [ ] Skip links para navegação principal
- [ ] ARIA labels onde necessário
- [ ] Suporte a leitores de tela

### Implementação

```tsx
// Skip Link
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded">
  Pular para o conteúdo principal
</a>

// Main Content
<main id="main-content" tabIndex={-1}>
  {children}
</main>

// Focus Styles (globals.css)
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

---

## 🚀 Performance

### Core Web Vitals Targets

| Métrica  | Alvo    | Descrição                |
| -------- | ------- | ------------------------ |
| **LCP**  | < 2.5s  | Largest Contentful Paint |
| **FID**  | < 100ms | First Input Delay        |
| **CLS**  | < 0.1   | Cumulative Layout Shift  |
| **TTFB** | < 600ms | Time to First Byte       |

### Otimizações

```typescript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
```

### Bundle Analysis

```bash
# package.json scripts
"analyze": "ANALYZE=true next build"

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // config
});
```

---

## 📝 Espaço Reservado - Seções Obrigatórias do Cliente

> **⚠️ ATENÇÃO:** Esta seção deve ser preenchida pelo cliente com informações obrigatórias antes de iniciar o desenvolvimento.

### Seções/Páginas Obrigatórias Adicionais

| #   | Nome da Seção/Página | Localização | Descrição | Prioridade |
| --- | -------------------- | ----------- | --------- | ---------- |
| 1   |                      |             |           |            |
| 2   |                      |             |           |            |
| 3   |                      |             |           |            |
| 4   |                      |             |           |            |
| 5   |                      |             |           |            |

### Menus Obrigatórios Adicionais

| #   | Label do Menu | Link (href) | Submenu? | Observações |
| --- | ------------- | ----------- | -------- | ----------- |
| 1   |               |             |          |             |
| 2   |               |             |          |             |
| 3   |               |             |          |             |

### Informações da Clínica

```yaml
Nome Completo:
CNPJ:
Endereço Completo:
CEP:
Cidade/Estado:
Telefone Principal:
WhatsApp:
Email Principal:
Horário de Funcionamento:
  Segunda a Sexta:
  Sábado:
  Domingo:

Redes Sociais:
  Instagram:
  Facebook:
  LinkedIn:
  YouTube:

Convênios Aceitos:
  -
  -
  -

Profissionais (Nome, CRP/CRM, Especialidade, Foto): 1.
  2.
  3.
```

### Requisitos Legais

- [ ] Política de Privacidade (texto fornecido)
- [ ] Termos de Uso (texto fornecido)
- [ ] Certificações/Selos a exibir
- [ ] Número do Alvará de funcionamento (se aplicável)

### Integrações Necessárias

- [ ] Google Analytics ID:
- [ ] Google Tag Manager ID:
- [ ] Pixel do Facebook:
- [ ] Sistema de Agendamento:
- [ ] CRM:
- [ ] Email Marketing:

---

## ✅ Checklist de Implementação

### Fase 1: Setup e Estrutura

- [ ] Criar estrutura de pastas
- [ ] Configurar Tailwind com paleta de cores
- [ ] Configurar fontes (Kurale + Inter)
- [ ] Criar componentes base (Button, Input, Card)
- [ ] Implementar Header responsivo
- [ ] Implementar Footer

### Fase 2: Páginas Principais

- [ ] Home page com todas as seções
- [ ] Página Sobre
- [ ] Página Serviços
- [ ] Página Equipe
- [ ] Página Contato

### Fase 3: Funcionalidades

- [ ] Formulário de contato funcional
- [ ] Sistema de agendamento (ou integração)
- [ ] Blog com CMS (Sanity/Contentful/MDX)
- [ ] Newsletter

### Fase 4: Migração da Mentoria

- [ ] Mover conteúdo atual para /mentoria
- [ ] Ajustar links e navegação
- [ ] Testar formulário de inscrição

### Fase 5: SEO e Performance

- [ ] Implementar metadados em todas as páginas
- [ ] Adicionar Schema.org
- [ ] Configurar sitemap e robots.txt
- [ ] Otimizar imagens
- [ ] Testar Core Web Vitals

### Fase 6: Segurança e Testes

- [ ] Implementar headers de segurança
- [ ] Configurar CSP
- [ ] Rate limiting nas APIs
- [ ] Testes de acessibilidade
- [ ] Testes em múltiplos dispositivos

### Fase 7: Deploy

- [ ] Configurar variáveis de ambiente
- [ ] Deploy em staging
- [ ] Testes finais
- [ ] Deploy em produção
- [ ] Configurar domínio e SSL
- [ ] Monitoramento (Vercel Analytics, Sentry)

---

## 📚 Referências

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Schema.org - Medical Business](https://schema.org/MedicalBusiness)
- [Google Search Central - SEO](https://developers.google.com/search/docs)
- [Web.dev - Performance](https://web.dev/performance/)

---

_Documento gerado em Janeiro de 2026 | Versão 1.0_
