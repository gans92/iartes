import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COR = '#c0483f';

const MODOS = [
  { id: 'curb', label: 'CURB-65' },
  { id: 'crb', label: 'CRB-65' },
];

// CURB-65: 5 critérios (inclui ureia)
const CRITERIOS_CURB = [
  { id: 'confusao', label: 'Confusão mental' },
  { id: 'ureia', label: 'Ureia elevada (> 50 mg/dL ou > 7 nmol/L)' },
  { id: 'fr', label: 'Frequência respiratória ≥ 30' },
  { id: 'pa', label: 'Pressão arterial baixa (PAS < 90 OU PAD ≤ 60)' },
  { id: 'idade', label: 'Idade ≥ 65 anos' },
];

// CRB-65: mesma coisa sem a ureia — útil quando não há laboratório disponível
const CRITERIOS_CRB = CRITERIOS_CURB.filter((c) => c.id !== 'ureia');

// Cada faixa tem sua própria cor de gravidade (verde -> amarelo -> laranja -> vermelho)
// "detalhe" fica curto (ação a tomar); a mortalidade vira um badge separado, não texto corrido.
const CONDUTAS_CURB = [
  { texto: '0 e 1 ponto', detalhe: 'Tratamento ambulatorial', mortalidade: '2,7%', index: 0, cor: '#2e7d32' },
  { texto: '2 pontos', detalhe: 'Considerar internação ou ambulatorial com supervisão', mortalidade: '6,8%', index: 1, cor: '#c9971f' },
  { texto: '3 pontos', detalhe: 'Necessária hospitalização e considerar UTI', mortalidade: '14,0%', index: 2, cor: '#e0652c' },
  { texto: '4 ou 5 pontos', detalhe: 'Necessária hospitalização e considerar UTI', mortalidade: '24,8%', index: 3, cor: '#c0483f' },
];

const CONDUTAS_CRB = [
  {
    texto: '0 pontos',
    risco: 'Risco baixo',
    detalhe: 'Tratamento ambulatorial',
    index: 0,
    cor: '#2e7d32',
  },
  {
    texto: '1 e 2 pontos',
    risco: 'Risco intermediário',
    detalhe: 'considerar internação',
    index: 1,
    cor: '#c9971f',
  },
  {
    texto: '3 e 4 pontos',
    risco: 'Risco alto',
    detalhe: 'Internação hospitalar com avaliação para UTI',
    index: 2,
    cor: '#c0483f',
  },
];

function classificarCURB(pontos) {
  if (pontos <= 1) return 0;
  if (pontos === 2) return 1;
  if (pontos === 3) return 2;
  return 3;
}

function classificarCRB(pontos) {
  if (pontos === 0) return 0;
  if (pontos <= 2) return 1;
  return 2;
}

