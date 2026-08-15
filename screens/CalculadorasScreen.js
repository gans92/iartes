import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CALCULADORAS = [
  {
    id: '6',
    label: 'Risco Cardiovascular',
    subtitle: 'Risco de eventos cardiovasculares',
    icon: 'heart-outline',
    color: '#b0245c',
    bg: '#fbe4ee',
    screen: 'RiscoCardiovascular',
  },
  {
    id: '1',
    label: 'Avaliar Função Renal',
    subtitle: 'Cockcroft-Gault',
    icon: 'water-outline',
    color: '#1a6fb0',
    bg: '#e3f0fb',
    screen: 'FuncaoRenal',
  },
  {
    id: '2',
    label: 'Gravidade Pneumonia',
    subtitle: 'Escore CURB-65',
    icon: 'thermometer-outline',
    color: '#c0483f',
    bg: '#fbe6e3',
    screen: 'GravidadePneumonia',
  },
  {
    id: '3',
    label: 'Escore de Glasgow',
    subtitle: 'Nível de consciência',
    icon: 'analytics-outline',
    color: '#8a5a1f',
    bg: '#faf0e0',
    screen: 'EscoreGlasgow',
  },
  {
    id: '4',
    label: 'Distúrbios Ácido-Base',
    subtitle: 'pH, PCO2 e HCO3',
    icon: 'flask-outline',
    color: '#1f7a5c',
    bg: '#e2f5ec',
    screen: 'DisturbiosAcidoBase',
  },
  {
    id: '5',
    label: 'Idade Gestacional',
    subtitle: 'IG e data provável do parto',
    icon: 'calendar-outline',
    color: '#6a1fb0',
    bg: '#efe4fb',
    screen: 'IdadeGestacional',
  },
];

export default function CalculadorasScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {CALCULADORAS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.75}
            onPress={() => item.screen && navigation.navigate(item.screen)}
          >
            <View style={[styles.iconCircle, { backgroundColor: item.bg }]}>
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <View style={styles.cardTextWrap}>
              <Text style={styles.cardTitle}>{item.label}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#c4c4c4" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f2f7',
  },
  listContent: {
    padding: 20,
    paddingTop: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f1f1f',
  },
  cardSubtitle: {
    fontSize: 12.5,
    color: '#8a8a8a',
    marginTop: 2,
  },
  footerButton: {
    flexDirection: 'row',
    backgroundColor: '#6a1fb0',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});