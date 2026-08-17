import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Categorias focadas nos perfis demográficos e de atendimento
const CATEGORIAS = {
  todas: 'Todas',
  idoso: 'Saúde do Idoso',
  mulher: 'Saúde da Mulher',
  pediatria: 'Pediatria',
  geral: 'Clínica Geral',
  emergencia: 'Pronto Atendimento',
};

// Banco de Dados com Modelos divididos por perfil (100% EM MAIÚSCULO)
const MODELOS_SOAP = [
  // --- SAÚDE DO IDOSO ---
  {
    id: '1',
    titulo: 'CONSULTA GERONTOLÓGICA DE ROTINA / POLIFARMÁCIA',
    categoria: 'idoso',
    descricao: 'Acompanhamento do idoso, rastreio de fragilidade e revisão de medicações.',
    soap: {
      subjetivo:
        'ACOMPANHANTE/PACIENTE RELATA CONSULTA DE ROTINA. NEGA QUEDAS RECENTES, TONTURAS OU QUEIXAS AGUDAS. SONO PRESERVADO, APETITE MANTIDO. EM USO DE [LISTA DE MEDICAMENTOS]. NEGA ALERGIAS.',
      objetivo:
        'BEG, LOTE, EUPNÉICO, ACIANÓTICO, ANICTÉRICO. MARCHA PRESERVADA/SEM INSTABILIDADE VISÍVEL.\nPA: [130X80] MMHG | FC: [72] BPM | SPO2: [96]%\nAUSCULTA CARDÍACA: RCR 2T SEM SOPROS.\nAUSCULTA PULMONAR: MV+, SEM RUÍDOS ADVENTÍCIOS.\nMEMBROS INFERIORES: SEM EDEMAS, PULSOS PEDIOSOS PRESENTES E SIMÉTRICOS.\nAVALIAÇÃO FUNCIONAL: AUTÔNOMO PARA AVDS BÁSICAS.',
      avaliacao:
        '1. ACOMPANHAMENTO DE ROTINA DA PESSOA IDOSA.\n2. POLIFARMÁCIA EM MONITORIZAÇÃO.\n3. AUSÊNCIA DE SINAIS DE FRAGILIDADE AGUDA.',
      plano:
        '1. REVISÃO DAS MEDICAÇÕES E AJUSTE DE POSOLOGIAS (CRITÉRIOS DE BEERS/STOPP-START).\n2. SOLICITADOS EXAMES DE ROTINA (HEMOGRAMA, FUNÇÃO RENAL, ELETRÓLITOS, VITAMINA B12, TSH).\n3. ORIENTAÇÕES SOBRE PREVENÇÃO DE QUEDAS NO DOMICÍLIO.\n4. RETORNO EM [X] MESES.',
    },
  },
  {
    id: '2',
    titulo: 'AVALIAÇÃO DE DECLÍNIO COGNITIVO / SUSPEITA DE DEMÊNCIA',
    categoria: 'idoso',
    descricao: 'Investigação inicial de perda de memória e alterações comportamentais.',
    soap: {
      subjetivo:
        'FAMILIAR RELATA LAPSOS DE MEMÓRIA DE FIXAÇÃO PROGRESSIVOS HÁ [X] MESES/ANOS. PACIENTE REPETE PERGUNTAS E APRESENTA DIFICULDADE COM FINANÇAS/TAREFAS COMPLEXAS. NEGA ALTERAÇÕES SÚBITAS DO COMPORTAMENTO OU FEBRE.',
      objetivo:
        'PACIENTE CALMO, COLABORATIVO. EXAME NEUROLÓGICO SIMPLIFICADO SEM DÉFICITS FOCAIS APARENTES.\nMEEM / MEEM-BREVE / MOCA: [PONTUAÇÃO X/30].\nTESTES DO DESENHO DO RELÓGIO: [NORMAL/ALTERADO].\nEXAME FÍSICO SEGMENTAR SEM ALTERAÇÕES AGUDAS.',
      avaliacao:
        '1. SÍNDROME DEMENCIAL A ESCLARECER (SÍNDROME DE DECLÍNIO COGNITIVO A ESCLARECER - CID-10: R41.8).',
      plano:
        '1. SOLICITAÇÃO DE EXAMES DE RASTREIO DE CAUSAS REVERSÍVEIS (VITAMINA B12, TSH, VDRL, FUNÇÃO RENAL/HEPÁTICA, ELETRÓLITOS).\n2. SOLICITAÇÃO DE TC/RM DE CRÂNIO SEM CONTRASTE.\n3. ORIENTAÇÕES À FAMÍLIA SOBRE SEGURANÇA E SUPORTE FUNCIONAL.\n4. RETORNO COM EXAMES PARA DEFINIÇÃO CONDUTA/ENCAMINHAMENTO.',
    },
  },

  // --- SAÚDE DA MULHER ---
  {
    id: '3',
    titulo: 'CONSULTA GINECOLÓGICA DE ROTINA / RASTREAMENTO',
    categoria: 'mulher',
    descricao: 'Coleta de Papanicolau, exame das mamas e rotina ginecológica.',
    soap: {
      subjetivo:
        'PACIENTE ASSINTOMÁTICA, VEM PARA EXAME PREVENTIVO DE ROTINA. DUM: [DD/MM/AAAA]. COITARCA AOS [X] ANOS. G[X] P[X] A[X]. USO DE MÉTODO CONTRACEPTIVO: [MÉTODO / NAO USA]. NEGA SINUSORRAGIA, CORRIMENTO COM ODOR OU DISPAREUNIA.',
      objetivo:
        'EXAME DAS MAMAS: MAMAS SIMÉTRICAS, SEM NÓDULOS PALPÁVEIS, SEM RETRAÇÃO DE PAPILA, DESCARGA PAPILAR NEGATIVA.\nEXAME ESPECULAR: COLO UTERINO DE ASPECTO [EPITÉLIO TRÓFICO/LISO/ECTOPIA], SEM LESÕES SUSPEITAS. CONTEÚDO VAGINAL FISIOLÓGICO.\nCOLETA DE CITOPATOLÓGICO REALIZADA SEM INTERCORRÊNCIAS.',
      avaliacao:
        '1. EXAME GINECOLÓGICO PREVENTIVO DE ROTINA (CID-10: Z01.4).',
      plano:
        '1. ORIENTAÇÕES SOBRE PREVENÇÃO DE ISTS E AUTOATENÇÃO.\n2. SOLICITAÇÃO DE MAMOGRAFIA (SE > 50 ANOS OU RISCO ELEVADO) / USG MAMAS / PELVICA SN.\n3. AGENDADO RETORNO PARA RESULTADO DO LAUDO CITOPATOLÓGICO.',
    },
  },
  {
    id: '4',
    titulo: 'PRÉ-NATAL DE BAIXO RISCO (CONSULTA DE ACOMPANHAMENTO)',
    categoria: 'mulher',
    descricao: 'Consulta periódica de pré-natal para gestantes sem complicações.',
    soap: {
      subjetivo:
        'GESTANTE COM IG DE [X] SEMANAS (POR DUM/USG PRECOCE). REFERE MOVIMENTAÇÃO FETAL PRESENTEE BOA. NEGA SANGRAMENTO VAGINAL, QUEIXAS URINÁRIAS, CEFALEIA INTENSA OU ESCOTOMAS.',
      objetivo:
        'PA: [110X70] MMHG | PESO: [X] KG (GANHO PONDERAL ADEQUADO).\nALTURA UTERINA (AU): [X] CM.\nBCA (BATIMENTOS CARDÍACOS FETAIS): [140] BPM, RITMO REGULAR.\nMEMBROS INFERIORES: SEM EDEMAS OU EDEMA FISIOLÓGICO +/4+.',
      avaliacao:
        '1. GESTAÇÃO TÓPICA DE [X] SEMANAS EM PRÉ-NATAL DE BAIXO RISCO (CID-10: Z34.8).',
      plano:
        '1. MANUTENÇÃO DO SULFATO FERROSO E ÁCIDO FÓLICO CONFORME IG.\n2. PRESCRITOS/CHECADOS EXAMES DO [1º/2º/3º] TRIMESTRE.\n3. ORIENTAÇÕES SOBRE SINAIS DE ALARME PARA URGÊNCIA OBSTÉTRICA (SANGRAMENTO, PERDA DE LÍQUIDO, DOR ABDOMINAL SEVERA).\n4. RETORNO PRÉ-NATAL EM [X] SEMANAS.',
    },
  },

  // --- PEDIATRIA ---
  {
    id: '5',
    titulo: 'CONSULTA DE PUERICULTURA / DESENVOLVIMENTO INFANTIL',
    categoria: 'pediatria',
    descricao: 'Acompanhamento do crescimento, marcos do desenvolvimento e vacinação.',
    soap: {
      subjetivo:
        'MÃE/ACOMPANHANTE TRAZ CRIANÇA DE [X] MESES/ANOS PARA PUERICULTURA. NEGA QUEIXAS AGUDAS. ALEITAMENTO [EXCLUSIVO / COMPLEMENTADO / FÓRMULAS]. SONO E ELIMINAÇÕES PRESERVADOS. CARTÃO DE VACINA ATUALIZADO.',
      objetivo:
        'DADOS ANTROPOMÉTRICOS: PESO: [X] KG (PERCENTIL X) | ESTATURA: [X] CM (PERCENTIL X) | PC: [X] CM.\nEXAME FÍSICO: BOM ESTADO GERAL, ATIVO, CORADO, ANICTÉRICO.\nOROSCOPIA E OTOSCOPIA SEM ALTERAÇÕES.\nMARCOS DO DESENVOLVIMENTO: [SENTA SEM APOIO / ENGATINHA / ANDA / BALBUCIA] - ADEQUADO PARA A IDADE.',
      avaliacao:
        '1. CRIANÇA EM ACOMPANHAMENTO DE PUERICULTURA COM CRESCIMENTO E DESENVOLVIMENTO ADEQUADOS PARA A IDADE.',
      plano:
        '1. ORIENTAÇÕES SOBRE INTRODUÇÃO ALIMENTAR / ALIMENTAÇÃO SAUDÁVEL.\n2. MANTIDA SUPLEMENTAÇÃO DE VITAMINA D E/OU FERRO CONFORME FAIXA ETÁRIA.\n3. REFORÇADA A IMPORTÂNCIA DA VACINAÇÃO.\n4. RETORNO AGENDADO PARA O PRÓXIMO MARCO DE IDADE.',
    },
  },

  // --- CLÍNICA GERAL ---
  {
    id: '6',
    titulo: 'CONSULTA AMBULATORIAL GERAL / RENOVAÇÃO DE RECEITA',
    categoria: 'geral',
    descricao: 'Atendimento geral e acompanhamento contínuo de condições crônicas.',
    soap: {
      subjetivo:
        'PACIENTE REFERE CONSULTA PARA RENOVAÇÃO DE RECEITAS E ACOMPANHAMENTO. RELATA BOA ADESÃO AO TRATAMENTO. NEGA NOVOS SINTOMAS OU INTERCORRÊNCIAS NO PERÍODO.',
      objetivo:
        'BEG, LOTE, CORADO, HIDRATAÇÃO PRESERVADA.\nPA: [120X80] MMHG | FC: [70] BPM.\nEXAME FÍSICO SEGMENTAR SEM ANORMALIDADES DETECTÁVEIS.',
      avaliacao:
        '1. ACOMPANHAMENTO CLÍNICO DE ROTINA.',
      plano:
        '1. MANTIDAS MEDICAÇÕES DE USO CONTÍNUO.\n2. RENOVAÇÃO DE RECEITAS PARA [X] MESES.\n3. SOLICITADOS EXAMES LABORATORIAIS DE ACOMPANHAMENTO.',
    },
  },

  // --- PRONTO ATENDIMENTO ---
  {
    id: '7',
    titulo: 'ATENDIMENTO DE FARINGOAMIGDALITE AGUDA',
    categoria: 'emergencia',
    descricao: 'Avaliação e conduta rápida para dor de garganta no PA.',
    soap: {
      subjetivo:
        'PACIENTE PROCURA PA COM QUEIXA DE ODINOFAGIA INTENSA E FEBRE (38.5°C) HÁ 2 DIAS. REFERE CALAFRIOS E ASTENIA. NEGA TOSSE OU CORIZA.',
      objetivo:
        'BEG, FEBRIL AO TOQUE, HIDRATADO.\nOROSCOPIA: AMÍGDALAS HIPEREMIADAS E HIPERTRÓFICAS (3+/4+) COM EXSUDATO PURULENTO EM PLACAS. LINFONODOMEGALIA SUBMANDIBULAR DOLOROSA À PALPAÇÃO.\nAUSCULTA PULMONAR: MV SEM RUÍDOS.',
      avaliacao:
        '1. FARINGOAMIGDALITE BACTERIANA AGUDA (ESCORE CENTOR/MCISAAC POSITIVO) - CID-10: J03.9.',
      plano:
        '1. ANALGESIA / ANTI-INFLAMATÓRIO.\n2. ANTIBIOTICOTERAPIA (EX: AMOXICILINA OU PENICILINA BENZATINA SE INDICAÇÃO/ADESÃO).\n3. ORIENTAÇÕES DE REPOUSO, HIDRATAÇÃO E SINAIS DE COMPLICAÇÃO (TRISMO, ASSIMETRIA DE ÚVULA).',
    },
  },
];

