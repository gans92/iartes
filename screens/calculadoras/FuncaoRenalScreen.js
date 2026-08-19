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

const COR = '#1a6fb0';
const COR_BG = '#e3f0fb';

const ESTAGIOS = [
  { estagio: '01', tfg: '90 ou mais', grau: 'Lesão renal com função renal normal', cor: '#e8c9a8' },
  { estagio: '02', tfg: '60 a 89', grau: 'Leve ou funcional', cor: '#b7cf7a' },
  { estagio: '03', tfg: '30 a 59', grau: 'Moderada ou laboratorial', cor: '#e8c94a' },
  { estagio: '04', tfg: '15 a 29', grau: 'Severa ou clínica', cor: '#d97a5a' },
  { estagio: '05', tfg: '15 ou menos', grau: 'Terminal ou dialítica', cor: '#c0483f' },
];

function classificarEstagio(tfg) {
  if (tfg >= 90) return 0;
  if (tfg >= 60) return 1;
  if (tfg >= 30) return 2;
  if (tfg >= 15) return 3;
  return 4;
}

export default function FuncaoRenalScreen() {
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [creatinina, setCreatinina] = useState('');
  const [sexo, setSexo] = useState('M');
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const idadeNum = parseFloat(idade);
    const pesoNum = parseFloat(peso);
    const creatininaNum = parseFloat(creatinina);

    if (!idadeNum || !pesoNum || !creatininaNum) {
      setResultado({ erro: 'Preencha todos os campos corretamente.' });
      return;
    }

    let tfg = ((140 - idadeNum) * pesoNum) / (72 * creatininaNum);
    if (sexo === 'F') tfg *= 0.85;

    setResultado({ tfg: tfg.toFixed(1), estagioIndex: classificarEstagio(tfg) });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cabeçalho */}
        <View style={styles.hero}>
          <View style={[styles.heroIcon, { backgroundColor: COR }]}>
            <Ionicons name="water-outline" size={26} color="#fff" />
          </View>
          <View>
            <Text style={styles.heroTitulo}>Cockcroft - Gault</Text>
            <Text style={styles.heroSubtitulo}>Clearance de creatinina estimado</Text>
          </View>
        </View>

        {/* Formulário */}
        <View style={styles.card}>
          <Text style={styles.label}>Idade (anos)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={idade}
            onChangeText={setIdade}
            placeholder="Ex: 68"
            placeholderTextColor="#b0b0b0"
          />

          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={peso}
            onChangeText={setPeso}
            placeholder="Ex: 72"
            placeholderTextColor="#b0b0b0"
          />

          <Text style={styles.label}>Creatinina sérica (mg/dL)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={creatinina}
            onChangeText={setCreatinina}
            placeholder="Ex: 1.1"
            placeholderTextColor="#b0b0b0"
          />

          <Text style={styles.label}>Sexo</Text>
          <View style={styles.sexoRow}>
            <TouchableOpacity
              style={[styles.sexoButton, sexo === 'M' && { backgroundColor: COR, borderColor: COR }]}
              onPress={() => setSexo('M')}
            >
              <Text style={[styles.sexoTexto, sexo === 'M' && styles.sexoTextoAtivo]}>Masculino</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sexoButton, sexo === 'F' && { backgroundColor: COR, borderColor: COR }]}
              onPress={() => setSexo('F')}
            >
              <Text style={[styles.sexoTexto, sexo === 'F' && styles.sexoTextoAtivo]}>Feminino</Text>
            </TouchableOpacity>
          </View>
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
            <Text style={styles.resultadoTexto}>{resultado.tfg} mL/min</Text>
          </View>
        )}

        {/* Tabela de estágios */}
        <Text style={styles.tabelaTitulo}>Estágios da doença renal</Text>
        <View style={styles.tabela}>
          {ESTAGIOS.map((item, index) => (
            <View
              key={item.estagio}
              style={[
                styles.linhaTabela,
                resultado && !resultado.erro && resultado.estagioIndex === index && styles.linhaDestacada,
              ]}
            >
              <View style={[styles.estagioBox, { backgroundColor: item.cor }]}>
                <Text style={styles.estagioNumero}>{item.estagio}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.tfgTexto}>TFG: {item.tfg}</Text>
                <Text style={styles.grauTexto}>{item.grau}</Text>
              </View>
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
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
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
  label: { fontSize: 13, color: '#8a8a8a', marginTop: 14, marginBottom: 6, fontWeight: '600' },
  input: {
    backgroundColor: '#f4f2f7',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#1f1f1f',
  },
  sexoRow: { flexDirection: 'row', marginTop: 4 },
  sexoButton: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  sexoTexto: { color: '#555', fontSize: 14, fontWeight: '600' },
  sexoTextoAtivo: { color: '#fff' },
  calcularButton: {
    flexDirection: 'row',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  calcularTexto: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  erroTexto: { color: '#c0483f', marginTop: 14, fontSize: 14, textAlign: 'center' },
  resultadoBox: {
    marginTop: 18,
    padding: 16,
    borderRadius: 14,
    borderLeftWidth: 5,
  },
  resultadoLabel: { fontSize: 12.5, fontWeight: '700', marginBottom: 4 },
  resultadoTexto: { fontSize: 20, fontWeight: '800', color: '#1f1f1f' },
  tabelaTitulo: { fontSize: 14, fontWeight: '700', color: '#3a3a3a', marginTop: 26, marginBottom: 10 },
  tabela: { borderRadius: 14, overflow: 'hidden' },
  linhaTabela: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  linhaDestacada: { backgroundColor: '#fff3c4' },
  estagioBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  estagioNumero: { color: '#fff', fontWeight: '800', fontSize: 13 },
  tfgTexto: { fontSize: 13, fontWeight: '700', color: '#1f1f1f' },
  grauTexto: { fontSize: 11.5, color: '#777', marginTop: 1 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerTexto: { color: '#fff', fontSize: 14, fontWeight: '700' },
  footerBotao: { backgroundColor: '#fff', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16 },
  footerBotaoTexto: { fontWeight: '700', fontSize: 13 },
});