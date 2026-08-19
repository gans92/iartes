import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COR = '#8a5a1f';
const COR_BG = '#faf0e0';

const ABERTURA_OCULAR = [
  { id: 'ao4', classificacao: 'Espontânea', pontos: 4 },
  { id: 'ao3', classificacao: 'Ao som (voz)', pontos: 3 },
  { id: 'ao2', classificacao: 'À pressão (dor)', pontos: 2 },
  { id: 'ao1', classificacao: 'Ausente', pontos: 1 },
];

const RESPOSTA_VERBAL = [
  { id: 'rv5', classificacao: 'Orientada', pontos: 5 },
  { id: 'rv4', classificacao: 'Confusa', pontos: 4 },
  { id: 'rv3', classificacao: 'Palavras inapropriadas', pontos: 3 },
  { id: 'rv2', classificacao: 'Sons incompreensíveis', pontos: 2 },
  { id: 'rv1', classificacao: 'Ausente', pontos: 1 },
];

const RESPOSTA_MOTORA = [
  { id: 'rm6', classificacao: 'Obedece a comandos', pontos: 6 },
  { id: 'rm5', classificacao: 'Localiza a dor', pontos: 5 },
  { id: 'rm4', classificacao: 'Retirada inespecífica', pontos: 4 },
  { id: 'rm3', classificacao: 'Flexão anormal', pontos: 3 },
  { id: 'rm2', classificacao: 'Extensão anormal', pontos: 2 },
  { id: 'rm1', classificacao: 'Ausente', pontos: 1 },
];

function classificar(total) {
  if (total === 3) return { texto: 'COMA', index: 3 };
  if (total <= 8) return { texto: 'GRAVE', index: 2 };
  if (total <= 12) return { texto: 'MODERADA', index: 1 };
  return { texto: 'LEVE', index: 0 };
}

