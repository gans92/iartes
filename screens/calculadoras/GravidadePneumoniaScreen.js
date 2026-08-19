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

const COR = '#c0483f';
const COR_BG = '#fbe6e3';

const CRITERIOS = [
  { id: 'confusao', label: 'Confusão mental' },
  { id: 'ureia', label: 'Ureia elevada' },
  { id: 'fr', label: 'Frequência respiratória ≥ 30' },
  { id: 'pa', label: 'Pressão arterial baixa < 90/60' },
  { id: 'idade', label: 'Idade ≥ 65 anos' },
];

const CONDUTAS = [
  { texto: '0 e 1 ponto', detalhe: 'Tratamento ambulatorial', index: 0 },
  { texto: '2 pontos', detalhe: 'Tratamento hospitalar', index: 1 },
  { texto: '3 pontos', detalhe: 'Tratar como PAC grave', index: 2 },
  { texto: '4 ou 5 pontos', detalhe: 'Internação em UTI', index: 3 },
];

function classificar(pontos) {
  if (pontos <= 1) return 0;
  if (pontos === 2) return 1;
  if (pontos === 3) return 2;
  return 3;
}

export default function GravidadePneumoniaScreen() {
  const [marcados, setMarcados] = useState({});
  const [resultado, setResultado] = useState(null);

  const alternar = (id) => setMarcados((prev) => ({ ...prev, [id]: !prev[id] }));

  const calcular = () => {
    const pontos = CRITERIOS.reduce((total, c) => total + (marcados[c.id] ? 1 : 0), 0);
    setResultado({ pontos, index: classificar(pontos) });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={[styles.heroIcon, { backgroundColor: COR }]}>
            <Ionicons name="thermometer-outline" size={26} color="#fff" />
          </View>
          <View>
            <Text style={styles.heroTitulo}>CURB-65</Text>
            <Text style={styles.heroSubtitulo}>Gravidade de pneumonia</Text>
          </View>
        </View>

        <View style={styles.card}>
          {CRITERIOS.map((c) => (
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

        <TouchableOpacity style={[styles.calcularButton, { backgroundColor: COR }]} onPress={calcular} activeOpacity={0.85}>
          <Ionicons name="calculator-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.calcularTexto}>CALCULAR</Text>
        </TouchableOpacity>

        {resultado && (
          <View style={[styles.resultadoBox, { borderLeftColor: COR, backgroundColor: COR_BG }]}>
            <Text style={[styles.resultadoLabel, { color: COR }]}>Pontuação: {resultado.pontos}</Text>
            <Text style={styles.resultadoTexto}>{CONDUTAS[resultado.index].detalhe}</Text>
          </View>
        )}

        <Text style={styles.tabelaTitulo}>Conduta por pontuação</Text>
        <View style={styles.tabela}>
          {CONDUTAS.map((c) => (
            <View
              key={c.index}
              style={[
                styles.linhaTabela,
                resultado && resultado.index === c.index && styles.linhaDestacada,
              ]}
            >
              <Text style={styles.pontosTexto}>{c.texto}</Text>
              <Text style={styles.detalheTexto}>{c.detalhe}</Text>
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
  calcularButton: {
    flexDirection: 'row', borderRadius: 14, paddingVertical: 16,
    alignItems: 'center', justifyContent: 'center', marginTop: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 8, elevation: 3,
  },
  calcularTexto: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  resultadoBox: { marginTop: 18, padding: 16, borderRadius: 14, borderLeftWidth: 5 },
  resultadoLabel: { fontSize: 12.5, fontWeight: '700', marginBottom: 4 },
  resultadoTexto: { fontSize: 18, fontWeight: '800', color: '#1f1f1f' },
  tabelaTitulo: { fontSize: 14, fontWeight: '700', color: '#3a3a3a', marginTop: 26, marginBottom: 10 },
  tabela: {},
  linhaTabela: {
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
  linhaDestacada: { backgroundColor: '#fbe6e3' },
  pontosTexto: { fontSize: 13, fontWeight: '700', color: '#c0483f', marginBottom: 2 },
  detalheTexto: { fontSize: 14, color: '#1f1f1f', fontWeight: '600' },
  footer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 16, paddingHorizontal: 20,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
  },
  footerTexto: { color: '#fff', fontSize: 14, fontWeight: '700' },
  footerBotao: { backgroundColor: '#fff', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16 },
  footerBotaoTexto: { fontWeight: '700', fontSize: 13 },
});