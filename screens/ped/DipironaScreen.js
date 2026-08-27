import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

/**
 * DipironaDoseScreen
 *
 * Réplica da tela de dose pediátrica de Dipirona:
 * - Peso editável
 * - Observações clínicas fixas (contraindicações, dose máxima)
 * - Primeira observação é dinâmica: mostra o mg/kg/dose efetivo resultante
 *   do arredondamento prático em gotas (apresentação 500 mg/mL, 20 gotas/mL)
 *
 * Alvo de dose: 12 mg/kg/dose (dentro da faixa 10–16 mg/kg/dose da SBP),
 * arredondado para o número inteiro de gotas mais próximo — por isso o
 * mg/kg exibido pode variar levemente do alvo conforme o peso.
 */

const TARGET_MG_PER_KG = 12;
const MG_PER_ML = 500; // apresentação em gotas
const DROPS_PER_ML = 20;
const MG_PER_DROP = MG_PER_ML / DROPS_PER_ML; // 25 mg/gota

const SBP_MIN = 10;
const SBP_MAX = 16;
const MAX_DAILY_G = 4;

export default function DipironaDoseScreen({ navigation }) {
  const [weightInput, setWeightInput] = useState('23');

  const weight = parseFloat(weightInput.replace(',', '.'));
  const isValidWeight = !isNaN(weight) && weight > 0;

  const effectiveMgPerKg = useMemo(() => {
    if (!isValidWeight) return null;
    const targetMg = TARGET_MG_PER_KG * weight;
    const drops = Math.round(targetMg / MG_PER_DROP);
    const actualMg = drops * MG_PER_DROP;
    return Math.round(actualMg / weight);
  }, [weight, isValidWeight]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Text style={styles.backIcon}>{'‹'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dipirona</Text>
        <TouchableOpacity style={styles.chatBubble}>
          <View style={styles.chatDots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Faixa de ações + peso */}
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

          <View style={styles.weightRow}>
            <Text style={styles.weightLabel}>Peso</Text>
            <View style={styles.weightInputBox}>
              <TextInput
                style={styles.weightInput}
                keyboardType="decimal-pad"
                value={weightInput}
                onChangeText={setWeightInput}
                textAlign="center"
              />
            </View>
            <Text style={styles.weightUnit}>kg</Text>
          </View>
        </View>

        {/* Observações */}
        <View style={styles.observationsBlock}>
          <Text style={styles.observationsTitle}>Observações</Text>

          <ObservationItem>
            {isValidWeight ? (
              <>
                Dose calculada equivalente a {effectiveMgPerKg} mg/kg/dose
                (Sociedade Brasileira de Pediatria recomenda entre {SBP_MIN}-
                {SBP_MAX} mg/kg/dose)
              </>
            ) : (
              <>
                Informe o peso para calcular a dose (Sociedade Brasileira de
                Pediatria recomenda entre {SBP_MIN}-{SBP_MAX} mg/kg/dose)
              </>
            )}
          </ObservationItem>

          <ObservationItem>
            Contraindicado o uso para menores de 3 meses
          </ObservationItem>

          <ObservationItem>
            Contraindicado o uso intramuscular para menores de 3 meses ou
            pesando menos que 5 kg
          </ObservationItem>

          <ObservationItem>
            Contraindicado para uso endovenoso em menores que 11 meses ou com
            peso menor que 9 kg
          </ObservationItem>

          <ObservationItem>
            Dose máxima diária de {MAX_DAILY_G} g
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
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 30,
    color: '#37474F',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#37474F',
  },
  chatBubble: {
    width: 40,
    height: 34,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#F0932B',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5EA',
  },
  chatDots: {
    flexDirection: 'row',
    gap: 3,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F0932B',
  },
  scrollContent: {
    flexGrow: 1,
  },
  grayBlock: {
    backgroundColor: '#F4F6F7',
    borderTopWidth: 1,
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
  bulaButtonText: {
    color: '#F0932B',
    fontWeight: '700',
    fontSize: 15,
  },
  actionsRight: {
    flexDirection: 'row',
    gap: 8,
  },
  editIcon: {
    fontSize: 20,
    color: '#37474F',
  },
  starIcon: {
    fontSize: 24,
    color: '#37474F',
  },
  weightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  weightLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1D29',
  },
  weightInputBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    minWidth: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  weightInput: {
    fontSize: 24,
    color: '#5F6368',
    fontWeight: '600',
    padding: 0,
  },
  weightUnit: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1D29',
  },
  observationsBlock: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  observationsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E53935',
    marginBottom: 18,
  },
  observationRow: {
    flexDirection: 'row',
    marginBottom: 22,
    alignItems: 'flex-start',
  },
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
  warningIconText: {
    color: '#E53935',
    fontWeight: '700',
    fontSize: 13,
  },
  observationText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 23,
    color: '#37474F',
  },
});