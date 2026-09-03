import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COR = '#6a1fb0';

/* =========================================================
   COMPONENTE DE CAMPO
========================================================= */

function Campo({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
}) {
  return (
    <View style={styles.campo}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#a5a1a8"
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

/* =========================================================
   COMPONENTE DE OPÇÕES
========================================================= */

function Opcoes({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <View style={styles.campo}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.opcoes}>
        {options.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.opcao,
              value === item && styles.opcaoAtiva,
            ]}
            onPress={() => onChange(item)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.opcaoTexto,
                value === item && styles.opcaoTextoAtivo,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

/* =========================================================
   TELA PRINCIPAL
========================================================= */

export default function GeradorSOAPScreen({ navigation }) {

  /* =======================================================
     SUBJETIVO
  ======================================================= */

  const [queixa, setQueixa] = useState('');
  const [hda, setHda] = useState('');
  const [sintomas, setSintomas] = useState('');

  /* =======================================================
     OBJETIVO
  ======================================================= */

  const [pa, setPa] = useState('');
  const [fc, setFc] = useState('');
  const [fr, setFr] = useState('');
  const [spo2, setSpo2] = useState('');
  const [temp, setTemp] = useState('');

  const [estado, setEstado] = useState('');
  const [neuro, setNeuro] = useState('');
  const [cardio, setCardio] = useState('');
  const [resp, setResp] = useState('');
  const [abdome, setAbdome] = useState('');
  const [extremidades, setExtremidades] = useState('');

  /* =======================================================
     EXAMES
  ======================================================= */

  const [laboratorio, setLaboratorio] = useState('');
  const [imagem, setImagem] = useState('');
  const [outros, setOutros] = useState('');

  /* =======================================================
     AVALIAÇÃO
  ======================================================= */

  const [problemas, setProblemas] = useState('');
  const [avaliacao, setAvaliacao] = useState('');

  /* =======================================================
     PLANO
  ======================================================= */

  const [plano, setPlano] = useState('');

  /* =======================================================
     RESULTADO
  ======================================================= */

  const [resultado, setResultado] = useState('');
  const [copiado, setCopiado] = useState(false);

  /* =======================================================
     GERAÇÃO DO TEXTO SOAP
  ======================================================= */

  const texto = useMemo(() => {

    const linhas = [];

    linhas.push('EVOLUÇÃO MÉDICA — SOAP');
    linhas.push('');

    /* -------------------------------------------------------
       S — SUBJETIVO
    ------------------------------------------------------- */

    linhas.push('S — SUBJETIVO');

    if (queixa.trim()) {
      linhas.push(
        `Queixa principal: ${queixa.trim()}`
      );
    }

    if (hda.trim()) {
      linhas.push(
        `HDA: ${hda.trim()}`
      );
    }

    if (sintomas.trim()) {
      linhas.push(
        `Sintomas associados: ${sintomas.trim()}`
      );
    }

    /* -------------------------------------------------------
       O — OBJETIVO
    ------------------------------------------------------- */

    linhas.push('');
    linhas.push('O — OBJETIVO');

    const sinaisVitais = [
      pa.trim() && `PA ${pa.trim()} mmHg`,
      fc.trim() && `FC ${fc.trim()} bpm`,
      fr.trim() && `FR ${fr.trim()} irpm`,
      spo2.trim() && `SpO₂ ${spo2.trim()}%`,
      temp.trim() && `T ${temp.trim()} °C`,
    ].filter(Boolean);

    if (sinaisVitais.length > 0) {
      linhas.push(
        `Sinais vitais: ${sinaisVitais.join('; ')}.`
      );
    }

    const exameFisico = [
      estado.trim() &&
        `Estado geral: ${estado.trim()}`,

      neuro.trim() &&
        `Neurológico: ${neuro.trim()}`,

      cardio.trim() &&
        `Cardiovascular: ${cardio.trim()}`,

      resp.trim() &&
        `Respiratório: ${resp.trim()}`,

      abdome.trim() &&
        `Abdome: ${abdome.trim()}`,

      extremidades.trim() &&
        `Extremidades: ${extremidades.trim()}`,
    ].filter(Boolean);

    exameFisico.forEach((item) => {
      linhas.push(item);
    });

    /* -------------------------------------------------------
       EXAMES
    ------------------------------------------------------- */

    if (laboratorio.trim()) {
      linhas.push(
        `Exames laboratoriais: ${laboratorio.trim()}`
      );
    }

    if (imagem.trim()) {
      linhas.push(
        `Imagem: ${imagem.trim()}`
      );
    }

    if (outros.trim()) {
      linhas.push(
        `Outros exames: ${outros.trim()}`
      );
    }

    /* -------------------------------------------------------
       A — AVALIAÇÃO
    ------------------------------------------------------- */

    linhas.push('');
    linhas.push('A — AVALIAÇÃO');

    if (problemas.trim()) {
      linhas.push(
        `Problemas ativos:\n${problemas.trim()}`
      );
    }

    if (avaliacao.trim()) {
      linhas.push(
        `Avaliação clínica: ${avaliacao.trim()}`
      );
    }

    /* -------------------------------------------------------
       P — PLANO
    ------------------------------------------------------- */

    linhas.push('');
    linhas.push('P — PLANO');

    if (plano.trim()) {
      linhas.push(
        plano.trim()
      );
    }

    return linhas.join('\n');

  }, [
    queixa,
    hda,
    sintomas,
    pa,
    fc,
    fr,
    spo2,
    temp,
    estado,
    neuro,
    cardio,
    resp,
    abdome,
    extremidades,
    laboratorio,
    imagem,
    outros,
    problemas,
    avaliacao,
    plano,
  ]);

  /* =========================================================
     GERAR
  ========================================================= */

  function gerar() {
    setResultado(texto);
    setCopiado(false);
  }

  /* =========================================================
     COPIAR
  ========================================================= */

  async function copiar() {

    const textoParaCopiar = resultado || texto;

    try {

      if (
        Platform.OS === 'web' &&
        typeof navigator !== 'undefined' &&
        navigator.clipboard
      ) {

        await navigator.clipboard.writeText(
          textoParaCopiar
        );

        setCopiado(true);

        setTimeout(() => {
          setCopiado(false);
        }, 2000);

      } else {

        Alert.alert(
          'Copiar evolução',
          'No aplicativo, pressione e selecione o texto para copiá-lo.'
        );

      }

    } catch (error) {

      Alert.alert(
        'Não foi possível copiar',
        'Selecione o texto manualmente para copiá-lo.'
      );

    }
  }

  /* =========================================================
     LIMPAR
  ========================================================= */

  function limpar() {

    setQueixa('');
    setHda('');
    setSintomas('');

    setPa('');
    setFc('');
    setFr('');
    setSpo2('');
    setTemp('');

    setEstado('');
    setNeuro('');
    setCardio('');
    setResp('');
    setAbdome('');
    setExtremidades('');

    setLaboratorio('');
    setImagem('');
    setOutros('');

    setProblemas('');
    setAvaliacao('');

    setPlano('');

    setResultado('');
    setCopiado(false);
  }

  /* =========================================================
     VOLTAR
  ========================================================= */

  function voltar() {

    if (
      navigation &&
      typeof navigation.canGoBack === 'function' &&
      navigation.canGoBack()
    ) {
      navigation.goBack();
    }
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <View style={styles.safeArea}>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={voltar}
          activeOpacity={0.8}
        >

          <Ionicons
            name="arrow-back"
            size={23}
            color="#fff"
          />

        </TouchableOpacity>

        <View style={styles.headerText}>

          <Text style={styles.headerTitle}>
            Gerador de Evolução
          </Text>

          <Text style={styles.headerSubtitle}>
            Monte uma evolução clínica no formato SOAP
          </Text>

        </View>

      </View>

      {/* =====================================================
          SCROLL
      ===================================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ===================================================
            FORMULÁRIO
        =================================================== */}

        <View style={styles.card}>

          {/* =================================================
              S — SUBJETIVO
          ================================================= */}

          <Text style={styles.sectionTitle}>
            S — SUBJETIVO
          </Text>

          <Campo
            label="Queixa principal"
            value={queixa}
            onChangeText={setQueixa}
            placeholder="Ex.: Dor abdominal há 2 dias"
          />

          <Campo
            label="HDA"
            value={hda}
            onChangeText={setHda}
            placeholder="Descreva a história da doença atual..."
            multiline
            numberOfLines={4}
          />

          <Campo
            label="Sintomas associados"
            value={sintomas}
            onChangeText={setSintomas}
            placeholder="Ex.: Nega febre, náuseas ou vômitos"
            multiline
            numberOfLines={3}
          />

          {/* =================================================
              O — OBJETIVO
          ================================================= */}

          <Text style={styles.sectionTitle}>
            O — OBJETIVO
          </Text>

          <Text style={styles.subsectionTitle}>
            Sinais vitais
          </Text>

          <View style={styles.row}>

            <View style={styles.half}>

              <Campo
                label="PA (mmHg)"
                value={pa}
                onChangeText={setPa}
                placeholder="120/80"
              />

            </View>

            <View style={styles.half}>

              <Campo
                label="FC (bpm)"
                value={fc}
                onChangeText={setFc}
                placeholder="80"
              />

            </View>

          </View>

          <View style={styles.row}>

            <View style={styles.half}>

              <Campo
                label="FR (irpm)"
                value={fr}
                onChangeText={setFr}
                placeholder="18"
              />

            </View>

            <View style={styles.half}>

              <Campo
                label="SpO₂ (%)"
                value={spo2}
                onChangeText={setSpo2}
                placeholder="98"
              />

            </View>

          </View>

          <Campo
            label="Temperatura (°C)"
            value={temp}
            onChangeText={setTemp}
            placeholder="36,5"
          />

          {/* =================================================
              EXAME FÍSICO
          ================================================= */}

          <Text style={styles.subsectionTitle}>
            Exame físico
          </Text>

          <Opcoes
            label="Estado geral"
            value={estado}
            options={[
              'BEG',
              'REG',
              'MEG',
            ]}
            onChange={setEstado}
          />

          <Campo
            label="Neurológico"
            value={neuro}
            onChangeText={setNeuro}
            placeholder="Ex.: Lúcido, orientado, Glasgow 15..."
            multiline
            numberOfLines={2}
          />

          <Campo
            label="Cardiovascular"
            value={cardio}
            onChangeText={setCardio}
            placeholder="Ex.: RCR em 2T, sem sopros..."
            multiline
            numberOfLines={2}
          />

          <Campo
            label="Respiratório"
            value={resp}
            onChangeText={setResp}
            placeholder="Ex.: MV presente bilateralmente, sem RA..."
            multiline
            numberOfLines={2}
          />

          <Campo
            label="Abdome"
            value={abdome}
            onChangeText={setAbdome}
            placeholder="Ex.: Plano, flácido, indolor..."
            multiline
            numberOfLines={2}
          />

          <Campo
            label="Extremidades"
            value={extremidades}
            onChangeText={setExtremidades}
            placeholder="Ex.: Sem edema, pulsos presentes..."
            multiline
            numberOfLines={2}
          />

          {/* =================================================
              E — EXAMES
          ================================================= */}

          <Text style={styles.sectionTitle}>
            E — EXAMES
          </Text>

          <Campo
            label="Exames laboratoriais"
            value={laboratorio}
            onChangeText={setLaboratorio}
            placeholder="Ex.: Hb 10,2; leucócitos 15.400; Cr 1,8; K 5,7"
            multiline
            numberOfLines={3}
          />

          <Campo
            label="Imagem"
            value={imagem}
            onChangeText={setImagem}
            placeholder="Ex.: TC de tórax: ..."
            multiline
            numberOfLines={3}
          />

          <Campo
            label="Outros exames"
            value={outros}
            onChangeText={setOutros}
            placeholder="ECG, culturas, ultrassom, etc."
            multiline
            numberOfLines={2}
          />

          {/* =================================================
              A — AVALIAÇÃO
          ================================================= */}

          <Text style={styles.sectionTitle}>
            A — AVALIAÇÃO
          </Text>

          <Campo
            label="Problemas ativos"
            value={problemas}
            onChangeText={setProblemas}
            placeholder={
              '1. Pneumonia\n2. Hipoxemia\n3. DRC'
            }
            multiline
            numberOfLines={4}
          />

          <Campo
            label="Avaliação clínica"
            value={avaliacao}
            onChangeText={setAvaliacao}
            placeholder="Descreva sua impressão clínica..."
            multiline
            numberOfLines={4}
          />

          {/* =================================================
              P — PLANO
          ================================================= */}

          <Text style={styles.sectionTitle}>
            P — PLANO
          </Text>

          <Campo
            label="Conduta / plano"
            value={plano}
            onChangeText={setPlano}
            placeholder={
              'Ex.:\nManter antibioticoterapia.\nControle de sinais vitais.\nReavaliar função renal.'
            }
            multiline
            numberOfLines={5}
          />

          {/* =================================================
              BOTÃO GERAR
          ================================================= */}

          <TouchableOpacity
            style={styles.generateButton}
            onPress={gerar}
            activeOpacity={0.85}
          >

            <Ionicons
              name="document-text-outline"
              size={19}
              color="#fff"
            />

            <Text style={styles.generateText}>
              Gerar evolução SOAP
            </Text>

          </TouchableOpacity>

          {/* =================================================
              BOTÃO LIMPAR
          ================================================= */}

          <TouchableOpacity
            style={styles.clearButton}
            onPress={limpar}
            activeOpacity={0.8}
          >

            <Ionicons
              name="trash-outline"
              size={17}
              color="#666"
            />

            <Text style={styles.clearText}>
              Limpar formulário
            </Text>

          </TouchableOpacity>

        </View>

        {/* ===================================================
            RESULTADO
        =================================================== */}

        {resultado !== '' && (

          <View style={styles.resultCard}>

            <View style={styles.resultHeader}>

              <View>

                <Text style={styles.resultTitle}>
                  Evolução gerada
                </Text>

                <Text style={styles.resultSubtitle}>
                  Revise antes de utilizar
                </Text>

              </View>

              <Ionicons
                name="checkmark-circle"
                size={26}
                color={COR}
              />

            </View>

            <TextInput
              style={styles.resultInput}
              value={resultado}
              multiline
              editable={false}
              textAlignVertical="top"
              selectTextOnFocus
            />

            <TouchableOpacity
              style={styles.copyButton}
              onPress={copiar}
              activeOpacity={0.85}
            >

              <Ionicons
                name={
                  copiado
                    ? 'checkmark-outline'
                    : 'copy-outline'
                }
                size={18}
                color="#fff"
              />

              <Text style={styles.copyText}>
                {copiado
                  ? 'Copiado'
                  : 'Copiar evolução'}
              </Text>

            </TouchableOpacity>

            <Text style={styles.warning}>
              ⚠️ Revise o conteúdo antes do uso em prontuário.
            </Text>

          </View>

        )}

      </ScrollView>

    </View>
  );
}

/* =========================================================
   ESTILOS
========================================================= */

const styles = StyleSheet.create({

  /* =======================================================
     TELA
  ======================================================= */

  safeArea: {
    flex: 1,
    backgroundColor: '#f4f2f7',
  },

  /* =======================================================
     HEADER
  ======================================================= */

  header: {
    backgroundColor: COR,
    paddingHorizontal: 18,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 76,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  headerText: {
    flex: 1,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },

  headerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12.5,
    marginTop: 3,
  },

  /* =======================================================
     SCROLL
  ======================================================= */

  scroll: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
  },

  /* =======================================================
     CARD PRINCIPAL
  ======================================================= */

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,

    elevation: 2,
  },

  /* =======================================================
     SEÇÕES
  ======================================================= */

  sectionTitle: {
    color: COR,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginTop: 7,
    marginBottom: 14,
  },

  subsectionTitle: {
    color: '#333',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 9,
  },

  /* =======================================================
     CAMPOS
  ======================================================= */

  campo: {
    marginBottom: 13,
  },

  label: {
    fontSize: 13,
    color: '#3a3a3a',
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    width: '100%',
    minHeight: 46,
    backgroundColor: '#f4f2f7',
    borderRadius: 11,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#1f1f1f',
    borderWidth: 1,
    borderColor: '#eeeaf1',
  },

  multiline: {
    minHeight: 82,
    paddingTop: 12,
    paddingBottom: 12,
  },

  /* =======================================================
     COLUNAS
  ======================================================= */

  row: {
    flexDirection: 'row',
    gap: 10,
  },

  half: {
    flex: 1,
  },

  /* =======================================================
     OPÇÕES
  ======================================================= */

  opcoes: {
    flexDirection: 'row',
    gap: 8,
  },

  opcao: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd8e2',
    backgroundColor: '#f4f2f7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  opcaoAtiva: {
    backgroundColor: '#f0e4f8',
    borderColor: COR,
  },

  opcaoTexto: {
    color: '#777',
    fontSize: 13,
    fontWeight: '700',
  },

  opcaoTextoAtivo: {
    color: COR,
  },

  /* =======================================================
     GERAR
  ======================================================= */

  generateButton: {
    height: 54,
    borderRadius: 13,
    backgroundColor: COR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    elevation: 3,
  },

  generateText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 9,
  },

  /* =======================================================
     LIMPAR
  ======================================================= */

  clearButton: {
    height: 46,
    borderRadius: 12,
    backgroundColor: '#f4f2f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 9,
  },

  clearText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 7,
  },

  /* =======================================================
     RESULTADO
  ======================================================= */

  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,

    borderLeftWidth: 5,
    borderLeftColor: COR,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 2,
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 11,
  },

  resultTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COR,
  },

  resultSubtitle: {
    fontSize: 11.5,
    color: '#888',
    marginTop: 2,
  },

  resultInput: {
    minHeight: 350,
    backgroundColor: '#f8f7f9',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#e5e0e8',
    padding: 13,
    fontSize: 14,
    lineHeight: 21,
    color: '#222',
  },

  /* =======================================================
     COPIAR
  ======================================================= */

  copyButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: '#198754',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  copyText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 8,
  },

  /* =======================================================
     AVISO
  ======================================================= */

  warning: {
    color: '#777',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 9,
  },

});