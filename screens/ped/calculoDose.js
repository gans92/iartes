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

export function calcularApresentacoesPeso(medicamento, pesoKg) {

  if (
    pesoKg === null ||
    pesoKg === undefined ||
    isNaN(pesoKg) ||
    pesoKg < 0
  ) {
    return null;
  }

  return medicamento.apresentacoes.map((ap) => {

    const targetMgPorKg =
      ap.targetMgPorKg ?? medicamento.targetMgPorKg;

    if (!targetMgPorKg) {
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

    const targetMg =
      targetMgPorKg * pesoKg;

    const passo =
      ap.passoArredondamento ?? 0.1;

    let rawDose;

    if (ap.mgPorUnidade) {

      rawDose =
        targetMg / ap.mgPorUnidade;

    } else if (ap.concentracaoMgMl) {

      rawDose =
        targetMg / ap.concentracaoMgMl;

    } else {

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

    let doseArredondada =
      roundToStep(rawDose, passo);

    if (
      ap.doseMaximaPorDose !== undefined &&
      doseArredondada > ap.doseMaximaPorDose
    ) {
      doseArredondada =
        ap.doseMaximaPorDose;
    }

    return {
      heading: ap.heading,
      unidade: ap.unidade,
      dose: doseArredondada,
      doseExibida: formatarDose(
        doseArredondada,
        ap
      ),
      instrucao: ap.instrucao,
      doseMaximaPorDose:
        ap.doseMaximaPorDose,
      obsExtra: ap.obsExtra,

      // Guarda a informação para podermos
      // mostrar a dose calculada na tela.
      targetMgPorKg,
      faixaRecomendada:
        ap.faixaRecomendada,
    };
  });
}

export function calcularMgPorKgEfetivo(medicamento, pesoKg) {
  if (pesoKg === null || pesoKg === undefined || isNaN(pesoKg) || pesoKg < 0) {
    return null;
  }

  if (!medicamento.targetMgPorKg) return null;

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

export function calcularPorIdade(medicamento, idadeEmMeses, pesoKg) {
  if (
    idadeEmMeses === null ||
    idadeEmMeses === undefined ||
    isNaN(idadeEmMeses) ||
    idadeEmMeses < 0
  ) {
    return null;
  }

  if (!medicamento.faixas || medicamento.faixas.length === 0) {
    return null;
  }

  const faixa = medicamento.faixas.find((f) => {
    const idadeMin =
      f.idadeMinMeses !== undefined
        ? f.idadeMinMeses
        : f.idadeMinAnos !== undefined
          ? f.idadeMinAnos * 12
          : 0;

    const idadeMax =
      f.idadeMaxMeses !== undefined
        ? f.idadeMaxMeses
        : f.idadeMaxAnos !== undefined && f.idadeMaxAnos !== null
          ? f.idadeMaxAnos * 12
          : null;

    return (
      idadeEmMeses >= idadeMin &&
      (idadeMax === null || idadeEmMeses <= idadeMax)
    );
  });

  if (!faixa) {
    const menorIdadePermitida = Math.min(
      ...medicamento.faixas.map((f) =>
        f.idadeMinMeses !== undefined
          ? f.idadeMinMeses
          : (f.idadeMinAnos ?? 0) * 12
      )
    );

    if (idadeEmMeses < menorIdadePermitida) {
      return {
        contraindicado: true,
        motivo: `uso não indicado para menores de ${menorIdadePermitida} meses`,
      };
    }

    return null;
  }

  // ⬇️ checagem que faltava — precisa vir logo após achar a faixa,
  // antes de montar qualquer objeto de dose.
  if (faixa.contraindicado) {
    return {
      contraindicado: true,
      motivo: faixa.motivo,
    };
  }

  // ⬇️ restaura o cálculo peso × mg/kg para faixas sem doseFixaMg
  const doseMg =
    faixa.doseFixaMg ?? (pesoKg ? pesoKg * faixa.doseMgPorKg : null);

  const precisaPeso = !faixa.doseFixaMg && !pesoKg;

  return {
    heading:
      faixa.heading ||
      medicamento.apresentacoes?.[0]?.heading ||
      `Dose por idade (${medicamento.nome}):`,

    doseMg,
    doseExibida: faixa.doseExibida ?? (doseMg !== null ? String(Math.round(doseMg)) : null),

    unidade:
      faixa.unidade ||
      medicamento.apresentacoes?.[0]?.unidade ||
      "mg",

    intervaloHoras: faixa.intervaloHoras,

    instrucao:
      faixa.instrucao ||
      medicamento.apresentacoes?.[0]?.instrucao,

    doseMaximaPorDose: faixa.doseMaximaPorDose,

    obsExtra:
      faixa.obsExtra ||
      medicamento.apresentacoes?.[0]?.obsExtra,

    precisaPeso,
    contraindicado: false,
  };
}