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

// Limpa apenas pontuações/vírgulas/barras do final (mantendo ML e dosagens)
const cleanTitle = (nome) => {
  if (!nome) return '';
  return nome
    .replace(/[,;.\-\/]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
};

export default function PosologiaScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Extrai todos os itens de todas as receitas
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

    return lista.sort((a, b) =>
      (a.nome || '').localeCompare(b.nome || '', 'pt-BR', { sensitivity: 'base' })
    );
  }, []);

  // 2. Filtra pela busca E AGRUPA dosagens do mesmo medicamento no mesmo card
  const medicamentosFiltrados = useMemo(() => {
    const query = normalizeText(searchQuery.trim());
    
    const filtrados = todosOsMedicamentos.filter((med) => {
      if (!query) return true;
      const nomeMatch = normalizeText(med.nome).includes(query);
      const posologiaMatch = normalizeText(med.posologia).includes(query);
      const protocoloMatch = normalizeText(med.protocoloTitulo).includes(query);
      const contextoMatch = normalizeText(med.protocoloContexto).includes(query);
      const obsMatch = normalizeText(med.obs).includes(query);

      return nomeMatch || posologiaMatch || protocoloMatch || contextoMatch || obsMatch;
    });

    const agrupadosMap = new Map();

    filtrados.forEach((item) => {
      const nomeBase = cleanTitle(item.nome);

      if (!agrupadosMap.has(nomeBase)) {
        agrupadosMap.set(nomeBase, {
          idUnico: item.idUnico,
          nomeBase: nomeBase,
          protocoloTitulo: item.protocoloTitulo,
          opcoes: [item],
        });
      } else {
        agrupadosMap.get(nomeBase).opcoes.push(item);
      }
    });

    return Array.from(agrupadosMap.values());
  }, [searchQuery, todosOsMedicamentos]);

  // Componente do Card Único
  const renderItem = ({ item: grupo }) => (
    <View style={styles.card}>
      <Text style={styles.medNome}>{grupo.nomeBase}</Text>

      {grupo.opcoes.map((op, idx) => (
        <View key={op.idUnico || idx} style={idx > 0 ? styles.subOpcaoDivider : null}>
          {grupo.opcoes.length > 1 && (
            <Text style={styles.subNome}>{cleanTitle(op.nome)}</Text>
          )}

          <View style={styles.row}>
            <Text style={styles.label}>Via: </Text>
            <Text style={styles.value}>{op.via || 'VO'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Quantidade: </Text>
            <Text style={styles.value}>{op.quantidade}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Posologia: </Text>
            <Text style={styles.value}>{op.posologia}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Controlado: </Text>
            <Text style={styles.value}>{op.controlado ? 'Sim' : 'Não'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Unidade: </Text>
            <Text style={styles.value}>{op.unidade || 'CPR'}</Text>
          </View>
        </View>
      ))}

      {grupo.protocoloTitulo && (
        <View style={styles.footerProtocolo}>
          <Text style={styles.protocoloText}>
            ⓘ Protocolo: {grupo.protocoloTitulo}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5B1982" />

      <View style={styles.content}>
        <Text style={styles.mainTitle}>Doses Rápidas & Posologia</Text>
        <Text style={styles.subtitle}>
          {medicamentosFiltrados.length} medicamentos/grupos disponíveis
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
    color: '#1a6fb0',
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
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a6fb0',
    marginBottom: 8,
  },
  subNome: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#37474F',
    marginTop: 4,
    marginBottom: 6,
  },
  subOpcaoDivider: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ECEFF1',
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
    marginTop: 12,
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