/**
 * Alterna entre as seções do site e atualiza o estado visual do menu
 * @param {string} sectionId - O ID da section no HTML
 * @param {HTMLElement} element - O elemento li que foi clicado
 */
function showSection(sectionId, element) {
    // 1. Ocultar todas as seções de conteúdo
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // 2. Mostrar a seção desejada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // 3. Resetar estilos de todos os botões da sidebar
    // Pegamos tanto os itens da lista quanto o botão de perfil
    const navItems = document.querySelectorAll('.nav-links li, .profile-btn');
    navItems.forEach(item => {
        item.classList.remove('active-link');
    });

    // 4. Aplicar o estilo "Branco" (ativo) ao item clicado
    if (element) {
        element.classList.add('active-link');
    }
}

// Configuração inicial ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    // Define a aba "Início" como ativa por padrão
    const startItem = document.querySelector('.nav-links li');
    showSection('inicio', startItem);
});