export default function GravidadePneumoniaScreen() {
  const [modo, setModo] = useState('curb');
  const [marcados, setMarcados] = useState({});
  const [resultado, setResultado] = useState(null);

  const isCurb = modo === 'curb';
  const criterios = isCurb ? CRITERIOS_CURB : CRITERIOS_CRB;
  const condutas = isCurb ? CONDUTAS_CURB : CONDUTAS_CRB;
  const classificar = isCurb ? classificarCURB : classificarCRB;

  const alternar = (id) => setMarcados((prev) => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    const algumMarcado = criterios.some((c) => marcados[c.id]);
    if (!algumMarcado) {
      setResultado(null);
      return;
    }
    const pontos = criterios.reduce((total, c) => total + (marcados[c.id] ? 1 : 0), 0);
    setResultado({ pontos, index: classificar(pontos) });
  }, [marcados, modo]);

  const condutaAtual = resultado ? condutas[resultado.index] : null;
  const corAtual = condutaAtual ? condutaAtual.cor : COR;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={[styles.heroIcon, { backgroundColor: COR }]}>
            <Ionicons name="fitness-outline" size={26} color="#fff" />
          </View>
          <View>
            <Text style={styles.heroTitulo}>{isCurb ? 'CURB-65' : 'CRB-65'}</Text>
            <Text style={styles.heroSubtitulo}>
              {isCurb ? 'Gravidade de pneumonia' : 'Gravidade de pneumonia · sem ureia'}
            </Text>
          </View>
        </View>

        <View style={styles.seletor}>
          {MODOS.map((m) => {
            const ativo = m.id === modo;
            return (
              <TouchableOpacity
                key={m.id}
                style={[styles.seletorBotao, ativo && { backgroundColor: COR }]}
                activeOpacity={0.8}
                onPress={() => {
                  setModo(m.id);
                  setResultado(null);
                }}
              >
                <Text style={[styles.seletorTexto, ativo && styles.seletorTextoAtivo]}>{m.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {!isCurb && (
          <Text style={styles.seletorDica}>
            Versão sem ureia — útil quando não há laboratório disponível.
          </Text>
        )}

        <View style={styles.card}>
          {criterios.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={styles.checkRow}
              activeOpacity={0.6}
              onPress={() => alternar(c.id)}
            >
              <View style={[styles.checkbox, marcados[c.id] && { backgroundColor: COR, borderColor: COR }]}>
                {marcados[c.id] && <Ionicons name="checkmark" size={14} color="#fff" />}
              </View>
              <Text style={styles.checkLabel}>{c.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {resultado && condutaAtual && (
          <View style={[styles.resultadoBox, { borderLeftColor: corAtual, backgroundColor: corAtual + '1a' }]}>
            <View style={styles.resultadoTopo}>
              <Text style={[styles.resultadoLabel, { color: corAtual }]}>Pontuação: {resultado.pontos}</Text>
              {condutaAtual.mortalidade && (
                <View style={[styles.badge, { backgroundColor: corAtual }]}>
                  <Text style={styles.badgeTexto}>{condutaAtual.mortalidade} mortalidade</Text>
                </View>
              )}
              {condutaAtual.risco && (
                <View style={[styles.badge, { backgroundColor: corAtual }]}>
                  <Text style={styles.badgeTexto}>{condutaAtual.risco}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.resultadoTexto, { color: corAtual }]}>{condutaAtual.detalhe}</Text>
          </View>
        )}

        <Text style={styles.tabelaTitulo}>Conduta por pontuação</Text>
        <View style={styles.tabela}>
          {condutas.map((c) => {
            const destacada = resultado && resultado.index === c.index;
            return (
              <View
                key={c.index}
                style={[
                  styles.linhaTabela,
                  destacada && {
                    backgroundColor: c.cor + '1a',
                    borderWidth: 1.5,
                    borderColor: c.cor,
                  },
                ]}
              >
                <View style={styles.linhaTopo}>
                  <Text style={[styles.pontosTexto, { color: c.cor }]}>{c.texto}</Text>
                  {c.mortalidade && (
                    <View style={[styles.badgePequeno, { backgroundColor: c.cor + '22' }]}>
                      <Text style={[styles.badgePequenoTexto, { color: c.cor }]}>{c.mortalidade}</Text>
                    </View>
                  )}
                  {c.risco && (
                    <View style={[styles.badgePequeno, { backgroundColor: c.cor + '22' }]}>
                      <Text style={[styles.badgePequenoTexto, { color: c.cor }]}>{c.risco}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.detalheTexto}>{c.detalhe}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f2f7' },
  content: { padding: 20, paddingBottom: 24 },
  hero: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  heroIcon: {
    width: 52, height: 52, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  heroTitulo: { fontSize: 18, fontWeight: '800', color: '#1f1f1f' },
  heroSubtitulo: { fontSize: 12.5, color: '#8a8a8a', marginTop: 2 },
  seletor: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 8,
  },
  seletorBotao: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: 'center',
  },
  seletorTexto: { fontSize: 13.5, fontWeight: '700', color: '#8a8a8a' },
  seletorTextoAtivo: { color: '#fff' },
  seletorDica: { fontSize: 12, color: '#8a8a8a', marginBottom: 12, paddingHorizontal: 2 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  checkRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  checkbox: {
    width: 24, height: 24, borderWidth: 1.5, borderColor: '#ddd',
    borderRadius: 7, marginRight: 12, alignItems: 'center', justifyContent: 'center',
  },
  checkLabel: { fontSize: 14.5, color: '#333', flex: 1 },
  resultadoBox: { marginTop: 18, padding: 16, borderRadius: 14, borderLeftWidth: 5 },
  resultadoTopo: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 6 },
  resultadoLabel: { fontSize: 12.5, fontWeight: '700' },
  resultadoTexto: { fontSize: 16, fontWeight: '700', lineHeight: 21 },
  badge: { paddingVertical: 3, paddingHorizontal: 9, borderRadius: 20 },
  badgeTexto: { fontSize: 11, fontWeight: '700', color: '#fff' },
  tabelaTitulo: { fontSize: 14, fontWeight: '700', color: '#3a3a3a', marginTop: 26, marginBottom: 10 },
  tabela: {},
  linhaTabela: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 6,
  },
  linhaTopo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 },
  pontosTexto: { fontSize: 12.5, fontWeight: '700' },
  badgePequeno: { paddingVertical: 2, paddingHorizontal: 8, borderRadius: 20 },
  badgePequenoTexto: { fontSize: 10.5, fontWeight: '700' },
  detalheTexto: { fontSize: 13.5, color: '#4a4a4a', fontWeight: '500', lineHeight: 18 },
  footer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 16, paddingHorizontal: 20,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
  },
  footerTexto: { color: '#fff', fontSize: 14, fontWeight: '700' },
  footerBotao: { backgroundColor: '#fff', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16 },
  footerBotaoTexto: { fontWeight: '700', fontSize: 13 },
});