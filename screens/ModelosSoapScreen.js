import React, { useMemo, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { melhorarHDA, formularPlano } from './services/geminiService';


// ============================================================
// 4 MODELOS
// ============================================================

const MODELOS = [
  {
    id: 'crianca',
    categoria: 'CRIANÇA',
    titulo: 'CRIANÇA',
    descricao: 'PUERICULTURA, CRESCIMENTO E DESENVOLVIMENTO.',
    icone: 'happy-outline',

    subjetivo: `QP: PUERICULTURA. 

    HDA: PACIENTE ACOMPANHADO PELA - INÍCIO E CARACTERIZAÇÃO E EVOLUÇÃO DOS SINTOMAS 
–  ORDEM CRONOLÓGICA DOS ACONTECIMENTOS ATÉ O MOMENTO ATUAL 
- FATORES DESENCADEANTES: ALÍVIO E PIORA 
- SINAIS E SINTOMAS ASSOCIADOS 
-TRATAMENTO RECEBIDO ( NOME DO MEDICAMENTO, DOSE E TEMPO DE USO) -ÚLTIMA DOSE DA MEDICAÇÃO. 
- OCORRÊNCIA ANTERIOR SIMILAR 
- DADOS EPIDEMIOLÓGICOS (FAMÍLIA, CRECHE, FESTA, AMIGOS ÍNTIMOS... 

HPP: NEGA ALERGIAS, INTERNAÇÕES E CIRURGIAS; HOG: G P A; NASCEU DE PARTO POR (MOTIVO) 
APGAR PESO AO NASCER COMPRIMENTO: CM; PC CM; PT CM; PESO DE ALTA: APRESENTOU ICTERÍCIA NEONATAL? 
REALIZOU QUANTAS CONSULTAS DE PRE-NATAL ? 
FEZ SUPLEMENTAÇÃO DE FE NA GRAVIDEZ? E AGORA, FAZ USO DE FERRO? 
TRIAGENS: TESTE DE ORELHINHAS, TESTE DO REFLEXO VERMELHO, TESTE DE PEZINHO, TESTE DO CORAÇÃO E TESTE DA LINGUINHA NORMAIS. 

HF: PAIS HÍGIDOS. NEGA DM, HAS, DISLIPIDEMIAS E TIREOIDOPATIAS 
HS: USO DE CHUPETAS, MAMADEIRAS, ONDE E COM QUEM DORME. TEMPO E HIGIENE DO SONO: 
FUNÇÕES FISIOLÓGICAS: 

ALIMENTAÇÃO: (TEMPO DE ALEITAMENTO MATERNO, USO DE FÓRMULAS, USO DE LEITE DE VACA, USO DE MAMADEIRA) 
TELA: 

VACINAS: 

DNPM:
`,

    objetivo: `CRIANÇA EM BOM ESTADO GERAL, ATIVA, COMUNICATIVA, EUPNEICA, NORMOCORADA, HIDRATADA, ANICTÉRICA, ACIANÓTICA, COLABORATIVA E AFEBRIL. 
MEDIDAS ANTROPOMÉTRICAS: 
COMPRIMENTO: 81,5 CM 
PESO: 11,200 KG 
PC: 45,5 CM 
CABEÇA E PESCOÇO: S/A OROSCOPIA: S/A (AUSENCIA DE PLACAS E HIPEREMIAS. DENTIÇÃO PRECÁRIA) 
RINOSCOPIA: S/A A (MUCOSA PALIDA, SEM DESVIO SEPTAL, SEM HIPERTROFIA DE CONCHA NASAL INFERIOR, SEM RINORREIA) O
TOSCOPIA: S/A (SEM HIPEREMIA, MEMBRANA TIMPÂNICA PRESERVADA, TRIÂNGULO LUMINOSO VISUALIZADO). 
AR: MV+, BILATERALMENTE, AC: BNF, RCR EM 2T, SEM SOPROS. ABD: PLANO, FLÁCIDO, TIMPANICO, SEM DOR A PALPAÇÃO SUPERFICIAL/PROFUNDA, RHA+ S/A MMII: ASSIMÉTRICOS MAL FORMAÇÃO (PEZINHO TORTO), SEM EDEMAS, SEM LESÕES. 
APARELHO REPRODUTOR: GENITÁLIA TÍPICA FEMININA. (TESTICULOS TOPICOS, SEM FIMOSE. (TÍPICA, FEMININA/MASCULINA S/A). ÂNUS PÉRVIO, S/A. ) ESCALA DE TANNER G1P1 (MENINOS) M1P1 (MENINAS)
`,

    avaliacao: `1. PUERICULTURA / ACOMPANHAMENTO INFANTIL.
2. CRESCIMENTO: [ADEQUADO / ALTERADO].
3. DESENVOLVIMENTO: [ADEQUADO / ALTERADO].`,

    plano: `ORIENTAÇÕES GERAIS 
ORIENTO SOBRE SINAIS DE ALARME PARA RETORNO NESTA UNIDADE OU PRONTO ATENDIMENTO; 
ORIENTO SOBRE IMPORTANCIA DE AMAMENTAÇÃO EXCLUSIVA 
PRESCREVO VITAMINA D 200UI 2 GTS POR DIA 
SORO FISIOLOGICO PARA LAVAGEM NASAL 
ORIENTO SOBRE IMPORTANCIA DE PUERICULTURA`
  },

  {
    id: 'mulher',
    categoria: 'MULHER',
    titulo: 'MULHER',
    descricao: 'SAÚDE DA MULHER, GINECOLOGIA E PRÉ-NATAL.',
    icone: 'woman-outline',

    subjetivo: `HDA: PACIENTE COMPARECE A CONSULTA 
ISDA: NO MOMENTO, NEGA FEBRE, TOSSE, DOR TORÁCICA, DISPNEIA, DOR ABDOMINAL, DISÚRIA, EVACUAÇÕES LÍQUIDAS, E DEMAIS QUEIXAS. 
INFORMA SONO REPARADOR 
FUNÇÕES FISIOLÓGICAS PRESERVADAS. 
HPP: NEGA COMORBIDADES. 
NEGA ALERGIAS MEDICAMENTOSAS. 
IMED: NEGA MEDICAMENTOS DE USO CONTÍNUO. 
HSV:  (TABAGISMO,ETILISMO,USO DE DROGAS, ATIVIDADE FÍSICA, ALIMENTAÇÃO, CONDIÇÕES DE MORADIA
HGO: 
HF:
`,

    objetivo: `BOM ESTADO GERAL, LÚCIDA E ORIENTADA NO TEMPO E ESPAÇO, AFEBRIL, EUPNEICA, NORMOCÁRDICA, NORMOCORADA, HIDRATADA, ACIANÓTICA, ANICTERICA; GLASGOW 15 OROFARINGE SEM SINAIS FLOGÍSTICOS, LESÕES E PLACAS; 
AR: MURMÚRIO VESICULAR PRESERVADO BILATERALMENTE, SEM RUÍDOS ADVENTÍCIOS; 
AC: RITMO CARDÍACO REGULAR EM 2 TEMPOS, BULHAS NORMOFONÉTICAS, SEM SOPROS; 
ABDOME: ATÍPICO, RUÍDOS HIDROAÉREOS PRESENTES, FLÁCIDO, INDOLOR A PALPAÇÃO; MEMBROS SIMÉTRICOS SEM LESÕES E SINAIS FLOGÍSTICOS; PANTURRILHAS LIVRES; MOBILIDADE FACIAL, FORÇA MUSCULAR E MARCHA PRESERVADOS.
`,

    avaliacao: ``,

    plano: `ORIENTAÇÕES GERAIS 
ORIENTO RETORNO SE PERSISTÊNCIA DE SINTOMAS 
ORIENTO PROCURAR ATENDIMENTO DE URGÊNCIA SE PIORA DE SINTOMAS PRESCREVO
`
  },

  {
    id: 'idoso',
    categoria: 'IDOSO',
    titulo: 'IDOSO',
    descricao: 'AVALIAÇÃO GERIÁTRICA, FUNCIONALIDADE E POLIFARMÁCIA.',
    icone: 'person-outline',

    subjetivo: `QP:
[QUEIXA PRINCIPAL DO PACIENTE/ACOMPANHANTE]

HDA:
PACIENTE/ACOMPANHANTE RELATA [QUEIXA]. DESCREVER INÍCIO, EVOLUÇÃO, CARACTERÍSTICAS, SINTOMAS ASSOCIADOS, EPISÓDIOS ANTERIORES E TRATAMENTOS REALIZADOS.

ISDA:
[DESCREVER SINTOMAS RELEVANTES].

HPP:
HAS, DM, CARDIOPATIAS, DPOC, DOENÇAS NEUROLÓGICAS, NEOPLASIAS, INTERNAÇÕES, CIRURGIAS E ALERGIAS: [ ].

IMED:
[NOME / DOSE / VIA / FREQUÊNCIA / ADESÃO].

HSV:
TABAGISMO: [ ].
ETILISMO: [ ].
ATIVIDADE FÍSICA: [ ].
ALIMENTAÇÃO: [ ].
MORADIA: [ ].
REDE DE APOIO: [ ].

FUNCIONALIDADE:
AVDS: [ ].
AIVDS: [ ].
QUEDAS: [ ].
MARCHA: [ ].
COGNIÇÃO: [ ].
HUMOR: [ ].

HF:
[HISTÓRIA FAMILIAR RELEVANTE].`,

    objetivo: `ESTADO GERAL:
[DESCREVER].

SINAIS VITAIS:
PA: [ ] | FC: [ ] | FR: [ ] | SPO2: [ ] | TEMP: [ ].

AR:
[ ].

AC:
[ ].

ABDOME:
[ ].

MMII:
[ ].

MARCHA:
[PRESERVADA / ALTERADA].

FORÇA MUSCULAR:
[ ].

EXAME NEUROLÓGICO:
[ ].

COGNIÇÃO:
[ ].`,

    avaliacao: `1. ACOMPANHAMENTO DA PESSOA IDOSA.
2. POLIFARMÁCIA: [SIM / NÃO].
3. RISCO DE QUEDAS: [ ].
4. FRAGILIDADE: [ ].
5. [OUTROS PROBLEMAS].`,

    plano: `1. REVISAR MEDICAÇÕES E POSOLOGIAS.
2. AVALIAR POLIFARMÁCIA.
3. AVALIAR RISCO DE QUEDAS.
4. AVALIAR COGNIÇÃO, HUMOR, NUTRIÇÃO E FUNCIONALIDADE.
5. EXAMES CONFORME INDICAÇÃO.
6. ORIENTAÇÕES.
7. RETORNO.`
  },

  {
    id: 'geral',
    categoria: 'GERAL',
    titulo: 'CONSULTA GERAL',
    descricao: 'MODELO BASE PARA CONSULTA CLÍNICA.',
    icone: 'medkit-outline',

    subjetivo: `QP:
[QUEIXA PRINCIPAL NAS PALAVRAS DO PACIENTE]

HDA:
PACIENTE REFERE [QUEIXA]. DESCREVER CRONOLOGICAMENTE INÍCIO, EVOLUÇÃO, LOCALIZAÇÃO, INTENSIDADE, CARACTERÍSTICAS, FATORES DE MELHORA/PIORA, SINTOMAS ASSOCIADOS, EPISÓDIOS SEMELHANTES, ATENDIMENTO PRÉVIO E MEDICAÇÕES UTILIZADAS.

ISDA:
[DESCREVER SINTOMAS RELEVANTES].

HPP:
COMORBIDADES, DOENÇAS PRÉVIAS, INTERNAÇÕES, CIRURGIAS E ALERGIAS: [ ].

IMED:
[NOME / DOSE / VIA / FREQUÊNCIA / ADESÃO].

HSV:
TABAGISMO: [ ].
ETILISMO: [ ].
DROGAS: [ ].
ATIVIDADE FÍSICA: [ ].
ALIMENTAÇÃO: [ ].
MORADIA: [ ].
TRABALHO: [ ].

HF:
[HISTÓRIA FAMILIAR RELEVANTE].`,

    objetivo: `ESTADO GERAL:
[DESCREVER].

SINAIS VITAIS:
PA: [ ] | FC: [ ] | FR: [ ] | SPO2: [ ] | TEMP: [ ].

OROFARINGE:
[ ].

AR:
[ ].

AC:
[ ].

ABDOME:
[ ].

MMII:
[ ].

EXAME FÍSICO DIRECIONADO:
[DESCREVER ACHADOS RELACIONADOS À QUEIXA].`,

    avaliacao: `1. [DIAGNÓSTICO / HIPÓTESE PRINCIPAL].
2. [DIAGNÓSTICO / PROBLEMA SECUNDÁRIO].
3. [OUTROS PROBLEMAS].
4. [DIAGNÓSTICO DIFERENCIAL].`,

    plano: `1. ORIENTAÇÕES GERAIS.
2. EXAMES COMPLEMENTARES SE INDICADOS.
3. MEDICAÇÕES / AJUSTES.
4. MEDIDAS NÃO FARMACOLÓGICAS.
5. SINAIS DE ALARME.
6. RETORNO.
7. ENCAMINHAMENTO SE NECESSÁRIO.`
  }
];


// ============================================================
// TELA PRINCIPAL
// ============================================================

export default function ModelosSoapScreen() {

  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('TODAS');
  const [modelo, setModelo] = useState(null);

  const lista = useMemo(() => {

    const termo = busca.toLowerCase().trim();

    return MODELOS.filter(item => {

      const categoriaOk =
        filtro === 'TODAS' ||
        item.categoria === filtro;

      const buscaOk =
        !termo ||
        item.titulo.toLowerCase().includes(termo) ||
        item.descricao.toLowerCase().includes(termo);

      return categoriaOk && buscaOk;
    });

  }, [busca, filtro]);


  if (modelo) {

    return (
      <TelaSoap
        modelo={modelo}
        voltar={() => setModelo(null)}
      />
    );

  }


  return (
    <SafeAreaView style={styles.container}>

      {/* LISTA */}

      <FlatList
        data={lista}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.lista}

        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.75}
            onPress={() => setModelo(item)}
          >

            <View style={styles.icone}>

              <Ionicons
                name={item.icone}
                size={25}
                color="#5B1982"
              />

            </View>


            <View style={styles.cardTexto}>

              <Text style={styles.cardTitulo}>
                {item.titulo}
              </Text>

              <Text style={styles.cardDescricao}>
                {item.descricao}
              </Text>

            </View>


            <Ionicons
              name="chevron-forward"
              size={21}
              color="#5B1982"
            />

          </TouchableOpacity>

        )}
      />

    </SafeAreaView>
  );
}


