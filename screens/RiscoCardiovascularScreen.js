import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const CORES = {
  roxo: '#6a1fb0',
  azul: '#1a6fb0',
  vermelho: '#c0483f',
  ambar: '#8a5a1f',
  verde: '#1f7a5c',
  muitoAlto: '#800000',
};

const COR_TELA = CORES.vermelho;

function parseValorNumerico(str) {
  if (!str) return NaN;
  return parseFloat(str.toString().replace(',', '.'));
}

function Campo({ label, value, onChangeText, placeholder, disabled = false }) {
  return (
    <View style={styles.campoContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, disabled && styles.inputDisabled]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={disabled ? '#aaa' : '#999'}
        keyboardType="decimal-pad"
        editable={!disabled}
      />
    </View>
  );
}

function Toggle({ label, value, onChange }) {
  return (
    <View style={styles.toggleRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.toggleButtons}>
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            value === false && { backgroundColor: COR_TELA, borderColor: COR_TELA },
          ]}
          onPress={() => onChange(false)}
        >
          <Text style={[styles.toggleBtnText, value === false && { color: '#fff' }]}>
            Não
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleBtn,
            value === true && { backgroundColor: COR_TELA, borderColor: COR_TELA },
          ]}
          onPress={() => onChange(true)}
        >
          <Text style={[styles.toggleBtnText, value === true && { color: '#fff' }]}>
            Sim
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function calcularEGFR_CKDEPI2021({ sexo, idade, creatinina }) {
  const Scr = creatinina;
  const kappa = sexo === 'F' ? 0.7 : 0.9;
  const alpha = sexo === 'F' ? -0.241 : -0.302;

  const minTerm = Math.min(Scr / kappa, 1);
  const maxTerm = Math.max(Scr / kappa, 1);

  let egfr =
    142 *
    Math.pow(minTerm, alpha) *
    Math.pow(maxTerm, -1.2) *
    Math.pow(0.9938, idade);

  if (sexo === 'F') egfr *= 1.012;
  return egfr;
}

function calcularPreventTotalCVD({
  sexo,
  idade,
  colesterolTotal,
  hdl,
  pas,
  egfr,
  diabetes,
  tabagismo,
  pasTratada,
  estatina,
}) {
  const age = (idade - 55) / 10;
  const nonHDL = (colesterolTotal - hdl) * 0.02586 - 3.5;
  const hdlTransformed = (hdl * 0.02586 - 1.3) / 0.3;
  const sbpLow = (Math.min(pas, 110) - 110) / 20;
  const sbpHigh = (Math.max(pas, 110) - 130) / 20;

  const egfrCapped = Math.min(egfr, 150);
  const egfrLow = (Math.min(egfrCapped, 60) - 60) / -15;
  const egfrHigh = (Math.max(egfrCapped, 60) - 90) / -15;

  const dm = diabetes ? 1 : 0;
  const smoker = tabagismo ? 1 : 0;
  const htnMeds = pasTratada ? 1 : 0;
  const statin = estatina ? 1 : 0;

  let logOdds = 0;

  if (sexo === 'F') {
    logOdds =
      -3.307728 +
      0.7939329 * age +
      0.0305239 * nonHDL -
      0.1606857 * hdlTransformed -
      0.2394003 * sbpLow +
      0.360078 * sbpHigh +
      0.8667604 * dm +
      0.5360739 * smoker +
      0.6045917 * egfrLow +
      0.0433769 * egfrHigh +
      0.3151672 * htnMeds -
      0.1477655 * statin -
      0.0663612 * htnMeds * sbpHigh +
      0.1197879 * statin * nonHDL -
      0.0819715 * age * nonHDL +
      0.0306769 * age * hdlTransformed -
      0.0946348 * age * sbpHigh -
      0.27057 * age * dm -
      0.078715 * age * smoker -
      0.1637806 * age * egfrLow;
  } else {
    logOdds =
      -3.031168 +
      0.7688528 * age +
      0.0736174 * nonHDL -
      0.0954431 * hdlTransformed -
      0.4347345 * sbpLow +
      0.3362658 * sbpHigh +
      0.7692857 * dm +
      0.4386871 * smoker +
      0.5378979 * egfrLow +
      0.0164827 * egfrHigh +
      0.288879 * htnMeds -
      0.1337349 * statin -
      0.0475924 * htnMeds * sbpHigh +
      0.150273 * statin * nonHDL -
      0.0517874 * age * nonHDL +
      0.0191169 * age * hdlTransformed -
      0.1049477 * age * sbpHigh -
      0.2251948 * age * dm -
      0.0895067 * age * smoker -
      0.1543702 * age * egfrLow;
  }

  const expLogOdds = Math.exp(logOdds);
  return expLogOdds / (1 + expLogOdds);
}

