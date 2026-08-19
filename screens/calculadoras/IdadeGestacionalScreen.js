import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const CORES = {
  roxo: '#6a1fb0',
  azul: '#1a6fb0',
  vermelho: '#c0483f',
  ambar: '#8a5a1f',
  verde: '#1f7a5c',
};

// Limite biológico: nenhuma gestação passa disso (42 semanas + margem de segurança)
const LIMITE_DIAS_GESTACAO = 315; // 45 semanas

// Formata a digitação em tempo real: só números, insere barras sozinho
// Ex: usuário digita "01082026" -> tela mostra "01/08/2026"
function formatarEntradaData(texto) {
  const somenteNumeros = texto.replace(/[^\d]/g, '').slice(0, 8);
  if (somenteNumeros.length > 4) {
    return `${somenteNumeros.slice(0, 2)}/${somenteNumeros.slice(
      2,
      4
    )}/${somenteNumeros.slice(4)}`;
  }
  if (somenteNumeros.length > 2) {
    return `${somenteNumeros.slice(0, 2)}/${somenteNumeros.slice(2)}`;
  }
  return somenteNumeros;
}

// Converte string "DD/MM/AAAA" em objeto Date
function parseDataBR(texto) {
  const partes = texto.split('/');
  if (partes.length !== 3) return null;
  const [dia, mes, ano] = partes.map((p) => parseInt(p, 10));
  if (!dia || !mes || !ano || ano < 1900) return null;
  const data = new Date(ano, mes - 1, dia);
  // valida se a data existe de verdade (ex: 31/02 não existe)
  if (data.getDate() !== dia || data.getMonth() !== mes - 1) return null;
  return data;
}

function formatarDataBR(data) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function somarDias(data, dias) {
  const nova = new Date(data);
  nova.setDate(nova.getDate() + dias);
  return nova;
}

function diferencaEmDias(dataInicio, dataFim) {
  const msPorDia = 1000 * 60 * 60 * 24;
  return Math.floor((dataFim.getTime() - dataInicio.getTime()) / msPorDia);
}

function idadeGestacionalTexto(totalDias) {
  if (totalDias < 0) return null;
  const semanas = Math.floor(totalDias / 7);
  const dias = totalDias % 7;
  return `${semanas} semanas e ${dias} dia${dias === 1 ? '' : 's'}`;
}

function classificarTrimestre(semanas) {
  if (semanas < 0) return null;
  if (semanas < 14) return { texto: '1º trimestre', cor: CORES.verde };
  if (semanas < 28) return { texto: '2º trimestre', cor: CORES.azul };
  return { texto: '3º trimestre', cor: CORES.ambar };
}