// ============================================================
// TELA DO SOAP
// ============================================================

function TelaSoap({ modelo, voltar }) {

  const [subjetivo, setSubjetivo] =
    useState(modelo.subjetivo);

  const [objetivo, setObjetivo] =
    useState(modelo.objetivo);

  const [avaliacao, setAvaliacao] =
    useState(modelo.avaliacao);

  const [plano, setPlano] =
    useState(modelo.plano);

  const [iaCarregando, setIaCarregando] =
    useState(false);

  const [copiado, setCopiado] =
    useState(false);


  // ==========================================================
  // MELHORAR HDA
  // ==========================================================

  const handleMelhorarHDA = async () => {

    if (!subjetivo || !subjetivo.trim()) {
      Alert.alert(
        'HDA VAZIA',
        'Digite a história do paciente antes de usar a IA.'
      );
      return;
    }

    let hdaAtual = '';
    let inicio = -1;
    let depois = -1;
    let fim = -1;

    // Procura HDA: ignorando maiúsculas/minúsculas
    const textoUpper = subjetivo.toUpperCase();

    inicio = textoUpper.indexOf('HDA:');

    // ==========================================================
    // CASO 1: EXISTE "HDA:" NO MODELO
    // ==========================================================

    if (inicio !== -1) {

      depois = inicio + 4;

      fim = textoUpper.indexOf(
        '\n\n',
        depois
      );

      hdaAtual =
        fim === -1
          ? subjetivo.substring(depois).trim()
          : subjetivo
            .substring(depois, fim)
            .trim();

    }

    // ==========================================================
    // CASO 2: NÃO EXISTE "HDA:"
    // USA TODO O TEXTO DIGITADO
    // ==========================================================

    else {

      hdaAtual = subjetivo.trim();

    }


    if (!hdaAtual) {
      Alert.alert(
        'HDA VAZIA',
        'Digite a história do paciente antes de usar a IA.'
      );
      return;
    }


    setIaCarregando(true);


    try {

      const novaHda = await melhorarHDA(
        hdaAtual,
        modelo.titulo
      );


      if (!novaHda) {
        return;
      }


      // ========================================================
      // SE NÃO EXISTIA "HDA:", SUBSTITUI TODO O TEXTO
      // ========================================================

      if (inicio === -1) {

        setSubjetivo(
          novaHda.toUpperCase()
        );

      }


      // ========================================================
      // SE EXISTIA "HDA:", PRESERVA O RESTANTE DO SOAP
      // ========================================================

      else {

        const novoSubjetivo =
          fim === -1

            ? subjetivo.substring(0, depois) +
            '\n\n' +
            novaHda

            : subjetivo.substring(0, depois) +
            '\n\n' +
            novaHda +
            subjetivo.substring(fim);


        setSubjetivo(
          novoSubjetivo.toUpperCase()
        );

      }


    } catch (error) {

      console.error(
        'Erro ao melhorar HDA:',
        error
      );

      Alert.alert(
        'ERRO',
        'Não foi possível melhorar a HDA.'
      );

    } finally {

      setIaCarregando(false);

    }

  };

  const gerarPlano = async () => {

    setIaCarregando(true);

    try {

      const novoPlano = await formularPlano(
        subjetivo,
        objetivo,
        avaliacao,
        modelo.titulo
      );

      if (novoPlano) {
        setPlano(novoPlano);
      }

    } catch (error) {

      console.error(
        'Erro ao formular plano:',
        error
      );

      Alert.alert(
        'ERRO',
        'Não foi possível formular o plano.'
      );

    } finally {

      setIaCarregando(false);

    }
  };


  // ==========================================================
  // COPIAR SOAP
  // ==========================================================

  const copiarSoap = async () => {

    const texto = `
SOAP — ${modelo.categoria}

========================
SUBJETIVO
========================

${subjetivo}

========================
OBJETIVO
========================

${objetivo}

========================
AVALIAÇÃO
========================

${avaliacao}

========================
PLANO
========================

${plano}
`.trim().toUpperCase();


    try {

      if (
        Platform.OS === 'web' &&
        navigator.clipboard
      ) {

        await navigator.clipboard.writeText(
          texto
        );

        setCopiado(true);

        setTimeout(
          () => setCopiado(false),
          2000
        );

      } else {

        Alert.alert(
          'SOAP PRONTO',
          'A cópia automática está disponível na versão web.'
        );

      }

    } catch (error) {

      console.error(error);

    }

  };


  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.soapTela}
        keyboardShouldPersistTaps="handled"
      >

        {/* VOLTAR */}

        <TouchableOpacity
          style={styles.voltar}
          onPress={voltar}
        >

          <Ionicons
            name="arrow-back"
            size={20}
            color="#5B1982"
          />

          <Text style={styles.voltarTexto}>
            VOLTAR PARA MODELOS
          </Text>

        </TouchableOpacity>


        {/* TÍTULO */}

        <View style={styles.tituloSoap}>

          <View style={styles.iconeGrande}>

            <Ionicons
              name={modelo.icone}
              size={28}
              color="#5B1982"
            />

          </View>

          <View style={{ flex: 1 }}>

            <Text style={styles.tituloSoapTexto}>
              {modelo.titulo}
            </Text>

            <Text style={styles.tituloSoapDescricao}>
              {modelo.descricao}
            </Text>

          </View>

        </View>


        {/* ==================================================
            S
        ================================================== */}

        <SoapCard
          letra="S"
          titulo="SUBJETIVO"
          cor="#3B82F6"
        >

          <TextInput
            style={[
              styles.input,
              styles.inputS
            ]}
            multiline
            scrollEnabled={false}
            value={subjetivo}
            onChangeText={setSubjetivo}
            textAlignVertical="top"
            autoCapitalize="characters"
          />


          <TouchableOpacity
            style={styles.botaoIA}
            onPress={handleMelhorarHDA}
            disabled={iaCarregando}
          >

            {iaCarregando ? (

              <ActivityIndicator
                color="#FFF"
                size="small"
              />

            ) : (

              <>
                <Ionicons
                  name="sparkles"
                  size={16}
                  color="#FFF"
                />

                <Text style={styles.botaoIATexto}>
                  MELHORE
                </Text>
              </>

            )}

          </TouchableOpacity>

        </SoapCard>


        {/* ==================================================
            O
        ================================================== */}

        <SoapCard
          letra="O"
          titulo="OBJETIVO"
          cor="#10B981"
        >

          <TextInput
            style={[
              styles.input,
              styles.inputO
            ]}
            multiline
            scrollEnabled={false}
            value={objetivo}
            onChangeText={setObjetivo}
            textAlignVertical="top"
            autoCapitalize="characters"
          />

        </SoapCard>


        {/* ==================================================
            A
        ================================================== */}

        <SoapCard
          letra="A"
          titulo="AVALIAÇÃO"
          cor="#F59E0B"
        >

          <TextInput
            style={[
              styles.input,
              styles.inputA
            ]}
            multiline
            scrollEnabled={false}
            value={avaliacao}
            onChangeText={setAvaliacao}
            textAlignVertical="top"
            autoCapitalize="characters"
          />

        </SoapCard>


        {/* ==================================================
            P
        ================================================== */}

        <SoapCard
          letra="P"
          titulo="PLANO"
          cor="#8B5CF6"
        >

          <TextInput
            style={[
              styles.input,
              styles.inputP
            ]}
            multiline
            scrollEnabled={false}
            value={plano}
            onChangeText={setPlano}
            textAlignVertical="top"
            autoCapitalize="characters"
          />

          <TouchableOpacity
            style={styles.botaoIA}
            onPress={gerarPlano}
            disabled={iaCarregando}
            activeOpacity={0.8}
          >
            {iaCarregando ? (
              <ActivityIndicator
                color="#FFF"
                size="small"
              />
            ) : (
              <>
                <Ionicons
                  name="sparkles"
                  size={16}
                  color="#FFF"
                />

                <Text style={styles.botaoIATexto}>
                  chora
                </Text>
              </>
            )}
          </TouchableOpacity>

        </SoapCard>

        {/* COPIAR */}

        <TouchableOpacity
          style={[
            styles.botaoCopiar,
            copiado && styles.botaoCopiado
          ]}
          onPress={copiarSoap}
        >

          <Ionicons
            name={
              copiado
                ? 'checkmark-circle'
                : 'copy-outline'
            }
            size={20}
            color="#FFF"
          />

          <Text style={styles.botaoCopiarTexto}>

            {copiado
              ? 'SOAP COPIADO!'
              : 'COPIAR SOAP COMPLETO'}

          </Text>

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
}


