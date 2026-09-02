import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

/**
 * PrescricoesPediatricasScreen
 * Índice das doses pediátricas, organizadas por categoria.
 * Cada item navega para a tela de cálculo do medicamento (ex: DipironaScreen).
 *
 * Header (título + seta de voltar + cor) é o padrão do Stack.Navigator —
 * não é desenhado aqui, ver options em App.js.
 */

const SECTIONS = [
  {
    title: 'Analgésicos / Antitérmicos',
    data: [
      { id: 'dipirona', name: 'Dipirona' },
      { id: 'ibuprofeno', name: 'Ibuprofeno' },
      { id: 'paracetamol', name: 'Paracetamol' },
      { id: 'tramadol', name: 'Tramadol' },
    ],
  },
  {
    title: 'Anti-inflamatórios',
    data: [
      { id: 'aas', name: 'Ácido Acetilsalicílico' },
      { id: 'cetoprofeno', name: 'Cetoprofeno' },
      { id: 'diclofenaco-potassico', name: 'Diclofenaco Potássico' },
      { id: 'nimesulida', name: 'Nimesulida' },
    ],
  },
  {
    title: 'Antiácidos',
    data: [
      { id: 'cimetidina', name: 'Cimetidina' },
      { id: 'omeprazol', name: 'Omeprazol' },
      { id: 'ranitidina', name: 'Ranitidina' },
    ],
  },
];

// Rota registrada em App.js (dentro do array ROTAS) por medicamento.
// Conforme for criando as próximas telas (Ibuprofeno, Paracetamol...),
// adicione aqui E registre no array ROTAS em App.js.
const ROUTES = {
  dipirona: 'Dipirona',
  tramadol: 'Tramadol',
  paracetamol: 'Paracetamol',
  ibuprofeno: 'Ibuprofeno',
  aas: 'AcidoAcetilsalicilico',
};

export default function PrescricoesPediatricasScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const filteredSections = useMemo(() => {
    if (!query.trim()) return SECTIONS;
    const q = query.trim().toLowerCase();
    return SECTIONS.map((section) => ({
      ...section,
      data: section.data.filter((item) => item.name.toLowerCase().includes(q)),
    })).filter((section) => section.data.length > 0);
  }, [query]);

  const handlePress = (item) => {
    const route = ROUTES[item.id];
    if (route) {
      navigation.navigate(route);
    } else {
      Alert.alert(item.name, 'Essa dose ainda não foi cadastrada.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.searchWrapper}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Busque pelo medicamento"
          placeholderTextColor="#9AA6AB"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <SectionList
        sections={filteredSections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => handlePress(item)}>
            <Text style={styles.rowText}>{item.name}</Text>
            <Text style={styles.chevron}>{'›'}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum medicamento encontrado.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F4',
    borderRadius: 28,
    marginHorizontal: 20,
    paddingHorizontal: 18,
    height: 52,
    marginTop: 16,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 18,
    color: '#9AA6AB',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#37474F',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8FA0A6',
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  rowText: {
    fontSize: 18,
    color: '#1A1D29',
  },
  chevron: {
    fontSize: 22,
    color: '#C4CBCE',
  },
  emptyText: {
    textAlign: 'center',
    color: '#9AA6AB',
    marginTop: 40,
    fontSize: 14,
  },
});