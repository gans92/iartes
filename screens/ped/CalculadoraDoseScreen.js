import React, { useMemo, useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { medicamentos } from "./MedicamentosData";

import {
  calcularApresentacoesPeso,
  calcularMgPorKgEfetivo,
  calcularPorIdade,
} from "./calculoDose";

export default function CalculadoraDoseScreen({ route }) {
  const { medicamentoId } = route.params;

  const medicamento = medicamentos[medicamentoId];

  const [weightInput, setWeightInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [ageUnit, setAgeUnit] = useState("meses");

  const handleAgeChange = (text) => {
    if (text === "") {
      setAgeInput("");
      return;
    }

    const normalized = text.replace(",", ".");

    if (!/^\d*\.?\d*$/.test(normalized)) {
      return;
    }

    const value = parseFloat(normalized);

    if (isNaN(value)) {
      setAgeInput(text);
      return;
    }

    const limite = ageUnit === "anos" ? 18 : 216;

    if (value > limite) {
      const mensagem =
        ageUnit === "anos"
          ? "Esta calculadora é destinada a pacientes pediátricos e aceita idade de até 18 anos."
          : "Esta calculadora é destinada a pacientes pediátricos e aceita idade de até 216 meses (18 anos).";

      if (Platform.OS === "web") {
        window.alert(`Idade inválida\n\n${mensagem}`);
        setAgeInput(String(limite));
      } else {
        Alert.alert("Idade inválida", mensagem, [
          {
            text: "OK",
            onPress: () => setAgeInput(String(limite)),
          },
        ]);
      }

      return;
    }

    setAgeInput(text);
  };

  const handleWeightChange = (text) => {
    if (text === "") {
      setWeightInput("");
      return;
    }

    const normalized = text.replace(",", ".");

    if (!/^\d*\.?\d*$/.test(normalized)) {
      return;
    }

    const value = parseFloat(normalized);

    if (isNaN(value)) {
      setWeightInput(text);
      return;
    }

    const limite = 150;

    if (value > limite) {
      const mensagem =
        "Esta calculadora é destinada a pacientes pediátricos e aceita peso de até 150 kg.";

      if (Platform.OS === "web") {
        window.alert(`Peso inválido\n\n${mensagem}`);
        setWeightInput("150");
      } else {
        Alert.alert("Peso inválido", mensagem, [
          {
            text: "OK",
            onPress: () => setWeightInput("150"),
          },
        ]);
      }

      return;
    }

    setWeightInput(text);
  };

  if (!medicamento) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.notFound}>
          Medicamento não encontrado.
        </Text>
      </SafeAreaView>
    );
  }

  const weight =
    weightInput.trim() === ""
      ? 0
      : parseFloat(weightInput.replace(",", "."));

  const isValidWeight = !isNaN(weight) && weight >= 0;

  const ageValue =
    ageInput.trim() === ""
      ? 0
      : parseFloat(ageInput.replace(",", "."));

  const isValidAge = !isNaN(ageValue) && ageValue >= 0;

  const ageInMonths = isValidAge
    ? ageUnit === "anos"
      ? ageValue * 12
      : ageValue
    : null;

  const idadeAcimaDoLimite =
    isValidAge &&
    ((ageUnit === "anos" && ageValue > 18) ||
      (ageUnit === "meses" && ageValue > 216));

  const apresentacoes = useMemo(() => {
    if (medicamento.baseCalculo !== "peso") {
      return null;
    }

    if (!isValidWeight) {
      return null;
    }

    return calcularApresentacoesPeso(medicamento, weight);
  }, [medicamento, weight, isValidWeight]);

  useMemo(() => {
    if (medicamento.baseCalculo !== "peso") {
      return null;
    }

    if (!isValidWeight) {
      return null;
    }

    return calcularMgPorKgEfetivo(medicamento, weight);
  }, [medicamento, weight, isValidWeight]);

  const resultadoIdade = useMemo(() => {
    if (medicamento.baseCalculo !== "idade" || !isValidAge) {
      return null;
    }

    return calcularPorIdade(medicamento, ageInMonths);
  }, [medicamento, ageInMonths, isValidAge]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {medicamento.baseCalculo === "peso" && (
          <InputRow
            label="Peso"
            unit="kg"
            value={weightInput}
            onChangeText={handleWeightChange}
          />
        )}

        {medicamento.baseCalculo === "idade" && (
          <>
            <View style={styles.ageRow}>
              <Text style={styles.ageLabel}>Idade</Text>

              <View style={styles.ageInputBox}>
                <TextInput
                  style={styles.ageInput}
                  keyboardType="decimal-pad"
                  value={ageInput}
                  onChangeText={handleAgeChange}
                  textAlign="center"
                />
              </View>

              <View style={styles.ageToggle}>
                <TouchableOpacity
                  style={[
                    styles.ageOption,
                    ageUnit === "meses" && styles.ageOptionActive,
                  ]}
                  onPress={() => setAgeUnit("meses")}
                >
                  <Text
                    style={[
                      styles.ageOptionText,
                      ageUnit === "meses" &&
                        styles.ageOptionTextActive,
                    ]}
                  >
                    meses
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.ageOption,
                    ageUnit === "anos" && styles.ageOptionActive,
                  ]}
                  onPress={() => setAgeUnit("anos")}
                >
                  <Text
                    style={[
                      styles.ageOptionText,
                      ageUnit === "anos" &&
                        styles.ageOptionTextActive,
                    ]}
                  >
                    anos
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {idadeAcimaDoLimite && (
              <View style={styles.ageErrorBox}>
                <Text style={styles.ageErrorText}>
                  ⚠️ Informe uma idade de até 18 anos.
                </Text>
              </View>
            )}
          </>
        )}

        {medicamento.baseCalculo === "peso" && (
          <View style={styles.formulationsBlock}>
            {medicamento.apresentacoes?.map((ap) => {
              const resultado = apresentacoes?.find(
                (item) => item.heading === ap.heading
              );

              return (
                <View
                  key={ap.heading}
                  style={styles.formulationSection}
                >
                  <Text style={styles.formulationHeading}>
                    {ap.heading}
                  </Text>

                  {resultado && (
                    <View style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>

                      <Text style={styles.bulletText}>
                        <Text style={styles.highlight}>
                          {resultado.doseExibida}{" "}
                          {resultado.unidade}
                        </Text>{" "}
                        {resultado.instrucao}
                      </Text>
                    </View>
                  )}

                  {ap.doseMaximaPorDose !== undefined && (
                    <View style={styles.subBulletRow}>
                      <Text style={styles.subBulletDot}>•</Text>

                      <Text style={styles.subBulletText}>
                        dose máxima de {ap.doseMaximaPorDose}{" "}
                        {ap.unidade} por dose
                      </Text>
                    </View>
                  )}

                  {Array.isArray(ap.obsExtra)
                    ? ap.obsExtra.map((obs, index) => (
                        <View
                          key={`${ap.heading}-obs-${index}`}
                          style={styles.subBulletRow}
                        >
                          <Text style={styles.subBulletDot}>
                            •
                          </Text>

                          <Text style={styles.subBulletText}>
                            {obs}
                          </Text>
                        </View>
                      ))
                    : ap.obsExtra && (
                        <View style={styles.subBulletRow}>
                          <Text style={styles.subBulletDot}>
                            •
                          </Text>

                          <Text style={styles.subBulletText}>
                            {ap.obsExtra}
                          </Text>
                        </View>
                      )}
                </View>
              );
            })}
          </View>
        )}

        {medicamento.baseCalculo === "idade" &&
          !idadeAcimaDoLimite &&
          resultadoIdade && (
            <View style={styles.formulationsBlock}>
              {medicamento.apresentacoes?.map((ap) => (
                <View
                  key={ap.heading}
                  style={styles.formulationSection}
                >
                  <Text style={styles.formulationHeading}>
                    {ap.heading}
                  </Text>

                  <View style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>

                    <Text style={styles.bulletText}>
                      <Text style={styles.highlight}>
                        {ageInput.trim() === ""
                          ? `0 ${ap.unidade}`
                          : resultadoIdade.doseExibida ??
                            `0 ${ap.unidade}`}
                      </Text>{" "}
                      {ap.instrucao ||
                        "via oral uma vez ao dia"}
                    </Text>
                  </View>

                  {ap.doseMaximaPorDose !== undefined && (
                    <View style={styles.subBulletRow}>
                      <Text style={styles.subBulletDot}>
                        •
                      </Text>

                      <Text style={styles.subBulletText}>
                        dose máxima de{" "}
                        {ap.doseMaximaPorDose}{" "}
                        {ap.unidade} por dose
                      </Text>
                    </View>
                  )}

                  {Array.isArray(ap.obsExtra)
                    ? ap.obsExtra.map((obs, index) => (
                        <View
                          key={`${ap.heading}-obs-${index}`}
                          style={styles.subBulletRow}
                        >
                          <Text style={styles.subBulletDot}>
                            •
                          </Text>

                          <Text style={styles.subBulletText}>
                            {obs}
                          </Text>
                        </View>
                      ))
                    : ap.obsExtra && (
                        <View style={styles.subBulletRow}>
                          <Text style={styles.subBulletDot}>
                            •
                          </Text>

                          <Text style={styles.subBulletText}>
                            {ap.obsExtra}
                          </Text>
                        </View>
                      )}
                </View>
              ))}
            </View>
          )}

        {medicamento.observacoesFixas?.length > 0 && (
          <View style={styles.observationsBlock}>
            <Text style={styles.observationsTitle}>
              Observações
            </Text>

            {medicamento.observacoesFixas.map((obs, index) => (
              <ObservationItem key={index}>
                {obs}
              </ObservationItem>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function InputRow({ label, unit, value, onChangeText }) {
  return (
    <View style={styles.weightRow}>
      <Text style={styles.weightLabel}>{label}</Text>

      <View style={styles.weightInputBox}>
        <TextInput
          style={styles.weightInput}
          keyboardType="decimal-pad"
          value={value}
          onChangeText={onChangeText}
          textAlign="center"
        />
      </View>

      <Text style={styles.weightUnit}>{unit}</Text>
    </View>
  );
}

function ObservationItem({ children }) {
  return (
    <View style={styles.observationRow}>
      <View style={styles.warningIcon}>
        <Text style={styles.warningIconText}>!</Text>
      </View>

      <Text style={styles.observationText}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    flexGrow: 1,
  },

  notFound: {
    padding: 20,
    fontSize: 16,
    color: "#37474F",
  },

  weightRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },

  weightLabel: {
    width: 65,
    marginRight: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1D29",
    textAlign: "right",
  },

  weightInputBox: {
    width: 180,
    height: 56,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },

  weightInput: {
    width: "100%",
    height: "100%",
    padding: 0,
    fontSize: 24,
    fontWeight: "600",
    color: "#5F6368",
    textAlign: "center",
    outlineStyle: "none",
  },

  weightUnit: {
    width: 45,
    marginLeft: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1D29",
  },

  ageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },

  ageLabel: {
    marginRight: 18,
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1D29",
  },

  ageInputBox: {
    width: 90,
    height: 56,
    justifyContent: "center",
    marginRight: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE2E3",
    borderRadius: 14,
  },

  ageInput: {
    width: "100%",
    height: "100%",
    padding: 0,
    fontSize: 22,
    color: "#37474F",
    outlineStyle: "none",
  },

  ageToggle: {
    flexDirection: "row",
    height: 56,
    overflow: "hidden",
    backgroundColor: "#ECEEEF",
    borderRadius: 32,
  },

  ageOption: {
    minWidth: 92,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  ageOptionActive: {
    backgroundColor: "#F18700",
    borderRadius: 32,
  },

  ageOptionText: {
    fontSize: 20,
    color: "#37474F",
  },

  ageOptionTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  ageErrorBox: {
    marginHorizontal: 20,
    marginTop: 10,
  },

  ageErrorText: {
    fontSize: 14,
    color: "#E53935",
  },

  formulationsBlock: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  formulationSection: {
    marginBottom: 24,
  },

  formulationHeading: {
    marginBottom: 14,
    fontSize: 17,
    color: "#37474F",
  },

  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  bulletDot: {
    marginRight: 10,
    fontSize: 16,
    lineHeight: 24,
    color: "#37474F",
  },

  bulletText: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    color: "#37474F",
  },

  highlight: {
    backgroundColor: "#FFD966",
    fontWeight: "700",
    borderRadius: 4,
  },

  subBulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 24,
    marginBottom: 6,
  },

  subBulletDot: {
    marginRight: 10,
    fontSize: 13,
    lineHeight: 21,
    color: "#8FA0A6",
  },

  subBulletText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
    color: "#5F6368",
  },

  observationsBlock: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  observationsTitle: {
    marginBottom: 18,
    fontSize: 22,
    fontWeight: "700",
    color: "#E53935",
  },

  observationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 22,
  },

  warningIcon: {
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    marginRight: 14,
    borderWidth: 2,
    borderColor: "#E53935",
    borderRadius: 11,
  },

  warningIconText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#E53935",
  },

  observationText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 23,
    color: "#37474F",
  },
});