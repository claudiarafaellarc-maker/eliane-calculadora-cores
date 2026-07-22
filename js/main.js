/* ==========================================================================
   MAIN
   Inicialização da aplicação
   ========================================================================== */

// Esperar DOM estar pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Calculadora de Cores - Studio Eliane Reis');
    console.log('Versão 1.0');

    // Verificar suporte a funcionalidades necessárias
    checkBrowserSupport();

    // Inicializar aplicação
    initializeApp();
});

/**
 * Verificar suporte de navegador
 */
function checkBrowserSupport() {
    const warnings = [];

    // Canvas
    if (!document.createElement('canvas').getContext) {
        warnings.push('Canvas não suportado');
    }

    // FileReader
    if (typeof FileReader === 'undefined') {
        warnings.push('FileReader não suportado');
    }

    // Clipboard API
    if (!navigator.clipboard) {
        console.warn('Clipboard API não disponível - export com fallback');
    }

    if (warnings.length > 0) {
        console.warn('⚠️ Funcionalidades limitadas:', warnings);
    }
}

/**
 * Inicializar aplicação
 */
function initializeApp() {
    // Verificar se os scripts foram carregados
    if (typeof ColorMixer === 'undefined') {
        console.error('❌ ColorMixer não carregado');
        return;
    }

    if (typeof PIGMENTS === 'undefined' || typeof TONERS === 'undefined') {
        console.error('❌ Dados não carregados');
        return;
    }

    console.log('✅ UIManager inicializado');
    console.log(`✅ ${PIGMENTS.length} pigmentos carregados`);
    console.log(`✅ ${TONERS.length} tonalizantes carregados`);
    console.log('✅ Calculadora pronta para usar');

    // Detectar suporte a localStorage
    if (typeof localStorage !== 'undefined') {
        setupLocalStorage();
    }

    // Setup de atalhos de teclado
    setupKeyboardShortcuts();

    // Setup de analytics (opcional)
    setupAnalytics();
}

/**
 * Setup localStorage para salvae histórico
 */
function setupLocalStorage() {
    window.saveCalculation = (calculation) => {
        try {
            const history = JSON.parse(localStorage.getItem('colorCalculatorHistory') || '[]');
            history.unshift({
                ...calculation,
                timestamp: new Date().toISOString()
            });

            // Manter apenas últimas 10 cálculos
            if (history.length > 10) {
                history.pop();
            }

            localStorage.setItem('colorCalculatorHistory', JSON.stringify(history));
        } catch (e) {
            console.warn('Erro ao salvar histórico:', e);
        }
    };

    window.getCalculationHistory = () => {
        try {
            return JSON.parse(localStorage.getItem('colorCalculatorHistory') || '[]');
        } catch (e) {
            return [];
        }
    };

    window.clearCalculationHistory = () => {
        localStorage.removeItem('colorCalculatorHistory');
    };
}

/**
 * Setup de atalhos de teclado
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter para calcular
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (window.calculator) {
                window.calculator.calculate();
            }
        }

        // Ctrl/Cmd + R para resetar
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            if (window.calculator) {
                window.calculator.reset();
            }
        }

        // Ctrl/Cmd + E para exportar
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            if (window.calculator) {
                window.calculator.exportResult();
            }
        }
    });
}

/**
 * Setup de analytics (opcional)
 */
function setupAnalytics() {
    window.trackEvent = (eventName, data = {}) => {
        console.log(`📊 Event: ${eventName}`, data);

        // Aqui você pode adicionar Google Analytics, Mixpanel, etc
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', eventName, data);
        // }
    };

    // Rastrear calculações
    const originalCalculate = window.calculator?.calculate;
    if (originalCalculate) {
        window.calculator.calculate = function() {
            originalCalculate.call(this);
            if (this.lastResult) {
                window.trackEvent('color_calculated', {
                    pigment: this.lastResult.pigments.pigment1.name,
                    toner: this.lastResult.toner.name,
                    result_hex: this.lastResult.mix.hex
                });
            }
        };
    }
}

/**
 * Função global para debug
 */
window.DEBUG = {
    showData: () => {
        console.table({
            pigments: PIGMENTS.length,
            toners: TONERS.length,
            recommendations: Object.keys(RECOMMENDATIONS).length
        });
    },
    showCalculation: () => {
        if (window.calculator?.lastResult) {
            console.log('Último cálculo:', window.calculator.lastResult);
        } else {
            console.log('Nenhum cálculo realizado');
        }
    },
    testColorMixer: () => {
        const result = ColorMixer.mixColors(
            PIGMENTS[6], // p7.0
            TONERS[3],   // t6.2
            50,
            50
        );
        console.log('Teste de mistura:', result);
        return result;
    },
    exportConsole: () => {
        console.log('%c Studio Eliane Reis - Calculadora de Cores', 'font-size: 16px; font-weight: bold; color: #D4A574;');
        console.log('Use window.DEBUG para acessar funções de debug');
        console.log('Disponíveis:');
        console.log('  - DEBUG.showData() - Ver dados carregados');
        console.log('  - DEBUG.showCalculation() - Ver último cálculo');
        console.log('  - DEBUG.testColorMixer() - Testar algoritmo');
    }
};

// Mostrar info de debug ao carregar
window.DEBUG.exportConsole();

// Versão da aplicação
window.APP_VERSION = '1.0.0';
window.APP_NAME = 'Calculadora de Cores - Studio Eliane Reis';
