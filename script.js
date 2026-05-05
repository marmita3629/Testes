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
/**
 * Organiza a interface dependendo se o usuário está logado
 */
function verificarEstadoLogin() {
    const logado = localStorage.getItem('usuarioLogado') === 'true';
    const convidado = localStorage.getItem('modoConvidado') === 'true';
    const dadosSalvos = JSON.parse(localStorage.getItem('dadosUsuario'));
    
    const authTitle = document.querySelector('.auth-title');

    // REGRA 1: Se for convidado, NÃO FAZ NADA. 
    // Mantém o título original, campos vazios e botão de cadastro.
    if (convidado) {
        console.log("Modo convidado ativo: Perfil mantido original.");
        return; 
    }

    // REGRA 2: Se NÃO for convidado e houver dados, preenche os campos
    if (dadosSalvos) {
        const inputs = document.querySelectorAll('#perfil input');
        if(inputs.length > 0) {
            inputs[0].value = dadosSalvos.nome || "";
            inputs[1].value = dadosSalvos.telefone || "";
            inputs[2].value = dadosSalvos.altura || "";
            inputs[3].value = dadosSalvos.peso || "";
            inputs[4].value = dadosSalvos.email || "";
            inputs[5].value = dadosSalvos.senha || "";
        }
    }

    // REGRA 3: Se estiver logado (e não for convidado), muda os botões para "Salvar/Sair"
    if (logado && !convidado) {
        authTitle.textContent = "Bem-vindo de volta!";
        
        const footerAntigo = document.querySelector('.auth-footer');
        if (footerAntigo) footerAntigo.remove();
        
        const btnSubmitAntigo = document.querySelector('.btn-submit');
        if (btnSubmitAntigo) {
            btnSubmitAntigo.textContent = 'Salvar';
            btnSubmitAntigo.onclick = salvarDadosPerfil;
        }

        // Adiciona o botão Sair pequeno embaixo
        const card = document.querySelector('.auth-card');
        const existeSair = document.getElementById('btn-sair-link');
        
        if (!existeSair) {
            const btnSair = document.createElement('p');
            btnSair.id = 'btn-sair-link';
            btnSair.innerHTML = `<span style="cursor:pointer; color:#888; text-decoration:underline; font-size:14px;">Sair da conta</span>`;
            btnSair.style.marginTop = '15px';
            btnSair.onclick = sair;
            card.appendChild(btnSair);
        }
    }
}

// Atualize também a função sair para limpar o modo convidado
function sair() {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('modoConvidado');
    window.location.href = "login.html";
}

window.addEventListener('DOMContentLoaded', () => {
    const startItem = document.querySelector('.nav-links li');
    showSection('inicio', startItem);
    verificarEstadoLogin();
});