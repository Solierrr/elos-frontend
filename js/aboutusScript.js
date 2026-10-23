let idCardAtivo;
let tipoMensalidadeAtual = "mensal";

const botoesPlano = document.querySelectorAll(".botao-plano");
const cards = [
    document.getElementById("card-fornecedor"),
    document.getElementById("card-profissional"),
    document.getElementById("card-cliente")
];

const botaoSwitchMensalidade  = document.getElementById("alternarPeriodo");
const textoPeriodo = document.getElementById("texto-mensalidade");
const itensDoPeriodo = document.querySelectorAll("[data-mensal]");

function mostrarCard(plano) {
    idCardAtivo = "card-" + plano;

    cards.forEach(function (card) {
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

    
