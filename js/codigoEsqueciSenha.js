export class Form {
    constructor(campo, form) {
        this.form = form;
        this.campo = campo;
    }

    filtrarDigitacao() {
    this.campo.forEach((input, i) => {
        input.addEventListener("beforeinput", (e) => {
            if (e.data && !/^[0-9]$/.test(e.data)){
                e.preventDefault();
            } 
        });

        input.addEventListener("input", () => {
            input.value = input.value.replace(/[^0-9]/g, "").slice(0, 1);

            if (input.value.length === 1 && this.campo[i + 1]) {
                this.campo[i + 1].focus();
            }
        });

        input.addEventListener("keydown", (e) => {
            const ultimo = i === this.campo.length - 1;

            if (e.key === "Enter" && !ultimo) {
                e.preventDefault();
            }

            if (e.key === "Backspace" && !input.value && this.campo[i - 1]) {
                this.campo[i - 1].focus();
            }
        });
    });
}

    verificarT() {
        this.form.addEventListener("submit", (e) => {
            let situacao = true;

            this.campo.forEach((input) => {
                if (!/^[0-9]$/.test(input.value)) {
                    situacao = false;
                }
            });

            if (!situacao) {
                alert("Há um erro em um campo");
                e.preventDefault();
            }
        });
    }
}

const form = document.getElementById("form");
const campo = document.querySelectorAll("#form .text-input");

const validacao = new Form(campo, form);
validacao.filtrarDigitacao();
validacao.verificarT();