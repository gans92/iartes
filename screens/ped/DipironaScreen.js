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
 * DipironaScreen
 *
 * Dose pediátrica de Dipirona:
 * - Peso editável
 * - Observações clínicas fixas (contraindicações, dose máxima)
 * - Primeira observação é dinâmica: mostra o mg/kg/dose efetivo resultante
 *   do arredondamento prático em gotas (apresentação 500 mg/mL, 20 gotas/mL)
 *
 * Header (título + seta de voltar) é o padrão do Stack.Navigator — não é
 * desenhado aqui, ver options em App.js (mesmo esquema de cor das outras
 * telas de calculadora).
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

// Limites por dose, por apresentação
const MAX_DROPS = 40;
const MAX_ML_XAROPE = 15;
const MAX_ML_INJETAVEL = 2;

function roundToStep(value, step) {
  return Math.round(value / step) * step;
}

export default function DipironaScreen() {
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

  const doses = useMemo(() => {
    if (!isValidWeight) return null;
    const targetMg = TARGET_MG_PER_KG * weight;

    const drops = Math.min(Math.round(targetMg / MG_PER_DROP), MAX_DROPS);
    const xaropeMl = Math.min(roundToStep(targetMg / 50, 0.5), MAX_ML_XAROPE);
    const injetavelMl = Math.min(roundToStep(targetMg / 500, 0.1), MAX_ML_INJETAVEL);

    return {
      drops,
      xaropeMl: xaropeMl.toFixed(1).replace(/\.0$/, ''),
      injetavelMl: injetavelMl.toFixed(1),
    };
  }, [weight, isValidWeight]);

  return (
    <SafeAreaView style={styles.safeArea}>
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

        {/* Posologia por apresentação */}
        <View style={styles.formulationsBlock}>
          <FormulationSection
            heading="Solução oral (gotas) 500 mg/mL (25 mg/gota):"
            highlighted={doses ? `${doses.drops} gotas` : '00 gotas'}
            instruction="via oral a cada 6 horas se dor ou febre"
            subItems={[
              `dose máxima de ${MAX_DROPS} gotas por dose`,
              'apresentação em bisnagas gotejadoras com 10 ou 20 mL',
            ]}
          />

          <FormulationSection
            heading="Solução oral (xarope) 50 mg/mL:"
            highlighted={doses ? `${doses.xaropeMl} mL` : '00 mL'}
            instruction="via oral a cada 6 horas se dor ou febre"
            subItems={[
              `dose máxima de ${MAX_ML_XAROPE} mL por dose`,
              'apresentação em frasco com 100 mL',
            ]}
          />

          <FormulationSection
            heading="Solução injetável 500 mg/mL:"
            highlighted={doses ? `${doses.injetavelMl} mL` : '00 mL'}
            instruction="intramuscular ou endovenoso a cada 6 horas se dor ou febre"
            subItems={[`dose máxima de ${MAX_ML_INJETAVEL} mL por dose`]}
          />
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
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
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
  bulaButtonText: {
    color: '#F0932B',
    fontWeight: '700',
    fontSize: 15,
  },
  actionsRight: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
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
  formulationsBlock: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formulationSection: {
    marginBottom: 24,
  },
  formulationHeading: {
    fontSize: 17,
    color: '#37474F',
    marginBottom: 14,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletDot: {
    fontSize: 16,
    color: '#37474F',
    marginRight: 10,
    lineHeight: 24,
  },
  bulletText: {
    flex: 1,
    fontSize: 17,
    color: '#37474F',
    lineHeight: 24,
  },
  highlight: {
    backgroundColor: '#FFD966',
    fontWeight: '700',
    borderRadius: 4,
    // padding não funciona em Text aninhado no Android; se precisar do
    // respiro visual, envolva o texto num <View><Text> separado.
  },
  subBulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 24,
    marginBottom: 6,
  },
  subBulletDot: {
    fontSize: 13,
    color: '#8FA0A6',
    marginRight: 10,
    lineHeight: 21,
  },
  subBulletText: {
    flex: 1,
    fontSize: 15,
    color: '#5F6368',
    lineHeight: 21,
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