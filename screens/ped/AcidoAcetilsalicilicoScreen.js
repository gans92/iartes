import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

/**
 * AcidoAcetilsalicilicoScreen
 *
 * Diferente das outras: calcula por IDADE (com toggle meses/anos), não por
 * peso — igual ao print.
 *
 * IMPORTANTE: NÃO implementei o cálculo automático de comprimidos por
 * idade. AAS pediátrico tem indicações bem diferentes conforme o motivo
 * (antitérmico/analgésico geral vs. antiagregação em Kawasaki, por
 * exemplo), com faixas de dose bem diferentes entre si — e o print não
 * mostrava a tabela usada. Preferi deixar o cálculo como TODO explícito
 * (função getComprimidosPorIdade) em vez de chutar um número errado nesse
 * medicamento específico, já que a Síndrome de Reye o torna sensível.
 * Preencha a tabela com a fonte que vocês usam e o resto do fluxo
 * (destaque em amarelo, Observações) já funciona.
 */

const MAX_COMPRIMIDOS = 4;

// TODO: preencher com a tabela real de dose por idade (em comprimidos de 100mg).
// Ex: [{ minAnos: 0.5, maxAnos: 2, comprimidos: 1 }, ...]
function getComprimidosPorIdade(idadeValor, unidade) {
  if (!idadeValor || idadeValor <= 0) return null;
  // Ainda não implementado — ver comentário acima.
  return null;
}

export default function AcidoAcetilsalicilicoScreen() {
  const [idadeInput, setIdadeInput] = useState('');
  const [unidade, setUnidade] = useState('anos'); // 'meses' | 'anos'

  const idadeValor = parseFloat(idadeInput.replace(',', '.'));
  const isValidIdade = !isNaN(idadeValor) && idadeValor > 0;

  const comprimidos = isValidIdade
    ? getComprimidosPorIdade(idadeValor, unidade)
    : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grayBlock}>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.bulaButton}>
              <Text style={styles.bulaButtonText}>Ver bula</Text>
            </TouchableOpacity>
            <View style={styles.actionsRight}>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.editIcon}>✎</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.starIcon}>☆</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.idadeRow}>
            <Text style={styles.idadeLabel}>Idade</Text>
            <View style={styles.idadeInputBox}>
              <TextInput
                style={styles.idadeInput}
                keyboardType="decimal-pad"
                value={idadeInput}
                onChangeText={setIdadeInput}
                textAlign="center"
              />
            </View>
            <View style={styles.unitToggle}>
              <TouchableOpacity
                style={[styles.unitButton, unidade === 'meses' && styles.unitButtonActive]}
                onPress={() => setUnidade('meses')}
              >
                <Text
                  style={[
                    styles.unitButtonText,
                    unidade === 'meses' && styles.unitButtonTextActive,
                  ]}
                >
                  meses
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.unitButton, unidade === 'anos' && styles.unitButtonActive]}
                onPress={() => setUnidade('anos')}
              >
                <Text
                  style={[
                    styles.unitButtonText,
                    unidade === 'anos' && styles.unitButtonTextActive,
                  ]}
                >
                  anos
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.formulationsBlock}>
          <Text style={styles.formulationHeading}>Comprimido com 100 mg:</Text>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.highlight}>
                {comprimidos !== null ? `${comprimidos} comprimidos` : '00 comprimidos'}
              </Text>{' '}
              via oral a cada 6 horas se dor
            </Text>
          </View>

          <View style={styles.subBulletRow}>
            <Text style={styles.subBulletDot}>•</Text>
            <Text style={styles.subBulletText}>
              dose máxima de {MAX_COMPRIMIDOS} comprimidos por dose
            </Text>
          </View>
          <View style={styles.subBulletRow}>
            <Text style={styles.subBulletDot}>•</Text>
            <Text style={styles.subBulletText}>
              apresentação em embalagens com 4, 30, 32 ou 60 comprimidos
            </Text>
          </View>
        </View>

        <View style={styles.observationsBlock}>
          <Text style={styles.observationsTitle}>Observações</Text>

          <ObservationItem>Dose calculada varia conforme idade</ObservationItem>

          <ObservationItem>
            Medicamento contraindicado para menores de 6 meses de idade
          </ObservationItem>

          <ObservationItem>
            Em decorrência do risco da Síndrome de Reye, para crianças &lt; 12
            anos → evitar, exceto indicação específica (Kawasaki,
            antiagregação).
          </ObservationItem>

          <ObservationItem>
            Usar conscientemente pelo risco de intoxicação
          </ObservationItem>

          <ObservationItem>
            Avaliar risco para alergia medicamentosa
          </ObservationItem>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ObservationItem({ children }) {
  return (
    <View style={styles.observationRow}>
      <View style={styles.warningIcon}>
        <Text style={styles.warningIconText}>!</Text>
      </View>
      <Text style={styles.observationText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { flexGrow: 1 },
  grayBlock: {
    backgroundColor: '#F4F6F7',
    borderBottomWidth: 1,
    borderColor: '#E8ECED',
    paddingVertical: 18,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bulaButton: {
    borderWidth: 1.5,
    borderColor: '#F0932B',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  bulaButtonText: { color: '#F0932B', fontWeight: '700', fontSize: 15 },
  actionsRight: { flexDirection: 'row', gap: 8 },
  iconButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  editIcon: { fontSize: 20, color: '#37474F' },
  starIcon: { fontSize: 24, color: '#37474F' },
  idadeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 12,
  },
  idadeLabel: { fontSize: 20, fontWeight: '700', color: '#1A1D29' },
  idadeInputBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  idadeInput: { fontSize: 24, color: '#5F6368', fontWeight: '600', padding: 0 },
  unitToggle: {
    flexDirection: 'row',
    backgroundColor: '#E3E7E9',
    borderRadius: 20,
    padding: 3,
  },
  unitButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 17,
  },
  unitButtonActive: {
    backgroundColor: '#F0932B',
  },
  unitButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5F6368',
  },
  unitButtonTextActive: {
    color: '#FFFFFF',
  },
  formulationsBlock: { paddingHorizontal: 20, paddingTop: 20 },
  formulationHeading: { fontSize: 17, color: '#37474F', marginBottom: 14 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  bulletDot: { fontSize: 16, color: '#37474F', marginRight: 10, lineHeight: 24 },
  bulletText: { flex: 1, fontSize: 17, color: '#37474F', lineHeight: 24 },
  highlight: { backgroundColor: '#FFD966', fontWeight: '700', borderRadius: 4 },
  subBulletRow: { flexDirection: 'row', alignItems: 'flex-start', paddingLeft: 24, marginBottom: 6 },
  subBulletDot: { fontSize: 13, color: '#8FA0A6', marginRight: 10, lineHeight: 21 },
  subBulletText: { flex: 1, fontSize: 15, color: '#5F6368', lineHeight: 21 },
  observationsBlock: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 },
  observationsTitle: { fontSize: 22, fontWeight: '700', color: '#E53935', marginBottom: 18 },
  observationRow: { flexDirection: 'row', marginBottom: 22, alignItems: 'flex-start' },
  warningIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#E53935',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  warningIconText: { color: '#E53935', fontWeight: '700', fontSize: 13 },
  observationText: { flex: 1, fontSize: 16, lineHeight: 23, color: '#37474F' },
});