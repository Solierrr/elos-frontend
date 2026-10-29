/*=============================== Barra de pesquisa na navbar ===============================*/
const caixaPesquisa = document.getElementById('caixa_pesquisa');

function pesquisar() {
  const pesquisa = caixaPesquisa.value.trim();
  if (!pesquisa) return;

  console.log('Pesquisando por:', pesquisa);

  caixaPesquisa.value = '';
  caixaPesquisa.blur();
}

caixaPesquisa.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    pesquisar();
  }
});

/*=============================== Carrosséis (seção 1 e 4) ===============================*/
(function(){
    "use strict"; //o JS avisa erros

    //acessibilidade, o caso o usuário queira menos movimento
    const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

    //seletorSecao: qual seção
    //tempoEntreTrocas: ms entre as trocas
    //cardsPorPaginaDesktop: quantos cards por página a partir de 768px
    //tempoSaida: ms da animação de saída (igual ao tempo do CSS)
    function criarCarrossel(seletorSecao, tempoEntreTrocas, cardsPorPaginaDesktop = 1, tempoSaida = 400){
        const secaoCarrossel = document.querySelector(seletorSecao); //acha a seção
        if (!secaoCarrossel) return; //se não achar a seção, vai retornar nada.

        const listaCards = secaoCarrossel.querySelectorAll(".slide, .slide_ativo");
        const listaBotoes = secaoCarrossel.querySelectorAll(".quadrado");
        const mediaTelaGrande = window.matchMedia("(min-width: 768px)");

        //acessibilidade, fica sem animação
        const esperaDaSaida = prefereMenosMovimento.matches ? 0 : tempoSaida;

        //variaveis modificaveis ao longo do codigo
        let paginaAtual = 0;
        let relogioAutoplay = null; //guarda o relógio que passa sozinho
        let relogioSaida = null;    //guarda o relógio da animação de saída

        //quantos cards cabem por página.
        function cardsPorPagina(){
            return mediaTelaGrande.matches ? cardsPorPaginaDesktop : 1;
            //se a tela for grande, como no desktop, o número de cards é 2, se não for grande, como no celular, é apenas 1.
        }

        //quantas páginas tem agora:
        function totalDePaginas(){
            return Math.ceil(listaCards.length / cardsPorPagina());
            //tem um cálculo para definir quants cards terá no total, 4(quantidade total)/2(quantidade dependendo do tamanho da tela) = 2, ou seja, no desktop terá 2 cards.
        }

        //mostra só os cards da página escolhida
        function exibirPagina(pagina){
            paginaAtual = pagina;
            const quantidade = cardsPorPagina();

            listaCards.forEach((card, posicao) => {
                //vai ver qual é a posição do card agora 
                const estaNaPagina = Math.floor(posicao / quantidade) === pagina;
                //cálculo para descobrir a posição, é importante pois no celular fica com 4 botões, ou seja, 4 cards diferentes.

                card.classList.remove("saindo"); //limpeza
                card.classList.toggle("slide_ativo", estaNaPagina);//está na página
                card.classList.toggle("slide", !estaNaPagina);//não está na página
            });
        }

        //deixa os botões accent
        function pintarBotao(pagina){
            const total = totalDePaginas();

            listaBotoes.forEach((botao, posicao) => {
                botao.hidden = posicao >= total; //vai esconder o botão se a posição for menor do que o total.
                botao.classList.toggle("ativo", posicao === pagina); //ativa a cor laranja
                botao.setAttribute("aria-current", posicao === pagina ? "true" : "false");
            });
            
        }

        //animação
        function irParaPagina(pagina){
            clearTimeout(relogioSaida); //impede cliques rápidos

            if (pagina === paginaAtual){
                secaoCarrossel.querySelectorAll(".saindo").forEach((card) => {
                    card.classList.remove("saindo");
                });
                pintarBotao(pagina);
                return; //cancela a animação em cliques rápidos.
            }

            pintarBotao(pagina);
            secaoCarrossel.querySelectorAll(".slide_ativo").forEach((card) => {
                card.classList.add("saindo");
            });

            relogioSaida = setTimeout(() => exibirPagina(pagina), esperaDaSaida);
        }

        function avancarPagina(){
            irParaPagina((paginaAtual + 1) % totalDePaginas());
        }

        function ligarAutoplay(){
            desligarAutoplay();
            if (prefereMenosMovimento.matches) return;
            relogioAutoplay = setInterval(avancarPagina, tempoEntreTrocas);
        }

        function desligarAutoplay(){
            clearInterval(relogioAutoplay);
        }

        listaBotoes.forEach((botao, posicao) => {
            botao.addEventListener("click", () => {
                irParaPagina(posicao);
                ligarAutoplay(); // reinicia a contagem
            });
        });

        // Se a tela cruzar os 768px, o número de páginas muda: recomeça do início
        if (cardsPorPaginaDesktop > 1){
            mediaTelaGrande.addEventListener("change", () => {
                clearTimeout(relogioSaida);
                exibirPagina(0);
                pintarBotao(0);
                ligarAutoplay();
            });
        }

        // funções definidas 
        exibirPagina(0);
        pintarBotao(0);
        ligarAutoplay();
    }

    // Um carrossel por seção
    criarCarrossel("#secao7", 10000);
    criarCarrossel("#secao1", 7500, 2, 150);
    criarCarrossel("#secao4", 7500, 2, 150);
})();

