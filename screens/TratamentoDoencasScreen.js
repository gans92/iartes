import React, { useState, useLayoutEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DOENCAS } from './DoencasData';

const CATEGORIA_LABELS = {
  ginecologia: 'Ginecologia',
  obstetricia: 'Obstetrícia',
  pneumologia: 'Pneumologia',
  otorrino: 'Otorrino/Oftalmo',
  dermatologia: 'Dermatologia',
  ortopedia: 'Ortopedia/Reumato',
  neurologia: 'Neuro/Psiquiatria',
  urologia: 'Urologia/Nefro',
  infectologia: 'Infectologia',
  pediatria: 'Pediatria',
  gastroenterologia: 'Gastro/Proctologia',
  cardiologia: 'Cardio/Endócrino/Vascular',
};

export default function TratamentoDoencasScreen({ navigation }) {
  const [selecionada, setSelecionada] = useState(null);
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('todas');

  // Ref para controlar a rolagem do ScrollView pelas setinhas
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selecionada ? selecionada.nome : 'Tratamento de Doenças',
      headerStyle: {
        backgroundColor: '#5B2A8C',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 17,
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            if (selecionada) {
              setSelecionada(null);
            } else {
              navigation.goBack();
            }
          }}
          style={{ paddingLeft: 16, paddingRight: 8 }}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, selecionada]);

  // Força a ordem exata do CATEGORIA_LABELS
  const categorias = useMemo(() => {
    const existentes = new Set(DOENCAS.map((d) => d.categoria));
    const ordenadas = Object.keys(CATEGORIA_LABELS).filter((cat) =>
      existentes.has(cat)
    );
    return ['todas', ...ordenadas];
  }, []);

  const doencasFiltradas = useMemo(() => {
    return DOENCAS.filter((d) => {
      const matchCategoria =
        categoriaAtiva === 'todas' || d.categoria === categoriaAtiva;
      const matchBusca = d.nome
        .toLowerCase()
        .includes(busca.trim().toLowerCase());
      return matchCategoria && matchBusca;
    });
  }, [busca, categoriaAtiva]);

  // Função para rolar os chips lateralmente ao clicar nas setas
  const rolarChips = (direcao) => {
    if (scrollRef.current) {
      const valorRolagem = direcao === 'esquerda' ? -180 : 180;
      scrollRef.current.scrollTo({
        x: scrollRef.current.scrollOffset
          ? scrollRef.current.scrollOffset + valorRolagem
          : valorRolagem,
        animated: true,
      });
    }
  };

  if (selecionada) {
    return <DetalheDoenca doenca={selecionada} />;
  }

  return (
    <View style={styles.container}>
      {/* Campo de Busca */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color="#7A7A7A" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar doença ou condição..."
          placeholderTextColor="#999"
          value={busca}
          onChangeText={setBusca}
        />
        {busca.length > 0 && (
          <TouchableOpacity onPress={() => setBusca('')}>
            <Ionicons name="close-circle" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Chips de Categorias com Setas Laterais */}
      <View style={styles.chipsRow}>
        <TouchableOpacity
          style={styles.setaButton}
          onPress={() => rolarChips('esquerda')}
          activeOpacity={0.6}
        >
          <Ionicons name="chevron-back" size={18} color="#5B2A8C" />
        </TouchableOpacity>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            // Salva a posição atual da rolagem para a movimentação contínua
            scrollRef.current.scrollOffset = e.nativeEvent.contentOffset.x;
          }}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingHorizontal: 4 }}
          style={styles.chipsContainer}
        >
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chip,
                categoriaAtiva === cat && styles.chipAtivo,
              ]}
              onPress={() => setCategoriaAtiva(cat)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.chipTexto,
                  categoriaAtiva === cat && styles.chipTextoAtivo,
                ]}
              >
                {cat === 'todas' ? 'Todas' : CATEGORIA_LABELS[cat] || cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.setaButton}
          onPress={() => rolarChips('direita')}
          activeOpacity={0.6}
        >
          <Ionicons name="chevron-forward" size={18} color="#5B2A8C" />
        </TouchableOpacity>
      </View>

      {/* Lista de Doenças */}
      {doencasFiltradas.length === 0 ? (
        <View style={styles.vazio}>
          <Ionicons name="search-outline" size={40} color="#CCC" />
          <Text style={styles.vazioTexto}>Nenhuma condição encontrada</Text>
        </View>
      ) : (
        <FlatList
          data={doencasFiltradas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingTop: 4 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => setSelecionada(item)}
            >
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.cardTitulo}>{item.nome}</Text>
                <Text style={styles.cardResumo} numberOfLines={2}>
                  {item.resumo}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#B8A7D1" />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

function DetalheDoenca({ doenca }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={doenca.protocolos}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <View style={styles.categoriaTag}>
            <Text style={styles.categoriaTexto}>
              {CATEGORIA_LABELS[doenca.categoria] || doenca.categoria}
            </Text>
          </View>
        }
        renderItem={({ item: protocolo }) => (
          <View style={styles.protocoloCard}>
            <Text style={styles.protocoloTitulo}>{protocolo.titulo}</Text>
            {protocolo.itens.map((med, idx) => (
              <MedItem key={idx} med={med} />
            ))}
          </View>
        )}
      />
    </View>
  );
}

