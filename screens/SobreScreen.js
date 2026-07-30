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
            <Ionicons name="medkit-outline" size={34} color="#fff" />
          </View>
          <Text style={styles.appName}>CALC MED</Text>
          <Text style={styles.appVersao}>Versão 2.0.0</Text>
        </View>

        {/* Card de desenvolvedor */}
        <View style={styles.card}>
          <View style={[styles.iconCircle, { backgroundColor: '#efe4fb' }]}>
            <Ionicons name="person-outline" size={22} color="#6a1fb0" />
          </View>
          <View style={styles.cardTextWrap}>
            <Text style={styles.cardLabel}>Desenvolvido por</Text>
            <Text style={styles.cardValor}>Gabriel Alisson</Text>
          </View>
        </View>

        {/* Card de propósito do app */}
        <View style={styles.card}>
          <View style={[styles.iconCircle, { backgroundColor: '#e2f5ec' }]}>
            <Ionicons name="heart-outline" size={22} color="#1f7a5c" />
          </View>
          <View style={styles.cardTextWrap}>
            <Text style={styles.cardLabel}>Sobre o app</Text>
            <Text style={styles.cardValor}>
              Calculadoras médicas rápidas para apoiar decisões clínicas do dia a dia.
            </Text>
          </View>
        </View>

        {/* Card de feedback */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.75}
          onPress={() => Linking.openURL('mailto:contato@example.com')}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#fbe6e3' }]}>
            <Ionicons name="mail-outline" size={22} color="#c0483f" />
          </View>
          <View style={styles.cardTextWrap}>
            <Text style={styles.cardLabel}>Sugestões ou dúvidas</Text>
            <Text style={styles.cardValor}>Enviar feedback</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#c4c4c4" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f2f7',
  },
  content: {
    padding: 20,
    paddingTop: 24,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: '#6a1fb0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#6a1fb0',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  appName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1f1f1f',
    letterSpacing: 1,
  },
  appVersao: {
    fontSize: 13,
    color: '#8a8a8a',
    marginTop: 2,
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
    width: 46,
    height: 46,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 12.5,
    color: '#8a8a8a',
    marginBottom: 2,
  },
  cardValor: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f1f1f',
  },
});