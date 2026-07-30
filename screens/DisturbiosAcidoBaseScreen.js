import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COR = '#1f7a5c';
const COR_BG = '#e2f5ec';

const PH_MIN = 7.35;
const PH_MAX = 7.45;
const PCO2_MIN = 35;
const PCO2_MAX = 45;
const HCO3_MIN = 22;
const HCO3_MAX = 26;

function avaliarDisturbio(ph, pco2, hco3) {
  const phBaixo = ph < PH_MIN;
  const phAlto = ph > PH_MAX;
  const pco2Alto = pco2 > PCO2_MAX;
  const pco2Baixo = pco2 < PCO2_MIN;
  const hco3Baixo = hco3 < HCO3_MIN;
  const hco3Alto = hco3 > HCO3_MAX;

  if (phBaixo) {
    if (pco2Alto && hco3Baixo) return 'Distúrbio Misto: Acidose Respiratória + Acidose Metabólica';
    if (pco2Alto) return 'Acidose Respiratória';
    if (hco3Baixo) return 'Acidose Metabólica';
    return 'Acidose (componente indefinido — reavalie os valores)';
  }

  if (phAlto) {
    if (pco2Baixo && hco3Alto) return 'Distúrbio Misto: Alcalose Respiratória + Alcalose Metabólica';
    if (pco2Baixo) return 'Alcalose Respiratória';
    if (hco3Alto) return 'Alcalose Metabólica';
    return 'Alcalose (componente indefinido — reavalie os valores)';
  }

  if (pco2Alto && hco3Alto) return 'Acidose Respiratória compensada';
  if (pco2Baixo && hco3Baixo) return 'Alcalose Respiratória compensada';
  if (hco3Baixo) return 'Acidose Metabólica compensada';
  if (hco3Alto) return 'Alcalose Metabólica compensada';

  return 'Sem distúrbio ácido-base (valores normais)';
}

export default function DisturbiosAcidoBaseScreen() {
  const [ph, setPh] = useState('');
  const [pco2, setPco2] = useState('');
  const [hco3, setHco3] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const phNum = parseFloat(ph.replace(',', '.'));
    const pco2Num = parseFloat(pco2.replace(',', '.'));
    const hco3Num = parseFloat(hco3.replace(',', '.'));

    if (!phNum || !pco2Num || !hco3Num) {
      setResultado({ erro: 'Preencha pH, PCO2 e HCO3 corretamente.' });
      return;
    }

    setResultado({ diagnostico: avaliarDisturbio(phNum, pco2Num, hco3Num) });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={[styles.heroIcon, { backgroundColor: COR }]}>
            <Ionicons name="flask-outline" size={26} color="#fff" />
          </View>
          <View>
            <Text style={styles.heroTitulo}>Distúrbios Ácido-Base</Text>
            <Text style={styles.heroSubtitulo}>pH, PCO2 e HCO3</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>pH  <Text style={styles.refTexto}>(normal: 7,35 – 7,45)</Text></Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={ph}
            onChangeText={setPh}
            placeholder="Ex: 7.25"
            placeholderTextColor="#b0b0b0"
          />

          <Text style={styles.label}>PCO2 (mmHg)  <Text style={styles.refTexto}>(normal: 35 – 45)</Text></Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={pco2}
            onChangeText={setPco2}
            placeholder="Ex: 48"
            placeholderTextColor="#b0b0b0"
          />

          <Text style={styles.label}>HCO3 (mEq/L)  <Text style={styles.refTexto}>(normal: 22 – 26)</Text></Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={hco3}
            onChangeText={setHco3}
            placeholder="Ex: 18"
            placeholderTextColor="#b0b0b0"
          />
        </View>

        <TouchableOpacity style={[styles.calcularButton, { backgroundColor: COR }]} onPress={calcular} activeOpacity={0.85}>
          <Ionicons name="calculator-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.calcularTexto}>CALCULAR</Text>
        </TouchableOpacity>

        {resultado && resultado.erro && (
          <Text style={styles.erroTexto}>{resultado.erro}</Text>
        )}

        {resultado && !resultado.erro && (
          <View style={[styles.resultadoBox, { borderLeftColor: COR, backgroundColor: COR_BG }]}>
            <Text style={[styles.resultadoLabel, { color: COR }]}>Resultado</Text>
            <Text style={styles.resultadoTexto}>{resultado.diagnostico}</Text>
          </View>
        )}

        <Text style={styles.tabelaTitulo}>Valores de referência</Text>
        <View style={styles.refCardRow}>
          <View style={styles.refCard}>
            <Text style={styles.refCardLabel}>pH</Text>
            <Text style={styles.refCardValor}>7,35–7,45</Text>
          </View>
          <View style={styles.refCard}>
            <Text style={styles.refCardLabel}>PCO2</Text>
            <Text style={styles.refCardValor}>35–45</Text>
          </View>
          <View style={styles.refCard}>
            <Text style={styles.refCardLabel}>HCO3</Text>
            <Text style={styles.refCardValor}>22–26</Text>
          </View>
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
  label: { fontSize: 13, color: '#3a3a3a', marginTop: 14, marginBottom: 6, fontWeight: '600' },
  refTexto: { fontSize: 11.5, color: '#aaa', fontWeight: '400' },
  input: {
    backgroundColor: '#f4f2f7',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#1f1f1f',
  },
  calcularButton: {
    flexDirection: 'row', borderRadius: 14, paddingVertical: 16,
    alignItems: 'center', justifyContent: 'center', marginTop: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 8, elevation: 3,
  },
  calcularTexto: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  erroTexto: { color: '#c0483f', marginTop: 14, fontSize: 14, textAlign: 'center' },
  resultadoBox: { marginTop: 18, padding: 16, borderRadius: 14, borderLeftWidth: 5 },
  resultadoLabel: { fontSize: 12.5, fontWeight: '700', marginBottom: 4 },
  resultadoTexto: { fontSize: 18, fontWeight: '800', color: '#1f1f1f' },
  tabelaTitulo: { fontSize: 14, fontWeight: '700', color: '#3a3a3a', marginTop: 26, marginBottom: 10 },
  refCardRow: { flexDirection: 'row', justifyContent: 'space-between' },
  refCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  refCardLabel: { fontSize: 12, color: '#8a8a8a', fontWeight: '600', marginBottom: 4 },
  refCardValor: { fontSize: 14, color: '#1f7a5c', fontWeight: '800' },
  footer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 16, paddingHorizontal: 20,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
  },
  footerTexto: { color: '#fff', fontSize: 14, fontWeight: '700' },
  footerBotao: { backgroundColor: '#fff', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16 },
  footerBotaoTexto: { fontWeight: '700', fontSize: 13 },
});