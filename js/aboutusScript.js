const planos = {
    fornecedor: {
        nome: "Elos Fornece",

        preco: {
            mensal: 300,
            anual: 3000
        },

        beneficios: [
            {
                texto: "Até 49 produtos gratuitamente",
                incluido: true
            },
            {
                texto: "Até 19 profissionais afiliados gratuitamente",
                incluido: true
            },
            {
                texto: "Catálogo de serviços ilimitado",
                incluido: true
            },
            {
                texto: "Capacidade de atuar como empresa demandante",
                incluido: true
            },
            {
                texto: "Infográficos de projetos e vendas",
                incluido: true
            },
            {
                texto: "Profissionais ou mais que 49 produtos têm incremento na mensalidade",
                incluido: false
            }
        ],

        adicionais: {
            titulo: "Nosso plano conta com algumas faixas de preço extras. Até:",

            mensal: [
                { texto: "49 produtos", valor: 0 },
                { texto: "99 produtos", valor: 50 },
                { texto: "149 produtos", valor: 100 },
                { texto: "150+ produtos", valor: 150 },
                { texto: "19 profissionais", valor: 0 },
                { texto: "39 profissionais", valor: 150 },
                { texto: "59 profissionais", valor: 300 },
                { texto: "60+ profissionais", valor: 450 }
            ],

            anual: [
                { texto: "49 produtos", valor: 0 },
                { texto: "99 produtos", valor: 500 },
                { texto: "149 produtos", valor: 1000 },
                { texto: "150+ produtos", valor: 1500 },
                { texto: "19 profissionais", valor: 0 },
                { texto: "39 profissionais", valor: 1500 },
                { texto: "59 profissionais", valor: 3000 },
                { texto: "60+ profissionais", valor: 4500 }
            ],

            observacao: "Ao passar de uma faixa para outra, o novo valor é acrescido da mensalidade e cobrado a partir do próximo mês."
        }
    },

    profissional: {
        planos: [
            { nome: "Elos Campo",

            preco: {
                mensal: 29,
                anual: 290
            },

            beneficios: [
                { texto: "Primeiro mês gratuito", incluido: true },
                { texto: "Agenda integrada com os projetos que participa", incluido: true },
                { texto: "Registro de qualificações com validação", incluido: true },
                { texto: "Capacidade de buscar serviços e empregos por area", incluido: true }
            ] },

            { nome: "Elos Campo+",

            preco: {
                mensal: 59,
                anual: 590
            },

            beneficios: [
                { texto: "Primeiro mês gratuito", incluido: true },
                { texto: "Agenda integrada com os projetos que participa", incluido: true },
                { texto: "Registro de qualificações com validação", incluido: true },
                { texto: "Capacidade de buscar serviços e empregos por area", incluido: true },
                { texto: "Acesso a conteudos de capacitação/treinamento oferecidos por parceiros", incluido: true }
            ] }
        ]
    },

    cliente: {
        planos: [
            {
                nome: "Elos Base",

                preco: {
                    mensal: 0,
                    anual: 0
                },

                beneficios: [
                    { texto: "Busca de fornecedores e produtos", incluido: true },
                    { texto: "Organização de demandas técnicas", incluido: true },
                    { texto: "Gestão de projetos", incluido: true },
                    { texto: "Comunicação centralizada", incluido: true }
                ],

                adicionais: {
                    titulo: "Recursos disponíveis no plano:",

                    mensal: [
                        { texto: "Acesso à plataforma", valor: 0 },
                        { texto: "Recursos adicionais", valor: 30 }
                    ],

                    anual: [
                        { texto: "Acesso à plataforma", valor: 0 },
                        { texto: "Recursos adicionais", valor: 300 }
                    ],

                    observacao: "Ao passar de uma faixa para outra, o novo valor ao lado é acrescido da mensalidade e cobrada a partir do proximo mês."
                }
            },

            {
                nome: "Elos Rede",

                preco: {
                    mensal: 0,
                    anual: 0
                },

                beneficios: [
                    { texto: "Busca de fornecedores e produtos", incluido: true },
                    { texto: "Organização de demandas técnicas", incluido: true },
                    { texto: "Gestão de projetos", incluido: true },
                    { texto: "Comunicação centralizada", incluido: true }
                ],

                adicionais: {
                    titulo: "Recursos disponíveis no plano:",

                    mensal: [
                        { texto: "Acesso à plataforma", valor: 0 },
                        { texto: "Recursos adicionais", valor: 30 }
                    ],

                    anual: [
                        { texto: "Acesso à plataforma", valor: 0 },
                        { texto: "Recursos adicionais", valor: 300 }
                    ],

                    observacao: "Consulte as condições de cada recurso adicional."
                }
            }
        ]
    }
};
