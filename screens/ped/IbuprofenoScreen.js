import React, { useState, useMemo } from 'react';
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
 * IbuprofenoScreen
 *
 * ATENÇÃO: o print enviado terminava antes da seção de Observações, então
 * não vimos o alvo real de mg/kg usado no seu app. Usei 7 mg/kg/dose
 * (dentro da faixa clássica de 5–10 mg/kg/dose) como suposição — ajuste
 * TARGET_MG_PER_KG e o texto da observação se o seu protocolo for diferente.
 *
 * mg/gota das apresentações em gotas também é suposição (assumindo o
 * gotejador padrão de 20 gotas/mL).
 */

const TARGET_MG_PER_KG = 7;
const RANGE_TEXT = '5-10 mg/kg/dose';

const DROPS_PER_ML = 20; // suposição — não informado no print

const GOTAS50_MG_ML = 50;
const MG_PER_DROP_50 = GOTAS50_MG_ML / DROPS_PER_ML;
const MAX_DROPS_50 = 40;

const GOTAS100_MG_ML = 100;
const MG_PER_DROP_100 = GOTAS100_MG_ML / DROPS_PER_ML;
const MAX_DROPS_100 = 20;

const XAROPE_MG_ML = 30;
const MAX_ML_XAROPE = 7;

function roundToStep(value, step) {
  return Math.round(value / step) * step;
}

export default function IbuprofenoScreen() {
  const [weightInput, setWeightInput] = useState('');

  const weight = parseFloat(weightInput.replace(',', '.'));
  const isValidWeight = !isNaN(weight) && weight > 0;

  const doses = useMemo(() => {
    if (!isValidWeight) return null;
    const targetMg = TARGET_MG_PER_KG * weight;

    const drops50 = Math.min(Math.round(targetMg / MG_PER_DROP_50), MAX_DROPS_50);
    const drops100 = Math.min(Math.round(targetMg / MG_PER_DROP_100), MAX_DROPS_100);
    const xaropeMl = Math.min(roundToStep(targetMg / XAROPE_MG_ML, 0.5), MAX_ML_XAROPE);

    return {
      drops50,
      drops100,
      xaropeMl: xaropeMl.toFixed(1).replace(/\.0$/, ''),
    };
  }, [weight, isValidWeight]);

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

        <View style={styles.formulationsBlock}>
          <FormulationSection
            heading={`Solução oral (gotas) ${GOTAS50_MG_ML} mg/mL:`}
            highlighted={doses ? `${doses.drops50} gotas` : '00 gotas'}
            instruction="via oral a cada 6 horas se dor ou febre"
            subItems={[
              `dose máxima de ${MAX_DROPS_50} gotas por dose`,
              'apresentação em frasco com 30 mL',
            ]}
          />

          <FormulationSection
            heading={`Solução oral (gotas) ${GOTAS100_MG_ML} mg/mL:`}
            highlighted={doses ? `${doses.drops100} gotas` : '00 gotas'}
            instruction="via oral a cada 6 horas se dor ou febre"
            subItems={[
              `dose máxima de ${MAX_DROPS_100} gotas por dose`,
              'apresentação em frasco com 20 mL',
            ]}
          />

          <FormulationSection
            heading={`Solução oral (xarope) ${XAROPE_MG_ML} mg/mL:`}
            highlighted={doses ? `${doses.xaropeMl} mL` : '00 mL'}
            instruction="via oral a cada 6 horas se dor ou febre"
            subItems={[`dose máxima de ${MAX_ML_XAROPE} mL por dose`]}
          />
        </View>

        <View style={styles.observationsBlock}>
          <Text style={styles.observationsTitle}>Observações</Text>

          <ObservationItem>
            Dose calculada equivalente a {TARGET_MG_PER_KG} mg/kg/dose
            (recomenda-se entre {RANGE_TEXT})
          </ObservationItem>

          {/* Não visível no print — confira com sua fonte */}
          <ObservationItem>
            Dose máxima diária de 40 mg/kg/dia
          </ObservationItem>

          <ObservationItem>
            Contraindicado para menores de 6 meses
          </ObservationItem>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FormulationSection({ heading, highlighted, instruction, subItems }) {
  return (
    <View style={styles.formulationSection}>
      <Text style={styles.formulationHeading}>{heading}</Text>

      <View style={styles.bulletRow}>
        <Text style={styles.bulletDot}>•</Text>
        <Text style={styles.bulletText}>
          <Text style={styles.highlight}>{highlighted}</Text> {instruction}
        </Text>
      </View>

      {subItems.map((text) => (
        <View key={text} style={styles.subBulletRow}>
          <Text style={styles.subBulletDot}>•</Text>
          <Text style={styles.subBulletText}>{text}</Text>
        </View>
      ))}
    </View>
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
  weightRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14 },
  weightLabel: { fontSize: 20, fontWeight: '700', color: '#1A1D29' },
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
  weightInput: { fontSize: 24, color: '#5F6368', fontWeight: '600', padding: 0 },
  weightUnit: { fontSize: 20, fontWeight: '700', color: '#1A1D29' },
  formulationsBlock: { paddingHorizontal: 20, paddingTop: 20 },
  formulationSection: { marginBottom: 24 },
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