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
        mgPorUnidade: 100,
        passoArredondamento: 1,
        doseMaximaPorDose: 4,
        instrucao: "via oral a cada 6 horas se dor",
        obsExtra: "apresentação em embalagens com 4, 30, 32 ou 60 comprimidos",
      },
    ],

    faixas: [
      // suas faixas por idade

    ],

    observacoesFixas: [
      "Dose calculada varia conforme idade",
      "Medicamento contraindicado para menores de 6 meses de idade",
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

        obsExtra: [
          "apresentação em frasco com 15 mL",
        ],
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

        instrucao:
          "via oral, 1 vez ao dia conforme necessário",

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

        instrucao:
          "endovenoso, 1 vez ao dia, conforme necessário",

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
};