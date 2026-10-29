/*Barra de pesquisa na navbar ===============================*/
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


/* Seção 7 ================================= */
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
        slides[atual].classList.remove("saindo"); //remove o saindo (anterior), ou seja, se a animação estiver quase acabando, ela não será removida.
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