import React, { useState, useMemo } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
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


  // =====================================================
  // ESTADOS
  // =====================================================

  const [weightInput, setWeightInput] = useState("");

  const [ageInput, setAgeInput] = useState("");

  const [ageUnit, setAgeUnit] = useState("meses");


  // =====================================================
  // MEDICAMENTO NÃO ENCONTRADO
  // =====================================================

  if (!medicamento) {

    return (
      <SafeAreaView style={styles.safeArea}>

        <Text style={styles.notFound}>
          Medicamento não encontrado.
        </Text>

      </SafeAreaView>
    );

  }


  // =====================================================
  // PESO
  // =====================================================

  const weight = weightInput.trim() === ""
    ? 0
    : parseFloat(weightInput.replace(",", "."));

  const isValidWeight =
    !isNaN(weight) && weight >= 0;


  // =====================================================
  // IDADE
  // =====================================================

  const ageValue = parseFloat(
    ageInput.replace(",", ".")
  );

  const isValidAge =
    !isNaN(ageValue) && ageValue >= 0;


  const ageInMonths =
    isValidAge
      ? ageUnit === "anos"
        ? ageValue * 12
        : ageValue
      : null;


  // =====================================================
  // CÁLCULO POR PESO
  // =====================================================

  const apresentacoes = useMemo(() => {

    if (
      medicamento.baseCalculo !== "peso" ||
      !isValidWeight
    ) {
      return null;
    }

    return calcularApresentacoesPeso(
      medicamento,
      weight
    );

  }, [
    medicamento,
    weight,
    isValidWeight,
  ]);


  // =====================================================
  // MG/KG EFETIVO
  // =====================================================

  const mgPorKgEfetivo = useMemo(() => {

    if (
      medicamento.baseCalculo !== "peso" ||
      !isValidWeight
    ) {
      return null;
    }

    return calcularMgPorKgEfetivo(
      medicamento,
      weight
    );

  }, [
    medicamento,
    weight,
    isValidWeight,
  ]);


  // =====================================================
  // CÁLCULO POR IDADE
  // =====================================================

  const resultadoIdade = useMemo(() => {

    if (
      medicamento.baseCalculo !== "idade" ||
      !isValidAge
    ) {
      return null;
    }

    return calcularPorIdade(
      medicamento,
      ageInMonths
    );

  }, [
    medicamento,
    ageInMonths,
    isValidAge,
  ]);


  // =====================================================
  // INTERFACE
  // =====================================================

  return (

    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
      >


        {/* =====================================================
            CABEÇALHO + INPUT
            ===================================================== */}

        <View style={styles.grayBlock}>


          {/* BOTÕES */}

          <View style={styles.actionsRow}>

            <TouchableOpacity
              style={styles.bulaButton}
            >

              <Text style={styles.bulaButtonText}>
                Ver bula
              </Text>

            </TouchableOpacity>


            <View style={styles.actionsRight}>

              <TouchableOpacity
                style={styles.iconButton}
              >

                <Text style={styles.editIcon}>
                  ✎
                </Text>

              </TouchableOpacity>


              <TouchableOpacity
                style={styles.iconButton}
              >

                <Text style={styles.starIcon}>
                  ☆
                </Text>

              </TouchableOpacity>

            </View>

          </View>


          {/* =====================================================
              INPUT DE PESO
              ===================================================== */}

          {medicamento.baseCalculo === "peso" && (

            <InputRow
              label="Peso"
              unit="kg"
              value={weightInput}
              onChangeText={setWeightInput}
            />

          )}


          {/* =====================================================
              INPUT DE IDADE
              ===================================================== */}

          {medicamento.baseCalculo === "idade" && (

            <View style={styles.ageRow}>


              <Text style={styles.ageLabel}>
                Idade
              </Text>


              <View style={styles.ageInputBox}>

                <TextInput
                  style={styles.ageInput}
                  keyboardType="decimal-pad"
                  value={ageInput}
                  onChangeText={setAgeInput}
                  textAlign="center"
                />

              </View>


              {/* TOGGLE */}

              <View style={styles.ageToggle}>


                <TouchableOpacity
                  style={[
                    styles.ageOption,

                    ageUnit === "meses" &&
                    styles.ageOptionActive,
                  ]}

                  onPress={() =>
                    setAgeUnit("meses")
                  }
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

                    ageUnit === "anos" &&
                    styles.ageOptionActive,
                  ]}

                  onPress={() =>
                    setAgeUnit("anos")
                  }
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

          )}

        </View>

        {/* =====================================================
    RESULTADOS POR PESO
    ===================================================== */}

        {medicamento.baseCalculo === "peso" && (
          <View style={styles.formulationsBlock}>

            {medicamento.apresentacoes?.map((ap) => {

              // Procura o resultado calculado correspondente
              const resultado = apresentacoes?.find(
                (r) => r.heading === ap.heading
              );

              return (
                <View
                  key={ap.heading}
                  style={styles.formulationSection}
                >

                  {/* TÍTULO DA APRESENTAÇÃO */}
                  <Text style={styles.formulationHeading}>
                    {ap.heading}
                  </Text>

                  {/* =================================================
              DOSE CALCULADA
              Só aparece quando o peso foi informado
              ================================================= */}

                  {resultado && (
                    <View style={styles.bulletRow}>

                      <Text style={styles.bulletDot}>
                        •
                      </Text>

                      <Text style={styles.bulletText}>

                        <Text style={styles.highlight}>
                          {resultado.doseExibida} {resultado.unidade}
                        </Text>

                        {" "}

                        {resultado.instrucao}

                      </Text>

                    </View>
                  )}

                  {/* =================================================
              DOSE MÁXIMA
              Sempre aparece
              ================================================= */}

                  {ap.doseMaximaPorDose && (
                    <View style={styles.subBulletRow}>

                      <Text style={styles.subBulletDot}>
                        •
                      </Text>

                      <Text style={styles.subBulletText}>
                        dose máxima de {ap.doseMaximaPorDose} {ap.unidade} por dose
                      </Text>

                    </View>
                  )}

                  {/* =================================================
              OBSERVAÇÕES EXTRAS
              Sempre aparecem
              ================================================= */}

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


        {/* =====================================================
            RESULTADO POR IDADE
            ===================================================== */}

        {medicamento.baseCalculo === "idade" && (

          <View style={styles.formulationsBlock}>


            {!isValidAge && (

              <Text style={styles.instructionPlaceholder}>
                Informe a idade para calcular a dose.
              </Text>

            )}


            {resultadoIdade?.contraindicado && (

              <View style={styles.contraindicadoBox}>

                <Text style={styles.contraindicadoText}>

                  🚫 Contraindicado:{" "}

                  {resultadoIdade.motivo}

                </Text>

              </View>

            )}


            {resultadoIdade &&
              !resultadoIdade.contraindicado && (

                <>

                  {resultadoIdade.semDoseConfigurada ? (

                    <Text
                      style={styles.instructionPlaceholder}
                    >
                      Dose por idade ainda não configurada.
                    </Text>

                  ) : (

                    <FormulationSection

                      heading={
                        resultadoIdade.heading ||
                        `Dose por idade (${medicamento.nome}):`
                      }

                      highlighted={

                        resultadoIdade.doseExibida ??
                        `${Math.round(
                          resultadoIdade.doseMg
                        )} ${resultadoIdade.unidade}`

                      }

                      instruction={
                        resultadoIdade.instrucao ||
                        `a cada ${resultadoIdade.intervaloHoras} horas`
                      }

                      subItems={[
                        r.doseMaximaPorDose
                          ? `dose máxima de ${r.doseMaximaPorDose} ${r.unidade} por dose`
                          : null,
                        r.obsExtra,
                      ].filter(Boolean)}

                    />

                  )}

                </>

              )}

          </View>

        )}


        {/* =====================================================
            OBSERVAÇÕES
            ===================================================== */}

        {(
          medicamento.observacoesFixas?.length > 0 ||
          medicamento.baseCalculo === "peso"
        ) && (

            <View style={styles.observationsBlock}>


              <Text style={styles.observationsTitle}>
                Observações
              </Text>


              {/* INFORMAÇÃO DA DOSE POR PESO */}

              {medicamento.baseCalculo === "peso" && (

                <ObservationItem>

                  {isValidWeight &&
                    mgPorKgEfetivo !== null ? (

                    <>

                      Dose calculada equivalente a{" "}

                      {mgPorKgEfetivo} mg/kg/dose{" "}

                      {medicamento.faixaRecomendada && (

                        <>
                          (recomendado entre{" "}
                          {medicamento.faixaRecomendada.min}
                          -
                          {medicamento.faixaRecomendada.max}
                          {" "}mg/kg/dose)
                        </>

                      )}

                    </>

                  ) : (

                    <>

                      Informe o peso para calcular a dose

                      {medicamento.faixaRecomendada && (

                        <>
                          {" "}
                          (recomendado entre{" "}
                          {medicamento.faixaRecomendada.min}
                          -
                          {medicamento.faixaRecomendada.max}
                          {" "}mg/kg/dose)
                        </>

                      )}

                    </>

                  )}

                </ObservationItem>

              )}


              {/* OBSERVAÇÕES FIXAS */}

              {medicamento.observacoesFixas?.map(
                (obs, index) => (

                  <ObservationItem
                    key={index}
                  >
                    {obs}
                  </ObservationItem>

                )
              )}


            </View>

          )}


      </ScrollView>

    </SafeAreaView>

  );

}


// =============================================================
// INPUT GENÉRICO
// =============================================================

function InputRow({
  label,
  unit,
  value,
  onChangeText,
}) {

  return (

    <View style={styles.weightRow}>


      <Text style={styles.weightLabel}>
        {label}
      </Text>


      <View style={styles.weightInputBox}>

        <TextInput
          style={styles.weightInput}
          keyboardType="decimal-pad"
          value={value}
          onChangeText={onChangeText}
          textAlign="center"
        />

      </View>


      <Text style={styles.weightUnit}>
        {unit}
      </Text>


    </View>

  );

}


// =============================================================
// SEÇÃO DE APRESENTAÇÃO
// =============================================================

function FormulationSection({
  heading,
  highlighted,
  instruction,
  subItems = [],
}) {

  return (

    <View style={styles.formulationSection}>


      <Text style={styles.formulationHeading}>
        {heading}
      </Text>


      <View style={styles.bulletRow}>

        <Text style={styles.bulletDot}>
          •
        </Text>


        <Text style={styles.bulletText}>

          <Text style={styles.highlight}>
            {highlighted}
          </Text>

          {" "}

          {instruction}

        </Text>

      </View>


      {subItems.map(
        (text, index) => (

          <View
            key={`${text}-${index}`}
            style={styles.subBulletRow}
          >

            <Text style={styles.subBulletDot}>
              •
            </Text>


            <Text style={styles.subBulletText}>
              {text}
            </Text>

          </View>

        )
      )}


    </View>

  );

}


// =============================================================
// OBSERVAÇÃO
// =============================================================

function ObservationItem({ children }) {

  return (

    <View style={styles.observationRow}>


      <View style={styles.warningIcon}>

        <Text style={styles.warningIconText}>
          !
        </Text>

      </View>


      <Text style={styles.observationText}>
        {children}
      </Text>


    </View>

  );

}


// =============================================================
// ESTILOS
// =============================================================

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


  // =====================================================
  // PLACEHOLDER
  // =====================================================

  instructionPlaceholder: {
    fontSize: 16,
    color: "#8FA0A6",
    paddingHorizontal: 0,
    paddingBottom: 10,
  },


  // =====================================================
  // CABEÇALHO
  // =====================================================

  grayBlock: {
    backgroundColor: "#F4F6F7",
    borderBottomWidth: 1,
    borderColor: "#E8ECED",
    paddingVertical: 18,
  },


  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },


  bulaButton: {
    borderWidth: 1.5,
    borderColor: "#F0932B",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },


  bulaButtonText: {
    color: "#F0932B",
    fontWeight: "700",
    fontSize: 15,
  },


  actionsRight: {
    flexDirection: "row",
    gap: 8,
  },


  iconButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },


  editIcon: {
    fontSize: 20,
    color: "#37474F",
  },


  starIcon: {
    fontSize: 24,
    color: "#37474F",
  },


  // =====================================================
  // PESO
  // =====================================================

  weightRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "100%",
  },


  weightLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1D29",
    width: 65,
    textAlign: "right",
    marginRight: 12,
  },


  weightInputBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: 180,
    height: 56,
    justifyContent: "center",

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
    fontSize: 24,
    color: "#5F6368",
    fontWeight: "600",
    padding: 0,
    width: "100%",
    height: "100%",
    textAlign: "center",
    outlineStyle: "none",
  },


  weightUnit: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1D29",
    width: 45,
    marginLeft: 12,
  },


  // =====================================================
  // IDADE
  // =====================================================

  ageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "100%",
  },


  ageLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1D29",
    marginRight: 18,
  },


  ageInputBox: {
    width: 90,
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE2E3",
    justifyContent: "center",
    marginRight: 22,
  },


  ageInput: {
    width: "100%",
    height: "100%",
    fontSize: 22,
    color: "#37474F",
    padding: 0,
    outlineStyle: "none",
  },


  ageToggle: {
    flexDirection: "row",
    backgroundColor: "#ECEEEF",
    borderRadius: 32,
    overflow: "hidden",
    height: 56,
  },


  ageOption: {
    minWidth: 92,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
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


  // =====================================================
  // APRESENTAÇÕES
  // =====================================================

  formulationsBlock: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },


  formulationSection: {
    marginBottom: 24,
  },


  formulationHeading: {
    fontSize: 17,
    color: "#37474F",
    marginBottom: 14,
  },


  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },


  bulletDot: {
    fontSize: 16,
    color: "#37474F",
    marginRight: 10,
    lineHeight: 24,
  },


  bulletText: {
    flex: 1,
    fontSize: 17,
    color: "#37474F",
    lineHeight: 24,
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
    fontSize: 13,
    color: "#8FA0A6",
    marginRight: 10,
    lineHeight: 21,
  },


  subBulletText: {
    flex: 1,
    fontSize: 15,
    color: "#5F6368",
    lineHeight: 21,
  },


  // =====================================================
  // CONTRAINDICAÇÃO
  // =====================================================

  contraindicadoBox: {
    backgroundColor: "#FDEAEA",
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
  },


  contraindicadoText: {
    color: "#E53935",
    fontWeight: "700",
    fontSize: 16,
  },


  // =====================================================
  // OBSERVAÇÕES
  // =====================================================

  observationsBlock: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },


  observationsTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#E53935",
    marginBottom: 18,
  },


  observationRow: {
    flexDirection: "row",
    marginBottom: 22,
    alignItems: "flex-start",
  },


  warningIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    marginTop: 2,
  },


  warningIconText: {
    color: "#E53935",
    fontWeight: "700",
    fontSize: 13,
  },


  observationText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 23,
    color: "#37474F",
  },

});