import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SobreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Selo do app */}
        <View style={styles.logoWrap}>
          <View style={styles.logoCircle}>
            <Ionicons name="medkit" size={36} color="#fff" />
          </View>
          <Text style={styles.appName}>ProConduta</Text>
          <Text style={styles.appSlogan}>Suporte à decisão clínica e prescrição</Text>
          <Text style={styles.appVersao}>Versão 2.0.0</Text>
        </View>

        {/* Card de propósito do app */}
        <View style={styles.card}>
          <View style={[styles.iconCircle, { backgroundColor: '#F3E8FF' }]}>
            <Ionicons name="shield-checkmark-outline" size={22} color="#5B2A8C" />
          </View>
          <View style={styles.cardTextWrap}>
            <Text style={styles.cardLabel}>Sobre a Plataforma</Text>
            <Text style={styles.cardValorDescricao}>
              Guia prático para a rotina médica. Agilize consultas e plantões com acesso rápido a posologias, tratamento de doenças, calculadoras clínicas e ferramentas de acompanhamento.
            </Text>
          </View>
        </View>

        {/* Card de desenvolvedor */}
        <View style={styles.card}>
          <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
            <Ionicons name="code-slash-outline" size={22} color="#0284C7" />
          </View>
          <View style={styles.cardTextWrap}>
            <Text style={styles.cardLabel}>Desenvolvido por</Text>
            <Text style={styles.cardValor}>Gabriel Alisson</Text>
          </View>
        </View>

        {/* Card de feedback */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.75}
          onPress={() => Linking.openURL('mailto:contato@example.com')}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#FEE2E2' }]}>
            <Ionicons name="mail-outline" size={22} color="#DC2626" />
          </View>
          <View style={styles.cardTextWrap}>
            <Text style={styles.cardLabel}>Sugestões ou dúvidas</Text>
            <Text style={styles.cardValor}>Enviar feedback</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#C4C4C4" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 20,
    paddingTop: 28,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#5B2A8C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#5B2A8C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  appName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A202C',
    letterSpacing: 0.5,
  },
  appSlogan: {
    fontSize: 13,
    color: '#5B2A8C',
    fontWeight: '600',
    marginTop: 2,
  },
  appVersao: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 6,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 12,
    color: '#718096',
    fontWeight: '500',
    marginBottom: 2,
  },
  cardValor: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D3748',
  },
  cardValorDescricao: {
    fontSize: 13.5,
    fontWeight: '400',
    color: '#4A5568',
    lineHeight: 19,
    marginTop: 2,
  },
});