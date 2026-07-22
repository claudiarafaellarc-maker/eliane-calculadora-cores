/* ==========================================================================
   DADOS: Catálogo de Pigmentos, Tonalizantes e Recomendações
   ========================================================================== */

const PIGMENTS = [
    {
        id: 'p1.0',
        name: 'Preto Profundo',
        level: 1,
        hex: '#1a1a1a',
        rgb: [26, 26, 26],
        category: 'Natural',
        description: 'Tom mais escuro, ideal para cobertura total'
    },
    {
        id: 'p2.0',
        name: 'Castanho Muito Escuro',
        level: 2,
        hex: '#2d1810',
        rgb: [45, 24, 16],
        category: 'Natural',
        description: 'Castanho muito escuro com reflexos quentes'
    },
    {
        id: 'p3.0',
        name: 'Castanho Escuro',
        level: 3,
        hex: '#3d2817',
        rgb: [61, 40, 23],
        category: 'Natural',
        description: 'Castanho clássico e profundo'
    },
    {
        id: 'p4.0',
        name: 'Castanho',
        level: 4,
        hex: '#5a3a23',
        rgb: [90, 58, 35],
        category: 'Natural',
        description: 'Castanho neutro e versátil'
    },
    {
        id: 'p5.0',
        name: 'Castanho Claro',
        level: 5,
        hex: '#6d4c3d',
        rgb: [109, 76, 61],
        category: 'Natural',
        description: 'Castanho claro com reflexos naturais'
    },
    {
        id: 'p6.0',
        name: 'Louro Escuro',
        level: 6,
        hex: '#8b6f47',
        rgb: [139, 111, 71],
        category: 'Natural',
        description: 'Primeiro louro com presença'
    },
    {
        id: 'p7.0',
        name: 'Louro Médio Natural',
        level: 7,
        hex: '#D4A574',
        rgb: [212, 165, 116],
        category: 'Natural',
        description: 'Louro médio neutro e elegante'
    },
    {
        id: 'p8.0',
        name: 'Louro Claro',
        level: 8,
        hex: '#E8C9A0',
        rgb: [232, 201, 160],
        category: 'Natural',
        description: 'Louro claro com luminosidade'
    },
    {
        id: 'p9.0',
        name: 'Louro Muito Claro',
        level: 9,
        hex: '#F5E6D3',
        rgb: [245, 230, 211],
        category: 'Natural',
        description: 'Louro muito claro, praticamente platinado'
    },
    {
        id: 'p10.0',
        name: 'Branco Platinado',
        level: 10,
        hex: '#F9F6F0',
        rgb: [249, 246, 240],
        category: 'Natural',
        description: 'Louro platinado ultra claro'
    }
];

const TONERS = [
    {
        id: 't1.0',
        name: 'Cinza Profundo',
        level: 1,
        hex: '#6B6B6B',
        rgb: [107, 107, 107],
        category: 'Ash',
        description: 'Tom acinzentado forte'
    },
    {
        id: 't2.0',
        name: 'Cinza Escuro',
        level: 2,
        hex: '#7F7F7F',
        rgb: [127, 127, 127],
        category: 'Ash',
        description: 'Acinzentado intenso'
    },
    {
        id: 't4.15',
        name: 'Louro Acinzentado',
        level: 4,
        hex: '#A8A8A8',
        rgb: [168, 168, 168],
        category: 'Ash',
        description: 'Louro com reflexos acinzentados'
    },
    {
        id: 't6.2',
        name: 'Acinzentado Profundo',
        level: 6,
        hex: '#B8A8A0',
        rgb: [184, 168, 160],
        category: 'Ash',
        description: 'Cinza elegante e profundo'
    },
    {
        id: 't8.1',
        name: 'Louro Cinzento',
        level: 8,
        hex: '#C9B8B0',
        rgb: [201, 184, 176],
        category: 'Ash',
        description: 'Louro com reflexos cinzentos'
    },
    {
        id: 't9.1',
        name: 'Louro Claro Cinzento',
        level: 9,
        hex: '#D9C8C0',
        rgb: [217, 200, 192],
        category: 'Ash',
        description: 'Louro claro com cinza'
    },
    {
        id: 't5.4',
        name: 'Louro Acobreado',
        level: 5,
        hex: '#C97854',
        rgb: [201, 120, 84],
        category: 'Copper',
        description: 'Reflexos acobreados quentes'
    },
    {
        id: 't7.4',
        name: 'Louro Acobreado Claro',
        level: 7,
        hex: '#D99870',
        rgb: [217, 152, 112],
        category: 'Copper',
        description: 'Louro com reflexos dourados'
    },
    {
        id: 't5.6',
        name: 'Louro Vermelhado',
        level: 5,
        hex: '#A8684D',
        rgb: [168, 104, 77],
        category: 'Red',
        description: 'Reflexos avermelhados naturais'
    },
    {
        id: 't7.6',
        name: 'Louro Vermelho Claro',
        level: 7,
        hex: '#C99070',
        rgb: [201, 144, 112],
        category: 'Red',
        description: 'Louro com reflexos vermelhos quentes'
    }
];