function calcularFramingham({
  sexo,
  idade,
  colesterolTotal,
  hdl,
  pas,
  pasTratada,
  tabagismo,
  diabetes,
}) {
  let risco = 0;

  if (sexo === 'M') {
    const soma =
      3.06117 * Math.log(idade) +
      1.1237 * Math.log(colesterolTotal) -
      0.93263 * Math.log(hdl) +
      (pasTratada ? 1.99881 : 1.93303) * Math.log(pas) +
      0.65451 * (tabagismo ? 1 : 0) +
      0.57367 * (diabetes ? 1 : 0);

    risco = 1 - Math.pow(0.88936, Math.exp(soma - 23.9802));
  } else {
    const soma =
      2.32888 * Math.log(idade) +
      1.20904 * Math.log(colesterolTotal) -
      0.70833 * Math.log(hdl) +
      (pasTratada ? 2.82263 : 2.76157) * Math.log(pas) +
      0.52873 * (tabagismo ? 1 : 0) +
      0.69154 * (diabetes ? 1 : 0);

    risco = 1 - Math.pow(0.95012, Math.exp(soma - 26.1931));
  }

  return Math.max(0, risco);
}

function classificarRiscoEConduta({ eventoPrevio, riscoPct, diabetes, egfrValor }) {
  const temDRC = egfrValor !== null && egfrValor < 60;

  // 1. RISCO MUITO ALTO
  if (eventoPrevio) {
    return {
      categoria: 'Risco Muito Alto',
      cor: CORES.muitoAlto,
      estatinaConduta: 'Estatina Indicada (Alta Potência)',
      metaLDL: 'Meta LDL < 50 mg/dL',
      exemploEstatina: 'Atorvastatina 40–80 mg ou Rosuvastatina 20–40 mg/dia',
      motivoEstatina: 'Evento CV prévio (IAM, AVC, DAC ou DAP)',
    };
  }

  // 2. ALTO RISCO
  if (riscoPct > 20 || diabetes || temDRC) {
    let motivo = `Risco calculado ≥ 20% (${riscoPct.toFixed(1)}%)`;
    if (diabetes || temDRC) {
      motivo = diabetes && temDRC ? 'Diabetes + DRC' : diabetes ? 'Diabetes Mellitus' : 'DRC (TFG < 60 mL/min)';
    }

    return {
      categoria: 'Alto Risco',
      cor: CORES.vermelho,
      estatinaConduta: 'Estatina Indicada (Alta Potência)',
      metaLDL: 'Meta LDL < 70 mg/dL',
      exemploEstatina: 'Atorvastatina 40–80 mg ou Rosuvastatina 20 mg/dia',
      motivoEstatina: motivo,
    };
  }

  // 3. RISCO INTERMEDIÁRIO
  if (riscoPct >= 5 && riscoPct <= 20) {
    return {
      categoria: 'Risco Intermediário',
      cor: CORES.ambar,
      estatinaConduta: 'Considerar Estatina (Potência Moderada)',
      metaLDL: 'Considerar se fatores agravantes (HF, PCR-us, Escore de Cálcio > 0)',
      exemploEstatina: 'Sinvastatina 20–40 mg ou Atorvastatina 10–20 mg/dia',
      motivoEstatina: `Risco calculado em 10 anos: ${riscoPct.toFixed(1)}%`,
    };
  }

  // 4. BAIXO RISCO
  return {
    categoria: 'Baixo Risco',
    cor: CORES.verde,
    estatinaConduta: 'Mudança no Estilo de Vida (Estatina Não Indicada)',
    metaLDL: 'Manter acompanhamento e hábitos saudáveis',
    exemploEstatina: 'Iniciar apenas se LDL > 190 mg/dL: Sinvastatina 20–40 mg ou Atorvastatina 20 mg/dia',
    motivoEstatina: `Risco calculado em 10 anos < 5% (${riscoPct.toFixed(1)}%)`,
  };
}

