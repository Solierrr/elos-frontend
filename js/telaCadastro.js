//Partes relacionadas ao botão da senha
const botaoSenha = document.getElementById('olho-senha');
const inputSenha = document.getElementById('senha');

const botaoSenhaConfirmacao = document.getElementById('olho-senha-confirmacao');
const inputSenhaConfirmacao = document.getElementById('senha-confirmacao');


//Botão de mostrar a senha
botaoSenha.addEventListener('click', () => {
    const tipo = inputSenha.type === 'password' ? 'text' : 'password';

    if (tipo === 'text') {
        botaoSenha.src = botaoSenha.dataset.urlOlho;
    } else {
        botaoSenha.src = botaoSenha.dataset.urlOculto;
    }

    inputSenha.type = tipo;
});

botaoSenhaConfirmacao.addEventListener('click', () => {
    const tipo = inputSenhaConfirmacao.type === 'password' ? 'text' : 'password';

    if (tipo === 'text') {
        botaoSenhaConfirmacao.src = botaoSenhaConfirmacao.dataset.urlOlho;
    } else {
        botaoSenhaConfirmacao.src = botaoSenhaConfirmacao.dataset.urlOculto;
    }

    inputSenhaConfirmacao.type = tipo;
});

//Envio do formulario
const formulario = document.getElementById('formulario-cadastro');
formulario.addEventListener('invalid', event => {
    event.preventDefault();
    
    const input = event.target;

    input.classList.add("caixa-erro");

}, true);

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

formulario.addEventListener('input', async event => {
    const input = event.target;
    const span = document.getElementById(`erro-${input.name}`);

    await esperar(100);
    if (input.checkValidity()) {
        input.classList.remove('caixa-erro');
        if (span) span.textContent = '';
    }
});