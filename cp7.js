// ===== MENU HAMBÚRGUER =====
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', function () {
    menuToggle.classList.toggle('aberto');
    mainNav.classList.toggle('aberta');
});

const navLinks = mainNav.querySelectorAll('a');
navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        menuToggle.classList.remove('aberto');
        mainNav.classList.remove('aberta');
    });
});


// ===== ACCORDION =====
const accordionBtns = document.querySelectorAll('.accordion-btn');

accordionBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        const conteudo = btn.nextElementSibling;
        const estaAberto = btn.classList.contains('aberto');

        accordionBtns.forEach(function (outroBtn) {
            outroBtn.classList.remove('aberto');
            outroBtn.nextElementSibling.classList.remove('aberto');
            outroBtn.setAttribute('aria-expanded', 'false');
        });

        if (!estaAberto) {
            btn.classList.add('aberto');
            conteudo.classList.add('aberto');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});


// ===== VOLTAR AO TOPO =====
const voltarTopo = document.getElementById('voltarTopo');

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        voltarTopo.classList.add('visivel');
    } else {
        voltarTopo.classList.remove('visivel');
    }
});

voltarTopo.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ===== VALIDAÇÃO DO FORMULÁRIO =====
const inputNome     = document.getElementById('nome');
const inputEmail    = document.getElementById('email');
const inputMensagem = document.getElementById('mensagem');
const erroNome      = document.getElementById('erro-nome');
const erroEmail     = document.getElementById('erro-email');
const erroMensagem  = document.getElementById('erro-mensagem');
const btnEnviar     = document.getElementById('btnEnviar');
const formContato   = document.getElementById('form-contato');
const msgSucesso    = document.getElementById('mensagem-sucesso');
const sucessoTexto  = document.getElementById('sucesso-texto');

function validarNome(valor) {
    return valor.trim().length >= 3 && /^[A-Za-zÀ-ÿ\s]+$/.test(valor.trim());
}

function validarEmail(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
}

function validarMensagem(valor) {
    return valor.trim().length >= 10;
}

function mostrarErro(campo, erroEl) {
    campo.classList.add('erro');
    erroEl.classList.add('visivel');
}

function limparErro(campo, erroEl) {
    campo.classList.remove('erro');
    erroEl.classList.remove('visivel');
}

// Validação em tempo real ao sair do campo
inputNome.addEventListener('blur', function () {
    if (!validarNome(inputNome.value)) {
        mostrarErro(inputNome, erroNome);
    } else {
        limparErro(inputNome, erroNome);
    }
});

inputEmail.addEventListener('blur', function () {
    if (!validarEmail(inputEmail.value)) {
        mostrarErro(inputEmail, erroEmail);
    } else {
        limparErro(inputEmail, erroEmail);
    }
});

inputMensagem.addEventListener('blur', function () {
    if (!validarMensagem(inputMensagem.value)) {
        mostrarErro(inputMensagem, erroMensagem);
    } else {
        limparErro(inputMensagem, erroMensagem);
    }
});

// Submissão
btnEnviar.addEventListener('click', function () {
    let valido = true;

    if (!validarNome(inputNome.value)) {
        mostrarErro(inputNome, erroNome);
        valido = false;
    } else {
        limparErro(inputNome, erroNome);
    }

    if (!validarEmail(inputEmail.value)) {
        mostrarErro(inputEmail, erroEmail);
        valido = false;
    } else {
        limparErro(inputEmail, erroEmail);
    }

    if (!validarMensagem(inputMensagem.value)) {
        mostrarErro(inputMensagem, erroMensagem);
        valido = false;
    } else {
        limparErro(inputMensagem, erroMensagem);
    }

    if (valido) {
        const dadosUsuario = {
            nome: inputNome.value.trim(),
            email: inputEmail.value.trim(),
            mensagem: inputMensagem.value.trim()
        };

        console.log('Dados a serem enviados:', dadosUsuario);

        // Exibe mensagem de sucesso no lugar do formulário
        formContato.style.display = 'none';
        sucessoTexto.textContent = 'Obrigado por entrar em contato, ' + dadosUsuario.nome + '! Retornarei em breve.';
        msgSucesso.classList.add('visivel');

        // Reseta o formulário
        inputNome.value = '';
        inputEmail.value = '';
        inputMensagem.value = '';
    }
});