const RECOMMENDATIONS = {
    'p7.0+t6.2': {
        result: '#B8947A',
        resultRgb: [184, 148, 122],
        advice: 'Combinação equilibrada. Resultado: Louro médio acinzentado elegante.',
        time: '30-45 minutos',
        risk: 'Compatível',
        warning: null,
        tips: 'Aplicar dos comprimentos às raízes para melhor controle. Fazer teste de mecha antes.'
    },
    'p7.0+t8.1': {
        result: '#C9B8A8',
        resultRgb: [201, 184, 168],
        advice: 'Mistura suave. Resultado: Louro médio com reflexos cinzentos delicados.',
        time: '25-35 minutos',
        risk: 'Compatível',
        warning: null,
        tips: 'Perfeito para neutralizar amarelados. Resultado sofisticado e moderno.'
    },
    'p6.0+t4.15': {
        result: '#9B9B78',
        resultRgb: [155, 155, 120],
        advice: 'Tom equilibrado. Resultado: Louro escuro com reflexos acinzentados.',
        time: '35-45 minutos',
        risk: 'Compatível',
        warning: null,
        tips: 'Ideal para transição de cor. Cobertura excelente com reflexo elegante.'
    },
    'p5.0+t5.4': {
        result: '#8A6450',
        resultRgb: [138, 100, 80],
        advice: 'Mistura quente. Resultado: Castanho com reflexos acobreados.',
        time: '40-50 minutos',
        risk: 'Compatível',
        warning: null,
        tips: 'Traz brilho e movimento. Perfeito para cabelos naturais com estes tons base.'
    },
    'p8.0+t6.2': {
        result: '#D4B8A0',
        resultRgb: [212, 184, 160],
        advice: 'Mistura clara. Resultado: Louro claro acinzentado profundo.',
        time: '20-30 minutos',
        risk: 'Compatível',
        warning: null,
        tips: 'Tempo reduzido. Perfeito para manutenção de louro. Resultado refinado.'
    },
    'p4.0+t5.6': {
        result: '#6B5847',
        resultRgb: [107, 88, 71],
        advice: 'Mistura quente. Resultado: Castanho com reflexos vermelhados.',
        time: '35-45 minutos',
        risk: 'Compatível',
        warning: null,
        tips: 'Reflexos quentes e naturais. Ótimo para peles morenas.'
    }
};

const CARE_PRODUCTS = [
    {
        id: 'care-1',
        name: 'Shampoo Pós-Coloração',
        description: 'Shampoo neutro que protege a cor aplicada',
        discount: '15% com código ELIANE',
        link: '#',
        category: 'Hair Care',
        icon: '🧴'
    },
    {
        id: 'care-2',
        name: 'Máscara Hidratante Premium',
        description: 'Mascara intensiva para cabelos coloridos',
        discount: '20% com código STUDIO',
        link: '#',
        category: 'Hair Care',
        icon: '💆'
    },
    {
        id: 'care-3',
        name: 'Protetor Térmico UV',
        description: 'Proteção contra calor e raios UV',
        discount: '10% com código CORES',
        link: '#',
        category: 'Hair Care',
        icon: '☀️'
    },
    {
        id: 'care-4',
        name: 'Óleo Nutritivo Capilar',
        description: 'Óleo premium para nutrir os fios',
        discount: '12% com código ELIANE',
        link: '#',
        category: 'Hair Care',
        icon: '🫒'
    }
];

const VIDEOS = [
    {
        id: 'video-1',
        title: 'Como Misturar Pigmentos Corretamente',
        description: 'Aprenda as proporções exatas para cada tom',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    },
    {
        id: 'video-2',
        title: 'Neutralizando Amarelados',
        description: 'Técnica profissional de Eliane para resultado perfeito',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    },
    {
        id: 'video-3',
        title: 'Antes e Depois Louro Platinado',
        description: 'Transformação completa com técnica de colorimetria',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    },
    {
        id: 'video-4',
        title: 'Aplicação em Raízes e Mechas',
        description: 'Passo a passo para resultado uniforme',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    },
    {
        id: 'video-5',
        title: 'Cuidados Pós-Coloração',
        description: 'Como manter a cor vibrante por mais tempo',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    }
];

// Função para obter recomendação
function getRecommendation(pigmentId, tonerId) {
    const key = `${pigmentId}+${tonerId}`;
    return RECOMMENDATIONS[key] || null;
}

// Função para obter pigmento por ID
function getPigmentById(id) {
    return PIGMENTS.find(p => p.id === id);
}

// Função para obter tonalizante por ID
function getTonerById(id) {
    return TONERS.find(t => t.id === id);
}

// Exportar dados
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PIGMENTS,
        TONERS,
        CARE_PRODUCTS,
        VIDEOS,
        RECOMMENDATIONS,
        getRecommendation,
        getPigmentById,
        getTonerById
    };
}
