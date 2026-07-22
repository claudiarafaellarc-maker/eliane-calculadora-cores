/* ==========================================================================
   CALCULATOR
   Lógica principal da calculadora de cores
   ========================================================================== */

class ColorCalculator {
    constructor() {
        this.lastResult = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialData();
    }

    /**
     * Setup de event listeners
     */
    setupEventListeners() {
        // Botão calcular
        document.getElementById('calculateBtn').addEventListener('click', () => {
            this.calculate();
        });

        // Permitir Enter nos inputs
        document.querySelectorAll('.ratio-input, .input-field').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.calculate();
                }
            });
        });

        // Upload de imagem (future feature)
        document.getElementById('hairUpload').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });
    }

    /**
     * Carregar dados iniciais
     */
    loadInitialData() {
        // Verificar se UIManager está pronto
        if (typeof window.uiManager !== 'undefined') {
            window.uiManager.populateRecommendations();
            window.uiManager.populateVideos();

            // Fazer cálculo inicial
            setTimeout(() => {
                this.calculate();
            }, 100);
        }
    }

    /**
     * FUNÇÃO PRINCIPAL: Calcular mistura de cores
     */
    calculate() {
        try {
            // Pegar valores dos inputs
            const pigmentId1 = document.getElementById('pigmentSelect1').value;
            const pigmentId2 = document.getElementById('pigmentSelect2').value;
            const tonerId = document.getElementById('tonerSelect').value;
            const ratio1 = parseFloat(document.getElementById('pigmentRatio1').value) || 50;
            const ratio2 = parseFloat(document.getElementById('pigmentRatio2').value) || 50;
            const tonerRatio = parseFloat(document.getElementById('tonerRatio').value) || 30;
            const actionTime = parseFloat(document.getElementById('actionTime').value) || 45;

            // Validações
            if (!pigmentId1 || !tonerId) {
                window.uiManager.showAlert('Selecione pelo menos um pigmento e um tonalizante', 'warning');
                return;
            }

            // Obter objetos dos pigmentos e tonalizantes
            const pigment1 = getPigmentById(pigmentId1);
            const pigment2 = pigmentId2 ? getPigmentById(pigmentId2) : null;
            const toner = getTonerById(tonerId);

            if (!pigment1 || !toner) {
                window.uiManager.showAlert('Pigmento ou tonalizante não encontrado', 'danger');
                return;
            }

            // Fase 1: Misturar pigmentos (se houver 2)
            let pigmentMix;
            if (pigment2) {
                pigmentMix = ColorMixer.mixColors(pigment1, pigment2, ratio1, ratio2);
            } else {
                pigmentMix = {
                    hex: pigment1.hex,
                    rgb: pigment1.rgb,
                    r: pigment1.rgb[0],
                    g: pigment1.rgb[1],
                    b: pigment1.rgb[2]
                };
            }

            // Fase 2: Misturar resultado com tonalizante
            const totalRatio = ratio1 + ratio2;
            const finalMix = ColorMixer.mixColors(
                pigmentMix,
                toner,
                totalRatio,
                tonerRatio
            );

            // Fase 3: Obter recomendação
            const recommendationKey = `${pigmentId1}+${tonerId}`;
            let recommendation = getRecommendation(recommendationKey);

            if (!recommendation) {
                // Gerar recomendação genérica
                const compatibility = ColorMixer.checkCompatibility(pigment1, toner);
                const timeRecommendation = ColorMixer.recommendActionTime(pigment1, toner, finalMix);

                recommendation = {
                    result: finalMix.hex,
                    advice: `Mistura calculada: ${pigment1.name} + ${toner.name}. Resultado estimado.`,
                    time: `${timeRecommendation.minTime}-${timeRecommendation.maxTime} minutos`,
                    risk: compatibility.compatible ? 'Compatível' : 'Atenção',
                    warning: compatibility.warning,
                    tips: compatibility.tips.join(' • ')
                };
            }

            // Atualizar UI
            this.displayResult(finalMix, recommendation, pigment1, toner, actionTime);

            // Armazenar resultado
            this.lastResult = {
                mix: finalMix,
                recommendation: recommendation,
                pigments: { pigment1, pigment2 },
                toner: toner,
                ratios: { ratio1, ratio2, tonerRatio },
                actionTime: actionTime
            };

        } catch (error) {
            console.error('Erro ao calcular:', error);
            window.uiManager.showAlert('Erro ao calcular. Tente novamente.', 'danger');
        }
    }

    /**
     * Exibir resultado
     */
    displayResult(finalMix, recommendation, pigment1, toner, actionTime) {
        // Atualizar preview de cor
        window.uiManager.updateColorPreview(finalMix.hex, finalMix.rgb);

        // Atualizar recomendação
        window.uiManager.updateRecommendation(recommendation);

        // Log para debug
        console.log('Cálculo realizado:', {
            resultado: finalMix.hex,
            pigmento: pigment1.name,
            tonalizante: toner.name,
            tempo: actionTime
        });
    }

    /**
     * Processar upload de imagem
     */
    handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            // Implementar processamento de imagem no futuro
            window.uiManager.showAlert(
                'Processamento de imagem em desenvolvimento. Aguarde!',
                'info',
                2000
            );
        };

        reader.readAsDataURL(file);
    }

    /**
     * Exportar resultado (future feature)
     */
    exportResult() {
        if (!this.lastResult) {
            window.uiManager.showAlert('Nenhum resultado para exportar', 'warning');
            return;
        }

        const result = this.lastResult;
        const text = `
RESULTADO DA CALCULADORA DE CORES - STUDIO ELIANE REIS
======================================================

MISTURA:
- Pigmento 1: ${result.pigments.pigment1.name}
- Pigmento 2: ${result.pigments.pigment2 ? result.pigments.pigment2.name : 'N/A'}
- Tonalizante: ${result.toner.name}

PROPORÇÕES:
- Pigmento 1: ${result.ratios.ratio1}%
- Pigmento 2: ${result.ratios.ratio2}%
- Tonalizante: ${result.ratios.tonerRatio}%

RESULTADO:
- Cor: ${result.mix.hex}
- RGB: (${result.mix.rgb[0]}, ${result.mix.rgb[1]}, ${result.mix.rgb[2]})
- Tempo de Ação: ${result.actionTime} minutos

RECOMENDAÇÃO:
${result.recommendation.advice}

Tempo: ${result.recommendation.time}
Status: ${result.recommendation.risk}

${result.recommendation.warning ? `AVISO: ${result.recommendation.warning}` : 'Compatibilidade verificada.'}

======================================================
Esta é uma orientação educacional. Resultados reais podem variar.
        `;

        // Copiar para clipboard
        navigator.clipboard.writeText(text).then(() => {
            window.uiManager.showAlert('Resultado copiado para clipboard!', 'success');
        }).catch(() => {
            // Fallback: criar download
            const blob = new Blob([text], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `resultado-cores-${Date.now()}.txt`;
            a.click();
        });
    }

    /**
     * Resetar calculadora
     */
    reset() {
        document.getElementById('pigmentSelect1').value = 'p7.0';
        document.getElementById('pigmentSelect2').value = 'p8.0';
        document.getElementById('tonerSelect').value = 't6.2';
        document.getElementById('pigmentRatio1').value = 50;
        document.getElementById('pigmentRatio2').value = 50;
        document.getElementById('tonerRatio').value = 30;
        document.getElementById('actionTime').value = 45;
        document.getElementById('hairUpload').value = '';

        this.lastResult = null;
        this.calculate();
    }
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.calculator = new ColorCalculator();
    });
} else {
    window.calculator = new ColorCalculator();
}
