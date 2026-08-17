import React from 'react';
import { StatusBar, View, Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import CalculadorasScreen from './screens/CalculadorasScreen';
import SobreScreen from './screens/SobreScreen';
import FuncaoRenalScreen from './screens/FuncaoRenalScreen';
import GravidadePneumoniaScreen from './screens/GravidadePneumoniaScreen';
import EscoreGlasgowScreen from './screens/EscoreGlasgowScreen';
import DisturbiosAcidoBaseScreen from './screens/DisturbiosAcidoBaseScreen';
import IdadeGestacionalScreen from './screens/IdadeGestacionalScreen';
import RiscoCardiovascularScreen from './screens/RiscoCardiovascularScreen';
import MrpaGlicemiaScreen from './screens/MrpaGlicemiaScreen';
import PosologiaScreen from './screens/PosologiaScreen';
import TratamentoDoencasScreen from './screens/TratamentoDoencasScreen';
import ModelosSoapScreen from './screens/ModelosSoapScreen';

const Stack = createNativeStackNavigator();

const CORES = {
  roxo: '#5B2A8C',
  azul: '#1a6fb0',
  vermelho: '#c0483f',
  ambar: '#8a5a1f',
  verde: '#1f7a5c',
};

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
      FuncaoRenal: 'funcao-renal',
      GravidadePneumonia: 'gravidade-pneumonia',
      EscoreGlasgow: 'escore-glasgow',
      DisturbiosAcidoBase: 'disturbios-acido-base',
      RiscoCardiovascular: 'risco-cardiovascular',
      IdadeGestacional: 'idade-gestacional',
      MrpaGlicemia: 'mrpa-glicemia',
      Posologia: 'posologia',
      TratamentoDoencas: 'tratamento-doencas',
      ModelosSoap: 'modelos-soap', // Adicionado ao deep linking
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
        <Stack.Screen
          name="FuncaoRenal"
          component={FuncaoRenalScreen}
          options={headerOptions(CORES.azul, 'Avaliar Função Renal')}
        />
        <Stack.Screen
          name="GravidadePneumonia"
          component={GravidadePneumoniaScreen}
          options={headerOptions(CORES.vermelho, 'Gravidade Pneumonia')}
        />
        <Stack.Screen
          name="EscoreGlasgow"
          component={EscoreGlasgowScreen}
          options={headerOptions(CORES.ambar, 'Escore de Glasgow')}
        />
        <Stack.Screen
          name="DisturbiosAcidoBase"
          component={DisturbiosAcidoBaseScreen}
          options={headerOptions(CORES.verde, 'Distúrbios Ácido-Base')}
        />
        <Stack.Screen
          name="IdadeGestacional"
          component={IdadeGestacionalScreen}
          options={headerOptions(CORES.roxo, 'Idade Gestacional')}
        />
        <Stack.Screen
          name="RiscoCardiovascular"
          component={RiscoCardiovascularScreen}
          options={headerOptions(CORES.vermelho, 'Risco Cardiovascular')}
        />
        <Stack.Screen
          name="MrpaGlicemia"
          component={MrpaGlicemiaScreen}
          options={headerOptions(CORES.azul, 'Monitorização da Pressão Arterial')}
        />
        <Stack.Screen
          name="Posologia"
          component={PosologiaScreen}
          options={headerOptions(CORES.azul, 'Posologia de Medicamentos')}
        />
        <Stack.Screen
          name="TratamentoDoencas"
          component={TratamentoDoencasScreen}
          options={headerOptions(CORES.vermelho, 'Tratamento de Doenças')}
        />
        {/* Nome padronizado para "ModelosSoap" sem espaço */}
        <Stack.Screen
          name="ModelosSoap"
          component={ModelosSoapScreen}
          options={headerOptions(CORES.roxo, 'Modelos de SOAP')}
        />
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