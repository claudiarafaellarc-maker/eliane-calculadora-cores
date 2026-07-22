# 🎨 Calculadora de Cores - Studio Eliane Reis

Ferramenta web responsiva para calcular misturas de pigmentos e tonalizantes em colorimetria capilar.

## ✨ Características

- **Calculadora Inteligente**: Misture pigmentos e tonalizantes com proporções customizáveis
- **Preview em Tempo Real**: Visualização circular da cor resultante
- **Recomendações da Eliane**: Dicas e avisos baseados na mistura
- **Indicações de Produtos**: Seção com produtos recomendados com desconto
- **Biblioteca de Vídeos**: Tutoriais e dicas de colorimetria
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Sem Dependências Externas**: Vanilla JavaScript puro e leve

## 🚀 Quick Start

### 1. Abrir Localmente

Simplesmente abra o arquivo `index.html` em um navegador moderno:

```bash
# No macOS
open index.html

# Ou use um servidor local (Python)
python3 -m http.server 8000
# Depois acesse: http://localhost:8000
```

### 2. Deploy em Cloudflare Pages

#### Opção A: Git + GitHub

1. Faça push do repositório para GitHub
2. Acesse [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Vá para **Pages** → **Create a project** → **Connect to Git**
4. Selecione o repositório
5. Configure:
   - **Production branch**: `main`
   - **Build command**: deixe vazio (é conteúdo estático)
   - **Build output directory**: `.` (raiz)

#### Opção B: Direct Upload

1. Comprima a pasta do projeto
2. No Cloudflare Pages, faça upload direto
3. Pronto! Sua aplicação estará online

#### Opção C: Wrangler CLI

```bash
# Instalar Wrangler
npm install -g wrangler

# Fazer login
wrangler login

# Deploy
wrangler pages deploy .
```

## 📁 Estrutura de Arquivos

```
eliane-calculadora-cores/
├── index.html              # Página principal (estrutura HTML)
├── css/
│   ├── reset.css          # Reset de estilos
│   ├── theme.css          # Paleta de cores e variáveis
│   ├── typography.css     # Tipografia (Montserrat)
│   ├── layout.css         # Grid e layout responsivo
│   └── components.css     # Estilos de componentes
├── js/
│   ├── data.js            # Catálogo de pigmentos/tonalizantes
│   ├── colorMixer.js      # Algoritmo de mistura RGB
│   ├── uiManager.js       # Gerenciador de UI (abas, popups)
│   ├── calculator.js      # Lógica principal da calculadora
│   └── main.js            # Inicialização e utils
├── assets/
│   ├── images/            # Fotos, logo, etc
│   └── icons/             # Ícones SVG
└── README.md              # Este arquivo
```

## 🎯 Como Usar

### 1. Selecionar Pigmentos
- Escolha até 2 pigmentos diferentes
- Ajuste as proporções com os sliders (%)
- Valores padrão: 50% cada

### 2. Selecionar Tonalizante
- Escolha um tonalizante para neutralizar/colorir
- Ajuste a proporção
- Valor padrão: 30%

### 3. Ver Resultado
- O preview circular mostra a cor resultante
- Veja a recomendação da Eliane
- Leia avisos de compatibilidade

### 4. Explorar Outras Abas
- **Indicações**: Produtos recomendados com desconto
- **Vídeos**: Tutoriais e dicas da Eliane

## 🎨 Customização

### Alterar Cores da Marca

Edite `css/theme.css` e procure por `:root`:

```css
:root {
    --color-primary: #1a1a1a;           /* Preto elegante */
    --color-secondary: #D4A574;         /* Louro médio */
    /* ... mais cores ... */
}
```

### Adicionar/Editar Pigmentos

Edite `js/data.js`:

```javascript
const PIGMENTS = [
    {
        id: 'p7.0',
        name: 'Louro Médio Natural',
        level: 7,
        hex: '#D4A574',
        rgb: [212, 165, 116],
        category: 'Natural',
        description: 'Louro médio neutro e elegante'
    },
    // Adicione mais...
];
```

### Adicionar Links de Afiliados

Edite `js/data.js` - seção `CARE_PRODUCTS`:

```javascript
const CARE_PRODUCTS = [
    {
        id: 'care-1',
        name: 'Nome do Produto',
        description: 'Descrição curta',
        discount: '15% com código ELIANE',
        link: 'https://seu-link-de-afiliado.com',
        category: 'Hair Care',
        icon: '🧴'
    },
    // Adicione mais...
];
```

### Adicionar Vídeos

Edite `js/data.js` - seção `VIDEOS`:

```javascript
const VIDEOS = [
    {
        id: 'video-1',
        title: 'Título do Vídeo',
        description: 'Descrição breve',
        url: 'https://www.youtube.com/embed/VIDEO_ID',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg'
    },
    // Adicione mais...
];
```

## 🔍 Debug

Abra o console do navegador e use:

```javascript
// Ver dados carregados
DEBUG.showData()

// Ver último cálculo
DEBUG.showCalculation()

// Testar algoritmo de mistura
DEBUG.testColorMixer()
```

## 📊 Dados Técnicos

### Sistema de Níveis de Pigmento
- **1-2**: Pretos e castanhos muito escuros
- **3-4**: Castanhos escuros a médios
- **5-6**: Castanhos claros a louros escuros
- **7-8**: Louros médios a claros
- **9-10**: Louros muito claros a platinados

### Algoritmo de Mistura
- Usa interpolação RGB ponderada
- Não é ciência exata (sempre mostrar disclaimer)
- Baseado em proporções de mistura

## ⚠️ Disclaimer Importante

Esta ferramenta é uma **orientação educacional**. Os resultados calculados são estimativas baseadas em teoria de cores RGB. Resultados reais podem variar significativamente dependendo de:

- Qualidade e concentração dos pigmentos
- Técnica de aplicação profissional
- Tipo de cabelo e histórico de coloração
- Tempo de ação
- Temperatura ambiente

**Sempre fazer teste de mecha antes de aplicar em todo o cabelo.**

## 🛠️ Desenvolvimento

### Adicionar Nova Funcionalidade

1. Identifique em qual arquivo pertence (data.js, colorMixer.js, etc)
2. Adicione a função
3. Teste no console (DEBUG)
4. Integre na UI (uiManager.js ou calculator.js)

### Melhorias Futuras

- [ ] Upload de imagem de fio de cabelo para simulação
- [ ] Histórico de cálculos salvos
- [ ] Exportar resultado em PDF
- [ ] Dark mode
- [ ] Integração com API de produtos
- [ ] Análise de cor de foto automática

## 🌐 Deployment Checklist

Antes de ir ao ar:

- [ ] Alterar cores para paleta exata da Eliane (RGB/CMYK)
- [ ] Adicionar logo em `assets/images/logo.png`
- [ ] Adicionar links de afiliados reais em `CARE_PRODUCTS`
- [ ] Adicionar URLs reais dos vídeos em `VIDEOS`
- [ ] Testar em mobile (iPhone, Android)
- [ ] Testar em diferentes navegadores
- [ ] Verificar acessibilidade (keyboard navigation)
- [ ] Setup de domínio customizado no Cloudflare
- [ ] Adicionar analytics (Google Analytics, etc)

## 📞 Suporte

Para questões sobre uso da ferramenta, contate:
- Instagram: [@studioelianereis](https://www.instagram.com/studioelianereis/)
- Email: Adicionar email de contato

## 📄 Licença

© 2026 Studio Eliane Reis. Todos os direitos reservados.

Desenvolvido com ❤️ por Claude Code

---

**Versão**: 1.0.0  
**Última atualização**: 22 de julho de 2026
