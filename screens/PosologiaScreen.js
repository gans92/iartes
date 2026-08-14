import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { RECEITAS } from './ReceitasData';

// Função auxiliar para remover acentos e caracteres especiais
const normalizeText = (text) => {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

export default function PosologiaScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Transforma a lista de receitas agrupadas em uma lista individual de medicamentos/itens
  // e já aplica a ordenação ALFABÉTICA pelo nome do medicamento
  const todosOsMedicamentos = useMemo(() => {
    const lista = [];
    RECEITAS.forEach((receita) => {
      if (receita.itens && receita.itens.length > 0) {
        receita.itens.forEach((item, index) => {
          lista.push({
            ...item,
            idUnico: `${receita.id}-${index}`,
            protocoloTitulo: receita.titulo,
            protocoloContexto: receita.contexto,
          });
        });
      }
    });

    // Ordenação alfabética (A-Z) considerando acentos
    return lista.sort((a, b) =>
      (a.nome || '').localeCompare(b.nome || '', 'pt-BR', { sensitivity: 'base' })
    );
  }, []);

  // Filtro inteligente mantendo a ordem alfabética
  const medicamentosFiltrados = useMemo(() => {
    const query = normalizeText(searchQuery.trim());
    if (!query) return todosOsMedicamentos;

    return todosOsMedicamentos.filter((med) => {
      const nomeMatch = normalizeText(med.nome).includes(query);
      const posologiaMatch = normalizeText(med.posologia).includes(query);
      const protocoloMatch = normalizeText(med.protocoloTitulo).includes(query);
      const contextoMatch = normalizeText(med.protocoloContexto).includes(query);
      const obsMatch = normalizeText(med.obs).includes(query);

      return nomeMatch || posologiaMatch || protocoloMatch || contextoMatch || obsMatch;
    });
  }, [searchQuery, todosOsMedicamentos]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.medNome}>{item.nome}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Via: </Text>
        <Text style={styles.value}>{item.via || 'VO'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Quantidade: </Text>
        <Text style={styles.value}>{item.quantidade}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Posologia: </Text>
        <Text style={styles.value}>{item.posologia}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Controlado: </Text>
        <Text style={styles.value}>{item.controlado ? 'Sim' : 'Não'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Unidade: </Text>
        <Text style={styles.value}>{item.unidade || 'CPR'}</Text>
      </View>

      {item.protocoloTitulo && (
        <View style={styles.footerProtocolo}>
          <Text style={styles.protocoloText}>
            ⓘ Protocolo: {item.protocoloTitulo}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />

      <View style={styles.content}>
        <Text style={styles.mainTitle}>Doses Rápidas & Posologia</Text>
        <Text style={styles.subtitle}>
          {medicamentosFiltrados.length} medicamentos disponíveis
        </Text>

        {/* Campo de Busca */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por remédio ou doença (ex: insonia)..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Lista de Resultados */}
        <FlatList
          data={medicamentosFiltrados}
          keyExtractor={(item) => item.idUnico}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>⚠️</Text>
              <Text style={styles.emptyText}>
                Nenhum medicamento encontrado para "{searchQuery}".
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  subtitle: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECEFF1',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CFD8DC',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#263238',
  },
  clearIcon: {
    fontSize: 16,
    color: '#78909C',
    padding: 4,
  },
  listContainer: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  medNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  label: {
    fontWeight: 'bold',
    color: '#37474F',
    fontSize: 14,
  },
  value: {
    color: '#455A64',
    fontSize: 14,
    flex: 1,
  },
  footerProtocolo: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  protocoloText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#78909C',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
});