export default function ModelosSoapScreen() {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('todas');
  const [modeloSelecionado, setModeloSelecionado] = useState(null);

  const scrollRef = useRef(null);

  const modelosFiltrados = useMemo(() => {
    return MODELOS_SOAP.filter((item) => {
      const matchCat =
        categoriaAtiva === 'todas' || item.categoria === categoriaAtiva;
      const matchBusca =
        item.titulo.toLowerCase().includes(busca.trim().toLowerCase()) ||
        item.descricao.toLowerCase().includes(busca.trim().toLowerCase());
      return matchCat && matchBusca;
    });
  }, [busca, categoriaAtiva]);

  if (modeloSelecionado) {
    return (
      <VisualizarSoap
        modelo={modeloSelecionado}
        onVoltar={() => setModeloSelecionado(null)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Busca */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color="#7A7A7A" />
        <TextInput
          style={styles.searchInput}
          placeholder="BUSCAR SOAP (EX: IDOSO, PUERICULTURA, PRÉ-NATAL)..."
          placeholderTextColor="#999"
          value={busca}
          onChangeText={setBusca}
        />
        {busca.length > 0 && (
          <TouchableOpacity onPress={() => setBusca('')}>
            <Ionicons name="close-circle" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Categorias / Filtros Demográficos */}
      <View style={styles.chipsRow}>
        <TouchableOpacity
          style={styles.setaButton}
          onPress={() => scrollRef.current?.scrollTo({ x: -160, animated: true })}
        >
          <Ionicons name="chevron-back" size={18} color="#5B2A8C" />
        </TouchableOpacity>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsContainer}
          contentContainerStyle={{ paddingHorizontal: 4 }}
        >
          {Object.keys(CATEGORIAS).map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.chip,
                categoriaAtiva === key && styles.chipAtivo,
              ]}
              onPress={() => setCategoriaAtiva(key)}
            >
              <Text
                style={[
                  styles.chipTexto,
                  categoriaAtiva === key && styles.chipTextoAtivo,
                ]}
              >
                {CATEGORIAS[key].toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.setaButton}
          onPress={() => scrollRef.current?.scrollTo({ x: 160, animated: true })}
        >
          <Ionicons name="chevron-forward" size={18} color="#5B2A8C" />
        </TouchableOpacity>
      </View>

      {/* Lista de Cards */}
      <FlatList
        data={modelosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 6 }}
        ListEmptyComponent={
          <View style={styles.vazioWrap}>
            <Ionicons name="document-text-outline" size={40} color="#CCC" />
            <Text style={styles.vazioTexto}>NENHUM MODELO ENCONTRADO</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => setModeloSelecionado(item)}
          >
            <View style={{ flex: 1, marginRight: 8 }}>
              <View style={styles.tagCategoriaWrap}>
                <Text style={styles.tagCategoriaTexto}>
                  {(CATEGORIAS[item.categoria] || item.categoria).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.cardTitulo}>{item.titulo}</Text>
              <Text style={styles.cardDescricao}>{item.descricao}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#5B2A8C" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

// Tela de Visualização Detalhada
function VisualizarSoap({ modelo, onVoltar }) {
  const [copiado, setCopiado] = useState(false);

  const executarCopia = async () => {
    // Texto copiado obrigatoriamente 100% em maiúsculo
    const textoFormatado = `[SUBJETIVO]\n${modelo.soap.subjetivo}\n\n[OBJETIVO]\n${modelo.soap.objetivo}\n\n[AVALIAÇÃO]\n${modelo.soap.avaliacao}\n\n[PLANO]\n${modelo.soap.plano}`.toUpperCase();

    try {
      if (Platform.OS === 'web') {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textoFormatado);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = textoFormatado;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
      } else {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(textoFormatado);
        }
      }

      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch (err) {
      console.error('Falha ao copiar: ', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerDetalhe}>
        <TouchableOpacity onPress={onVoltar} style={styles.botaoVoltar}>
          <Ionicons name="arrow-back" size={24} color="#1A202C" />
        </TouchableOpacity>
        <Text style={styles.headerDetalheTitulo} numberOfLines={1}>
          {modelo.titulo}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <SoapCard
          letra="S"
          titulo="SUBJETIVO"
          cor="#3B82F6"
          conteudo={modelo.soap.subjetivo}
        />
        <SoapCard
          letra="O"
          titulo="OBJETIVO"
          cor="#10B981"
          conteudo={modelo.soap.objetivo}
        />
        <SoapCard
          letra="A"
          titulo="AVALIAÇÃO"
          cor="#F59E0B"
          conteudo={modelo.soap.avaliacao}
        />
        <SoapCard
          letra="P"
          titulo="PLANO"
          cor="#8B5CF6"
          conteudo={modelo.soap.plano}
        />

        {/* Botão Dinâmico de Cópia */}
        <TouchableOpacity
          style={[styles.botaoCopiar, copiado && styles.botaoCopiado]}
          onPress={executarCopia}
          activeOpacity={0.8}
        >
          <Ionicons
            name={copiado ? 'checkmark-circle-outline' : 'copy-outline'}
            size={20}
            color="#FFF"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.botaoCopiarTexto}>
            {copiado ? 'COPIADO PARA A ÁREA DE TRANSFERÊNCIA!' : 'COPIAR SOAP COMPLETO'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function SoapCard({ letra, titulo, cor, conteudo }) {
  return (
    <View style={styles.soapCard}>
      <View style={styles.soapHeaderRow}>
        <View style={[styles.soapBadge, { backgroundColor: cor }]}>
          <Text style={styles.soapBadgeTexto}>{letra}</Text>
        </View>
        <Text style={styles.soapTituloSection}>{titulo}</Text>
      </View>
      <Text style={styles.soapConteudoText}>{conteudo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },

  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 10,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 12.5, color: '#2D3748' },

  chipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 8,
  },
  setaButton: { paddingHorizontal: 6, paddingVertical: 8 },
  chipsContainer: { flex: 1, maxHeight: 38 },
  chip: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  chipAtivo: { backgroundColor: '#5B2A8C' },
  chipTexto: { fontSize: 11.5, color: '#4A5568', fontWeight: '700' },
  chipTextoAtivo: { color: '#FFF', fontWeight: '700' },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    elevation: 1,
  },
  tagCategoriaWrap: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  tagCategoriaTexto: { fontSize: 10.5, fontWeight: '700', color: '#5B2A8C' },
  cardTitulo: { fontSize: 13.5, fontWeight: '700', color: '#1A202C' },
  cardDescricao: {
    fontSize: 12,
    color: '#718096',
    marginTop: 3,
    lineHeight: 16,
  },

  vazioWrap: { alignItems: 'center', justifyContent: 'center', paddingTop: 40 },
  vazioTexto: { color: '#A0AEC0', marginTop: 8, fontSize: 13, fontWeight: '700' },

  headerDetalhe: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  botaoVoltar: { paddingRight: 12, paddingVertical: 4 },
  headerDetalheTitulo: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1A202C',
    flex: 1,
  },
  soapCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  soapHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  soapBadge: {
    width: 26,
    height: 26,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  soapBadgeTexto: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  soapTituloSection: { fontSize: 14, fontWeight: '700', color: '#2D3748' },
  soapConteudoText: { fontSize: 12.5, color: '#4A5568', lineHeight: 20, fontWeight: '500' },

  botaoCopiar: {
    flexDirection: 'row',
    backgroundColor: '#5B2A8C',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  botaoCopiado: {
    backgroundColor: '#10B981',
  },
  botaoCopiarTexto: { color: '#FFF', fontWeight: '700', fontSize: 14 },
});