export default function IdadeGestacionalScreen() {
  const [metodo, setMetodo] = useState('dum'); // 'dum' ou 'usg'

  // Método DUM
  const [dumTexto, setDumTexto] = useState('');

  // Método USG
  const [dataUsgTexto, setDataUsgTexto] = useState('');
  const [igUsgSemanas, setIgUsgSemanas] = useState('');
  const [igUsgDias, setIgUsgDias] = useState('');

  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  function calcularPorDUM() {
    const dum = parseDataBR(dumTexto);
    if (!dum) {
      setErro('Data da DUM incompleta ou inválida.');
      setResultado(null);
      return;
    }
    const hoje = new Date();
    if (dum > hoje) {
      setErro('A DUM não pode ser uma data futura.');
      setResultado(null);
      return;
    }

    const diasDesdeDUM = diferencaEmDias(dum, hoje);
    if (diasDesdeDUM > LIMITE_DIAS_GESTACAO) {
      setErro(
        'Essa DUM resultaria em uma idade gestacional acima do limite de uma gestação (42 semanas). Verifique se a data está correta.'
      );
      setResultado(null);
      return;
    }

    const dpp = somarDias(dum, 280); // Regra de Naegele (280 dias = 40 semanas)
    const semanasAtuais = Math.floor(diasDesdeDUM / 7);

    setErro('');
    setResultado({
      idadeGestacional: idadeGestacionalTexto(diasDesdeDUM),
      dpp: formatarDataBR(dpp),
      trimestre: classificarTrimestre(semanasAtuais),
      diasRestantes: diferencaEmDias(hoje, dpp),
    });
  }

  function calcularPorUSG() {
    const dataUsg = parseDataBR(dataUsgTexto);
    const semanasUsg = parseInt(igUsgSemanas, 10);
    const diasUsg = parseInt(igUsgDias, 10) || 0;

    if (!dataUsg) {
      setErro('Data da USG incompleta ou inválida.');
      setResultado(null);
      return;
    }
    if (isNaN(semanasUsg) || semanasUsg < 0 || semanasUsg > 42) {
      setErro('Informe a idade gestacional da USG em semanas (0 a 42).');
      setResultado(null);
      return;
    }
    if (diasUsg < 0 || diasUsg > 6) {
      setErro('Os dias da IG na USG devem estar entre 0 e 6.');
      setResultado(null);
      return;
    }

    const igUsgTotalDias = semanasUsg * 7 + diasUsg;
    // DUM corrigida = data da USG - IG na USG
    const dumCorrigida = somarDias(dataUsg, -igUsgTotalDias);

    const hoje = new Date();
    if (dataUsg > hoje) {
      setErro('A data da USG não pode ser uma data futura.');
      setResultado(null);
      return;
    }

    const diasDesdeDUM = diferencaEmDias(dumCorrigida, hoje);
    if (diasDesdeDUM > LIMITE_DIAS_GESTACAO) {
      setErro(
        'Esses dados resultariam em uma idade gestacional acima do limite de uma gestação (42 semanas). Verifique a data e a IG informadas.'
      );
      setResultado(null);
      return;
    }

    const dpp = somarDias(dumCorrigida, 280);
    const semanasAtuais = Math.floor(diasDesdeDUM / 7);

    setErro('');
    setResultado({
      idadeGestacional: idadeGestacionalTexto(diasDesdeDUM),
      dpp: formatarDataBR(dpp),
      trimestre: classificarTrimestre(semanasAtuais),
      diasRestantes: diferencaEmDias(hoje, dpp),
      dumCorrigida: formatarDataBR(dumCorrigida),
    });
  }

  function calcular() {
    if (metodo === 'dum') {
      calcularPorDUM();
    } else {
      calcularPorUSG();
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>Idade Gestacional e DPP</Text>

        <View style={styles.seletorMetodo}>
          <TouchableOpacity
            style={[
              styles.botaoMetodo,
              metodo === 'dum' && { backgroundColor: CORES.roxo },
            ]}
            onPress={() => {
              setMetodo('dum');
              setResultado(null);
              setErro('');
            }}
          >
            <Text
              style={[
                styles.textoBotaoMetodo,
                metodo === 'dum' && styles.textoBotaoMetodoAtivo,
              ]}
            >
              Por DUM
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.botaoMetodo,
              metodo === 'usg' && { backgroundColor: CORES.roxo },
            ]}
            onPress={() => {
              setMetodo('usg');
              setResultado(null);
              setErro('');
            }}
          >
            <Text
              style={[
                styles.textoBotaoMetodo,
                metodo === 'usg' && styles.textoBotaoMetodoAtivo,
              ]}
            >
              Por USG
            </Text>
          </TouchableOpacity>
        </View>

        {metodo === 'dum' ? (
          <View style={styles.campo}>
            <Text style={styles.label}>Data da última menstruação (DUM)</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={dumTexto}
              onChangeText={(texto) => setDumTexto(formatarEntradaData(texto))}
              maxLength={10}
            />
          </View>
        ) : (
          <>
            <View style={styles.campo}>
              <Text style={styles.label}>Data da USG</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={dataUsgTexto}
                onChangeText={(texto) =>
                  setDataUsgTexto(formatarEntradaData(texto))
                }
                maxLength={10}
              />
            </View>
            <View style={styles.linhaDupla}>
              <View style={[styles.campo, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>IG na USG (semanas)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 12"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={igUsgSemanas}
                  onChangeText={setIgUsgSemanas}
                  maxLength={2}
                />
              </View>
              <View style={[styles.campo, { flex: 1 }]}>
                <Text style={styles.label}>+ dias</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 3"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={igUsgDias}
                  onChangeText={setIgUsgDias}
                  maxLength={1}
                />
              </View>
            </View>
          </>
        )}

        {erro ? <Text style={styles.textoErro}>{erro}</Text> : null}

        <TouchableOpacity style={styles.botaoCalcular} onPress={calcular}>
          <Text style={styles.textoBotaoCalcular}>Calcular</Text>
        </TouchableOpacity>

        {resultado && (
          <View style={styles.cardResultado}>
            <View style={styles.linhaResultado}>
              <Text style={styles.labelResultado}>Idade gestacional atual</Text>
              <Text style={styles.valorResultado}>
                {resultado.idadeGestacional}
              </Text>
            </View>

            <View style={styles.linhaResultado}>
              <Text style={styles.labelResultado}>Data provável do parto</Text>
              <Text style={styles.valorResultado}>{resultado.dpp}</Text>
            </View>

            {resultado.dumCorrigida && (
              <View style={styles.linhaResultado}>
                <Text style={styles.labelResultado}>DUM corrigida (USG)</Text>
                <Text style={styles.valorResultado}>
                  {resultado.dumCorrigida}
                </Text>
              </View>
            )}

            {resultado.trimestre && (
              <View
                style={[
                  styles.badgeTrimestre,
                  { backgroundColor: resultado.trimestre.cor },
                ]}
              >
                <Text style={styles.textoBadge}>
                  {resultado.trimestre.texto}
                </Text>
              </View>
            )}

            <Text style={styles.textoDiasRestantes}>
              {resultado.diasRestantes >= 0
                ? `Faltam aproximadamente ${resultado.diasRestantes} dias para a DPP`
                : `DPP ultrapassada há ${Math.abs(
                    resultado.diasRestantes
                  )} dias`}
            </Text>
          </View>
        )}

        <Text style={styles.aviso}>
          Cálculo baseado na Regra de Naegele (DUM + 280 dias). Em ciclos
          irregulares ou DUM incerta, priorize a idade gestacional pela
          USG do primeiro trimestre.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  scroll: {
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 20,
  },
  seletorMetodo: {
    flexDirection: 'row',
    backgroundColor: '#e9e9ef',
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
  },
  botaoMetodo: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoMetodo: {
    fontWeight: '600',
    color: '#555',
  },
  textoBotaoMetodoAtivo: {
    color: '#fff',
  },
  campo: {
    marginBottom: 16,
  },
  linhaDupla: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textoErro: {
    color: CORES.vermelho,
    marginBottom: 12,
    fontSize: 13,
  },
  botaoCalcular: {
    backgroundColor: CORES.roxo,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotaoCalcular: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  cardResultado: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  linhaResultado: {
    marginBottom: 12,
  },
  labelResultado: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  valorResultado: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
  },
  badgeTrimestre: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 4,
    marginBottom: 10,
  },
  textoBadge: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  textoDiasRestantes: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  aviso: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});