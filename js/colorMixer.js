/* ==========================================================================
   COLOR MIXER
   Algoritmo de mistura RGB com interpolação ponderada
   ========================================================================== */

class ColorMixer {
    /**
     * Converte RGB para HEX
     * @param {number} r - Valor vermelho (0-255)
     * @param {number} g - Valor verde (0-255)
     * @param {number} b - Valor azul (0-255)
     * @returns {string} Código HEX (ex: #FFFFFF)
     */
    static rgbToHex(r, g, b) {
        r = Math.max(0, Math.min(255, Math.round(r)));
        g = Math.max(0, Math.min(255, Math.round(g)));
        b = Math.max(0, Math.min(255, Math.round(b)));

        const toHex = (val) => {
            const hex = val.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    }

    /**
     * Converte HEX para RGB
     * @param {string} hex - Código HEX (ex: #FFFFFF ou FFFFFF)
     * @returns {Object} {r, g, b}
     */
    static hexToRgb(hex) {
        hex = hex.replace('#', '').trim();

        if (hex.length === 3) {
            // Expandir formato curto (#FFF -> #FFFFFF)
            hex = hex.split('').map(c => c + c).join('');
        }

        const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    /**
     * Mistura duas cores com proporção ponderada
     * @param {Object} color1 - {hex, rgb}
     * @param {Object} color2 - {hex, rgb}
     * @param {number} ratio1 - Proporção da cor1 (0-100)
     * @param {number} ratio2 - Proporção da cor2 (0-100)
     * @returns {Object} {hex, rgb}
     */
    static mixColors(color1, color2, ratio1 = 50, ratio2 = 50) {
        // Normalizar proporções
        const total = ratio1 + ratio2;
        const w1 = ratio1 / total;
        const w2 = ratio2 / total;

        // Converter para RGB se necessário
        const rgb1 = color1.rgb || this.hexToRgb(color1.hex);
        const rgb2 = color2.rgb || this.hexToRgb(color2.hex);

        // Misturar usando média ponderada
        const resultRgb = {
            r: Math.round(rgb1.r * w1 + rgb2.r * w2),
            g: Math.round(rgb1.g * w1 + rgb2.g * w2),
            b: Math.round(rgb1.b * w1 + rgb2.b * w2)
        };

        const resultHex = this.rgbToHex(resultRgb.r, resultRgb.g, resultRgb.b);

        return {
            hex: resultHex,
            rgb: [resultRgb.r, resultRgb.g, resultRgb.b],
            r: resultRgb.r,
            g: resultRgb.g,
            b: resultRgb.b
        };
    }

    /**
     * Mistura múltiplas cores
     * @param {Array} colors - [{hex/rgb, proportion}]
     * @returns {Object} {hex, rgb}
     */
    static mixMultiple(colors) {
        if (colors.length === 0) return { hex: '#FFFFFF', rgb: [255, 255, 255] };
        if (colors.length === 1) {
            const c = colors[0];
            const rgb = c.rgb || this.hexToRgb(c.hex);
            return { hex: c.hex, rgb };
        }

        // Normalizar proporções
        const total = colors.reduce((sum, c) => sum + (c.proportion || 1), 0);
        const weights = colors.map(c => (c.proportion || 1) / total);

        // Calcular média ponderada
        let r = 0, g = 0, b = 0;

        colors.forEach((color, index) => {
            const rgb = color.rgb || this.hexToRgb(color.hex);
            r += rgb.r * weights[index];
            g += rgb.g * weights[index];
            b += rgb.b * weights[index];
        });

        const resultHex = this.rgbToHex(r, g, b);

        return {
            hex: resultHex,
            rgb: [Math.round(r), Math.round(g), Math.round(b)],
            r: Math.round(r),
            g: Math.round(g),
            b: Math.round(b)
        };
    }

    /**
     * Calcula luminância (brilho) de uma cor
     * @param {string} hex - Código HEX
     * @returns {number} Luminância (0-1)
     */
    static getLuminance(hex) {
        const rgb = this.hexToRgb(hex);
        return (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    }

    /**
     * Calcula contraste entre duas cores (WCAG)
     * @param {string} hex1
     * @param {string} hex2
     * @returns {number} Razão de contraste (1-21)
     */
    static getContrast(hex1, hex2) {
        const l1 = this.getLuminance(hex1);
        const l2 = this.getLuminance(hex2);

        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);

        return (lighter + 0.05) / (darker + 0.05);
    }

    /**
     * Verifica compatibilidade entre pigmento e tonalizante
     * @param {Object} pigment
     * @param {Object} toner
     * @returns {Object} {compatible, warning, tips}
     */
    static checkCompatibility(pigment, toner) {
        const pigmentLevel = pigment.level || 7;
        const tonerLevel = toner.level || 6;
        const levelDiff = Math.abs(pigmentLevel - tonerLevel);

        let compatible = true;
        let warning = null;
        let tips = [];

        // Avisos baseado na diferença de níveis
        if (levelDiff > 3) {
            warning = 'Grande diferença de níveis. Resultado pode não ser previsível.';
            tips.push('Considere usar pigmento mais próximo do tonalizante');
        }

        // Avisos por categoria
        if (pigment.category === toner.category) {
            tips.push(`Ambos são ${pigment.category}. Resultado coerente e previsível.`);
        }

        // Avisos específicos para tons muito claros
        if (pigmentLevel <= 2 && tonerLevel >= 7) {
            warning = 'Mistura extrema. Compatibilidade questionável.';
        }

        return {
            compatible,
            warning,
            tips,
            compatibility: Math.max(0, 100 - levelDiff * 5)
        };
    }

    /**
     * Simula aplicação em uma imagem (placeholder para futuro)
     * @param {string} imageUrl - URL da imagem
     * @param {string} resultHex - Cor resultante
     * @returns {Promise} Promessa para processamento da imagem
     */
    static async simulateOnImage(imageUrl, resultHex) {
        // Implementar später com Canvas API
        return {
            status: 'pending',
            message: 'Simulação de imagem em desenvolvimento'
        };
    }

    /**
     * Recomenda tempo de ação baseado em pigmento e tonalizante
     * @param {Object} pigment
     * @param {Object} toner
     * @param {Object} mixResult
     * @returns {Object} {minTime, maxTime, recommendation}
     */
    static recommendActionTime(pigment, toner, mixResult) {
        let minTime = 20;
        let maxTime = 45;

        // Ajustar baseado no nível
        const avgLevel = (pigment.level + toner.level) / 2;

        if (avgLevel <= 3) {
            minTime = 35;
            maxTime = 50;
        } else if (avgLevel >= 8) {
            minTime = 15;
            maxTime = 25;
        }

        let recommendation = `Tempo recomendado: ${minTime}-${maxTime} minutos`;

        return {
            minTime,
            maxTime,
            recommendation
        };
    }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ColorMixer;
}
