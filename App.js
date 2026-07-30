import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import CalculadorasScreen from './screens/CalculadorasScreen';
import SobreScreen from './screens/SobreScreen';
import FuncaoRenalScreen from './screens/FuncaoRenalScreen';
import GravidadePneumoniaScreen from './screens/GravidadePneumoniaScreen';
import EscoreGlasgowScreen from './screens/EscoreGlasgowScreen';
import DisturbiosAcidoBaseScreen from './screens/DisturbiosAcidoBaseScreen';

const Stack = createNativeStackNavigator();

const CORES = {
  roxo: '#6a1fb0',
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

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={CORES.roxo} />
      <Stack.Navigator
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
          options={headerOptions(CORES.roxo, 'Sobre')}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}