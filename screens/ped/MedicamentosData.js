export const medicamentos = {
  dipirona: {
    nome: "Dipirona",
    baseCalculo: "peso",
    targetMgPorKg: 12,
    faixaRecomendada: { min: 10, max: 16 }, // SBP
    doseMaximaDiariaG: 4,
    apresentacoes: [
      {
        heading: "Solução oral (gotas) 500 mg/mL (25 mg/gota):",
        unidade: "gotas",
        mgPorUnidade: 25,
        passoArredondamento: 1,
        doseMaximaPorDose: 40,
        instrucao: "via oral a cada 6 horas se dor ou febre",
        obsExtra: "apresentação em bisnagas gotejadoras com 10 ou 20 mL",
      },
      {
        heading: "Solução oral (xarope) 50 mg/mL:",
        unidade: "mL",
        concentracaoMgMl: 50,
        passoArredondamento: 0.5,
        doseMaximaPorDose: 15,
        instrucao: "via oral a cada 6 horas se dor ou febre",
        obsExtra: "apresentação em frasco com 100 mL",
      },
      {
        heading: "Solução injetável 500 mg/mL:",
        unidade: "mL",
        concentracaoMgMl: 500,
        passoArredondamento: 0.1,
        doseMaximaPorDose: 2,
        instrucao: "intramuscular ou endovenoso a cada 6 horas se dor ou febre",
        obsExtra: null,
      },
    ],
    observacoesFixas: [
      "Contraindicado o uso para menores de 3 meses",
      "Contraindicado o uso intramuscular para menores de 3 meses ou pesando menos que 5 kg",
      "Contraindicado para uso endovenoso em menores que 11 meses ou com peso menor que 9 kg",
    ],
  },
  aas: {
  nome: "Ácido Acetilsalicílico",
  baseCalculo: "idade",

  apresentacoes: [
    {
      heading: "Comprimido com 100 mg:",
      unidade: "comprimidos",
      instrucao: "via oral a cada 6 horas se dor",
      doseMaximaPorDose: 4,
      obsExtra:
        "apresentação em embalagens com 4, 30, 32 ou 60 comprimidos",
    },
  ],

  faixas: [
    {
      idadeMinMeses: 6,
      idadeMaxMeses: 11,
      doseFixaMg: 50,
      doseExibida: "0,5-1 comprimido",
      unidade: "comprimidos",
      intervaloHoras: 6,
    },
    {
      idadeMinMeses: 12,
      idadeMaxMeses: 35,
      doseFixaMg: 100,
      doseExibida: "1 comprimido",
      unidade: "comprimidos",
      intervaloHoras: 6,
    },
    {
      idadeMinMeses: 36,
      idadeMaxMeses: 71,
      doseFixaMg: 200,
      doseExibida: "2 comprimidos",
      unidade: "comprimidos",
      intervaloHoras: 6,
    },
    {
      idadeMinMeses: 72,
      idadeMaxMeses: 107,
      doseFixaMg: 300,
      doseExibida: "3 comprimidos",
      unidade: "comprimidos",
      intervaloHoras: 6,
    },
    {
      idadeMinMeses: 108,
      idadeMaxMeses: 143,
      doseFixaMg: 400,
      doseExibida: "4 comprimidos",
      unidade: "comprimidos",
      intervaloHoras: 6,
    },
  ],

  observacoesFixas: [
    "Dose calculada varia conforme idade",
    "Não utilizar em crianças menores de 6 meses de idade",
    "Em decorrência do risco da Síndrome de Reye, para crianças < 12 anos → evitar, exceto indicação específica (Kawasaki, antiagregação).",
    "Usar conscientemente pelo risco de intoxicação",
    "Avaliar risco para alergia medicamentosa e quadro dispéptico",
  ],
},
  ibuprofeno: {
    nome: "Ibuprofeno",
    baseCalculo: "peso",

    // Valor utilizado pelo calculador para gerar uma dose única.
    // Mantemos 7 mg/kg/dose como alvo intermediário da faixa de 5–10 mg/kg/dose.
    targetMgPorKg: 7,

    faixaRecomendada: {
      min: 5,
      max: 10,
    },

    doseMaximaDiariaMgPorKg: 40,

    intervaloHoras: "6 a 8",

    idadeMinimaMeses: 6,
    pesoMinimoKg: 5,

    apresentacoes: [
      {
        heading: "Solução oral (gotas) 50 mg/mL:",
        unidade: "gotas",

        // 50 mg/mL considerando 20 gotas/mL
        mgPorUnidade: 2.5,

        passoArredondamento: 1,

        instrucao: "via oral a cada 6 a 8 horas se dor ou febre",

        obsExtra: "frasco com 30 mL",
      },

      {
        heading: "Solução oral (gotas) 100 mg/mL:",
        unidade: "gotas",

        // 100 mg/mL considerando 20 gotas/mL
        mgPorUnidade: 5,

        passoArredondamento: 1,

        instrucao: "via oral a cada 6 a 8 horas se dor ou febre",

        obsExtra: "frasco com 20 mL",
      },

      {
        heading: "Solução oral (xarope) 30 mg/mL:",
        unidade: "mL",

        concentracaoMgMl: 30,

        passoArredondamento: 0.5,

        instrucao: "via oral a cada 6 a 8 horas se dor ou febre",
      },
    ],

    observacoesFixas: [
      "Dose calculada equivalente a 7 mg/kg/dose.",
      "Faixa recomendada: 5 a 10 mg/kg/dose.",
      "Dose máxima diária: 40 mg/kg/dia.",
      "Uso a partir de 6 meses de idade e peso igual ou superior a 5 kg.",
      "Evitar o uso em pacientes com insuficiência renal, conforme avaliação clínica.",
      "Usar com cautela em pacientes com asma ou histórico de reação a anti-inflamatórios não esteroidais.",
    ],
  },
  tramadol: {
    nome: "Tramadol",
    baseCalculo: "peso",

    // Mantido conforme o valor que existia na tela antiga.
    // Deve ser utilizado apenas quando houver indicação/protocolo
    // pediátrico específico que justifique seu uso.
    targetMgPorKg: 1.25,

    faixaRecomendada: {
      min: 1,
      max: 2,
    },

    apresentacoes: [
      {
        heading: "Solução oral (gotas) 100 mg/mL (2,5 mg/gota):",
        unidade: "gotas",
        mgPorUnidade: 2.5,
        passoArredondamento: 1,
        instrucao: "via oral a cada 6 horas se dor",
        obsExtra: "apresentação em frasco gotejador com 10 mL",
      },

      {
        heading: "Solução injetável 50 mg/mL:",
        unidade: "mL",
        concentracaoMgMl: 50,
        passoArredondamento: 0.1,
        instrucao: "endovenoso a cada 6 horas se dor",
        obsExtra:
          "apresentação em ampola com 1 ou 2 mL; diluir conforme protocolo institucional",
      },
    ],

    observacoesFixas: [
      "Dose calculada equivalente a 1,25 mg/kg/dose.",
      "A faixa de 1 a 2 mg/kg/dose corresponde ao protocolo utilizado no aplicativo e deve ser conferida na fonte institucional.",
      "Contraindicado para menores de 12 anos.",
      "Contraindicado para controle de dor pós-operatória após tonsilectomia ou adenoidectomia em menores de 18 anos.",
      "Risco de depressão respiratória grave, especialmente em pacientes com fatores de risco.",
      "Pode aumentar o risco de convulsões e interagir com medicamentos serotoninérgicos e outros depressores do sistema nervoso central.",
    ],
  },
  paracetamol: {
    nome: "Paracetamol",
    baseCalculo: "peso",

    targetMgPorKg: 12,

    faixaRecomendada: {
      min: 10,
      max: 15,
    },

    apresentacoes: [
      {
        heading: "Solução oral (gotas) 200 mg/mL:",
        unidade: "gotas",
        mgPorUnidade: 10,
        passoArredondamento: 1,
        instrucao: "via oral a cada 6 horas se dor ou febre",
        obsExtra: "apresentação em frasco com 15 mL",
      },

      {
        heading: "Suspensão oral 32 mg/mL:",
        unidade: "mL",
        concentracaoMgMl: 32,
        passoArredondamento: 0.5,
        instrucao: "via oral a cada 6 horas se dor ou febre",
        obsExtra: "apresentação em frasco com 60 mL",
      },

      {
        heading: "Suspensão oral 100 mg/mL:",
        unidade: "mL",
        concentracaoMgMl: 100,
        passoArredondamento: 0.1,
        instrucao: "via oral a cada 6 horas se dor ou febre",
        obsExtra: "apresentação em frasco com 15 mL",
      },
    ],

    observacoesFixas: [
      "Dose calculada equivalente a 12 mg/kg/dose.",
      "Faixa recomendada: 10 a 15 mg/kg/dose.",
      "Intervalo entre as doses: 4 a 6 horas.",
    ],
  },
  cetoprofeno: {
    id: "cetoprofeno",
    nome: "Cetoprofeno",
    baseCalculo: "peso",

    targetMgPorKg: 1,

    faixaRecomendada: {
      min: 1,
      max: 1,
    },

    apresentacoes: [
      {
        heading: "Solução oral (gotas) 20 mg/mL (1 mg/gota):",
        unidade: "gotas",
        mgPorUnidade: 1,
        passoArredondamento: 1,
        doseMaximaPorDose: 50,
        instrucao: "via oral a cada 8 horas por 2 a 5 dias",
        obsExtra: "apresentação em frasco com 20 mL",
      },
    ],

    observacoesFixas: [
      "É contraindicado para crianças com menos de 1 ano de idade.",
      "Usar conscientemente pelo risco de intoxicação.",
      "Avaliar risco para alergia medicamentosa e quadro dispéptico.",
    ],
  },
  diclofenaco: {
    id: "diclofenaco-potassico",
    nome: "Diclofenaco Potássico",
    baseCalculo: "peso",

    targetMgPorKg: 0.6,

    faixaRecomendada: {
      min: 0.6,
      max: 0.6,
    },

    apresentacoes: [
      {
        heading: "Solução oral (gotas) 15 mg/mL (0,6 mg/gota):",
        unidade: "gotas",
        mgPorUnidade: 0.6,
        passoArredondamento: 1,
        doseMaximaPorDose: 50,
        instrucao: "via oral a cada 8 horas por 2 a 5 dias",
        obsExtra: "apresentação em frasco com 20 mL",
      },

      {
        heading: "Solução oral (xarope) 2 mg/mL:",
        unidade: "mL",
        concentracaoMgMl: 2,
        passoArredondamento: 0.5,
        doseMaximaPorDose: 25,
        instrucao: "via oral a cada 8 horas por 2 a 5 dias",
        obsExtra: "apresentação em frasco com 120 mL",
      },
    ],

    observacoesFixas: [
      "Medicamento usualmente não indicado para menores de 14 anos, salvo em casos de artrite idiopática infantil.",
      "Usar conscientemente pelo risco de intoxicação.",
      "Avaliar risco para alergia medicamentosa e quadro dispéptico.",
    ],
  },
  nimesulida: {
    id: "nimesulida",
    nome: "Nimesulida",
    baseCalculo: "peso",

    targetMgPorKg: 2.5,

    faixaRecomendada: {
      min: 2.5,
      max: 2.5,
    },
    apresentacoes: [
      {
        heading: "Solução oral 50 mg/mL (2,5 mg/gota):",
        unidade: "gotas",
        mgPorUnidade: 2.5,
        passoArredondamento: 1,
        doseMaximaPorDose: 40,
        instrucao: "via oral a cada 12 horas por 2 a 5 dias",

        obsExtra: ["apresentação em frasco com 15 mL"],
      },
    ],

    observacoesFixas: [
      "Medicamento usualmente não indicado para menores de 12 anos.",
      "Usar conscientemente pelo risco de intoxicação.",
      "Avaliar risco para alergia medicamentosa e quadro dispéptico.",
    ],
  },
  cimetidina: {
    nome: "Cimetidina",
    baseCalculo: "peso",

    targetMgPorKg: 5,

    faixaRecomendada: {
      min: 5,
      max: 10,
    },

    apresentacoes: [
      {
        heading: "Solução injetável 150 mg/mL:",
        unidade: "mL",
        concentracaoMgMl: 150,
        passoArredondamento: 0.1,
        doseMaximaPorDose: 2,

        instrucao:
          "intramuscular ou endovenoso a cada 6 horas conforme necessário",

        obsExtra: [
          "apresentação em ampola com 2 mL",
          "em uso endovenoso, diluir em 20 mL de soro fisiológico 0,9% e administrar em bolus de 2 minutos. Alternativamente, diluir em 100 mL de soro fisiológico 0,9% e administrar em 30 minutos",
        ],
      },
    ],

    observacoesFixas: [
      "Dose calculada equivalente a 5 mg/kg/dose (usual: 5–10 mg/kg/dose)",
      "Em recém-nascidos fazer metade da dose calculada",
      "Contraindicado em pacientes com asma ou doença cardíaca",
    ],
  },
  omeprazol: {
    nome: "Omeprazol",
    baseCalculo: "peso",

    targetMgPorKg: 0.8,

    faixaRecomendada: {
      min: 0.8,
      max: 1,
    },

    apresentacoes: [
      {
        heading: "Cápsula de 20 mg:",
        unidade: "cápsula",
        mgPorUnidade: 20,
        passoArredondamento: 1,

        instrucao: "via oral, 1 vez ao dia conforme necessário",

        obsExtra: [
          "dose: crianças < 20 kg: 10–20 mg/dose; crianças > 20 kg: 20–40 mg/dose",
          "pode abrir a cápsula e misturar com líquido para ingestão imediata",
          "apresentação em embalagens com 7, 14, 28 comprimidos",
        ],
      },

      {
        heading: "Solução injetável 4 mg/mL:",
        unidade: "mL",
        concentracaoMgMl: 4,
        passoArredondamento: 0.1,

        instrucao: "endovenoso, 1 vez ao dia, conforme necessário",

        obsExtra: [
          "dose calculada equivalente a 0,8 mg/kg/dose (usual: 0,8–1 mg/kg/dose)",
          "dose máxima de 5 mL por dose se < 20 kg",
          "dose máxima de 10 mL por dose se > 20 kg",
          "apresentação em embalagem com frasco-ampola com pó com 40 mg para solução injetável e solução diluente de 10 mL",
        ],
      },
    ],

    observacoesFixas: [
      "Deve-se evitar o seu uso concomitante com outros medicamentos antiácidos",
    ],
  },
  ranitidina: {
    nome: "Ranitidina",
    baseCalculo: "peso",

    apresentacoes: [
      {
        heading: "Solução oral (xarope) 15 mg/mL (75 mg/5 mL):",
        unidade: "mL",
        concentracaoMgMl: 15,
        targetMgPorKg: 3,
        faixaRecomendada: {
          min: 2,
          max: 4,
        },
        passoArredondamento: 0.1,
        doseMaximaPorDose: 10,
        instrucao:
          "via oral a cada 12 horas conforme necessário - usualmente a cada 12 horas",
        obsExtra: "apresentação em frascos com 120 mL",
      },

      {
        heading: "Solução injetável 50 mg/mL:",
        unidade: "mL",
        concentracaoMgMl: 50,
        targetMgPorKg: 2.5,
        faixaRecomendada: {
          min: 1,
          max: 3,
        },
        passoArredondamento: 0.1,
        doseMaximaPorDose: 2,
        instrucao:
          "endovenoso a cada 12 horas conforme necessário - usualmente a cada 12 horas",
        obsExtra: "apresentação em ampola com 2 mL",
      },
    ],

    observacoesFixas: [
      "Medicamento suspenso no Brasil",
      "Deve-se evitar o seu uso de forma concomitante com outros medicamentos antiácidos",
    ],
  },
  cetirizina: {
  nome: "Cetirizina",
  baseCalculo: "idade",

  apresentacoes: [
    {
      heading: "Solução oral (xarope) 1 mg/mL:",
      unidade: "mL",
      doseMaximaPorDose: 5,
      instrucao: "via oral a cada 12 horas por até 5 dias",
      obsExtra: "apresentação em frasco com 60, 75, 80 ou 120 mL",
    },
  ],

  observacoesFixas: [
    "Não indicado para menores de 2 anos de idade",
    "Tem a vantagem de ser um anti-histamínico de segunda geração - não causando assim sedação",
  ],

  faixas: [
    {
      idadeMinAnos: 2,
      idadeMaxAnos: 6,
      doseFixaMg: 2.5,
      unidade: "mL",
      intervaloHoras: 12,
    },
    {
      idadeMinAnos: 6,
      idadeMaxAnos: 12,
      doseFixaMg: 5,
      unidade: "mL",
      intervaloHoras: 12,
    },
    {
      idadeMinAnos: 12,
      idadeMaxAnos: null,
      doseFixaMg: 10,
      unidade: "mL",
      intervaloHoras: 24,
    },
  ],
},
desloratadina: {
  nome: "Desloratadina",
  baseCalculo: "idade",

  apresentacoes: [
    {
      heading: "Solução oral (xarope) 0,5 mg/mL:",
      unidade: "mL",
      instrucao: "via oral a cada 24 horas por até 5 dias",
      obsExtra: "apresentação em frasco com 30, 60 ou 100 mL",
    },
  ],

  faixas: [
    {
      idadeMinMeses: 6,
      idadeMaxMeses: 11,
      doseFixaMg: 1,
      doseExibida: "2 mL",
      unidade: "mL",
      intervaloHoras: 24,
    },

    {
      idadeMinMeses: 12,
      idadeMaxMeses: 71,
      doseFixaMg: 1.25,
      doseExibida: "2,5 mL",
      unidade: "mL",
      intervaloHoras: 24,
    },

    {
      idadeMinMeses: 72,
      idadeMaxMeses: 143,
      doseFixaMg: 2.5,
      doseExibida: "5 mL",
      unidade: "mL",
      intervaloHoras: 24,
    },

    {
      idadeMinMeses: 144,
      idadeMaxMeses: null,
      doseFixaMg: 5,
      doseExibida: "10 mL",
      unidade: "mL",
      intervaloHoras: 24,
    },
  ],

  observacoesFixas: [
    "Não indicado para menores de 6 meses de idade",
    "Anti-histamínico de segunda geração, com baixo potencial de sedação",
    "Não aumentar a dose ou a frequência de administração além da recomendada",
  ],
},
dexclorfeniramina: {
  nome: "Dexclorfeniramina",
  baseCalculo: "idade",

  apresentacoes: [
    {
      heading: "Solução oral (xarope) 2 mg/5 mL:",
      unidade: "mL",
      instrucao: "via oral a cada 8 horas por até 5 dias",
      doseMaximaPorDose: 5,
      obsExtra: "apresentação em frasco com 100 mL",
    },
    {
      heading: "Solução oral (gotas) 2,8 mg/mL (0,1 mg/gota):",
      unidade: "gotas",
      instrucao: "via oral a cada 8 horas por até 5 dias",
      doseMaximaPorDose: 20,
      obsExtra: "apresentação em frasco com 20 mL",
    },
  ],

  faixas: [
    {
      idadeMinMeses: 24,
      idadeMaxMeses: 71,
      doseFixaMg: 0.5,
      doseExibida: "1,25 mL",
      unidade: "mL",
      intervaloHoras: 8,
    },
    {
      idadeMinMeses: 72,
      idadeMaxMeses: 143,
      doseFixaMg: 1,
      doseExibida: "2,5 mL",
      unidade: "mL",
      intervaloHoras: 8,
    },
    {
      idadeMinMeses: 144,
      idadeMaxMeses: null,
      doseFixaMg: 2,
      doseExibida: "5 mL",
      unidade: "mL",
      intervaloHoras: 8,
    },
  ],

  observacoesFixas: [
    "Não indicado para menores de 2 anos de idade",
    "Durante o uso, avaliar a presença de sedação e hipotensão",
    "Não indicar para tratamento de asma e pacientes com QT prolongado",
  ],
},
fexofenadina: {
  nome: "Fexofenadina",
  baseCalculo: "idade",

  apresentacoes: [
    {
      heading: "Suspensão oral 6 mg/mL:",
      unidade: "mL",
      instrucao: "via oral a cada 12 horas por até 5 dias",
      doseMaximaPorDose: 10,
      obsExtra: "apresentação em frasco com 60 ou 150 mL",
    },
  ],

  faixas: [
    {
      idadeMinMeses: 6,
      idadeMaxMeses: 23,
      doseFixaMg: 15,
      doseExibida: "2,5 mL",
      unidade: "mL",
      intervaloHoras: 12,
    },
    {
      idadeMinMeses: 24,
      idadeMaxMeses: 143,
      doseFixaMg: 30,
      doseExibida: "5 mL",
      unidade: "mL",
      intervaloHoras: 12,
    },
    {
      idadeMinMeses: 144,
      idadeMaxMeses: null,
      doseFixaMg: 60,
      doseExibida: "10 mL",
      unidade: "mL",
      intervaloHoras: 12,
    },
  ],

  observacoesFixas: [
    "Não indicado para menores de 6 meses de idade",
    "Tem a vantagem de ser um anti-histamínico de segunda geração - não causando assim sedação",
  ],
},
hidroxizina: {
  nome: "Hidroxizina",
  baseCalculo: "peso",

  targetMgPorKg: 0.7,
  faixaRecomendada: {
    min: 0.7,
    max: 0.7,
  },

  apresentacoes: [
    {
      heading: "Solução oral / xarope 2 mg/mL:",
      unidade: "mL",
      concentracaoMgMl: 2,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 12.5,
      instrucao: "via oral a cada 8 horas por até 5-10 dias",
      obsExtra: "apresentação em frasco com 100, 120 ou 150 mL",
    },
  ],

  observacoesFixas: [
    "Durante o uso, avaliar a presença de sedação e hipotensão",
    "Não indicar para tratamento de asma e pacientes com QT prolongado",
    "Em < 6 meses preferir anti-histamínicos de 2ª geração. Observação: dados clínicos reais são limitados nessa faixa etária. O ponto é que 1ª geração é evitada < 6 meses por risco de sedação profunda, apneia e morte súbita.",
  ],
},
maleatoBronfeniraminaFenilefrina: {
  nome: "Maleato de Bronfeniramina + Cloridrato de Fenilefrina",
  baseCalculo: "peso",
  targetMgPorKg: 0.125, // referente ao componente bronfeniramina
  apresentacoes: [
    {
      heading: "Solução oral (xarope) 2 mg/5 mL + 5 mg/5 mL:",
      unidade: "mL",
      concentracaoMgMl: 0.4, // 2mg/5mL de bronfeniramina
      passoArredondamento: 0.5,
      doseMaximaPorDose: 10,
      instrucao: "via oral a cada 8 horas por até 5 dias",
      obsExtra: "apresentação em frasco com 100 mL",
    },
    {
      heading: "Solução oral (gotas) 2 mg/5 mL + 2,5 mg/5 mL (0,1 mg/gota + 0,12 mg/gota):",
      unidade: "gotas",
      mgPorUnidade: 0.1, // mg de bronfeniramina por gota
      passoArredondamento: 1,
      doseMaximaPorDose: 50,
      instrucao: "via oral a cada 8 horas por até 5 dias",
      obsExtra: "apresentação em frasco com 20 mL",
    },
  ],
  observacoesFixas: [
    "Não indicado para menores de 2 anos de idade",
    "Durante o uso, avaliar a presença de agitação nas crianças",
  ],
},
prometazina: {
  nome: "Prometazina",
  baseCalculo: "peso",
  targetMgPorKg: 0.5,
  apresentacoes: [
    {
      heading: "Solução injetável 50 mg/2 mL:",
      unidade: "mL",
      concentracaoMgMl: 25, // 50mg/2mL
      passoArredondamento: 0.1,
      doseMaximaPorDose: 1, // corrigido de 2 mL para 1 mL (25 mg)
      instrucao: "intramuscular conforme necessário, repetindo a cada 8 horas se necessário",
      obsExtra: "apresentação em ampola com 2 mL",
    },
  ],
  observacoesFixas: [
    "Contraindicado para menores de 2 anos de idade",
    "Reservar seu uso principalmente em casos de emergência",
    "Durante o uso, avaliar a presença de sedação e hipotensão",
    "Não indicar para tratamento de asma e pacientes com QT prolongado",
  ],
},
adrenalinaInalacao: {
  nome: "Adrenalina (Inalação)",
  baseCalculo: "peso",

  targetMgPorKg: 0.5,

  apresentacoes: [
    {
      heading: "Solução 1 mg/mL:",
      unidade: "mL",
      concentracaoMgMl: 1,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 5,
      instrucao:
        "diluídos em SF 0,9% em proporção de 1:5. Nebulizar e inalar por 15 minutos.",
      obsExtra: [
        "onde houver oxigênio instalado, a solução é melhor administrada com um fluxo de 6 a 8 litros/minuto",
        "apresentação em ampola com 1 mL",
      ],
    },
  ],

  observacoesFixas: [
    "Provoca taquicardia e tremores",
    "Tomar cuidado com doses elevadas",
  ],
},
fenoterol: {
  nome: "Fenoterol",
  baseCalculo: "peso",

  targetMgPorKg: 0.05,

  apresentacoes: [
    {
      heading:
        "Solução para nebulização 5 mg/mL (0,25 mg/gota):",
      unidade: "gotas",
      mgPorUnidade: 0.25,
      passoArredondamento: 1,
      doseMaximaPorDose: 10,
      instrucao:
        "diluídas em SF 0,9% até um volume final de 3-4 mL. Inalar de 6 em 6 horas conforme necessário (ou até 3 vezes de 20 em 20 minutos).",
      obsExtra: [
        "não diluir em água destilada",
        "onde houver oxigênio instalado, a solução é melhor administrada com um fluxo de 6 a 8 litros/minuto",
        "apresentação em frasco com 20 mL",
      ],
    },
  ],

  observacoesFixas: [
    "Provoca taquicardia e tremores - com curso benigno",
    "Em casos de necessidade de uso contínuo, monitorizar níveis de potássio",
  ],
},
ipratropio: {
  nome: "Ipratrópio",
  baseCalculo: "peso",
  targetMgPorKg: 0.05,

  apresentacoes: [
    {
      heading:
        "Solução para nebulização 0,250 mg/mL (0,0125 mg/gota):",
      unidade: "gotas",
      mgPorUnidade: 0.0125,
      passoArredondamento: 1,
      doseMaximaPorDose: 40,

      instrucao:
        "diluídas em SF 0,9% até um volume final de 3-4 mL. Inalar de 6 em 6 horas conforme necessário (ou até 3 vezes de 20 em 20 minutos).",

      obsExtra: [
        "não diluir em água destilada",
        "onde houver oxigênio instalado, a solução é melhor administrada com um fluxo de 6 a 8 litros/minuto",
        "apresentação em frasco com 20 mL",
      ],
    },
  ],

  observacoesFixas: [
    "Em alguns estudos há evidência que na emergência tem eficácia apenas na primeira nebulização, não sendo necessário realizar na sequência",
  ],
},
acidoNalidixico: {
  nome: "Ácido Nalidíxico",
  baseCalculo: "peso",
  targetMgPorKg: 12.5,

  apresentacoes: [
    {
      heading: "Suspensão oral 50 mg/mL:",
      unidade: "mL",
      concentracaoMgMl: 50,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 10,

      instrucao:
        "via oral a cada 6 horas por 7-14 dias",

      obsExtra:
        "apresentação em frasco com 60 mL",
    },
  ],

  observacoesFixas: [
    "Não utilizar em crianças menores de 3 meses",
  ],
},
amicacina: {
  nome: "Amicacina",
  baseCalculo: "peso",
  targetMgPorKg: 7.5,

  apresentacoes: [
    {
      heading: "Cálculo de dose em mg (7,5 mg/kg/dose):",
      unidade: "mg",
      mgPorUnidade: 1,
      passoArredondamento: 1,
      doseMaximaPorDose: 750,
      instrucao:
        "endovenoso ou intramuscular a cada 12 horas, manter conforme necessário",
    },

    {
      heading: "Diluição 1 mg/mL - USO ENDOVENOSO:",
      unidade: "mL",
      concentracaoMgMl: 1,
      passoArredondamento: 1,
      doseMaximaPorDose: 750,
      instrucao:
        "endovenoso lentamente (60 minutos) a cada 12 horas, manter conforme necessário",
      obsExtra: [
        "apresentação em frasco-ampola 50 mg/mL com 1 ou 2 mL - diluir 2 mL em 98 mL de SF 0,9% - perfazendo uma solução final de 1 mg/mL",
        "apresentação em frasco-ampola 125 mg/mL com 2 mL - diluir 2 mL em 248 mL de SF 0,9% - perfazendo uma solução final de 1 mg/mL",
        "apresentação em frasco-ampola 250 mg/mL com 1 ou 2 mL - diluir 2 mL em 498 mL de SF 0,9% - perfazendo uma solução final de 1 mg/mL",
      ],
    },

    {
      heading: "Apresentação 50 mg/mL - USO INTRAMUSCULAR:",
      unidade: "mL",
      concentracaoMgMl: 50,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 15,
      instrucao:
        "intramuscular profunda em glúteo a cada 12 horas, mantendo conforme necessário",
      obsExtra:
        "apresentação em frasco-ampola 50 mg/mL com 1 ou 2 mL",
    },

    {
      heading: "Apresentação 125 mg/mL - USO INTRAMUSCULAR:",
      unidade: "mL",
      concentracaoMgMl: 125,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 6,
      instrucao:
        "intramuscular profunda em glúteo a cada 12 horas, mantendo conforme necessário",
      obsExtra:
        "apresentação em frasco-ampola 50 mg/mL com 2 mL",
    },

    {
      heading: "Apresentação 250 mg/mL - USO INTRAMUSCULAR:",
      unidade: "mL",
      concentracaoMgMl: 250,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 3,
      instrucao:
        "intramuscular profunda em glúteo a cada 12 horas, mantendo conforme necessário",
      obsExtra:
        "apresentação em frasco-ampola 250 mg/mL com 1 ou 2 mL",
    },
  ],

  observacoesFixas: [
    "A partir do 9º dia de tratamento, deve-se avaliar o nível sérico da Amicacina, cujo objetivo é de 20-30 mg/mL",
    "Risco aumentado de ototoxicidade e nefrotoxicidade principalmente em neonatos",
  ],
},
amoxicilina: {
  nome: "Amoxicilina",
  baseCalculo: "peso",

  apresentacoes: [
    {
      heading:
        "Suspensão oral 250 mg/5 mL (dose padrão de 50 mg/kg/dia):",
      unidade: "mL",
      concentracaoMgMl: 50,
      targetMgPorKg: 50 / 3,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 10,
      instrucao: "via oral a cada 8 horas por 7-14 dias",
      obsExtra: "apresentação em frasco com 60 ou 150 mL",
    },

    {
      heading:
        "Suspensão oral 400 mg/5 mL (dose padrão de 50 mg/kg/dia):",
      unidade: "mL",
      concentracaoMgMl: 80,
      targetMgPorKg: 50 / 2,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 10,
      instrucao: "via oral a cada 12 horas por 7-14 dias",
      obsExtra: "apresentação em frasco com 100 mL",
    },

    {
      heading:
        "Suspensão oral 250 mg/5 mL (dose “dobrada” de 90 mg/kg/dia):",
      unidade: "mL",
      concentracaoMgMl: 50,
      targetMgPorKg: 90 / 3,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 10,
      instrucao: "via oral a cada 8 horas por 7-14 dias",
      obsExtra: "apresentação em frasco com 60 ou 150 mL",
    },

    {
      heading:
        "Suspensão oral 400 mg/5 mL (dose “dobrada” de 90 mg/kg/dia):",
      unidade: "mL",
      concentracaoMgMl: 80,
      targetMgPorKg: 90 / 2,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 10,
      instrucao: "via oral a cada 12 horas por 7-14 dias",
      obsExtra: "apresentação em frasco com 100 mL",
    },
  ],

  observacoesFixas: [
    "A absorção da amoxicilina é otimizada quando administrada no início das refeições",
    "Em infecções muito graves aumentar a dose padrão acima calculada em 80% (só multiplicar por 1,8).",
    "Diante da apresentação de Rash com o uso de amoxicilina avaliar o diferencial de Mononucleose Infecciosa e alergia medicamentosa",
  ],
},
amoxicilinaClavulanato: {
  nome: "Amoxicilina + Clavulanato",
  baseCalculo: "peso",

  apresentacoes: [
    {
      heading: "Suspensão oral 250 mg + 62,5 mg/5 mL:",
      unidade: "mL",
      concentracaoMgMl: 50,
      targetMgPorKg: 50 / 3,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 10,
      instrucao: "via oral a cada 8 horas por 7-14 dias",
      obsExtra: "apresentação em frasco com 90 mL",
    },

    {
      heading: "Suspensão oral 400 mg + 57 mg/5 mL:",
      unidade: "mL",
      concentracaoMgMl: 80,
      targetMgPorKg: 50 / 2,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 10,
      instrucao: "via oral a cada 12 horas por 7-14 dias",
      obsExtra: "apresentação em frasco com 62 ou 124 mL",
    },

    {
      heading: "Diluição 10 mg/mL - ENDOVENOSO:",
      unidade: "mL",
      concentracaoMgMl: 10,
      targetMgPorKg: 45 / 3,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 100,
      instrucao:
        "endovenoso em 30-40 minutos a cada 8 horas por 7-14 dias",
      obsExtra: [
        "apresentação em pó para solução injetável com 500 mg de amoxicilina + 100 mg de clavulanato - dissolver em 10 mL de água destilada, e na sequência, completar com Soro Fisiológico 0,9% até 50 mL - perfazendo uma solução final de 10 mg/mL de amoxicilina",
        "apresentação em pó para solução injetável com 1 g de amoxicilina + 200 mg de clavulanato - dissolver em 20 mL de água destilada, e na sequência, completar com Soro Fisiológico 0,9% até 100 mL - perfazendo uma solução final de 10 mg/mL de amoxicilina",
      ],
    },
  ],

  observacoesFixas: [
    "Para as formulações orais, dose equivalente a 50 mg/kg/dia de amoxicilina; para a formulação endovenosa equivalente a 45 mg/kg/dia de amoxicilina",
    "A absorção da amoxicilina é otimizada quando administrada no início das refeições",
    "Em infecções muito graves aumentar a dose acima calculada em 80% (só multiplicar por 1,8).",
    "Diante da apresentação de Rash com o uso de amoxicilina avaliar o diferencial de Mononucleose Infecciosa e alergia medicamentosa",
  ],
},
ampicilina: {
  nome: "Ampicilina",
  baseCalculo: "peso",
  targetMgPorKg: 25,

  apresentacoes: [
    {
      heading: "Cálculo de dose em mg (25 mg/kg/dose):",
      unidade: "mg",
      mgPorUnidade: 1,
      passoArredondamento: 1,
      doseMaximaPorDose: 500,
      instrucao:
        "via oral, endovenosa ou intramuscular, a cada 6 horas por 7-10 dias",
    },

    {
      heading: "Suspensão oral 50 mg/mL:",
      unidade: "mL",
      concentracaoMgMl: 50,
      targetMgPorKg: 25,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 10,
      instrucao: "via oral a cada 6 horas por 7-10 dias",
      obsExtra:
        "apresentação em pó para reconstituição oral - com frasco com 60 mL",
    },

    {
      heading: "Solução injetável 10 mg/mL - ENDOVENOSO:",
      unidade: "mL",
      concentracaoMgMl: 10,
      targetMgPorKg: 25,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 50,
      instrucao: "endovenoso a cada 6 horas por 7-10 dias",
      obsExtra: [
        "apresentação em pó para solução injetável com 500 mg - adicionar 3 mL de SF 0,9% ao pó para reconstituir, na sequência diluir o reconstituído em 47 mL de SF 0,9%, perfazendo uma solução final de 10 mg/mL",
        "apresentação em pó para solução injetável com 1000 mg - adicionar 3 mL de SF 0,9% ao pó para reconstituir, na sequência diluir o reconstituído em 97 mL de SF 0,9%, perfazendo uma solução final de 10 mg/mL",
      ],
    },

    {
      heading: "Solução injetável 166,66 mg/mL - INTRAMUSCULAR:",
      unidade: "mL",
      concentracaoMgMl: 166.66,
      targetMgPorKg: 25,
      passoArredondamento: 0.01,
      doseMaximaPorDose: 3,
      instrucao:
        "intramuscular profunda (glúteos) a cada 6 horas por 7-10 dias",
      obsExtra: [
        "apresentação em pó para solução injetável com 500 mg - adicionar 3 mL de SF 0,9% ao pó para reconstituir - elaborando uma solução com 166,66 mg/mL",
        "apresentação em pó para solução injetável com 1000 mg - adicionar 6 mL de SF 0,9% ao pó para reconstituir - elaborando uma solução com 166,66 mg/mL",
      ],
    },
  ],

  observacoesFixas: [
    "Para o tratamento de meningite, usualmente triplicar-se a dose calculada",
    "No tratamento direcionado para sepse neonatal, deve-se associar outro medicamento para cobrir o espectro - como exemplo Gentamicina",
    "Pode existir aumento laboratorial de TGO e TGP",
  ],
},
ampicilinaSulbactam: {
  nome: "Ampicilina + Sulbactam",
  baseCalculo: "peso",

  apresentacoes: [
    {
      heading:
        "Cálculo de dose em mg - Maiores de 1 ano (50 mg/kg/dose):",
      unidade: "mg",
      mgPorUnidade: 1,
      targetMgPorKg: 50,
      passoArredondamento: 1,
      doseMaximaPorDose: 3000,
      instrucao:
        "endovenoso, a cada 6 horas, manter conforme necessário",
    },

    {
      heading: "Diluição 15 mg/mL - Maiores de 1 ano:",
      unidade: "mL",
      concentracaoMgMl: 15,
      targetMgPorKg: 50,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 200,
      instrucao:
        "endovenoso lentamente (15 minutos), a cada 6 horas, manter conforme necessário",
      obsExtra: [
        "apresentação em pó para solução injetável - 1,5 g (1 g de ampicilina + 0,5 g de sulbactam) ou 3 g (2 g de ampicilina + 1 g de sulbactam)",
        "Reconstituir em 3,2 mL (1,5 g) ou 6,4 mL (3 g) em água estéril de injeção. Diluir a solução reconstituída em 96,8 mL de SF 0,9% (1,5 g) ou em 193,6 mL de SF 0,9% (3 g) - perfazendo uma solução final de 15 mg/mL",
      ],
    },

    {
      heading:
        "Cálculo de dose em mg - Menores de 1 ano (25 mg/kg/dose):",
      unidade: "mg",
      mgPorUnidade: 1,
      targetMgPorKg: 25,
      passoArredondamento: 1,
      doseMaximaPorDose: 1500,
      instrucao:
        "endovenoso, a cada 6 horas, manter conforme necessário",
    },

    {
      heading: "Diluição 15 mg/mL - Menores de 1 ano:",
      unidade: "mL",
      concentracaoMgMl: 15,
      targetMgPorKg: 25,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 100,
      instrucao:
        "endovenoso lentamente (15 minutos), a cada 6 horas, manter conforme necessário",
      obsExtra: [
        "apresentação em pó para solução injetável - 1,5 g (1 g de ampicilina + 0,5 g de sulbactam) ou 3 g (2 g de ampicilina + 1 g de sulbactam)",
        "Reconstituir em 3,2 mL (1,5 g) ou 6,4 mL (3 g) em água estéril de injeção. Diluir a solução reconstituída em 96,8 mL de SF 0,9% (1,5 g) ou em 193,6 mL de SF 0,9% (3 g) - perfazendo uma solução final de 15 mg/mL",
      ],
    },
  ],

  observacoesFixas: [
    "Pode existir aumento laboratorial de TGO, TGP, além de anemia, trombocitopenia e eosinofilia",
  ],
},
axetilcefuroxima: {
  nome: "Axetilcefuroxima",
  baseCalculo: "peso",
  targetMgPorKg: 15,

  apresentacoes: [
    {
      heading: "Solução oral (xarope) 250 mg/5 mL:",
      unidade: "mL",
      concentracaoMgMl: 50,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 5,
      instrucao: "via oral a cada 12 horas por 7 dias",
      obsExtra: "apresentação em frasco com 50 ou 70 mL",
    },
  ],

  observacoesFixas: [
    "Laboratorialmente pode cursar com eosinofilia, leucopenia, trombocitopenia e elevação de TGO/TGP",
    "Pode cursar com diarreia e desequilíbrio da flora intestinal da criança",
  ],
},
azitromicina: {
  nome: "Azitromicina",
  baseCalculo: "peso",
  targetMgPorKg: 10,

  apresentacoes: [
    {
      heading: "Suspensão oral 200 mg/5 mL (40 mg/mL):",
      unidade: "mL",
      concentracaoMgMl: 40,
      targetMgPorKg: 10,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 12.5,
      instrucao: "via oral uma vez ao dia, por 3-5 dias",
      obsExtra: "apresentação em frascos com 15, 22,5 ou 37,5 mL",
    },
  ],

  observacoesFixas: [
    "É uma excelente escolha para Pneumonia Atípica, sendo primeira linha para Coqueluche",
  ],
},
cefaclor: {
  nome: "Cefaclor",
  baseCalculo: "peso",

  apresentacoes: [
    {
      heading: "Solução oral 250 mg/5 mL (50 mg/mL):",
      unidade: "mL",
      concentracaoMgMl: 50,
      targetMgPorKg: 10,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 10,
      instrucao: "via oral a cada 12 horas por 10 dias",
      obsExtra: [
        "em quadros graves, pode-se dobrar a dose calculada até o limite da dose máxima",
        "apresentação em frasco com 80, 100, 120 ou 150 mL",
      ],
    },

    {
      heading: "Solução oral 375 mg/5 mL (75 mg/mL):",
      unidade: "mL",
      concentracaoMgMl: 75,
      targetMgPorKg: 10,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 6.6,
      instrucao: "via oral a cada 12 horas por 10 dias",
      obsExtra: [
        "em quadros graves, pode-se dobrar a dose calculada até o limite da dose máxima",
        "apresentação em frasco com 50, 80, 120 ou 150 mL",
      ],
    },
  ],

  observacoesFixas: [
    "Algumas referências referem ser contraindicado para menores de 1 mês de idade",
  ],
},
cefadroxila: {
  nome: "Cefadroxila",
  baseCalculo: "peso",

  apresentacoes: [
    {
      heading: "Suspensão oral 250 mg/5 mL:",
      unidade: "mL",
      concentracaoMgMl: 50,
      targetMgPorKg: 25,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 20,
      instrucao: "via oral a cada 12 horas por 10 dias",
      obsExtra: "apresentação em frasco com 100 mL",
    },

    {
      heading: "Suspensão oral 500 mg/5 mL:",
      unidade: "mL",
      concentracaoMgMl: 100,
      targetMgPorKg: 25,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 10,
      instrucao: "via oral a cada 12 horas por 10 dias",
      obsExtra: "apresentação em frasco com 100 mL",
    },
  ],

  observacoesFixas: [
    "Risco de Nefrotoxicidade, principalmente se utilizado em conjunto com aminoglicosídeos",
    "Durante o uso, laboratorialmente pode cursar com trombocitopenia",
  ],
},
cefalexina: {
  nome: "Cefalexina",
  baseCalculo: "peso",

  apresentacoes: [
    {
      heading: "Suspensão oral 250 mg/5 mL:",
      unidade: "mL",
      concentracaoMgMl: 50,
      targetMgPorKg: 12.5,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 10,
      instrucao: "via oral a cada 6 horas por 7-14 dias",
      obsExtra: "apresentação em frasco com 60 ou 100 mL",
    },
  ],

  observacoesFixas: [
    "Em casos graves de Infecção do Trato Urinário (ITU), pode-se dobrar a dose calculada",
  ],
},
cefalotina: {
  nome: "Cefalotina",
  baseCalculo: "peso",

  apresentacoes: [
    {
      heading: "Cálculo de dose em mg (30 mg/kg/dose)",
      unidade: "mg",
      mgPorUnidade: 1,
      targetMgPorKg: 30,
      passoArredondamento: 1,
      doseMaximaPorDose: 2000,
      instrucao:
        "via endovenosa, a cada 6 horas, mantendo conforme necessário",
    },

    {
      heading: "Diluição 10 mg/mL - USO ENDOVENOSO:",
      unidade: "mL",
      concentracaoMgMl: 10,
      targetMgPorKg: 30,
      passoArredondamento: 0.1,
      doseMaximaPorDose: 200,
      instrucao:
        "endovenoso (lentamente em 30 minutos) a cada 6 horas, mantendo conforme necessário",
      obsExtra:
        "apresentação em pó com 1000 mg - reconstituir o pó em 10 mL de água estéril de injeção - diluir então o produto reconstituído em 90 mL de SF 0,9% ou SG 5%, perfazendo uma concentração final de 10 mg/mL",
    },
  ],

  observacoesFixas: [
  "Não usar em pacientes com sensibilidade à cefalosporinas",
],
},
};
