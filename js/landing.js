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