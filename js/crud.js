import { mensagensSpans } from './mensagensSpans.js';

const formularioInsert = document.getElementById('formulario-insert');

//Manipulação de erros e envio do formulario de insert
const mensagensInsertSpans = mensagensSpans(document.getElementById("nome-do-arquivo").value) ;

console.log(mensagensInsertSpans)

formularioInsert.addEventListener('invalid', event => {
    event.preventDefault();

    const input = event.target;

    const span = document.getElementById(`erro-${input.name}`);

    span.textContent = mensagensInsertSpans[span.id];
    
    input.classList.add("caixa-erro");

}, true);

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

formularioInsert.addEventListener('input', async event => {
    const input = event.target;
    const span = document.getElementById(`erro-${input.name}`);

    await esperar(100);
    if (input.checkValidity()) {
        input.classList.remove('caixa-erro');
        if (span) span.textContent = '';
    }
});

formularioInsert.addEventListener('submit', (event) =>{
    event.preventDefault();

    const todosInputs = formularioInsert.querySelectorAll('input, select, textarea');
    todosInputs.forEach(input => {
        input.classList.remove('span-erro'); // Remove a classe de erro se existir
        
        // Se você colocou span com texto de erro embaixo, pode limpá-lo também:
        const spanErro = formularioInsert.querySelector(`#erro-${input.name}`);
        if (spanErro){ spanErro.textContent = '';}
    });

    const dadosFormulario = new FormData(formularioInsert);
    dadosFormulario.delete('trabalha-para-empresa');

    const objetoJs = Object.fromEntries(dadosFormulario);

    const dadosJSON = JSON.stringify(objetoJs);

    fetch('/crudUsuario-insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dadosJSON
    })
    .then(respostaServlet => {
        return respostaServlet.text().then(texto => {
            return {
                ok: respostaServlet.ok,
                estaVazio: texto.trim() === '',
                texto: texto
            };
        });
    })
    .then(resultado => {
        if(resultado.ok && resultado.estaVazio){
            alert('Usuário cadastrado com sucesso!');
            formularioInsert.reset();
        } else {

            const errosNoServlet = JSON.parse(resultado.texto);

            Object.entries(errosNoServlet).forEach(([nomeDoCampo, mensagemDeErro]) => {

                const inputDoForm = form.querySelector(`[name="${nomeDoCampo}"]`);
                
                if (inputDoForm) {
                    inputDoForm.classList.add('span-erro');

                    const spanErro = form.querySelector(`#erro-${nomeDoCampo}`);
                    if (spanErro) {
                        spanErro.textContent = mensagemDeErro;
                    }
                }
            });
        }
    });
});

import { camposValores } from './variacoesFiltros.js'; 

let camposTotais;
let camposDisponiveis;

document.addEventListener("DOMContentLoaded", () => {
    const elementoNomeArquivo = document.getElementById("nome-do-arquivo");

    if (elementoNomeArquivo) {
        const nomeTela = elementoNomeArquivo.value;
        
        camposTotais = camposValores(nomeTela);
        camposDisponiveis = camposValores(nomeTela);

    }
});

const botaoAdicionarFiltro = document.getElementById('adicionar-filtro');
const formularioFiltro = document.getElementById('formulario-filtro');

const campoFiltro = document.getElementById('campo-filtro')

//Adiciona os filtros
botaoAdicionarFiltro.addEventListener('click', () => {
    const valorCampoFiltro = campoFiltro.value;

    if(!valorCampoFiltro){return;}

    if(valorCampoFiltro.toUpperCase() === 'CAMPO_VAZIO'){
        return;
    }

    const valores = camposDisponiveis[valorCampoFiltro];
    
    if(!valores){
        return;
    }else{
        console.log(valorCampoFiltro)
        document.querySelector(`#campo-filtro option[value="${valorCampoFiltro.toUpperCase()}"]`).remove();
        campoFiltro.value = "CAMPO_VAZIO";
    }

    formularioFiltro.insertAdjacentHTML('beforeend', valores)

});

//Garantem que as opções vão ser removidas e devolvidas corretamente ao select
formularioFiltro.addEventListener('click', event => {
    const botaoRemover = event.target.closest('.remover-filtro');
    if(!botaoRemover){return;}

    const caixaFiltro = botaoRemover.closest('.caixa-filtro');
    if(!caixaFiltro){return;}

    const campoInterno = caixaFiltro.querySelector('input, select');

    if(campoInterno){
        const chaveFiltro = campoInterno.name.replace(/-filtro$/, '').replace(/-/g, '_').toUpperCase();
        recriarOptionNoSelect(chaveFiltro);
    }

    caixaFiltro.remove();
});

//Recria a option no select na mesma posição em que ela estava
const recriarOptionNoSelect = (chave) => {
    if(campoFiltro.querySelector(`option[value="${chave}"]`)){return;}

    const modelo = document.createElement('template');
    modelo.innerHTML = camposTotais[chave];
    const label = modelo.content.querySelector('label').textContent;

    const novaOption = document.createElement('option');
    novaOption.value = chave;
    novaOption.textContent = label;

    const chavesEmOrdem = Object.keys(camposTotais);
    const indiceAlvo = chavesEmOrdem.indexOf(chave);

    let optionDeReferencia = null;
    for(let i = indiceAlvo + 1; i < chavesEmOrdem.length; i++){
        optionDeReferencia = campoFiltro.querySelector(`option[value="${chavesEmOrdem[i]}"]`);
        if(optionDeReferencia){break;}
    }

    if(optionDeReferencia){
        campoFiltro.insertBefore(novaOption, optionDeReferencia);
    }else{
        campoFiltro.appendChild(novaOption);
    }
};