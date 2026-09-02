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

// Telas de dose pediátrica individuais, por medicamento
import DipironaScreen from './screens/ped/DipironaScreen';
import TramadolScreen from './screens/ped/TramadolScreen';
import ParacetamolScreen from './screens/ped/ParacetamolScreen';
import IbuprofenoScreen from './screens/ped/IbuprofenoScreen';
import AcidoAcetilsalicilicoScreen from './screens/ped/AcidoAcetilsalicilicoScreen';

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
  {
    name: 'Dipirona',
    component: DipironaScreen,
    titulo: 'Dipirona',
    cor: CORES.verde,
    path: 'prescricoes-pediatricas/dipirona',
  },
  {
    name: 'Tramadol',
    component: TramadolScreen,
    titulo: 'Tramadol',
    cor: CORES.verde,
    path: 'prescricoes-pediatricas/tramadol',
  },
  {
    name: 'Paracetamol',
    component: ParacetamolScreen,
    titulo: 'Paracetamol',
    cor: CORES.verde,
    path: 'prescricoes-pediatricas/paracetamol',
  },
  {
    name: 'Ibuprofeno',
    component: IbuprofenoScreen,
    titulo: 'Ibuprofeno',
    cor: CORES.verde,
    path: 'prescricoes-pediatricas/ibuprofeno',
  },
  {
    name: 'AcidoAcetilsalicilico',
    component: AcidoAcetilsalicilicoScreen,
    titulo: 'Ácido Acetilsalicílico',
    cor: CORES.verde,
    path: 'prescricoes-pediatricas/acido-acetilsalicilico',
  },
  // Próximas doses pediátricas entram aqui do mesmo jeito
];

// Telas que não seguem o padrão de header colorido (Home some o header,
// Calculadoras e Sobre usam roxo fixo) ficam fora do array ROTAS
// e são declaradas manualmente abaixo — são exceções, não a regra.

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