function MedItem({ med }) {
  const temQtd = med.quantidade || med.unidade;

  return (
    <View style={styles.medItem}>
      <View style={styles.medNomeRow}>
        <Text style={styles.medNome}>{med.nome}</Text>
        {med.controlado && (
          <View style={styles.tagControlado}>
            <Ionicons name="lock-closed" size={10} color="#B45309" />
            <Text style={styles.tagControladoTexto}>Controlado</Text>
          </View>
        )}
      </View>

      {temQtd && (
        <Text style={styles.medDetalhe}>
          Qtd: {med.quantidade ?? '—'} {med.unidade ?? ''}
        </Text>
      )}

      {med.via && <Text style={styles.medDetalhe}>Via: {med.via}</Text>}

      <Text style={styles.medPosologia}>{med.posologia}</Text>

      {med.obs && <Text style={styles.medObs}>{med.obs}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },

  // Busca
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 10,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#2D3748',
  },

  // Container dos Chips + Setas
  chipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 8,
  },
  setaButton: {
    paddingHorizontal: 6,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipsContainer: {
    flex: 1,
    maxHeight: 38,
  },
  chip: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipAtivo: {
    backgroundColor: '#5B2A8C',
  },
  chipTexto: {
    fontSize: 12.5,
    color: '#4A5568',
    fontWeight: '500',
  },
  chipTextoAtivo: {
    color: '#FFF',
    fontWeight: '600',
  },

  // Tela Vazia
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  vazioTexto: {
    marginTop: 8,
    color: '#A0AEC0',
    fontSize: 14,
  },

  // Card de Doença
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitulo: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#321554' 
  },
  cardResumo: { 
    fontSize: 12, 
    color: '#718096', 
    marginTop: 3,
    lineHeight: 16,
  },

  // Detalhes / Protocolos
  categoriaTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  categoriaTexto: {
    color: '#5B2A8C',
    fontSize: 12,
    fontWeight: '600',
  },

  protocoloCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  protocoloTitulo: { 
    fontWeight: '700', 
    fontSize: 15, 
    color: '#2D3748',
    marginBottom: 12 
  },

  medItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  medNomeRow: { 
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 4,
  },
  medNome: { 
    fontWeight: '600', 
    fontSize: 14, 
    color: '#1A202C' 
  },
  tagControlado: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  tagControladoTexto: {
    fontSize: 10,
    color: '#92400E',
    fontWeight: '600',
    marginLeft: 3,
  },
  medDetalhe: { 
    fontSize: 12.5, 
    color: '#4A5568', 
    marginTop: 2 
  },
  medPosologia: { 
    fontSize: 13, 
    color: '#2D3748', 
    marginTop: 4,
    fontWeight: '500',
  },
  medObs: { 
    fontSize: 12, 
    color: '#718096', 
    fontStyle: 'italic', 
    marginTop: 4 
  },
});