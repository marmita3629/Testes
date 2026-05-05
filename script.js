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

/**
 * Salva as informações especificamente para o login do admin
 */
function salvarDadosPerfil() {
    const inputs = document.querySelectorAll('#perfil input');
    
    const dados = {
        nome: inputs[0].value,
        telefone: inputs[1].value,
        altura: inputs[2].value,
        peso: inputs[3].value,
        email: inputs[4].value,
        senha: inputs[5].value
    };

    // Salva no banco local
    localStorage.setItem('dadosAdmin', JSON.stringify(dados));
    alert("Dados do Admin salvos com sucesso!");
}

/**
 * Sai da conta e limpa os estados
 */
function sair() {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('modoConvidado');
    window.location.href = "login.html";
}

/**
 * Verifica o login e ajusta a interface
 */
function verificarEstadoLogin() {
    const logado = localStorage.getItem('usuarioLogado') === 'true';
    const convidado = localStorage.getItem('modoConvidado') === 'true';
    const authTitle = document.querySelector('.auth-title');
    const card = document.querySelector('.auth-card');
    
    // 1. Se for CONVIDADO, não preenche nada e encerra aqui
    if (convidado) {
        console.log("Acesso como convidado: Perfil limpo.");
        return; 
    }

    // 2. Se estiver LOGADO como ADMIN (Não convidado)
    if (logado && !convidado) {
        authTitle.textContent = "Bem-vindo de volta, Admin!";

        // Preenche os campos com o que foi salvo anteriormente para o admin
        const dadosSalvos = JSON.parse(localStorage.getItem('dadosAdmin'));
        const inputs = document.querySelectorAll('#perfil input');
        
        if (dadosSalvos && inputs.length > 0) {
            inputs[0].value = dadosSalvos.nome || "";
            inputs[1].value = dadosSalvos.telefone || "";
            inputs[2].value = dadosSalvos.altura || "";
            inputs[3].value = dadosSalvos.peso || "";
            inputs[4].value = dadosSalvos.email || "admin"; // Valor padrão
            inputs[5].value = dadosSalvos.senha || "12345678!"; // Valor padrão
        }

        // Ajusta os botões (Remove o rodapé de login e muda o botão principal)
        const footer = document.querySelector('.auth-footer');
        if (footer) footer.style.display = 'none';

        const btnPrincipal = document.querySelector('.btn-submit');
        if (btnPrincipal) {
            btnPrincipal.textContent = "Salvar Alterações";
            btnPrincipal.onclick = salvarDadosPerfil;
            btnPrincipal.type = "button";
        }

        // Adiciona o botão Sair discreto se não existir
        if (!document.getElementById('logout-link')) {
            const logoutArea = document.createElement('p');
            logoutArea.id = 'logout-link';
            logoutArea.innerHTML = `<span onclick="sair()" style="cursor:pointer; color:#888; text-decoration:underline; font-size:14px; display:block; margin-top:20px;">Sair da conta</span>`;
            card.appendChild(logoutArea);
        }
    }
}

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
    const startItem = document.querySelector('.nav-links li');
    showSection('inicio', startItem);
    verificarEstadoLogin();
});