/**
 * Alterna entre as seções do site e atualiza o estado visual do menu
 */
function showSection(sectionId, element) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    const navItems = document.querySelectorAll('.nav-links li, .profile-btn');
    navItems.forEach(item => item.classList.remove('active-link'));

    if (element) {
        element.classList.add('active-link');
    }
}

// --- NOVAS FUNÇÕES PARA LOGIN E PERSISTÊNCIA ---

/**
 * Salva os dados do cadastro e simula o login
 */
function efetuarCadastroELogin() {
    // Captura os valores dos inputs
    const dados = {
        nome: document.querySelector('input[placeholder="digite aqui..."]').value,
        telefone: document.querySelector('input[type="tel"]').value,
        altura: document.querySelector('input[placeholder="ex: 180"]').value,
        peso: document.querySelector('input[placeholder="ex: 75"]').value,
        email: document.querySelector('input[type="email"]').value,
    };

    // Salva no localStorage (para persistir ao recarregar a página)
    localStorage.setItem('usuarioLogado', 'true');
    localStorage.setItem('dadosUsuario', JSON.stringify(dados));

    // Volta para a tela inicial
    alert("Login realizado com sucesso!");
    window.location.reload(); // Recarrega para aplicar as mudanças de UI
}

/**
 * Limpa os dados e volta para a tela de login
 */
function sair() {
    localStorage.removeItem('usuarioLogado');
    // Se quiser apagar os dados permanentemente, use: localStorage.removeItem('dadosUsuario');
    window.location.href = "login.html";
}

/**
 * Verifica o estado do login e preenche os campos
 */
function verificarEstadoLogin() {
    const logado = localStorage.getItem('usuarioLogado') === 'true';
    const dadosSalvos = JSON.parse(localStorage.getItem('dadosUsuario'));
    const btnSubmit = document.querySelector('.btn-submit');
    const authTitle = document.querySelector('.auth-title');

    if (logado && dadosSalvos) {
        // 1. Muda o texto e função do botão
        btnSubmit.textContent = "Sair";
        btnSubmit.style.background = "linear-gradient(to right, #555, #222)"; // Cor de sair
        btnSubmit.onclick = sair;

        // 2. Preenche os campos com os dados salvos
        document.querySelector('input[placeholder="digite aqui..."]').value = dadosSalvos.nome;
        document.querySelector('input[type="tel"]').value = dadosSalvos.telefone;
        document.querySelector('input[placeholder="ex: 180"]').value = dadosSalvos.altura;
        document.querySelector('input[placeholder="ex: 75"]').value = dadosSalvos.peso;
        document.querySelector('input[type="email"]').value = dadosSalvos.email;
        
        authTitle.textContent = "Bem-vindo de volta!";
    } else {
        // Se não estiver logado, o botão faz a função de cadastro/login
        btnSubmit.onclick = efetuarCadastroELogin;
    }
}

// Configuração inicial
window.addEventListener('DOMContentLoaded', () => {
    const startItem = document.querySelector('.nav-links li');
    showSection('inicio', startItem);
    verificarEstadoLogin();
});
