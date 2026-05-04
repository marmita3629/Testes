function showSection(sectionId) {
    // Esconde todas as seções
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Mostra a seção clicada
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }

    // No mobile, se quiser que o menu feche após clicar (caso use menu hambúrguer)
    // aqui seria o lugar da lógica
}

// Lógica de "Simulação" de Login
document.querySelector('.btn-red').addEventListener('click', () => {
    alert("Dados salvos com sucesso! (Simulação)");
});