function Secao({ titulo, itens, selecionado, onSelecionar }) {
  return (
    <View style={styles.card}>
      <Text style={styles.secaoTitulo}>{titulo}</Text>
      <View style={styles.opcoesWrap}>
        {itens.map((item) => {
          const ativo = selecionado === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.opcao, ativo && { backgroundColor: COR, borderColor: COR }]}
              onPress={() => onSelecionar(item.id, item.pontos)}
              activeOpacity={0.7}
            >
              <Text style={[styles.opcaoPontos, ativo && styles.opcaoTextoAtivo]}>{item.pontos}</Text>
              <Text style={[styles.opcaoTexto, ativo && styles.opcaoTextoAtivo]}>{item.classificacao}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function EscoreGlasgowScreen() {
  const [ocular, setOcular] = useState(null);
  const [verbal, setVerbal] = useState(null);
  const [motora, setMotora] = useState(null);
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    if (!ocular || !verbal || !motora) {
      setResultado({ erro: 'Selecione uma opção em cada categoria.' });
      return;
    }
    const total = ocular.pontos + verbal.pontos + motora.pontos;
    setResultado({ total, ...classificar(total) });
  };

  const linhasResultado = [
    { texto: 'LEVE', faixa: '13 a 15', index: 0 },
    { texto: 'MODERADA', faixa: '9 a 12', index: 1 },
    { texto: 'GRAVE', faixa: '3 a 8', index: 2 },
    { texto: 'COMA', faixa: '3', index: 3 },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={[styles.heroIcon, { backgroundColor: COR }]}>
            <Ionicons name="analytics-outline" size={26} color="#fff" />
          </View>
          <View>
            <Text style={styles.heroTitulo}>Escore de Glasgow</Text>
            <Text style={styles.heroSubtitulo}>Nível de consciência</Text>
          </View>
        </View>

        <Secao titulo="Abertura ocular" itens={ABERTURA_OCULAR} selecionado={ocular?.id} onSelecionar={(id, p) => setOcular({ id, pontos: p })} />
        <Secao titulo="Resposta verbal" itens={RESPOSTA_VERBAL} selecionado={verbal?.id} onSelecionar={(id, p) => setVerbal({ id, pontos: p })} />
        <Secao titulo="Resposta motora" itens={RESPOSTA_MOTORA} selecionado={motora?.id} onSelecionar={(id, p) => setMotora({ id, pontos: p })} />

        <TouchableOpacity style={[styles.calcularButton, { backgroundColor: COR }]} onPress={calcular} activeOpacity={0.85}>
          <Ionicons name="calculator-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.calcularTexto}>CALCULAR</Text>
        </TouchableOpacity>

        {resultado && resultado.erro && (
          <Text style={styles.erroTexto}>{resultado.erro}</Text>
        )}

        {resultado && !resultado.erro && (
          <View style={[styles.resultadoBox, { borderLeftColor: COR, backgroundColor: COR_BG }]}>
            <Text style={[styles.resultadoLabel, { color: COR }]}>Pontuação total: {resultado.total}</Text>
            <Text style={styles.resultadoTexto}>{resultado.texto}</Text>
          </View>
        )}

        <Text style={styles.tabelaTitulo}>Classificação</Text>
        <View style={styles.tabela}>
          {linhasResultado.map((linha) => (
            <View
              key={linha.index}
              style={[styles.linhaTabela, resultado && !resultado.erro && resultado.index === linha.index && styles.linhaDestacada]}
            >
              <Text style={styles.classificacaoTexto}>{linha.texto}</Text>
              <Text style={styles.faixaTexto}>ECG {linha.faixa}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f2f7' },
  content: { padding: 20, paddingBottom: 24 },
  hero: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  heroIcon: {
    width: 52, height: 52, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  heroTitulo: { fontSize: 18, fontWeight: '800', color: '#1f1f1f' },
  heroSubtitulo: { fontSize: 12.5, color: '#8a8a8a', marginTop: 2 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  secaoTitulo: { fontSize: 14, fontWeight: '700', color: '#3a3a3a', marginBottom: 10 },
  opcoesWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e6e6e6',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  opcaoPontos: { fontSize: 13, fontWeight: '800', color: '#8a5a1f', marginRight: 6 },
  opcaoTexto: { fontSize: 12.5, color: '#555', fontWeight: '600' },
  opcaoTextoAtivo: { color: '#fff' },
  calcularButton: {
    flexDirection: 'row', borderRadius: 14, paddingVertical: 16,
    alignItems: 'center', justifyContent: 'center', marginTop: 6,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 8, elevation: 3,
  },
  calcularTexto: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  erroTexto: { color: '#c0483f', marginTop: 14, fontSize: 14, textAlign: 'center' },
  resultadoBox: { marginTop: 18, padding: 16, borderRadius: 14, borderLeftWidth: 5 },
  resultadoLabel: { fontSize: 12.5, fontWeight: '700', marginBottom: 4 },
  resultadoTexto: { fontSize: 20, fontWeight: '800', color: '#1f1f1f' },
  tabelaTitulo: { fontSize: 14, fontWeight: '700', color: '#3a3a3a', marginTop: 26, marginBottom: 10 },
  tabela: {},
  linhaTabela: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  linhaDestacada: { backgroundColor: '#faf0e0' },
  classificacaoTexto: { fontSize: 14.5, fontWeight: '700', color: '#1f1f1f' },
  faixaTexto: { fontSize: 12.5, color: '#8a8a8a' },
  avisoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fbe6e3',
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
  },
  avisoTexto: { flex: 1, fontSize: 13, color: '#8a3a30', fontWeight: '600' },
  footer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 16, paddingHorizontal: 20,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
  },
  footerTexto: { color: '#fff', fontSize: 14, fontWeight: '700' },
  footerBotao: { backgroundColor: '#fff', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16 },
  footerBotaoTexto: { fontWeight: '700', fontSize: 13 },
});