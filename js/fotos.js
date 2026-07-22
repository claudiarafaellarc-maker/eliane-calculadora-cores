/* ==========================================================================
   FOTOS DA ELIANE
   Galeria de imagens e perfil
   ========================================================================== */

const ELIANE_PROFILE = {
    name: 'Eliane Reis',
    title: 'Especialista em Colorimetria Capilar',
    bio: 'Studio Eliane Reis - Transformando cabelos com técnica e paixão',
    image: 'assets/images/eliane-profile.jpg',
    instagram: '@studioelianereis'
};

const ELIANE_GALLERY = [
    {
        id: 'gallery-1',
        title: 'Transformação Louro Platinado',
        description: 'Resultado de colorimetria precisa',
        image: 'assets/images/eliane-gallery-1.jpg',
        category: 'Antes e Depois'
    },
    {
        id: 'gallery-2',
        title: 'Balayage Profissional',
        description: 'Técnica de destaque natural',
        image: 'assets/images/eliane-gallery-2.jpg',
        category: 'Mechas'
    },
    {
        id: 'gallery-3',
        title: 'Coloração Precisão',
        description: 'Tom único harmonioso',
        image: 'assets/images/eliane-gallery-3.jpg',
        category: 'Coloração'
    },
    {
        id: 'gallery-4',
        title: 'Recuperação Capilar',
        description: 'Cabelo saudável e brilhoso',
        image: 'assets/images/eliane-gallery-4.jpg',
        category: 'Resultados'
    }
];

// Função para carregar galeria na página
function loadElianeGallery() {
    const profileSection = document.querySelector('.eliane-profile');
    if (profileSection) {
        profileSection.innerHTML = `
            <img src="${ELIANE_PROFILE.image}" alt="${ELIANE_PROFILE.name}" class="profile-image">
            <h3>${ELIANE_PROFILE.name}</h3>
            <p class="title">${ELIANE_PROFILE.title}</p>
            <p class="bio">${ELIANE_PROFILE.bio}</p>
            <a href="https://www.instagram.com/${ELIANE_PROFILE.instagram.replace('@', '')}" target="_blank" class="profile-link">
                ${ELIANE_PROFILE.instagram}
            </a>
        `;
    }

    const galleryGrid = document.querySelector('.eliane-gallery-grid');
    if (galleryGrid) {
        galleryGrid.innerHTML = ELIANE_GALLERY.map(photo => `
            <div class="gallery-item">
                <img src="${photo.image}" alt="${photo.title}" loading="lazy">
                <div class="gallery-overlay">
                    <h4>${photo.title}</h4>
                    <p>${photo.description}</p>
                    <span class="category">${photo.category}</span>
                </div>
            </div>
        `).join('');
    }
}

// Auto-carregar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadElianeGallery);
} else {
    loadElianeGallery();
}