export default function RiscoCardiovascularScreen() {
  const [sexo, setSexo] = useState('M');
  const [idade, setIdade] = useState('');
  const [colTotal, setColTotal] = useState('');
  const [hdl, setHdl] = useState('');
  const [pas, setPas] = useState('');

  const [temFuncaoRenal, setTemFuncaoRenal] = useState(true);
  const [egfr, setEgfr] = useState('');
  const [creatinina, setCreatinina] = useState('');

  const [pasTratada, setPasTratada] = useState(false);
  const [tabagismo, setTabagismo] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [estatina, setEstatina] = useState(false);
  const [eventoPrevio, setEventoPrevio] = useState(false);

  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  function gerarResultado(risco, modelo, detalhe, egfrUsado = null) {
    const riscoPct = risco * 100;
    const estratificacao = classificarRiscoEConduta({
      eventoPrevio,
      riscoPct,
      diabetes,
      egfrValor: egfrUsado,
    });

    setResultado({
      riscoPct,
      modelo,
      detalhe,
      ...estratificacao,
    });
  }

  function calcular() {
    setErro('');
    setResultado(null);

    const idadeN = parseValorNumerico(idade);
    const ctN = parseValorNumerico(colTotal);
    const hdlN = parseValorNumerico(hdl);
    const pasN = parseValorNumerico(pas);

    if (Number.isNaN(idadeN) || Number.isNaN(ctN) || Number.isNaN(hdlN) || Number.isNaN(pasN)) {
      setErro('Preencha idade, colesterol total, HDL e PAS com números válidos.');
      return;
    }

    if (idadeN < 30 || idadeN > 79) {
      setErro('Para esta calculadora, utilize idade entre 30 e 79 anos.');
      return;
    }

    if (ctN <= 0 || hdlN <= 0 || pasN <= 0) {
      setErro('Informe valores clínicos maiores que zero.');
      return;
    }

    if (hdlN >= ctN) {
      setErro('O HDL não pode ser maior ou igual ao colesterol total.');
      return;
    }

    if (!temFuncaoRenal) {
      const risco = calcularFramingham({
        sexo,
        idade: idadeN,
        colesterolTotal: ctN,
        hdl: hdlN,
        pas: pasN,
        pasTratada,
        tabagismo,
        diabetes,
      });

      gerarResultado(risco, 'Framingham', 'Sem dados de função renal');
      return;
    }

    const egfrN = parseValorNumerico(egfr);

    if (!Number.isNaN(egfrN) && egfrN > 0) {
      const risco = calcularPreventTotalCVD({
        sexo,
        idade: idadeN,
        colesterolTotal: ctN,
        hdl: hdlN,
        pas: pasN,
        egfr: egfrN,
        diabetes,
        tabagismo,
        pasTratada,
        estatina,
      });

      gerarResultado(risco, 'PREVENT', `eGFR: ${egfrN.toFixed(0)} mL/min`, egfrN);
      return;
    }

    const creatN = parseValorNumerico(creatinina);

    if (!Number.isNaN(creatN) && creatN > 0) {
      const egfrCalculado = calcularEGFR_CKDEPI2021({
        sexo,
        idade: idadeN,
        creatinina: creatN,
      });

      const risco = calcularPreventTotalCVD({
        sexo,
        idade: idadeN,
        colesterolTotal: ctN,
        hdl: hdlN,
        pas: pasN,
        egfr: egfrCalculado,
        diabetes,
        tabagismo,
        pasTratada,
        estatina,
      });

      gerarResultado(
        risco,
        'PREVENT (CKD-EPI)',
        `eGFR estimado: ${egfrCalculado.toFixed(1)} mL/min`,
        egfrCalculado
      );
      return;
    }

    const risco = calcularFramingham({
      sexo,
      idade: idadeN,
      colesterolTotal: ctN,
      hdl: hdlN,
      pas: pasN,
      pasTratada,
      tabagismo,
      diabetes,
    });

    gerarResultado(risco, 'Framingham', 'Sem eGFR ou creatinina');
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>Risco Cardiovascular</Text>
      <Text style={styles.subtitulo}>PREVENT / CKD-EPI / Framingham</Text>

      {/* DADOS DE ENTRADA */}
      <View style={styles.toggleRow}>
        <Text style={styles.label}>Sexo</Text>
        <View style={styles.toggleButtons}>
          <TouchableOpacity
            style={[styles.toggleBtn, sexo === 'M' && { backgroundColor: COR_TELA, borderColor: COR_TELA }]}
            onPress={() => { setSexo('M'); setResultado(null); }}
          >
            <Text style={[styles.toggleBtnText, sexo === 'M' && { color: '#fff' }]}>Masc.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, sexo === 'F' && { backgroundColor: COR_TELA, borderColor: COR_TELA }]}
            onPress={() => { setSexo('F'); setResultado(null); }}
          >
            <Text style={[styles.toggleBtnText, sexo === 'F' && { color: '#fff' }]}>Fem.</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Campo label="Idade (anos)" value={idade} onChangeText={(t) => { setIdade(t); setResultado(null); }} placeholder="Ex: 52" />
      <Campo label="Colesterol total (mg/dL)" value={colTotal} onChangeText={(t) => { setColTotal(t); setResultado(null); }} placeholder="Ex: 210" />
      <Campo label="HDL-colesterol (mg/dL)" value={hdl} onChangeText={(t) => { setHdl(t); setResultado(null); }} placeholder="Ex: 45" />
      <Campo label="PAS (mmHg)" value={pas} onChangeText={(t) => { setPas(t); setResultado(null); }} placeholder="Ex: 130" />

      {/* RENAL */}
      <View style={styles.renalBox}>
        <Text style={styles.label}>Possui dados de função renal?</Text>
        <View style={styles.toggleButtons}>
          <TouchableOpacity
            style={[styles.toggleBtn, temFuncaoRenal && { backgroundColor: COR_TELA, borderColor: COR_TELA }]}
            onPress={() => { setTemFuncaoRenal(true); setResultado(null); }}
          >
            <Text style={[styles.toggleBtnText, temFuncaoRenal && { color: '#fff' }]}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, !temFuncaoRenal && { backgroundColor: COR_TELA, borderColor: COR_TELA }]}
            onPress={() => { setTemFuncaoRenal(false); setEgfr(''); setCreatinina(''); setResultado(null); }}
          >
            <Text style={[styles.toggleBtnText, !temFuncaoRenal && { color: '#fff' }]}>Não</Text>
          </TouchableOpacity>
        </View>
      </View>

      {temFuncaoRenal && (
        <View style={styles.funcaoRenalContainer}>
          <Campo label="eGFR (mL/min/1,73 m²)" value={egfr} onChangeText={(t) => { setEgfr(t); if(t) setCreatinina(''); setResultado(null); }} placeholder="Ex.: 90" disabled={creatinina.length > 0} />
          <Campo label="Creatinina (mg/dL)" value={creatinina} onChangeText={(t) => { setCreatinina(t); if(t) setEgfr(''); setResultado(null); }} placeholder="Ex.: 1,0" disabled={egfr.length > 0} />
        </View>
      )}

      {/* TOGGLES */}
      <Toggle label="Evento CV estabelecido? (IAM, AVC)" value={eventoPrevio} onChange={(v) => { setEventoPrevio(v); setResultado(null); }} />
      <Toggle label="Tratamento para hipertensão?" value={pasTratada} onChange={(v) => { setPasTratada(v); setResultado(null); }} />
      {temFuncaoRenal && <Toggle label="Usa estatina?" value={estatina} onChange={(v) => { setEstatina(v); setResultado(null); }} />}
      <Toggle label="Tabagista atual?" value={tabagismo} onChange={(v) => { setTabagismo(v); setResultado(null); }} />
      <Toggle label="Diabetes mellitus?" value={diabetes} onChange={(v) => { setDiabetes(v); setResultado(null); }} />

      <TouchableOpacity style={[styles.botao, { backgroundColor: COR_TELA }]} onPress={calcular}>
        <Text style={styles.botaoTexto}>Calcular Risco</Text>
      </TouchableOpacity>

      {erro !== '' && (
        <View style={styles.erroBox}>
          <Text style={styles.avisoTexto}>{erro}</Text>
        </View>
      )}

      {/* CARD DE RESULTADO LIMPO */}
      {resultado && (
        <View style={[styles.cardResultado, { borderLeftColor: resultado.cor }]}>
          <View style={styles.headerResultado}>
            <Text style={styles.modeloBadge}>{resultado.modelo}</Text>
            <Text style={[styles.categoriaBadge, { color: resultado.cor }]}>
              {resultado.categoria}
            </Text>
          </View>

          <Text style={styles.valorRisco}>{resultado.riscoPct.toFixed(2)}%</Text>
          <Text style={styles.subRisco}>
            Risco Cardiovascular em 10 anos ({resultado.detalhe})
          </Text>

          <View style={styles.divisor} />

          {/* CONDUTA */}
          <Text style={styles.rotuloSecao}>CONDUTA</Text>
          <Text style={styles.textoConduta}>{resultado.estatinaConduta}</Text>

          {/* PRESCRIÇÃO E DOSAGEM */}
          <Text style={styles.rotuloSecao}>OPÇÃO DE PRESCRIÇÃO</Text>
          <Text style={styles.textoPrescricao}>{resultado.exemploEstatina}</Text>

          {/* CRITÉRIO / JUSTIFICATIVA */}
          <Text style={styles.textoMotivo}>
            Critério: {resultado.motivoEstatina}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  titulo: { fontSize: 22, fontWeight: '700', color: '#111', marginBottom: 2 },
  subtitulo: { fontSize: 13, color: '#666', marginBottom: 16 },
  campoContainer: { marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: '#111',
    backgroundColor: '#fff',
  },
  inputDisabled: { backgroundColor: '#eee', color: '#888' },
  toggleRow: { marginBottom: 12 },
  toggleButtons: { flexDirection: 'row', marginTop: 4 },
  toggleBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginRight: 6,
    backgroundColor: '#fff',
  },
  toggleBtnText: { fontSize: 13, fontWeight: '600', color: '#444' },
  renalBox: { marginBottom: 12 },
  funcaoRenalContainer: { marginBottom: 12, paddingLeft: 8, borderLeftWidth: 2, borderLeftColor: '#ddd' },
  botao: { marginTop: 14, borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontSize: 15, fontWeight: '700' },
  erroBox: { marginTop: 12, padding: 10, borderRadius: 8, backgroundColor: '#fde8e8' },
  avisoTexto: { color: '#c0483f', fontSize: 13 },
  
  cardResultado: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    borderLeftWidth: 5,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  headerResultado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modeloBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6c757d',
    letterSpacing: 0.5,
  },
  categoriaBadge: {
    fontSize: 14,
    fontWeight: '700',
  },
  valorRisco: {
    fontSize: 34,
    fontWeight: '800',
    color: '#212529',
    marginTop: 4,
  },
  subRisco: {
    fontSize: 12,
    color: '#6c757d',
  },
  divisor: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 14,
  },
  rotuloSecao: {
    fontSize: 10,
    fontWeight: '700',
    color: '#868e96',
    letterSpacing: 0.8,
    marginTop: 6,
  },
  textoConduta: {
    fontSize: 15,
    fontWeight: '700',
    color: '#212529',
    marginTop: 2,
    marginBottom: 8,
  },
  textoPrescricao: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1c7ed6',
    marginTop: 2,
    marginBottom: 10,
  },
  textoMotivo: {
    fontSize: 11,
    color: '#868e96',
    fontStyle: 'italic',
    marginTop: 4,
  },
});