import React from 'react';
import { StatusBar, View, Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import CalculadorasScreen from './screens/CalculadorasScreen';
import SobreScreen from './screens/SobreScreen';

import FuncaoRenalScreen from './screens/calculadoras/FuncaoRenalScreen';
import GravidadePneumoniaScreen from './screens/calculadoras/GravidadePneumoniaScreen';
import EscoreGlasgowScreen from './screens/calculadoras/EscoreGlasgowScreen';
import DisturbiosAcidoBaseScreen from './screens/calculadoras/DisturbiosAcidoBaseScreen';
import IdadeGestacionalScreen from './screens/calculadoras/IdadeGestacionalScreen';
import RiscoCardiovascularScreen from './screens/calculadoras/RiscoCardiovascularScreen';
import MrpaGlicemiaScreen from './screens/calculadoras/MrpaGlicemiaScreen';

import PosologiaScreen from './screens/PosologiaScreen';
import TratamentoDoencasScreen from './screens/TratamentoDoencasScreen';
import PrescricoesPediatricasScreen from './screens/PrescricoesPediatricasScreen';
import ModelosSoapScreen from './screens/ModelosSoapScreen';

// Tela única de dose pediátrica — recebe medicamentoId por parâmetro
import CalculadoraDoseScreen from './screens/ped/CalculadoraDoseScreen';
import { medicamentos } from './screens/ped/MedicamentosData';

const Stack = createNativeStackNavigator();

const CORES = {
  roxo: '#5B2A8C',
  azul: '#1a6fb0',
  vermelho: '#c0483f',
  ambar: '#8a5a1f',
  verde: '#1f7a5c',
};

// ============================================================
// CONFIGURAÇÃO ÚNICA DE ROTAS
// Adicionar uma tela nova = adicionar um objeto aqui.
// Stack.Screen e o deep linking são gerados a partir disso,
// então nunca ficam dessincronizados entre si.
//
// Exceção: rotas com título dinâmico (que depende de params, não é
// fixo por tela) não entram aqui — vão declaradas à mão mais abaixo,
// junto com Home/Calculadoras/Sobre.
// ============================================================

const ROTAS = [
  {
    name: 'FuncaoRenal',
    component: FuncaoRenalScreen,
    titulo: 'Avaliar Função Renal',
    cor: CORES.azul,
    path: 'funcao-renal',
  },
  {
    name: 'GravidadePneumonia',
    component: GravidadePneumoniaScreen,
    titulo: 'Gravidade Pneumonia',
    cor: CORES.vermelho,
    path: 'gravidade-pneumonia',
  },
  {
    name: 'EscoreGlasgow',
    component: EscoreGlasgowScreen,
    titulo: 'Escore de Glasgow',
    cor: CORES.ambar,
    path: 'escore-glasgow',
  },
  {
    name: 'DisturbiosAcidoBase',
    component: DisturbiosAcidoBaseScreen,
    titulo: 'Distúrbios Ácido-Base',
    cor: CORES.verde,
    path: 'disturbios-acido-base',
  },
  {
    name: 'IdadeGestacional',
    component: IdadeGestacionalScreen,
    titulo: 'Idade Gestacional',
    cor: CORES.roxo,
    path: 'idade-gestacional',
  },
  {
    name: 'RiscoCardiovascular',
    component: RiscoCardiovascularScreen,
    titulo: 'Risco Cardiovascular',
    cor: CORES.vermelho,
    path: 'risco-cardiovascular',
  },
  {
    name: 'MrpaGlicemia',
    component: MrpaGlicemiaScreen,
    titulo: 'Monitorização da Pressão Arterial',
    cor: CORES.azul,
    path: 'mrpa-glicemia',
  },
  {
    name: 'Posologia',
    component: PosologiaScreen,
    titulo: 'Posologia de Medicamentos',
    cor: CORES.azul,
    path: 'posologia',
  },
  {
    name: 'TratamentoDoencas',
    component: TratamentoDoencasScreen,
    titulo: 'Tratamento de Doenças',
    cor: CORES.vermelho,
    path: 'tratamento-doencas',
  },
  {
    name: 'ModelosSoap',
    component: ModelosSoapScreen,
    titulo: 'Modelos de SOAP',
    cor: CORES.roxo,
    path: 'modelos-soap',
  },
  {
    name: 'PrescricoesPediatricas',
    component: PrescricoesPediatricasScreen,
    titulo: 'Doses Pediátricas',
    cor: CORES.verde,
    path: 'prescricoes-pediatricas',
  },
  // Telas individuais de dose pediátrica (Dipirona, Tramadol, Paracetamol,
  // Ibuprofeno, AcidoAcetilsalicilico) foram substituídas pela rota única
  // CalculadoraDose, declarada abaixo fora do array — ver comentário ali.
];

// Telas que não seguem o padrão de header colorido/título fixo
// (Home some o header, Calculadoras e Sobre usam roxo fixo,
// CalculadoraDose tem título dinâmico por medicamento) ficam fora
// do array ROTAS e são declaradas manualmente abaixo — são exceções,
// não a regra.

function headerOptions(cor, titulo) {
  return {
    title: titulo,
    headerStyle: { backgroundColor: cor },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: '700', fontSize: 17 },
    headerTitleAlign: 'center',
    headerShadowVisible: false,
  };
}

const linking = {
  prefixes: ['https://gans92.github.io/iartes', 'http://localhost:19006'],
  config: {
    screens: {
      Home: 'iartes',
      Calculadoras: 'calculadoras',
      Sobre: 'sobre',
      // CalculadoraDose tem path com parâmetro — não pode ser gerado
      // pelo Object.fromEntries genérico abaixo, por isso vem antes,
      // manualmente.
      CalculadoraDose: 'prescricoes-pediatricas/:medicamentoId',
      // Gerado a partir do array ROTAS — não precisa mais repetir na mão
      ...Object.fromEntries(ROTAS.map((r) => [r.name, r.path])),
    },
  },
};

function AppNavigator() {
  return (
    <NavigationContainer linking={linking}>
      <StatusBar barStyle="light-content" backgroundColor={CORES.roxo} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerBackTitleVisible: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Calculadoras"
          component={CalculadorasScreen}
          options={headerOptions(CORES.roxo, 'Calculadoras')}
        />
        <Stack.Screen
          name="Sobre"
          component={SobreScreen}
          options={headerOptions(CORES.roxo, 'Sobre ProConduta')}
        />

        {/* Título dinâmico: lê o medicamentoId do param e busca o nome
            em MedicamentosData. Se o id não existir no dado (medicamento
            ainda não cadastrado), cai num título genérico em vez de
            quebrar o header. */}
        <Stack.Screen
          name="CalculadoraDose"
          component={CalculadoraDoseScreen}
          options={({ route }) => {
            const medicamento = medicamentos[route.params?.medicamentoId];
            return headerOptions(
              CORES.verde,
              medicamento?.nome ?? 'Doses Pediátricas'
            );
          }}
        />

        {/* Geradas a partir do array ROTAS — adicionar tela nova = adicionar item lá em cima */}
        {ROTAS.map((rota) => (
          <Stack.Screen
            key={rota.name}
            name={rota.name}
            component={rota.component}
            options={headerOptions(rota.cor, rota.titulo)}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  if (Platform.OS !== 'web') {
    return <AppNavigator />;
  }

  return (
    <View style={styles.webOuter}>
      <View style={styles.webPhone}>
        <AppNavigator />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webOuter: {
    flex: 1,
    height: '100vh',
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webPhone: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    height: '100%',
    maxHeight: 900,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
});
