//SEÇÃO 2 =-=-=-=-=-=-=-=---=-=-=-=-=-=-

const ehCelular = window.matchMedia('(pointer: coarse)').matches;

const cardsS2 = document.querySelectorAll('.possibilidades-secao2');

if (ehCelular) {
  cardsS2.forEach((card) => {
    card.addEventListener('click', (e) => {
      e.stopPropagation(); 
      
      if (card.classList.contains('pressionado')) {
        card.classList.remove('pressionado');
      } else {

        fecharTodosOsCards();
        card.classList.add('pressionado');
      }
    });
  });

  document.addEventListener('click', () => {
    fecharTodosOsCards();
  });
}

function fecharTodosOsCards() {
  cardsS2.forEach(c => c.classList.remove('pressionado'));
}

//SEÇÃO 3 =-=-=-=-=-=-=-=---=-=-=-=-=-=-
let idCardAtivo;
let tipoMensalidadeAtual = "mensal";

const botoesPlano = document.querySelectorAll(".botao-plano");
const cardsS3 = [
    document.getElementById("card-fornecedor"),
    document.getElementById("card-profissional"),
    document.getElementById("card-cliente")
];

const botaoSwitchMensalidade  = document.getElementById("alternarPeriodo");
const textoPeriodo = document.getElementById("texto-mensalidade");
const itensDoPeriodo = document.querySelectorAll("[data-mensal]");

function mostrarCard(plano) {
    idCardAtivo = "card-" + plano;

    cardsS3.forEach(function (card) {
        if (idCardAtivo === card.id){
            card.hidden = false;
        } else {
            card.hidden = true;
        }
    });
}

botoesPlano.forEach(function (botao) {
    botao.addEventListener("click", function () {

        mostrarCard(botao.dataset.plano);
        marcarBotaoAtivo(botao.dataset.plano);
    });
});

function marcarBotaoAtivo(planoEscolhido) {
    botoesPlano.forEach(function (botao) {
        if (botao.dataset.plano === planoEscolhido) {
            botao.classList.add("ativo");
            botao.setAttribute("aria-pressed", "true");
        } else {
            botao.classList.remove("ativo");
            botao.setAttribute("aria-pressed", "false");
        }
    });
}

function aplicarPeriodo(periodo) {
    if (periodo === "anual") {
        botaoSwitchMensalidade.classList.add("anual");
        botaoSwitchMensalidade.setAttribute("aria-pressed", "true");
        textoPeriodo.textContent = "Anual";
    } else {
        botaoSwitchMensalidade.classList.remove("anual");
        botaoSwitchMensalidade.setAttribute("aria-pressed", "false");
        textoPeriodo.textContent = "Mensal";
    }

    // 2) preços e textos: troca pelo valor do período escolhido
    itensDoPeriodo.forEach(function (item) {
        if (periodo === "anual") {
            item.textContent = item.dataset.anual;
        } else {
            item.textContent = item.dataset.mensal;
        }
    });
}

// 3) clique: se está no anual vai pro mensal, senão vai pro anual
botaoSwitchMensalidade.addEventListener("click", function () {
    if (botaoSwitchMensalidade.classList.contains("anual")) {
        aplicarPeriodo("mensal");
    } else {
        aplicarPeriodo("anual");
    }
});

//SEÇÃO 4 =-=-=-=-=-=-=-=---=-=-=-=-=-=-

const gridDiferenciais = document.querySelector('.grid-container');
const cardsDiferenciais = document.querySelectorAll('.item-diferenciais');
const contadorAtual = document.querySelector('#contador-atual');
const contadorTotal = document.querySelector('#contador-total');
const mqPilha = window.matchMedia('(max-width: 768px)');
 
// tem que ser igual ao tempo do transition no CSS ( 0.4s )
const DURACAO_ANIMACAO = 400;
 
let indiceAtual = 0;
 
function atualizarPilha() {
    cardsDiferenciais.forEach(function (card, i) {
        card.classList.remove('pos-0');
        card.classList.remove('pos-1');
        card.classList.remove('pos-2');
        card.classList.remove('pos-3');
 
        if (mqPilha.matches) {
            let posicao = (i - indiceAtual + cardsDiferenciais.length) % cardsDiferenciais.length;
 
            if (posicao > 3) {
                posicao = 3;
            }
 
            card.classList.add('pos-' + posicao);
        } else {
            card.classList.remove('saindo');
        }
    });

    contadorAtual.textContent = indiceAtual + 1;
}
 
function irParaProximo() {
    if (mqPilha.matches) {
        const cardSaindo = cardsDiferenciais[indiceAtual];
        cardSaindo.classList.add('saindo');

        indiceAtual = (indiceAtual + 1) % cardsDiferenciais.length;
        atualizarPilha();

        setTimeout(function () {
            cardSaindo.classList.remove('saindo');
            animando = false;
        }, DURACAO_ANIMACAO);
        
    }
}
 
gridDiferenciais.addEventListener('click', irParaProximo);
mqPilha.addEventListener('change', atualizarPilha);
 
atualizarPilha();
