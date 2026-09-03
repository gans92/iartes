// =====================================================
// FUNÇÕES AUXILIARES
// =====================================================

export function roundToStep(value, step) {
  return Math.round(value / step) * step;
}

function formatarDose(dose, apresentacao) {
  if (apresentacao.unidade === "gotas") {
    return String(Math.round(dose));
  }

  if (apresentacao.passoArredondamento === 0.5) {
    return dose.toFixed(1).replace(/\.0$/, "");
  }

  return dose.toFixed(1);
}

// =====================================================
// CÁLCULO POR PESO
// =====================================================

export function calcularApresentacoesPeso(medicamento, pesoKg) {
  if (!pesoKg || pesoKg <= 0) return null;

  if (!medicamento.targetMgPorKg) return null;

  // Dose em mg por tomada
  const targetMg = medicamento.targetMgPorKg * pesoKg;

  return medicamento.apresentacoes.map((ap) => {
    const passo = ap.passoArredondamento ?? 0.1;

    let rawDose;

    // Apresentação calculada em gotas ou outra unidade
    if (ap.mgPorUnidade) {
      rawDose = targetMg / ap.mgPorUnidade;
    }

    // Apresentação calculada em mL
    else if (ap.concentracaoMgMl) {
      rawDose = targetMg / ap.concentracaoMgMl;
    }

    // Apresentação sem dados suficientes para cálculo
    else {
      return {
        heading: ap.heading,
        unidade: ap.unidade,
        dose: null,
        doseExibida: null,
        instrucao: ap.instrucao,
        doseMaximaPorDose: ap.doseMaximaPorDose,
        obsExtra: ap.obsExtra,
      };
    }

    // Arredondamento conforme a apresentação
    let doseArredondada = roundToStep(rawDose, passo);

    // =================================================
    // DOSE MÁXIMA POR DOSE
    // =================================================

    if (
      ap.doseMaximaPorDose !== undefined &&
      doseArredondada > ap.doseMaximaPorDose
    ) {
      doseArredondada = ap.doseMaximaPorDose;
    }

    return {
      heading: ap.heading,
      unidade: ap.unidade,
      dose: doseArredondada,
      doseExibida: formatarDose(doseArredondada, ap),
      instrucao: ap.instrucao,
      doseMaximaPorDose: ap.doseMaximaPorDose,
      obsExtra: ap.obsExtra,
    };
  });
}

// =====================================================
// MG/KG EFETIVO APÓS ARREDONDAMENTO
// =====================================================

export function calcularMgPorKgEfetivo(medicamento, pesoKg) {
  if (!pesoKg || pesoKg <= 0) return null;

  if (!medicamento.targetMgPorKg) return null;

  // Procura uma apresentação que permita calcular em unidades
  const referencia = medicamento.apresentacoes.find(
    (ap) => ap.mgPorUnidade
  );

  if (!referencia) return null;

  const targetMg = medicamento.targetMgPorKg * pesoKg;

  const passo = referencia.passoArredondamento ?? 1;

  let doseArredondada = roundToStep(
    targetMg / referencia.mgPorUnidade,
    passo
  );

  // Aplica também o limite máximo da apresentação
  if (
    referencia.doseMaximaPorDose !== undefined &&
    doseArredondada > referencia.doseMaximaPorDose
  ) {
    doseArredondada = referencia.doseMaximaPorDose;
  }

  const mgReal =
    doseArredondada * referencia.mgPorUnidade;

  return Math.round((mgReal / pesoKg) * 10) / 10;
}

// =====================================================
// CÁLCULO POR IDADE
// =====================================================

export function calcularPorIdade(medicamento, idadeMeses) {
  if (
    idadeMeses === null ||
    idadeMeses === undefined ||
    idadeMeses < 0
  ) {
    return null;
  }

  if (!medicamento.faixas) {
    return null;
  }

  const idadeAnos = idadeMeses / 12;

  const faixa = medicamento.faixas.find(
    (f) =>
      idadeAnos >= f.idadeMinAnos &&
      (
        f.idadeMaxAnos === null ||
        idadeAnos < f.idadeMaxAnos
      )
  );

  if (!faixa) return null;

  if (faixa.contraindicado) {
    return {
      contraindicado: true,
      motivo: faixa.motivo,
    };
  }

  const doseMg = faixa.doseFixaMg ?? null;

  return {
    contraindicado: false,
    doseMg,
    unidade: faixa.unidade,
    intervaloHoras: faixa.intervaloHoras,
    precisaPeso: false,
  };
}