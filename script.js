/**
 * Alterna entre as seções do site
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

// --- FUNÇÕES DE PERSISTÊNCIA ---

/**
 * Salva as informações dos inputs no localStorage
 */
function salvarDadosPerfil() {
    // Capturamos os inputs da seção de perfil
    const inputs = document.querySelectorAll('#perfil input');
    
    const dados = {
        nome: inputs[0].value,
        telefone: inputs[1].value,
        altura: inputs[2].value,
        peso: inputs[3].value,
        email: inputs[4].value,
        senha: inputs[5].value
    };

    localStorage.setItem('dadosUsuario', JSON.stringify(dados));
    alert("Informações salvas com sucesso!");
}

/**
 * Desloga o usuário e limpa o estado
 */
function sair() {
    localStorage.removeItem('usuarioLogado');
    // Redireciona para o login
    window.location.href = "login.html";
}

/**
 * Organiza a interface dependendo se o usuário está logado
 */
function verificarEstadoLogin() {
    const logado = localStorage.getItem('usuarioLogado') === 'true';
    const dadosSalvos = JSON.parse(localStorage.getItem('dadosUsuario'));
    
    const containerBotoes = document.querySelector('#perfil .auth-card');
    const authTitle = document.querySelector('.auth-title');

    // Se houver dados salvos, preenchemos os campos idependente de estar logado ou não
    if (dadosSalvos) {
        const inputs = document.querySelectorAll('#perfil input');
        inputs[0].value = dadosSalvos.nome || "";
        inputs[1].value = dadosSalvos.telefone || "";
        inputs[2].value = dadosSalvos.altura || "";
        inputs[3].value = dadosSalvos.peso || "";
        inputs[4].value = dadosSalvos.email || "";
        inputs[5].value = dadosSalvos.senha || "";
    }

    if (logado) {
        authTitle.textContent = "Bem-vindo de volta!";
        
        // Removemos o link antigo de "Já tem conta?" e o botão antigo se existirem
        const footerAntigo = document.querySelector('.auth-footer');
        if (footerAntigo) footerAntigo.remove();
        const btnSubmitAntigo = document.querySelector('.btn-submit');
        if (btnSubmitAntigo) btnSubmitAntigo.remove();

        // Criamos o novo botão SALVAR (Vermelho)
        const btnSalvar = document.createElement('button');
        btnSalvar.className = 'btn-submit';
        btnSalvar.textContent = 'Salvar';
        btnSalvar.style.marginTop = '20px';
        btnSalvar.onclick = salvarDadosPerfil;

        // Criamos o novo botão SAIR (Menor e embaixo)
        const btnSair = document.createElement('p');
        btnSair.innerHTML = `<span style="cursor:pointer; color:#888; text-decoration:underline; font-size:14px;">Sair da conta</span>`;
        btnSair.style.marginTop = '15px';
        btnSair.onclick = sair;

        // Adicionamos ao card
        const card = document.querySelector('.auth-card');
        card.appendChild(btnSalvar);
        card.appendChild(btnSair);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const startItem = document.querySelector('.nav-links li');
    showSection('inicio', startItem);
    verificarEstadoLogin();
});