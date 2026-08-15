import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import * as Print from 'expo-print';

export default function MrpaGlicemiaScreen() {
  const [nomePaciente, setNomePaciente] = useState('');

  const gerarHTMLRelatorio = () => {
    // Fixo em 14 linhas (padrão de 7 dias)
    const totalLinhas = 14;
    let linhasTabela = '';

    for (let i = 1; i <= totalLinhas; i++) {
      linhasTabela += `
        <tr>
          <td class="col-dia"></td>
          <td class="col-dados"></td>
          <td class="col-dados"></td>
          <td class="col-dados"></td>
        </tr>
      `;
    }

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Monitorização de Pressão Arterial - ${nomePaciente || 'Paciente'}</title>
          <style>
            @page { size: A4 portrait; margin: 15mm; }
            body { 
              font-family: Arial, sans-serif; 
              color: #000; 
              margin: 0; 
              padding: 10px; 
            }

            .titulo { 
              text-align: center; 
              font-size: 24px; 
              font-weight: bold; 
              margin-bottom: 25px; 
              letter-spacing: 1px;
            }

            .paciente-row { 
              font-size: 14px; 
              font-weight: bold; 
              margin-bottom: 20px; 
            }

            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-bottom: 25px; 
            }

            th, td { 
              border: 1px solid #000; 
              text-align: center; 
              height: 26px; 
            }

            th { 
              font-size: 12px; 
              font-weight: bold; 
              text-transform: uppercase; 
              padding: 6px 0;
            }

            .col-dia { width: 18%; }
            .col-dados { width: 27.33%; }

            .instrucoes { 
              font-size: 11.5px; 
              line-height: 1.6; 
              margin-bottom: 60px; 
            }

            .rodape-container { 
              display: flex; 
              justify-content: space-between; 
              align-items: flex-end; 
              font-size: 12px; 
            }

            .assinatura-box { 
              text-align: center; 
              width: 250px; 
            }

            .linha-assinatura { 
              border-top: 1px solid #000; 
              margin-bottom: 4px; 
            }
          </style>
        </head>
        <body>
          <div class="titulo">Monitorização de Pressão Arterial</div>

          <div class="paciente-row">
            Paciente: ${nomePaciente ? nomePaciente : ''}
          </div>

          <table>
            <thead>
              <tr>
                <th class="col-dia">DIA</th>
                <th class="col-dados">MANHÃ</th>
                <th class="col-dados">TARDE</th>
                <th class="col-dados">NOITE</th>
              </tr>
            </thead>
            <tbody>
              ${linhasTabela}
            </tbody>
          </table>

          <div class="instrucoes">
            - Realizar medida de pressão arterial após 10-15 minutos sentada, descansada e relaxada.<br/>
            - Não estar com a bexiga cheia na hora de realizar a medição;<br/>
            - Não ter ingerido bebida alcoólica ou fumado até 1h antes de aferir.
          </div>

          <div class="rodape-container">
            <div>DATA: ____/____/________</div>
            <div class="assinatura-box">
              <div class="linha-assinatura"></div>
              Médico(a)
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const imprimirPDF = async () => {
    try {
      const htmlContent = gerarHTMLRelatorio();

      if (Platform.OS === 'web') {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(htmlContent);
          printWindow.document.close();
          printWindow.focus();
          setTimeout(() => {
            printWindow.print();
          }, 250);
        } else {
          Alert.alert('Erro', 'Permita pop-ups no navegador para visualizar a folha de impressão.');
        }
      } else {
        await Print.printAsync({ html: htmlContent });
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível gerar a folha de impressão.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.titulo}>Monitorização de Pressão Arterial</Text>
      <Text style={styles.subtitulo}>
        Gerador de formulário impresso para acompanhamento residencial da pressão arterial
      </Text>

      <View style={styles.campoContainer}>
        <Text style={styles.label}>Nome do Paciente (Opcional)</Text>
        <TextInput
          style={styles.input}
          value={nomePaciente}
          onChangeText={setNomePaciente}
          placeholder="Deixe em branco para preencher à mão"
        />
      </View>

      <TouchableOpacity style={styles.btnImprimir} onPress={imprimirPDF}>
        <Text style={styles.btnTexto}>🖨️ Imprimir / Gerar PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  titulo: { fontSize: 22, fontWeight: '700', color: '#111', marginBottom: 2 },
  subtitulo: { fontSize: 13, color: '#666', marginBottom: 20 },
  campoContainer: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fff',
    color: '#111',
  },
  btnImprimir: {
    backgroundColor: '#1a6fb0',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  btnTexto: { color: '#fff', fontSize: 15, fontWeight: '700' },
});