/*=============================== Seção 6 ===============================*/
document.addEventListener('DOMContentLoaded', () => {
    const janela = document.querySelector('.janela-secao6');
    const caixas = document.querySelector('.caixas-secao6');
    const ehMobile = window.matchMedia('(max-width: 780px)');

    if (!janela || !caixas) {
        console.error('Carrossel: elementos não encontrados');
        return;
    }

    const originais = Array.from(caixas.children);
    let ciclo = 0;

    function clonarLista() {
        return originais.map((el) => {
            const c = el.cloneNode(true);
            c.classList.add('clone');
            c.setAttribute('aria-hidden', 'true');
            return c;
        });
    }

    function montar() {
        caixas.querySelectorAll('.clone').forEach((c) => c.remove());
        ciclo = 0;

        if (!ehMobile.matches) {
            janela.scrollTop = 0;
            return;
        }

        clonarLista().forEach((c) => caixas.insertBefore(c, originais[0]));
        clonarLista().forEach((c) => caixas.appendChild(c));

        ciclo = caixas.scrollHeight / 3;
        janela.scrollTop = ciclo;
        console.log('Carrossel montado. ciclo =', ciclo, '| clones =', caixas.querySelectorAll('.clone').length);
    }

    janela.addEventListener('scroll', () => {
        if (!ciclo) return;
        if (janela.scrollTop < ciclo) {
            janela.scrollTop += ciclo;
        } else if (janela.scrollTop >= 2 * ciclo) {
            janela.scrollTop -= ciclo;
        }
    }, { passive: true });

    window.addEventListener('resize', () => {
        if (!ehMobile.matches || !ciclo) return;
        const proporcao = (janela.scrollTop - ciclo) / ciclo;
        ciclo = caixas.scrollHeight / 3;
        janela.scrollTop = ciclo + proporcao * ciclo;
    });

    montar();
    ehMobile.addEventListener('change', montar);
});


/*=============================== Seção 7 =============================== */
// Variaveis
const secao = document.querySelector("#secao7");
const slides = secao.querySelectorAll(".slide, .slide_ativo");
const botoes = secao.querySelectorAll(".quadrado");

// Acessibilidade, caso a pessoa queira - movimento
const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

//letra maiuscula é configuração fixa.
const INTERVALO = 10000;                                
const DURACAO_SAIDA = reduzirMovimento.matches ? 0 : 400; // ?: = se a pessoa pediu menos movimento vai ser 0, se não vai ser 400ms (0,4s).

// variaveis modificaveis ao longo do código.
let atual = 0;
let timer = null;
let saidaTimer = null;


//deixa só o slide do índice recebido visivel, os outros ficam escondidos.
function trocarSlide(indice){
    atual = indice;
    
    //percorre todos os slides, porém só o indice fica na tela atual
    slides.forEach((slide, i) => {
        slide.classList.remove("saindo");   // é uma limpeza para não ter animação do slide anterior
        slide.classList.toggle("slide_ativo", i === indice);
        slide.classList.toggle("slide", i !== indice);
    });
}

//deixa a cor do botão em laranja se ele for o slide ativo/atual
function marcarBotao(indice){
    botoes.forEach((botao, i) => {
        botao.classList.toggle("ativo", i === indice);
        botao.setAttribute("aria-current", i === indice ? "true" : "false");
    });
}

// função de animação
function mostrar(indice){
    clearTimeout(saidaTimer); //se a pessoa clicar rápido, ele só vai considerar o último slide clicado. Ou seja, não há bug ou tela parada no primeiro botão clicavel, fazer teste para perceber isso.

    if (indice === atual){
        slides[atual].classList.remove("saindo"); //se clicar no botão do carrossel atual não vai trocar nada e vai cancelar a saida
        marcarBotao(indice);
        return;
    }

    //quando a pessoa trocar de botão
    marcarBotao(indice);
    slides[atual].classList.add("saindo"); //botão laranja na hora e o slide atual vai ganhar o saindo.

    saidaTimer = setTimeout(() => trocarSlide(indice), DURACAO_SAIDA); //vai esperar um tempo para depois trocar o slide.
}

//função de clicar nos botões
function proximo(){
    mostrar((atual + 1) % slides.length);//atual + 1 = próximo slide.
    //pega o resto da divisão, quando estiver no último ele voltará para o primeiro.
}

//função de passar sozinho
function iniciar(){
    parar();
    timer = setInterval(proximo, INTERVALO); //um ciclo infinito que sempre se repete, onde tem o que vai se repetir e de quanto em quanto tempo irá se repetir.
}


//função para parar o carrossel
function parar(){
    clearInterval(timer);
}

//ir para qualquer botão
botoes.forEach((botao, i) => {
    botao.addEventListener("click", () => {
        mostrar(i);
        iniciar(); //reinicia a contagem
    });
});

//definição das funções
trocarSlide(0); //mostra o primeiro slide
marcarBotao(0); //deixa o botão laranja
iniciar();      //deixa o carrossel trocar sozinho

//acessibilidade caso a pessoa não queira movimento.
if (reduzirMovimento.matches){
    parar(); //desliga o carrossel(autoplay)
    secao.removeEventListener("mouseleave", iniciar);
    secao.removeEventListener("focusout", iniciar);
}