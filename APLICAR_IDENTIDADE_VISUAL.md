# 🎨 Como Aplicar a Identidade Visual Completa da Eliane

## PASSO 1: Cores RGB do Manual

Quando receber as cores do Manual da Marca RÓTTI MÉTODO, abra `css/theme.css` e procure por:

```css
:root {
    /* PRIMARY COLORS - Studio Eliane Signature */
    --color-primary: #1a1a1a;              /* SUBSTITUIR */
    --color-primary-light: #2d2d2d;        /* SUBSTITUIR */
    --color-secondary: #D4A574;            /* SUBSTITUIR */
    --color-secondary-light: #E8C9A0;      /* SUBSTITUIR */

    /* ACCENT COLORS */
    --color-accent-warm: #c85d5d;          /* SUBSTITUIR */
    --color-accent-cool: #7a9b8e;          /* SUBSTITUIR */
    --color-accent-gold: #c9a961;          /* SUBSTITUIR */
}
```

**Cole os valores HEX exatos do manual.**

---

## PASSO 2: Logo PNG Profissional

Quando receber o nome do arquivo PNG do logo:

1. **Baixe da pasta "RGB" do Drive**
2. **Copie para:**
   ```
   assets/images/logo-rotti.png
   ```

3. **Atualize `index.html`:**
   ```html
   <img src="assets/images/logo-rotti.png" alt="RÓTTI MÉTODO - Studio Eliane Reis" class="logo" loading="lazy">
   ```

---

## PASSO 3: Marca d'Água

Para usar marca d'água em seções:

1. **Baixe PNG da pasta "MARCA D'ÁGUA"**
2. **Salve em:**
   ```
   assets/images/marca-dagua.png
   ```

3. **Adicione ao footer do HTML:**
   ```html
   <div class="watermark">
       <img src="assets/images/marca-dagua.png" alt="RÓTTI MÉTODO">
   </div>
   ```

---

## PASSO 4: Fotos da Eliane

Se tiver fotos da Eliane nos **Social Media** ou **CORTESIA**:

1. **Copie para:**
   ```
   assets/images/eliane-1.jpg
   assets/images/eliane-2.jpg
   assets/images/eliane-3.jpg
   assets/images/eliane-4.jpg
   ```

2. **Carregue em `js/fotos.js`:**
   ```javascript
   const ELIANE_GALLERY = [
       {
           id: 'gallery-1',
           title: 'Título',
           description: 'Descrição',
           image: 'assets/images/eliane-1.jpg',
           category: 'Categoria'
       },
       // ...
   ];
   ```

---

## PASSO 5: Tipografia

Se usar as fontes do manual:

1. **Baixe as fontes da pasta do Drive**
2. **Crie `assets/fonts/`**
3. **Adicione ao `css/typography.css`:**
   ```css
   @font-face {
       font-family: 'Inter';
       src: url('../assets/fonts/Inter.ttf') format('truetype');
       font-weight: 400;
   }

   body {
       font-family: 'Inter', sans-serif;
   }
   ```

---

## CHECKLIST FINAL

- [ ] Cores RGB/CMYK extraídas do Manual
- [ ] `css/theme.css` atualizado com cores exatas
- [ ] Logo PNG baixado e colocado em `assets/images/`
- [ ] `index.html` atualizado com novo logo
- [ ] Marca d'água (opcional) integrada
- [ ] Fotos da Eliane adicionadas em `assets/images/`
- [ ] `js/fotos.js` atualizado com URLs das fotos
- [ ] Tipografia atualizada (se necessário)
- [ ] Página recarregada no navegador
- [ ] Identidade visual verificada

---

## RESULTADO ESPERADO

Depois de seguir todos os passos:

✅ Logo profissional RÓTTI MÉTODO no header
✅ Cores exatas da marca em toda a interface
✅ Fotos da Eliane na galeria
✅ Tipografia oficial
✅ Marca d'água no footer
✅ 100% identidade visual da Eliane integrada!

---

**Aguardando dados do agente...** ⏳

Assim que chegar, aplicarei TUDO automaticamente! 🚀
