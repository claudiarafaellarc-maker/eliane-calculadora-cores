/* ==========================================================================
   UI MANAGER
   Gerenciamento de interface, abas, popups, etc
   ========================================================================== */

class UIManager {
    constructor() {
        this.currentTab = 'calculator';
        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.setupSelects();
        this.setupColorInputs();
    }

    /**
     * Configurar navegação de abas
     */
    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.switchTab(tabName);
            });
        });
    }

    /**
     * Alternar aba ativa
     */
    switchTab(tabName) {
        // Remover classe active de todas as abas
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });

        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Ativar aba selecionada
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.querySelector(`#${tabName}`).classList.add('active');

        this.currentTab = tabName;
    }

    /**
     * Popular dropdowns de pigmentos e tonalizantes
     */
    setupSelects() {
        const pigmentSelects = [
            document.getElementById('pigmentSelect1'),
            document.getElementById('pigmentSelect2')
        ];

        const tonerSelect = document.getElementById('tonerSelect');

        // Preencher pigmentos
        pigmentSelects.forEach(select => {
            PIGMENTS.forEach(pigment => {
                const option = document.createElement('option');
                option.value = pigment.id;
                option.textContent = `${pigment.name} (${pigment.level})`;
                select.appendChild(option);
            });
        });

        // Preencher tonalizantes
        TONERS.forEach(toner => {
            const option = document.createElement('option');
            option.value = toner.id;
            option.textContent = `${toner.name} (${toner.level})`;
            tonerSelect.appendChild(option);
        });

        // Selecionar defaults
        document.getElementById('pigmentSelect1').value = 'p7.0';
        document.getElementById('pigmentSelect2').value = 't6.2';
        document.getElementById('tonerSelect').value = 't6.2';
    }

    /**
     * Setup de inputs de cor
     */
    setupColorInputs() {
        const colorPicker = document.getElementById('targetColor');
        const colorCodeInput = document.getElementById('targetColorCode');
        const colorPreviewBox = document.getElementById('colorPreviewBox');

        // Clique na caixa abre o color picker
        colorPreviewBox.addEventListener('click', () => {
            colorPicker.click();
        });

        // Mudar cor no picker atualiza caixa e código
        colorPicker.addEventListener('input', (e) => {
            const color = e.target.value;
            colorCodeInput.value = color;
            colorPreviewBox.style.backgroundColor = color;
        });

        // Mudar código atualiza picker e caixa
        colorCodeInput.addEventListener('change', (e) => {
            const hex = e.target.value;
            if (/^#[0-9A-F]{6}$/i.test(hex)) {
                colorPicker.value = hex;
                colorPreviewBox.style.backgroundColor = hex;
            }
        });
    }

    /**
     * Atualizar preview circular de cor
     */
    updateColorPreview(hex, rgb) {
        const canvas = document.getElementById('colorPreviewCanvas');
        const ctx = canvas.getContext('2d');

        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Desenhar fundo cinzento
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Desenhar círculo de cor
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;

        ctx.fillStyle = hex;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();

        // Desenhar borda
        ctx.strokeStyle = '#d0d0d0';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Atualizar valores
        document.getElementById('resultHex').textContent = hex;
        document.getElementById('resultRgb').textContent = `RGB(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }

    /**
     * Atualizar recomendação da Eliane
     */
    updateRecommendation(recommendation) {
        const recommendationBox = document.getElementById('recommendationBox');
        const compatibilityAlert = document.getElementById('compatibilityAlert');
        const riskWarning = document.getElementById('riskWarning');

        if (!recommendation) {
            recommendationBox.innerHTML = '<p>Selecione os ingredientes para receber uma recomendação</p>';
            compatibilityAlert.style.display = 'none';
            riskWarning.style.display = 'none';
            return;
        }

        // Atualizar conselho
        let adviceHTML = `
            <p><strong>💄 ${recommendation.advice}</strong></p>
            <p><span class="recommendation-highlight">⏱️ Tempo de ação:</span> ${recommendation.time}</p>
            ${recommendation.tips ? `<p>${recommendation.tips}</p>` : ''}
        `;

        recommendationBox.innerHTML = adviceHTML;

        // Mostrar alerta de compatibilidade
        compatibilityAlert.style.display = 'flex';

        // Mostrar aviso se houver
        if (recommendation.warning) {
            riskWarning.innerHTML = `<strong>⚠️ Atenção:</strong> ${recommendation.warning}`;
            riskWarning.style.display = 'flex';
        } else {
            riskWarning.style.display = 'none';
        }
    }

    /**
     * Mostrar alerta
     */
    showAlert(message, type = 'info', duration = 3000) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.innerHTML = `<strong>${type.toUpperCase()}:</strong> ${message}`;
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.maxWidth = '400px';
        alertDiv.style.zIndex = 'var(--z-tooltip)';

        document.body.appendChild(alertDiv);

        if (duration) {
            setTimeout(() => {
                alertDiv.remove();
            }, duration);
        }

        return alertDiv;
    }

    /**
     * Popular seção de indicações
     */
    populateRecommendations() {
        const pigmentsGrid = document.getElementById('pigmentsGrid');
        const tonersGrid = document.getElementById('tonersGrid');
        const careGrid = document.getElementById('careGrid');

        // Limpar grids
        pigmentsGrid.innerHTML = '';
        tonersGrid.innerHTML = '';
        careGrid.innerHTML = '';

        // Popular pigmentos
        PIGMENTS.forEach(pigment => {
            const card = this.createProductCard(pigment);
            pigmentsGrid.appendChild(card);
        });

        // Popular tonalizantes
        TONERS.forEach(toner => {
            const card = this.createProductCard(toner);
            tonersGrid.appendChild(card);
        });

        // Popular produtos de cuidado
        CARE_PRODUCTS.forEach(product => {
            const card = this.createCareProductCard(product);
            careGrid.appendChild(card);
        });
    }

    /**
     * Criar card de produto
     */
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image" style="background-color: ${product.hex}; border: 2px solid #d0d0d0;"></div>
            <h4 class="product-name">${product.name}</h4>
            <p class="product-description">${product.description}</p>
            <p class="product-discount">${product.category} - Nível ${product.level}</p>
        `;
        return card;
    }

    /**
     * Criar card de produto de cuidado
     */
    createCareProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div style="font-size: 48px; text-align: center; padding: var(--space-6);">${product.icon}</div>
            <h4 class="product-name">${product.name}</h4>
            <p class="product-description">${product.description}</p>
            <p class="product-discount">${product.discount}</p>
            <a href="${product.link}" class="product-link">Ver mais →</a>
        `;
        return card;
    }

    /**
     * Popular seção de vídeos
     */
    populateVideos() {
        const videosGrid = document.getElementById('videosGrid');
        videosGrid.innerHTML = '';

        VIDEOS.forEach(video => {
            const card = this.createVideoCard(video);
            videosGrid.appendChild(card);
        });
    }

    /**
     * Criar card de vídeo
     */
    createVideoCard(video) {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <div style="position: relative;">
                <img
                    src="${video.thumbnail}"
                    alt="${video.title}"
                    class="video-thumbnail"
                    loading="lazy"
                    onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%23e0e0e0%22 width=%22400%22 height=%22200%22/%3E%3C/svg%3E'"
                />
                <div class="video-play-icon" onclick="window.open('${video.url}', '_blank')">▶</div>
            </div>
            <div class="video-content">
                <h4 class="video-title">${video.title}</h4>
                <p class="video-description">${video.description}</p>
            </div>
        `;
        return card;
    }

    /**
     * Desabilitar/habilitar inputs
     */
    setFormDisabled(disabled) {
        document.querySelectorAll('input, select').forEach(el => {
            el.disabled = disabled;
        });
    }

    /**
     * Mostrar spinner de carregamento
     */
    showLoading(show = true) {
        const button = document.getElementById('calculateBtn');
        if (show) {
            button.disabled = true;
            button.innerHTML = '<span class="loader"></span> Calculando...';
        } else {
            button.disabled = false;
            button.innerHTML = 'Calcular Resultado';
        }
    }
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.uiManager = new UIManager();
    });
} else {
    window.uiManager = new UIManager();
}