// ============================================================
// CARD SOAP
// ============================================================

function SoapCard({
  letra,
  titulo,
  cor,
  children
}) {

  return (

    <View style={styles.soapCard}>

      <View style={styles.soapCardHeader}>

        <View
          style={[
            styles.badge,
            { backgroundColor: cor }
          ]}
        >

          <Text style={styles.badgeTexto}>
            {letra}
          </Text>

        </View>


        <Text style={styles.soapCardTitulo}>
          {titulo}
        </Text>

      </View>


      {children}

    </View>

  );
}


// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },


  // BUSCA

  busca: {
    height: 44,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  buscaInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    color: '#2D3748',
  },


  // FILTROS

  filtrosScroll: {
    flexGrow: 0,
    height: 48,
  },

  filtros: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },

  filtro: {
    height: 34,
    paddingHorizontal: 14,
    marginRight: 8,
    borderRadius: 17,
    backgroundColor: '#EDF2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  filtroAtivo: {
    backgroundColor: '#5B1982',
  },

  filtroTexto: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#4A5568',
  },

  filtroTextoAtivo: {
    color: '#FFF',
  },


  // LISTA

  lista: {
    padding: 16,
    paddingTop: 4,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    marginBottom: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },

  icone: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  cardTexto: {
    flex: 1,
  },

  cardTitulo: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#1A202C',
  },

  cardDescricao: {
    fontSize: 10.5,
    color: '#718096',
    marginTop: 4,
    lineHeight: 15,
  },

  letras: {
    flexDirection: 'row',
    marginTop: 7,
  },

  letra: {
    fontSize: 9,
    fontWeight: '900',
    color: '#5B1982',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 4,
  },


  // TELA SOAP

  soapTela: {
    padding: 14,
    paddingBottom: 30,
  },

  voltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 4,
  },

  voltarTexto: {
    color: '#5B1982',
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 6,
  },

  tituloSoap: {
    backgroundColor: '#FFF',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  iconeGrande: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  tituloSoapTexto: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1A202C',
  },

  tituloSoapDescricao: {
    fontSize: 10.5,
    color: '#718096',
    marginTop: 3,
  },


  // CARDS SOAP

  soapCard: {
    backgroundColor: '#FFF',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    marginBottom: 13,
  },

  soapCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  badge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },

  badgeTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
  },

  soapCardTitulo: {
    fontSize: 15,
    fontWeight: '900',
    color: '#2D3748',
  },


  // INPUTS

  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#EDF2F7',
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 10,
    fontSize: 12,
    lineHeight: 19,
    color: '#2D3748',
    textAlignVertical: 'top',
  },

  inputS: {
    minHeight: 300,
  },

  inputO: {
    minHeight: 220,
  },

  inputA: {
    minHeight: 110,
  },

  inputP: {
    minHeight: 150,
  },


  // IA

  botaoIA: {
    height: 40,
    marginTop: 10,
    borderRadius: 9,
    backgroundColor: '#5B1982',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoIATexto: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 6,
  },


  // COPIAR

  botaoCopiar: {
    height: 48,
    borderRadius: 11,
    backgroundColor: '#5B1982',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  botaoCopiado: {
    backgroundColor: '#10B981',
  },

  botaoCopiarTexto: {
    color: '#FFF',
    fontSize: 12.5,
    fontWeight: '900',
    marginLeft: 8,
  },

});