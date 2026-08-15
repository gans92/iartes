import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MENU_ITEMS = [
  {
    id: '1',
    label: 'Calculadoras',
    subtitle: 'Ferramentas clínicas rápidas',
    icon: 'calculator-outline',
    color: '#6a1fb0',
    bg: '#efe4fb',
    screen: 'Calculadoras',
  },
  {
    id: '2',
    label: 'Posologias',
    subtitle: 'Medicações e doses recomendadas',
    icon: 'medkit-outline',
    color: '#ff6b6b',
    bg: '#ffebee',
    screen: 'Posologia',
  },
  {
    id: '3',
    label: 'Monitorização da Pressão Arterial',
    subtitle: 'Gerar formulário para impressão',
    icon: 'print-outline',
    color: '#1a6fb0',
    bg: '#e3f2fd',
    screen: 'MrpaGlicemia',
  },
  {
    id: '4',
    label: 'Sobre',
    subtitle: 'Informações do aplicativo',
    icon: 'information-circle-outline',
    color: '#1f7a5c',
    bg: '#e2f5ec',
    screen: 'Sobre',
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#4b1585" />

      {/* Cabeçalho de destaque */}
      <View style={styles.hero}>
        <View style={styles.heroIconWrap}>
          <Ionicons name="medkit-outline" size={30} color="#fff" />
        </View>
        <Text style={styles.heroTitle}>CALC MED</Text>
        <Text style={styles.heroSubtitle}>Calculadoras médicas na palma da mão</Text>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.75}
            onPress={() => item.screen && navigation.navigate(item.screen)}
          >
            <View style={[styles.iconCircle, { backgroundColor: item.bg }]}>
              <Ionicons name={item.icon} size={26} color={item.color} />
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
  hero: {
    backgroundColor: '#4b1585',
    paddingTop: 28,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 1,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    marginTop: 4,
  },
  list: {
    flex: 1,
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