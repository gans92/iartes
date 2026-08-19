// ─────────────────────────────
  // 👂 OTORRINOLARINGOLOGIA E OFTALMOLOGIA
  // ─────────────────────────────
  export const DOENCAS = [
    {
    id: 'aftas-gengivite',
    nome: 'Aftas e Gengivite',
    categoria: 'otorrino',
    resumo: 'Lesões orais / inflamação gengival.',
    protocolos: [
      {
        id: 'aftas-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Clorexidina 0,2%',
            quantidade: '1',
            unidade: 'FRASCO',
            posologia: 'BOCHECHO 2X AO DIA POR 10 DIAS',
            via: 'Tópico oral',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'amigdalite-tonsilite',
    nome: 'Amigdalite / Tonsilite',
    categoria: 'otorrino',
    resumo: 'Infecção das amígdalas — esquema oral ou IM.',
    protocolos: [
      {
        id: 'amigdalite-1',
        titulo: 'Esquema 1 — oral',
        itens: [
          {
            nome: 'Amoxicilina 500mg (ou Amoxicilina+Clavulanato)',
            quantidade: '21',
            unidade: 'CPR',
            posologia: 'TOMAR 1 CP VO DE 8/8H POR 7 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Dipirona 500mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE DOR OU FEBRE',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Ibuprofeno 300mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME NECESSIDADE',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'amigdalite-2',
        titulo: 'Esquema 2 — Unidade (dose única)',
        itens: [
          {
            nome: 'Penicilina G Benzatina',
            quantidade: '1',
            unidade: 'AMP',
            posologia: 'APLICAR IM, DOSE ÚNICA, NA UNIDADE',
            via: 'IM',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'cerume-impactado',
    nome: 'Cerume Impactado',
    categoria: 'otorrino',
    resumo: 'Obstrução do canal auditivo por cera.',
    protocolos: [
      {
        id: 'cerume-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Cerumin',
            quantidade: '1',
            unidade: 'FRASCO',
            posologia: '5 GOTAS DE 8/8H POR 5 DIAS',
            via: 'Otológico',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'cinetose-labirintite',
    nome: 'Cinetose e Labirintite',
    categoria: 'otorrino',
    resumo: 'Tontura / vertigem associada a movimento.',
    protocolos: [
      {
        id: 'cinetose-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Meclizina 25mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME NECESSIDADE',
            via: 'VO',
            controlado: false,
            obs: 'Se labirintite, considerar Dramin.',
          },
        ],
      },
    ],
  },
  {
    id: 'conjuntivite',
    nome: 'Conjuntivite',
    categoria: 'otorrino',
    resumo: 'Inflamação da conjuntiva ocular.',
    protocolos: [
      {
        id: 'conjuntivite-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Tobramicina 0,3%',
            quantidade: '1',
            unidade: 'FRASCO',
            posologia: '2 GOTAS DE 6/6H POR 5 DIAS',
            via: 'Oftálmico',
            controlado: false,
            obs: 'Associar compressas frias.',
          },
        ],
      },
    ],
  },
  {
    id: 'faringite-viral',
    nome: 'Faringite Viral',
    categoria: 'otorrino',
    resumo: 'Inflamação da faringe de origem viral.',
    protocolos: [
      {
        id: 'faringite-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Dipirona 500mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE DOR OU FEBRE',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Ibuprofeno 300mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME NECESSIDADE',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'epistaxe',
    nome: 'Hemorragia Nasal (Epistaxe Leve)',
    categoria: 'otorrino',
    resumo: 'Sangramento nasal leve.',
    protocolos: [
      {
        id: 'epistaxe-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'SF 0,9% gelado',
            quantidade: null,
            unidade: null,
            posologia: 'COMPRESSA LOCAL GELADA',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Nafazolina spray',
            quantidade: '1',
            unidade: 'FRASCO',
            posologia: 'CONFORME NECESSIDADE',
            via: 'Nasal',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'otite',
    nome: 'Otite Externa e Otite Média Aguda',
    categoria: 'otorrino',
    resumo: 'Externa: tópico + oral. Média: sistêmico.',
    protocolos: [
      {
        id: 'otite-externa',
        titulo: 'Otite Externa',
        itens: [
          {
            nome: 'Cefalexina 500mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Otosporin gotas',
            quantidade: '1',
            unidade: 'FRASCO',
            posologia: 'CONFORME NECESSIDADE',
            via: 'Otológico',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Ibuprofeno',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE DOR',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'otite-media',
        titulo: 'Otite Média Aguda',
        itens: [
          {
            nome: 'Amoxicilina',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Ibuprofeno',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE DOR',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'rinite-alergica',
    nome: 'Rinite Alérgica',
    categoria: 'otorrino',
    resumo: 'Inflamação nasal de causa alérgica.',
    protocolos: [
      {
        id: 'rinite-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Loratadina 10mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'TOMAR 1 COMPRIMIDO 1X AO DIA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'SF 0,9% nasal',
            quantidade: '1',
            unidade: 'FRASCO',
            posologia: 'LAVAGEM NASAL CONFORME NECESSIDADE',
            via: 'Nasal',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'sinusite-aguda',
    nome: 'Sinusite Aguda',
    categoria: 'otorrino',
    resumo: 'Inflamação dos seios paranasais.',
    protocolos: [
      {
        id: 'sinusite-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Amoxicilina + Clavulanato',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO, POR 10 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Loratadina 10mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'TOMAR 1 COMPRIMIDO 1X AO DIA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Dipirona 500mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE DOR OU FEBRE',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────
  // 🩸 DERMATOLOGIA E ALERGOLOGIA
  // ─────────────────────────────
  {
    id: 'abscesso-furunculo',
    nome: 'Abscesso / Furúnculo',
    categoria: 'dermatologia',
    resumo: 'Infecção localizada de pele/anexos.',
    protocolos: [
      {
        id: 'abscesso-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Cefalexina 500mg (ou Clindamicina 300mg)',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Mupirocina pomada',
            quantidade: '1',
            unidade: 'BISNAGA',
            posologia: 'APLICAR CONFORME NECESSIDADE',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'dermatite-contato',
    nome: 'Dermatite de Contato / Reação Alérgica Leve',
    categoria: 'dermatologia',
    resumo: 'Reação cutânea alérgica leve.',
    protocolos: [
      {
        id: 'dermatite-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Loratadina 10mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'TOMAR 1 COMPRIMIDO 1X AO DIA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Dexclorfeniramina + Betametasona creme',
            quantidade: '1',
            unidade: 'BISNAGA',
            posologia: 'APLICAR CONFORME NECESSIDADE',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'dermatite-seborreica',
    nome: 'Dermatite Seborreica Leve',
    categoria: 'dermatologia',
    resumo: 'Descamação e inflamação em áreas seborreicas.',
    protocolos: [
      {
        id: 'seborreica-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Cetoconazol shampoo 2%',
            quantidade: '1',
            unidade: 'FRASCO',
            posologia: 'CONFORME NECESSIDADE',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Hidrocortisona creme',
            quantidade: '1',
            unidade: 'BISNAGA',
            posologia: 'CONFORME NECESSIDADE',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'dermatofitose-tinea',
    nome: 'Dermatofitose Interdigital (Pé de Atleta) / Tinea',
    categoria: 'dermatologia',
    resumo: 'Micose cutânea.',
    protocolos: [
      {
        id: 'tinea-topico',
        titulo: 'Uso tópico',
        itens: [
          {
            nome: 'Clotrimazol creme',
            quantidade: '1',
            unidade: 'BISNAGA',
            posologia: 'APLICAR 2X AO DIA',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'tinea-extensa',
        titulo: 'Tinea extensa',
        itens: [
          {
            nome: 'Griseofulvina 500mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'escabiose',
    nome: 'Escabiose (Sarna)',
    categoria: 'dermatologia',
    resumo: 'Infestação por ácaro Sarcoptes scabiei.',
    protocolos: [
      {
        id: 'escabiose-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Permetrina 5% creme',
            quantidade: '1',
            unidade: 'BISNAGA',
            posologia: 'APLICAR EM TODO O CORPO À NOITE, LAVAR PELA MANHÃ',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Ivermectina 6mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'DOSE ÚNICA, REPETIR EM 7 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'erisipela',
    nome: 'Erisipela',
    categoria: 'dermatologia',
    resumo: 'Infecção bacteriana de pele com eritema bem delimitado.',
    protocolos: [
      {
        id: 'erisipela-oral',
        titulo: 'Uso oral',
        itens: [
          {
            nome: 'Cefalexina 500mg',
            quantidade: '40',
            unidade: 'CPR',
            posologia: 'TOMAR 01 CP VO DE 6/6H POR 10 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Dipirona 500mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'TOMAR 01 CP VO DE 6/6H SE DOR OU FEBRE',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Ibuprofeno 300mg',
            quantidade: '15',
            unidade: 'CPR',
            posologia: 'TOMAR 01 CP VO DE 8/8H POR 05 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'erisipela-topico',
        titulo: 'Uso tópico',
        itens: [
          {
            nome: 'Neomicina + Bacitracina pomada',
            quantidade: '1',
            unidade: 'BISNAGA',
            posologia: 'APLICAR FINA CAMADA NA REGIÃO AFETADA 3X/DIA',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'erisipela-unidade',
        titulo: 'Na unidade',
        itens: [
          {
            nome: 'Dipirona 1g IM + Ceftriaxona 1g IM',
            quantidade: null,
            unidade: 'AMP',
            posologia: 'APLICAÇÃO NA UNIDADE',
            via: 'IM',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'escoriacoes-queimadura',
    nome: 'Escoriações / Feridas / Queimadura Solar Leve',
    categoria: 'dermatologia',
    resumo: 'Lesões cutâneas superficiais.',
    protocolos: [
      {
        id: 'escoriacoes-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Sulfadiazina de Prata creme',
            quantidade: '1',
            unidade: 'BISNAGA',
            posologia: 'APLICAR APÓS LAVAGEM COM SF 0,9%',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'foliculite',
    nome: 'Foliculite',
    categoria: 'dermatologia',
    resumo: 'Inflamação de folículos pilosos.',
    protocolos: [
      {
        id: 'foliculite-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Eritromicina 500mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Mupirocina gel 2%',
            quantidade: '1',
            unidade: 'BISNAGA',
            posologia: 'APLICAR CONFORME NECESSIDADE',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'herpes-simples',
    nome: 'Herpes Simples',
    categoria: 'dermatologia',
    resumo: 'Infecção viral por HSV.',
    protocolos: [
      {
        id: 'herpes-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Aciclovir 400mg',
            quantidade: '21',
            unidade: 'CPR',
            posologia: 'TOMAR 1 CP VO DE 8/8H POR 7 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'impetigo-ectima',
    nome: 'Impetigo ou Ectima',
    categoria: 'dermatologia',
    resumo: 'Infecção bacteriana superficial de pele. Vários esquemas.',
    protocolos: [
      {
        id: 'impetigo-unidade',
        titulo: 'Na unidade',
        itens: [
          {
            nome: 'Penicilina G Benzatina',
            quantidade: '1',
            unidade: 'AMP',
            posologia: 'APLICAR IM, DOSE ÚNICA',
            via: 'IM',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'impetigo-oral',
        titulo: 'Uso oral',
        itens: [
          {
            nome: 'Eritromicina (ou Cefalexina)',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'impetigo-topico',
        titulo: 'Uso tópico',
        itens: [
          {
            nome: 'Neomicina + Bacitracina (ou Mupirocina)',
            quantidade: '1',
            unidade: 'BISNAGA',
            posologia: 'APLICAR CONFORME NECESSIDADE',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'larva-migrans',
    nome: 'Larva Migrans',
    categoria: 'dermatologia',
    resumo: 'Infestação cutânea por larvas de nematódeos.',
    protocolos: [
      {
        id: 'larva-migrans-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Albendazol 400mg (ou Ivermectina 6mg)',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Tiabendazol pomada',
            quantidade: '1',
            unidade: 'BISNAGA',
            posologia: 'APLICAR CONFORME NECESSIDADE',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'molusco-contagioso',
    nome: 'Molusco Contagioso',
    categoria: 'dermatologia',
    resumo: 'Infecção viral cutânea autolimitada.',
    protocolos: [
      {
        id: 'molusco-conduta',
        titulo: 'Conduta',
        itens: [
          {
            nome: 'Conduta expectante',
            quantidade: null,
            unidade: null,
            posologia: 'NÃO MANIPULAR AS LESÕES',
            via: null,
            controlado: false,
            obs: 'Autolimitado — orientação, sem prescrição medicamentosa.',
          },
        ],
      },
    ],
  },
  {
    id: 'onicomicose',
    nome: 'Onicomicose (Mãos e Pés)',
    categoria: 'dermatologia',
    resumo: 'Micose ungueal — tratamentos longos.',
    protocolos: [
      {
        id: 'onicomicose-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Itraconazol 100mg (ou Terbinafina 250mg)',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA (TRATAMENTO LONGO/PULSOTERAPIA)',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'pediculose-pubiana',
    nome: 'Pediculose Pubiana',
    categoria: 'dermatologia',
    resumo: 'Infestação por piolho pubiano.',
    protocolos: [
      {
        id: 'pediculose-pubiana-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Ivermectina 6mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Dexclorfeniramina',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME NECESSIDADE',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Permetrina 5% loção',
            quantidade: '1',
            unidade: 'FRASCO',
            posologia: 'APLICAR CONFORME NECESSIDADE',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'picada-inseto',
    nome: 'Picada de Inseto com Reação Local',
    categoria: 'dermatologia',
    resumo: 'Reação inflamatória local a picada.',
    protocolos: [
      {
        id: 'picada-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Dexclorfeniramina + Prednisona + Dipirona',
            quantidade: null,
            unidade: null,
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'psoriase-leve',
    nome: 'Psoríase Leve',
    categoria: 'dermatologia',
    resumo: 'Descamação cutânea crônica leve.',
    protocolos: [
      {
        id: 'psoriase-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Ácido Salicílico + Ureia + Hidrocortisona creme',
            quantidade: '1',
            unidade: 'BISNAGA',
            posologia: 'APLICAR CONFORME NECESSIDADE',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'ptiriase-versicolor',
    nome: 'Ptiríase Versicolor',
    categoria: 'dermatologia',
    resumo: 'Micose superficial com manchas hipo/hipercrômicas.',
    protocolos: [
      {
        id: 'ptiriase-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Fluconazol 150mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: '1X POR SEMANA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Cetoconazol 2% creme',
            quantidade: '1',
            unidade: 'BISNAGA',
            posologia: 'APLICAR CONFORME NECESSIDADE',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'urticaria',
    nome: 'Urticária / Urticária Aguda',
    categoria: 'dermatologia',
    resumo: 'Reação alérgica cutânea com pápulas pruriginosas.',
    protocolos: [
      {
        id: 'urticaria-oral',
        titulo: 'Uso oral',
        itens: [
          {
            nome: 'Loratadina 10mg (ou Dexclorfeniramina xarope)',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Prednisona 20mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'urticaria-unidade',
        titulo: 'Na unidade (crise)',
        itens: [
          {
            nome: 'Hidrocortisona EV + Epinefrina SC',
            quantidade: null,
            unidade: null,
            posologia: 'APLICAÇÃO NA UNIDADE',
            via: 'EV/SC',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────
  // 🦴 ORTOPEDIA E REUMATOLOGIA
  // ─────────────────────────────
  {
    id: 'lombalgia',
    nome: 'Dorsalgia e Dor Muscular / Lombalgia',
    categoria: 'ortopedia',
    resumo: 'Dor musculoesquelética. Vários esquemas conforme intensidade.',
    protocolos: [
      {
        id: 'lombalgia-oral',
        titulo: 'Uso oral',
        itens: [
          {
            nome: 'Nimesulida / Diclofenaco / Ibuprofeno',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Ciclobenzaprina',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: 'Relaxante muscular.',
          },
          {
            nome: 'Tramadol',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE DOR INTENSA',
            via: 'VO',
            controlado: true,
            obs: null,
          },
        ],
      },
      {
        id: 'lombalgia-unidade',
        titulo: 'Na unidade',
        itens: [
          {
            nome: 'Betametasona / Dexametasona / Dexalgen IM',
            quantidade: null,
            unidade: 'AMP',
            posologia: 'APLICAÇÃO NA UNIDADE',
            via: 'IM',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'gota',
    nome: 'Gota (Crises e Controle)',
    categoria: 'ortopedia',
    resumo: 'Artrite por depósito de urato. Crise vs controle contínuo.',
    protocolos: [
      {
        id: 'gota-crise',
        titulo: 'Crise aguda',
        itens: [
          {
            nome: 'Indometacina / Diclofenaco',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Prednisona (em desmame)',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Colchicina',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'gota-controle',
        titulo: 'Controle (uso contínuo)',
        itens: [
          {
            nome: 'Alopurinol',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'USO CONTÍNUO CONFORME PRESCRIÇÃO',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Colchicina',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'USO CONTÍNUO CONFORME PRESCRIÇÃO',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'osteoporose',
    nome: 'Osteoporose',
    categoria: 'ortopedia',
    resumo: 'Perda de densidade óssea — bisfosfonato semanal + cálcio/vit. D diário.',
    protocolos: [
      {
        id: 'osteoporose-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Alendronato 70mg (ou Risedronato 35mg)',
            quantidade: '4',
            unidade: 'CPR',
            posologia: 'TOMAR 1 COMPRIMIDO 1X POR SEMANA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Carbonato de Cálcio 600mg + Vitamina D',
            quantidade: '30',
            unidade: 'CPR',
            posologia: 'TOMAR 1 COMPRIMIDO TODOS OS DIAS À NOITE',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────
  // 🧠 NEUROLOGIA E PSIQUIATRIA
  // ─────────────────────────────
  {
    id: 'cefaleia-tensional',
    nome: 'Cefaleia Tensional',
    categoria: 'neurologia',
    resumo: 'Dor de cabeça tensional comum.',
    protocolos: [
      {
        id: 'cefaleia-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Dipirona 500mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE DOR',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Ibuprofeno 300mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE DOR',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'crise-convulsiva',
    nome: 'Crise Convulsiva / Epilepsia',
    categoria: 'neurologia',
    resumo: 'Crise convulsiva aguda — manejo de emergência.',
    protocolos: [
      {
        id: 'convulsao-unidade',
        titulo: 'Na unidade',
        itens: [
          {
            nome: 'Diazepam 10mg (EV ou Retal)',
            quantidade: '1',
            unidade: 'AMP',
            posologia: 'APLICAÇÃO NA UNIDADE + OXIGÊNIO',
            via: 'EV/Retal',
            controlado: true,
            obs: 'Emergência — monitorização contínua.',
          },
        ],
      },
    ],
  },
  {
    id: 'enxaqueca',
    nome: 'Enxaqueca / Migrânea',
    categoria: 'neurologia',
    resumo: 'Cefaleia latejante, geralmente unilateral.',
    protocolos: [
      {
        id: 'enxaqueca-oral',
        titulo: 'Uso oral',
        itens: [
          {
            nome: 'Dipirona 500mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE DOR',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Ibuprofeno 300mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE DOR',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Naratriptana 2,5mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'enxaqueca-unidade',
        titulo: 'Na unidade',
        itens: [
          {
            nome: 'Dipirona + Decadron + Ondansetrona IM',
            quantidade: null,
            unidade: 'AMP',
            posologia: 'APLICAÇÃO NA UNIDADE',
            via: 'IM',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'insonia-ansiedade',
    nome: 'Insônia Leve e Síndrome Ansiosa',
    categoria: 'neurologia',
    resumo: 'Ansiedade leve / dificuldade para dormir.',
    protocolos: [
      {
        id: 'insonia-oral',
        titulo: 'Uso oral',
        itens: [
          {
            nome: 'Passiflora extrato seco 200mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: 'Associar Melissa/Valeriana se necessário.',
          },
        ],
      },
      {
        id: 'insonia-unidade',
        titulo: 'Na unidade (se agitação)',
        itens: [
          {
            nome: 'Diazepam 5mg IM',
            quantidade: '1',
            unidade: 'AMP',
            posologia: 'APLICAÇÃO NA UNIDADE',
            via: 'IM',
            controlado: true,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'vertigem',
    nome: 'Vertigem',
    categoria: 'neurologia',
    resumo: 'Sensação de rotação/desequilíbrio.',
    protocolos: [
      {
        id: 'vertigem-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Meclizina 25mg (ou Dramin B6)',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO, POR 5 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────
  // 💧 UROLOGIA E NEFROLOGIA
  // ─────────────────────────────
  {
    id: 'hiperplasia-prostatica',
    nome: 'Hiperplasia Prostática Benigna',
    categoria: 'urologia',
    resumo: 'Aumento benigno da próstata. 5 esquemas escalonados.',
    protocolos: [
      {
        id: 'hpb-1',
        titulo: 'Esquema 1',
        itens: [
          {
            nome: 'Doxazosina 2mg',
            quantidade: '30',
            unidade: 'CPR',
            posologia: 'TOMAR 1/2 CP VO À NOITE POR 14 DIAS; APÓS, 1 CP À NOITE POR 21 DIAS E RETORNAR PARA AJUSTE',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'hpb-2',
        titulo: 'Esquema 2',
        itens: [
          {
            nome: 'Doxazosina 4mg',
            quantidade: '60',
            unidade: 'CPR',
            posologia: 'TOMAR 1 COMPRIMIDO VO À NOITE, TODOS OS DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'hpb-3',
        titulo: 'Esquema 3',
        itens: [
          {
            nome: 'Tansulosina 0,4mg',
            quantidade: '60',
            unidade: 'CPR',
            posologia: 'TOMAR 1 CÁPSULA VO APÓS O CAFÉ DA MANHÃ, TODOS OS DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'hpb-4',
        titulo: 'Esquema 4',
        itens: [
          {
            nome: 'Finasterida 5mg',
            quantidade: '60',
            unidade: 'CPR',
            posologia: 'TOMAR 1 COMPRIMIDO VO À NOITE, TODOS OS DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'hpb-5',
        titulo: 'Esquema 5 — combinado',
        itens: [
          {
            nome: 'Tansulosina 0,4mg',
            quantidade: '60',
            unidade: 'CPR',
            posologia: 'TOMAR 1 CÁPSULA VO APÓS O CAFÉ DA MANHÃ, TODOS OS DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Finasterida 5mg',
            quantidade: '60',
            unidade: 'CPR',
            posologia: 'TOMAR 1 COMPRIMIDO VO À NOITE, TODOS OS DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'itu',
    nome: 'Infecção de Urina (ITU)',
    categoria: 'urologia',
    resumo: 'Infecção do trato urinário — esquema oral, com atenção a pielonefrite.',
    protocolos: [
      {
        id: 'itu-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Nitrofurantoína 100mg',
            quantidade: '28',
            unidade: 'CPR',
            posologia: 'TOMAR 1 CP VO DE 6/6H POR 7 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'itu-alternativo',
        titulo: 'Esquema alternativo',
        itens: [
          {
            nome: 'Ciprofloxacino 500mg',
            quantidade: '14',
            unidade: 'CPR',
            posologia: 'TOMAR 01 CP VO DE 12/12H POR 07 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Fenazopiridina 200mg',
            quantidade: '9',
            unidade: 'CPR',
            posologia: 'TOMAR 01 CP VO DE 8/8H POR 03 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Ibuprofeno 300mg',
            quantidade: '15',
            unidade: 'CPR',
            posologia: 'TOMAR 01 CP VO DE 8/8H POR 05 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'itu-pielonefrite',
        titulo: 'Se pielonefrite',
        itens: [
          {
            nome: 'Ceftriaxona 1g IM',
            quantidade: '1',
            unidade: 'AMP',
            posologia: 'DOSE ÚNICA',
            via: 'IM',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'itu-unidade',
        titulo: 'Na unidade',
        itens: [
          {
            nome: 'Dipirona 1g IM + Ceftriaxona 1g IM',
            quantidade: null,
            unidade: 'AMP',
            posologia: 'APLICAÇÃO NA UNIDADE',
            via: 'IM',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'nefrolitiase',
    nome: 'Nefrolitíase / Cólica Renal',
    categoria: 'urologia',
    resumo: 'Cálculo urinário com dor tipo cólica.',
    protocolos: [
      {
        id: 'nefrolitiase-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Escopolamina + Dipirona',
            quantidade: null,
            unidade: 'AMP/CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO/EV',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Ibuprofeno',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Bromoprida',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE NÁUSEA',
            via: 'VO',
            controlado: false,
            obs: 'Associar hidratação vigorosa.',
          },
        ],
      },
    ],
  },
  {
    id: 'prostatite',
    nome: 'Prostatite',
    categoria: 'urologia',
    resumo: 'Inflamação/infecção prostática.',
    protocolos: [
      {
        id: 'prostatite-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Ciprofloxacino 500mg',
            quantidade: '56',
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO, POR 28 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Ibuprofeno 600mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME NECESSIDADE',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────
  // 🦠 INFECTOLOGIA E PARASITOLOGIA GERAL
  // ─────────────────────────────
  {
    id: 'dengue',
    nome: 'Dengue',
    categoria: 'infectologia',
    resumo: 'Arbovirose — tratamento sintomático. Proibido AINEs.',
    protocolos: [
      {
        id: 'dengue-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Dipirona 500mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE DOR OU FEBRE',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Ondansetrona 8mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE NÁUSEA/VÔMITO',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Sais de Reidratação Oral (SRO)',
            quantidade: null,
            unidade: 'ENVELOPE',
            posologia: 'CONFORME NECESSIDADE',
            via: 'VO',
            controlado: false,
            obs: 'PROIBIDO ANTI-INFLAMATÓRIOS (risco de sangramento).',
          },
        ],
      },
    ],
  },
  {
    id: 'enterobiase',
    nome: 'Enterobíase e Oxiuríase',
    categoria: 'infectologia',
    resumo: 'Parasitose intestinal por Enterobius vermicularis.',
    protocolos: [
      {
        id: 'enterobiase-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Albendazol 400mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'DOSE ÚNICA',
            via: 'VO',
            controlado: false,
            obs: 'Alternativa: Pamoato de Pirvínio 100mg.',
          },
        ],
      },
    ],
  },
  {
    id: 'pep-sexual',
    nome: 'PEP (Profilaxia Pós-Exposição Sexual)',
    categoria: 'infectologia',
    resumo: 'Profilaxia pós-exposição de risco ao HIV.',
    protocolos: [
      {
        id: 'pep-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Tenofovir 300mg + Lamivudina 300mg + Dolutegravir 50mg',
            quantidade: '28',
            unidade: 'CPR',
            posologia: 'TOMAR 1X AO DIA POR 28 DIAS',
            via: 'VO',
            controlado: false,
            obs: 'Iniciar o quanto antes após exposição de risco.',
          },
        ],
      },
    ],
  },
  {
    id: 'teniase',
    nome: 'Teníase',
    categoria: 'infectologia',
    resumo: 'Parasitose por Taenia spp.',
    protocolos: [
      {
        id: 'teniase-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Praziquantel 150mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'DOSE ÚNICA NO CAFÉ DA MANHÃ',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'vermifugo-amplo',
    nome: 'Vermífugo Amplo Espectro',
    categoria: 'infectologia',
    resumo: 'Tratamento de verminoses gerais — 3 esquemas.',
    protocolos: [
      {
        id: 'vermifugo-1',
        titulo: 'Esquema 1',
        itens: [
          {
            nome: 'Mebendazol + Tiabendazol',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'vermifugo-2',
        titulo: 'Esquema 2',
        itens: [
          {
            nome: 'Nitazoxanida (Annita)',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'vermifugo-3',
        titulo: 'Esquema 3',
        itens: [
          {
            nome: 'Albendazol 400mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: 'Associar Sulfato Ferroso ou Ultrafer/Nutrinfan se indicado.',
          },
        ],
      },
    ],
  },
  {
    id: 'tetano',
    nome: 'Tétano (Ferimentos e Vacinação)',
    categoria: 'infectologia',
    resumo: 'Profilaxia antitetânica pós-ferimento.',
    protocolos: [
      {
        id: 'tetano-padrao',
        titulo: 'Na unidade',
        itens: [
          {
            nome: 'Vacina dT',
            quantidade: '1',
            unidade: 'AMP',
            posologia: 'APLICAR IM CONFORME ESQUEMA VACINAL',
            via: 'IM',
            controlado: false,
            obs: 'Precedida de limpeza da ferida.',
          },
          {
            nome: 'Imunoglobulina Antitetânica',
            quantidade: '1',
            unidade: 'AMP',
            posologia: 'APLICAR IM SE NECESSÁRIO (ferimento de risco/esquema incompleto)',
            via: 'IM',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────
  // 👶 PEDIATRIA
  // ─────────────────────────────
  {
    id: 'anemia-crianca',
    nome: 'Anemia — Criança',
    categoria: 'pediatria',
    resumo: 'Reposição de ferro em criança.',
    protocolos: [
      {
        id: 'anemia-crianca-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Sulfato Ferroso xarope',
            quantidade: null,
            unidade: 'FRASCO',
            posologia: 'CONFORME PESO, 2X AO DIA, POR 90 DIAS',
            via: 'VO',
            controlado: false,
            obs: 'Pediátrico — ajustar dose conforme peso.',
          },
        ],
      },
    ],
  },
  {
    id: 'asma-crianca',
    nome: 'Asma — Criança',
    categoria: 'pediatria',
    resumo: '3 esquemas conforme gravidade.',
    protocolos: [
      {
        id: 'asma-crianca-1',
        titulo: 'Esquema 1/2',
        itens: [
          {
            nome: 'Prednisolona xarope',
            quantidade: null,
            unidade: 'FRASCO',
            posologia: '1X AO DIA POR 5 DIAS',
            via: 'VO',
            controlado: false,
            obs: 'Pediátrico — ajustar dose conforme peso.',
          },
        ],
      },
      {
        id: 'asma-crianca-3',
        titulo: 'Esquema 3',
        itens: [
          {
            nome: 'Salbutamol xarope',
            quantidade: null,
            unidade: 'FRASCO',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: 'Pediátrico.',
          },
        ],
      },
      {
        id: 'asma-crianca-inalatorio',
        titulo: 'Uso externo/inalatório',
        itens: [
          {
            nome: 'NBZ com SF 0,9% + Fenoterol + Ipratrópio (ou Salbutamol aerossol c/ espaçador)',
            quantidade: null,
            unidade: null,
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'Inalatória',
            controlado: false,
            obs: 'Pediátrico.',
          },
        ],
      },
    ],
  },
  {
    id: 'gases-bebes',
    nome: 'Gases em Bebês',
    categoria: 'pediatria',
    resumo: 'Desconforto por gases intestinais em lactentes.',
    protocolos: [
      {
        id: 'gases-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Dimeticona gotas',
            quantidade: null,
            unidade: 'FRASCO',
            posologia: 'CONFORME PESO, DE 6/6H POR 10 DIAS',
            via: 'VO',
            controlado: false,
            obs: 'Pediátrico.',
          },
          {
            nome: 'Soro Fisiológico nasal',
            quantidade: '1',
            unidade: 'FRASCO',
            posologia: 'CONFORME NECESSIDADE',
            via: 'Nasal',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'larva-migrans-crianca',
    nome: 'Larva Migrans — Criança',
    categoria: 'pediatria',
    resumo: 'Infestação cutânea por larvas — esquema pediátrico.',
    protocolos: [
      {
        id: 'larva-migrans-crianca-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Albendazol 400mg/10ml',
            quantidade: '3',
            unidade: 'FRASCO',
            posologia: '1 FRASCO AO DIA POR 3 DIAS',
            via: 'VO',
            controlado: false,
            obs: 'Pediátrico.',
          },
          {
            nome: 'Tiabendazol pomada',
            quantidade: '1',
            unidade: 'BISNAGA',
            posologia: 'APLICAR 3X AO DIA POR 5 DIAS',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'oxiuriase-crianca',
    nome: 'Oxiuríase — Criança',
    categoria: 'pediatria',
    resumo: 'Parasitose por Enterobius — 2 esquemas.',
    protocolos: [
      {
        id: 'oxiuriase-crianca-1',
        titulo: 'Esquema 1',
        itens: [
          {
            nome: 'Pamoato de Pirvínio suspensão',
            quantidade: null,
            unidade: 'FRASCO',
            posologia: '1 ML/KG, DOSE ÚNICA',
            via: 'VO',
            controlado: false,
            obs: 'Pediátrico. Repetir após algumas semanas.',
          },
        ],
      },
      {
        id: 'oxiuriase-crianca-2',
        titulo: 'Esquema 2',
        itens: [
          {
            nome: 'Albendazol suspensão',
            quantidade: '1',
            unidade: 'FRASCO',
            posologia: 'DOSE ÚNICA',
            via: 'VO',
            controlado: false,
            obs: 'Pediátrico. Repetir após algumas semanas.',
          },
        ],
      },
    ],
  },
  {
    id: 'pediculose-crianca',
    nome: 'Pediculose — Criança',
    categoria: 'pediatria',
    resumo: 'Infestação por piolhos — esquema por faixa etária.',
    protocolos: [
      {
        id: 'pediculose-menor2',
        titulo: '< 2 anos',
        itens: [
          {
            nome: 'Dexclorfeniramina xarope',
            quantidade: null,
            unidade: 'FRASCO',
            posologia: 'CONFORME PESO',
            via: 'VO',
            controlado: false,
            obs: 'Pediátrico.',
          },
        ],
      },
      {
        id: 'pediculose-maior2',
        titulo: '> 2 anos',
        itens: [
          {
            nome: 'Ivermectina',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PESO',
            via: 'VO',
            controlado: false,
            obs: 'Pediátrico.',
          },
        ],
      },
      {
        id: 'pediculose-topico',
        titulo: 'Uso externo (ambas faixas)',
        itens: [
          {
            nome: 'Permetrina 1% loção (Kwell)',
            quantidade: '1',
            unidade: 'FRASCO',
            posologia: 'AGIR POR 10 MIN, LAVAR E REPETIR EM 7 DIAS',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'tonsilite-crianca',
    nome: 'Tonsilite — Criança',
    categoria: 'pediatria',
    resumo: '2 esquemas com antibiótico suspensão.',
    protocolos: [
      {
        id: 'tonsilite-crianca-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Amoxicilina 250mg/5ml (ou Amoxicilina+Clavulanato suspensão)',
            quantidade: null,
            unidade: 'FRASCO',
            posologia: 'CONFORME PESO, POR 7 DIAS',
            via: 'VO',
            controlado: false,
            obs: 'Pediátrico.',
          },
          {
            nome: 'Dipirona gotas',
            quantidade: null,
            unidade: 'FRASCO',
            posologia: 'SE DOR OU FEBRE',
            via: 'VO',
            controlado: false,
            obs: 'Pediátrico.',
          },
        ],
      },
    ],
  },
  {
    id: 'urticaria-crianca',
    nome: 'Urticária — Criança',
    categoria: 'pediatria',
    resumo: 'Reação alérgica cutânea pediátrica.',
    protocolos: [
      {
        id: 'urticaria-crianca-oral',
        titulo: 'Uso oral',
        itens: [
          {
            nome: 'Dexclorfeniramina xarope + Prednisolona xarope',
            quantidade: null,
            unidade: 'FRASCO',
            posologia: 'CONFORME PESO, POR 5 DIAS',
            via: 'VO',
            controlado: false,
            obs: 'Pediátrico.',
          },
        ],
      },
      {
        id: 'urticaria-crianca-emergencia',
        titulo: 'Emergência',
        itens: [
          {
            nome: 'Epinefrina 1:1000 SC',
            quantidade: null,
            unidade: 'AMP',
            posologia: '0,01 ML/KG, DOSE ÚNICA',
            via: 'SC',
            controlado: false,
            obs: 'Pediátrico — uso emergencial.',
          },
        ],
      },
    ],
  },
  {
    id: 'vermifugo-crianca',
    nome: 'Vermífugo — Criança',
    categoria: 'pediatria',
    resumo: 'Esquemas de desverminação pediátrica (1, 2 e 3).',
    protocolos: [
      {
        id: 'vermifugo-crianca-padrao',
        titulo: 'Esquema geral',
        itens: [
          {
            nome: 'Albendazol ou Mebendazol + Metronidazol',
            quantidade: null,
            unidade: 'CPR/SUSP',
            posologia: 'CONFORME ESQUEMA E PESO',
            via: 'VO',
            controlado: false,
            obs: 'Pediátrico. Associar Sulfato Ferroso ou Ultrafer/Nutrinfan.',
          },
        ],
      },
    ],
  },
  {
    id: 'virose-crianca',
    nome: 'Virose — Criança',
    categoria: 'pediatria',
    resumo: 'Quadro viral pediátrico com sintomáticos.',
    protocolos: [
      {
        id: 'virose-crianca-oral',
        titulo: 'Uso oral',
        itens: [
          {
            nome: 'Dipirona gotas + Bromoprida gotas',
            quantidade: null,
            unidade: 'FRASCO',
            posologia: 'CONFORME PESO, POR 3 DIAS',
            via: 'VO',
            controlado: false,
            obs: 'Pediátrico.',
          },
        ],
      },
      {
        id: 'virose-crianca-unidade',
        titulo: 'Na unidade',
        itens: [
          {
            nome: 'SF 0,9% + Metoclopramida EV',
            quantidade: null,
            unidade: null,
            posologia: 'APLICAÇÃO NA UNIDADE',
            via: 'EV',
            controlado: false,
            obs: 'Pediátrico.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────
  // 🍽️ GASTROENTEROLOGIA E PROCTOLOGIA
  // ─────────────────────────────
  {
    id: 'colelitiase',
    nome: 'Colelitíase',
    categoria: 'gastroenterologia',
    resumo: 'Cálculos biliares.',
    protocolos: [
      {
        id: 'colelitiase-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Ácido Ursodesoxicólico 300mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: '1 CP APÓS O CAFÉ E APÓS O JANTAR, TODOS OS DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'colica-biliar',
    nome: 'Cólica Biliar / Litíase Biliar',
    categoria: 'gastroenterologia',
    resumo: 'Dor biliar aguda.',
    protocolos: [
      {
        id: 'colica-biliar-oral',
        titulo: 'Uso oral',
        itens: [
          {
            nome: 'Buscopan Composto',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'DE 6/6H',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Ibuprofeno 300mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'DE 12/12H',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Tramadol 50mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'DE 8/8H SE DOR INTENSA',
            via: 'VO',
            controlado: true,
            obs: null,
          },
          {
            nome: 'Ondansetrona 8mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'DE 8/8H',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'colica-biliar-unidade',
        titulo: 'Na unidade',
        itens: [
          {
            nome: 'Dipirona + Buscopan Composto EV',
            quantidade: null,
            unidade: null,
            posologia: 'APLICAÇÃO NA UNIDADE',
            via: 'EV',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'constipacao-funcional',
    nome: 'Constipação Funcional',
    categoria: 'gastroenterologia',
    resumo: 'Constipação intestinal — laxativos + orientações.',
    protocolos: [
      {
        id: 'constipacao-oral',
        titulo: 'Uso oral',
        itens: [
          {
            nome: 'Lactulona xarope',
            quantidade: '1',
            unidade: 'FRASCO',
            posologia: 'TOMAR 15ML VO 1X AO DIA, PODE AUMENTAR ATÉ 30ML/DIA CONFORME RESPOSTA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Óleo Mineral',
            quantidade: '1',
            unidade: 'FRASCO',
            posologia: 'TOMAR 15ML VO DE 8/8H POR ATÉ 7 DIAS SE FEZES ENDURECIDAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'constipacao-unidade',
        titulo: 'Na unidade (se necessário)',
        itens: [
          {
            nome: 'Fosfato de Sódio (Fleet Enema)',
            quantidade: '1',
            unidade: 'FRASCO',
            posologia: 'APLICAR 1 ENEMA VIA RETAL, DOSE ÚNICA',
            via: 'Retal',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'dispepsia-funcional',
    nome: 'Dispepsia Funcional / Síndrome Dispéptica',
    categoria: 'gastroenterologia',
    resumo: 'Desconforto digestivo funcional.',
    protocolos: [
      {
        id: 'dispepsia-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Omeprazol 20mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'EM JEJUM',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Domperidona (ou Bromoprida ou Hidróxido de Alumínio)',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'gastrite-drge',
    nome: 'Gastrite / DRGE / Dor no Estômago',
    categoria: 'gastroenterologia',
    resumo: 'Doença do refluxo / gastrite.',
    protocolos: [
      {
        id: 'gastrite-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Omeprazol 20mg',
            quantidade: '30',
            unidade: 'CPR',
            posologia: 'EM JEJUM, POR 30 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Bromoprida 10mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Escopolamina + Dipirona',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE DOR',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'geca',
    nome: 'GECA (Gastroenterite Aguda)',
    categoria: 'gastroenterologia',
    resumo: 'Gastroenterite aguda — sintomáticos + SRO. Antibiótico se invasiva.',
    protocolos: [
      {
        id: 'geca-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Omeprazol 20mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Enterogermina',
            quantidade: null,
            unidade: 'FRASCO',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Ondansetrona 8mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Escopolamina + Dipirona',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE DOR',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Sais de Reidratação Oral (SRO)',
            quantidade: null,
            unidade: 'ENVELOPE',
            posologia: 'CONFORME NECESSIDADE',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'geca-invasiva',
        titulo: 'Se diarreia invasiva',
        itens: [
          {
            nome: 'Ciprofloxacino 500mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'hemorroida',
    nome: 'Hemorroida',
    categoria: 'gastroenterologia',
    resumo: 'Doença hemorroidária.',
    protocolos: [
      {
        id: 'hemorroida-oral',
        titulo: 'Uso interno',
        itens: [
          {
            nome: 'Óleo Mineral',
            quantidade: '1',
            unidade: 'FRASCO',
            posologia: 'CONFORME NECESSIDADE',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Daflon',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO MÉDICA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Ibuprofeno + Dipirona',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE DOR',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'hemorroida-topico',
        titulo: 'Uso tópico',
        itens: [
          {
            nome: 'Proctyl pomada',
            quantidade: '1',
            unidade: 'BISNAGA',
            posologia: 'APLICAR CONFORME NECESSIDADE',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'h-pylori',
    nome: 'H. Pylori',
    categoria: 'gastroenterologia',
    resumo: 'Erradicação — esquema tríplice, 7 dias.',
    protocolos: [
      {
        id: 'h-pylori-1',
        titulo: 'Esquema 1',
        itens: [
          {
            nome: 'Amoxicilina 500mg',
            quantidade: '21',
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO, POR 7 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Claritromicina 500mg',
            quantidade: '14',
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO, POR 7 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Omeprazol 20mg',
            quantidade: '14',
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO, POR 7 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'h-pylori-2',
        titulo: 'Esquema 2 — alergia a penicilina',
        itens: [
          {
            nome: 'Metronidazol 250mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO, POR 7 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Claritromicina 500mg',
            quantidade: '14',
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO, POR 7 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Omeprazol 20mg',
            quantidade: '14',
            unidade: 'CPR',
            posologia: 'CONFORME PRESCRIÇÃO, POR 7 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'intoxicacao-alimentar',
    nome: 'Intoxicação Alimentar Leve',
    categoria: 'gastroenterologia',
    resumo: 'Quadro gastrointestinal agudo leve.',
    protocolos: [
      {
        id: 'intoxicacao-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Dipirona 500mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE DOR OU FEBRE',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Metoclopramida 10mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'SE NÁUSEA',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Soro Caseiro',
            quantidade: null,
            unidade: null,
            posologia: 'CONFORME NECESSIDADE',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'nauseas-vomitos-severos',
    nome: 'Náuseas e Vômitos Severos (Adultos)',
    categoria: 'gastroenterologia',
    resumo: 'Quadro emético intenso em adultos.',
    protocolos: [
      {
        id: 'nauseas-severos-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Ondansetrona 8mg',
            quantidade: '9',
            unidade: 'CPR',
            posologia: '1 CP DE 8/8H POR 3 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'ulcera-peptica',
    nome: 'Úlcera Péptica Duodenal',
    categoria: 'gastroenterologia',
    resumo: 'Úlcera duodenal — IBP em jejum por período prolongado.',
    protocolos: [
      {
        id: 'ulcera-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Omeprazol 20mg',
            quantidade: '42',
            unidade: 'CPR',
            posologia: '1 CP EM JEJUM POR 42 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────
  // ❤️ CARDIOLOGIA, ENDOCRINOLOGIA E VASCULAR
  // ─────────────────────────────
  {
    id: 'anemia-ferropriva',
    nome: 'Anemia Ferropriva Sintomática (D50.0)',
    categoria: 'cardiologia',
    resumo: 'Reposição de ferro em adulto.',
    protocolos: [
      {
        id: 'anemia-ferropriva-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Sulfato Ferroso 120mg',
            quantidade: '1',
            unidade: 'CX',
            posologia: 'TOMAR 1 CP VO DE 12/12H POR NO MÍNIMO 3 MESES',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'crise-hipertensiva',
    nome: 'Crise Hipertensiva (I10 + R03.0)',
    categoria: 'cardiologia',
    resumo: 'Elevação aguda da PA — esquema oral de resgate.',
    protocolos: [
      {
        id: 'crise-hipertensiva-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Captopril 25mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'TOMAR 1 CP VO. REPETIR EM 1H SE PRESSÃO NÃO REDUZIR',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'crise-hipertensiva-alternativo',
        titulo: 'Alternativa',
        itens: [
          {
            nome: 'Clonidina 0,1mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'TOMAR 1 COMPRIMIDO VIA ORAL',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'crise-hipertensiva-congestao',
        titulo: 'Se congestão/edema',
        itens: [
          {
            nome: 'Furosemida 40mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'TOMAR 01 CP VIA ORAL',
            via: 'VO',
            controlado: false,
            obs: 'Manter uso correto dos anti-hipertensivos e retornar com clínico/cardiologista para ajuste.',
          },
        ],
      },
    ],
  },
  {
    id: 'hiperglicemia-dm2',
    nome: 'Hiperglicemia / Descompensação do DM2 (E11.9)',
    categoria: 'cardiologia',
    resumo: 'Manejo agudo de hiperglicemia na unidade.',
    protocolos: [
      {
        id: 'hiperglicemia-unidade',
        titulo: 'Na unidade',
        itens: [
          {
            nome: 'Dipirona 1g IM (se dor)',
            quantidade: '1',
            unidade: 'AMP',
            posologia: 'APLICAÇÃO NA UNIDADE',
            via: 'IM',
            controlado: false,
            obs: null,
          },
          {
            nome: 'SF 0,9% EV 500mL',
            quantidade: '1',
            unidade: 'FRASCO',
            posologia: 'CASO DE DESIDRATAÇÃO MODERADA',
            via: 'EV',
            controlado: false,
            obs: 'Investigar causas secundárias ou aderência ao tratamento.',
          },
        ],
      },
    ],
  },
  {
    id: 'hipoglicemia',
    nome: 'Hipoglicemia Sintomática (E16.2)',
    categoria: 'cardiologia',
    resumo: 'Emergência — correção rápida da glicemia.',
    protocolos: [
      {
        id: 'hipoglicemia-unidade',
        titulo: 'Na unidade',
        itens: [
          {
            nome: 'Glicose 50% EV (1 ampola 20mL)',
            quantidade: '1',
            unidade: 'AMP',
            posologia: 'INFUNDIR LENTO (10-15MIN) DILUÍDA EM 100ML DE SF 0,9% EV',
            via: 'EV',
            controlado: false,
            obs: 'Se paciente sintomático — tremores, queda de consciência, sudorese.',
          },
        ],
      },
    ],
  },
  {
    id: 'has-descompensada',
    nome: 'Hipertensão Arterial Descompensada (I10)',
    categoria: 'cardiologia',
    resumo: 'Manejo agudo na unidade com reavaliação em 1h.',
    protocolos: [
      {
        id: 'has-descompensada-unidade',
        titulo: 'Na unidade',
        itens: [
          {
            nome: 'Captopril 25mg VO + Dipirona 1g IM',
            quantidade: null,
            unidade: null,
            posologia: 'APLICAÇÃO NA UNIDADE',
            via: 'VO/IM',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Furosemida 40mg',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'TOMAR 01 CP VIA ORAL SE CONGESTÃO/EDEMA (avaliar função renal)',
            via: 'VO',
            controlado: false,
            obs: 'Retorno em 1h para reavaliação.',
          },
        ],
      },
    ],
  },
  {
    id: 'hipertireoidismo',
    nome: 'Hipertireoidismo',
    categoria: 'cardiologia',
    resumo: '2 esquemas de tionamida + betabloqueador.',
    protocolos: [
      {
        id: 'hipertireoidismo-1',
        titulo: 'Esquema 1',
        itens: [
          {
            nome: 'Tiamazol 5mg (Tapazol)',
            quantidade: '50',
            unidade: 'CPR',
            posologia: 'TOMAR 1 CP VO DE 8/8H POR 15 DIAS E RETORNAR PARA REAVALIAÇÃO',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Propranolol 40mg',
            quantidade: '30',
            unidade: 'CPR',
            posologia: 'TOMAR 1 CP VO DE 12/12H POR 15 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'hipertireoidismo-2',
        titulo: 'Esquema 2',
        itens: [
          {
            nome: 'Propiltiouracil 100mg (Propil)',
            quantidade: '60',
            unidade: 'CPR',
            posologia: 'TOMAR 1 CP VO DE 8/8H POR 20 DIAS E RETORNAR PARA REAVALIAÇÃO',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Propranolol 40mg',
            quantidade: '40',
            unidade: 'CPR',
            posologia: 'TOMAR 1 CP VO DE 12/12H POR 20 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'hipotireoidismo',
    nome: 'Hipotireoidismo',
    categoria: 'cardiologia',
    resumo: 'Reposição hormonal com levotiroxina.',
    protocolos: [
      {
        id: 'hipotireoidismo-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Levotiroxina 50mcg',
            quantidade: '60',
            unidade: 'CPR',
            posologia: 'TOMAR 1 CP VO EM JEJUM, 1H ANTES DO CAFÉ DA MANHÃ, TODOS OS DIAS',
            via: 'VO',
            controlado: false,
            obs: 'Uso contínuo.',
          },
        ],
      },
    ],
  },
  {
    id: 'insuficiencia-venosa',
    nome: 'Insuficiência Venosa Crônica',
    categoria: 'cardiologia',
    resumo: 'Manejo com meia compressiva — não farmacológico.',
    protocolos: [
      {
        id: 'insuficiencia-venosa-padrao',
        titulo: 'Orientações',
        itens: [
          {
            nome: 'Meia Compressiva Kendall (média compressão)',
            quantidade: null,
            unidade: null,
            posologia: 'CALÇAR PELA MANHÃ ANTES DE LEVANTAR-SE. USAR DURANTE TODO O DIA.',
            via: null,
            controlado: false,
            obs: 'Elevar as pernas por 15 min antes de retirar as meias, se necessário.',
          },
        ],
      },
    ],
  },
  {
    id: 'varizes-mmii',
    nome: 'Varizes dos Membros Inferiores (I83.9)',
    categoria: 'cardiologia',
    resumo: 'Insuficiência venosa com varizes visíveis.',
    protocolos: [
      {
        id: 'varizes-oral',
        titulo: 'Uso oral',
        itens: [
          {
            nome: 'Flavonóide (Daflon 500mg ou similar)',
            quantidade: null,
            unidade: 'CPR',
            posologia: 'TOMAR 01 CP VO DE 12/12H POR 30 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'varizes-topico',
        titulo: 'Uso tópico (se dor local)',
        itens: [
          {
            nome: 'Mucopolissacarídeo Polissulfato 3mg/g (Hirudoid)',
            quantidade: '1',
            unidade: 'BISNAGA',
            posologia: 'APLICAR FINA CAMADA 2X/DIA NAS PERNAS',
            via: 'Tópico',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────
  // 🤰 OBSTETRÍCIA / PRÉ-NATAL / DIVERSOS
  // ─────────────────────────────
  {
    id: 'nauseas-gestante',
    nome: 'Náuseas e Vômitos (Gestantes)',
    categoria: 'obstetricia',
    resumo: 'Enjoo gravídico.',
    protocolos: [
      {
        id: 'nauseas-gestante-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Dimenidrinato 50mg + Piridoxina 10mg (Dramin B6)',
            quantidade: '20',
            unidade: 'CPR',
            posologia: 'TOMAR 1 CP VO A CADA 8H POR 7 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'pre-natal-vitaminas',
    nome: 'Pré-Natal (Vitaminas)',
    categoria: 'obstetricia',
    resumo: 'Suplementação de rotina no pré-natal.',
    protocolos: [
      {
        id: 'pre-natal-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Ácido Fólico 0,4mg',
            quantidade: '30',
            unidade: 'CPR',
            posologia: 'TOMAR 1 CP VO 1X AO DIA POR 30 DIAS',
            via: 'VO',
            controlado: false,
            obs: 'Tomar com estômago vazio, 1h antes do almoço, com água ou suco de laranja. Não tomar com leite.',
          },
          {
            nome: 'Sulfato Ferroso 300mg',
            quantidade: '30',
            unidade: 'CPR',
            posologia: 'TOMAR 1 CP VO 1X AO DIA POR 30 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
      {
        id: 'pre-natal-alto-risco',
        titulo: 'Alto risco (prevenção de malformações/recidivas)',
        itens: [
          {
            nome: 'Ácido Fólico 5mg',
            quantidade: '30',
            unidade: 'CPR',
            posologia: 'TOMAR 1 CP VO 1X AO DIA POR 30 DIAS',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'gestante-hipertensa',
    nome: 'Gestante Hipertensa',
    categoria: 'obstetricia',
    resumo: 'Anti-hipertensivo seguro na gestação + reposição de ferro.',
    protocolos: [
      {
        id: 'gestante-hipertensa-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Metildopa 250mg',
            quantidade: '180',
            unidade: 'CPR',
            posologia: 'TOMAR 2 CP VO DE 8/8H. USO CONTÍNUO',
            via: 'VO',
            controlado: false,
            obs: null,
          },
          {
            nome: 'Sulfato Ferroso 40mg',
            quantidade: '60',
            unidade: 'CPR',
            posologia: 'TOMAR 1 COMPRIMIDO 30 MINUTOS ANTES DO ALMOÇO',
            via: 'VO',
            controlado: false,
            obs: null,
          },
        ],
      },
    ],
  },
  {
    id: 'anticoncepcional-mensal',
    nome: 'Anticoncepcional Injetável Mensal',
    categoria: 'obstetricia',
    resumo: 'Contracepção hormonal mensal — checar contraindicações antes.',
    protocolos: [
      {
        id: 'anticoncepcional-padrao',
        titulo: 'Esquema padrão',
        itens: [
          {
            nome: 'Noretisterona Enantato + Valerato de Estradiol (Noregyna)',
            quantidade: '1',
            unidade: 'AMP',
            posologia: 'FAZER 1 AMPOLA IM (GLÚTEO OU REGIÃO VENTROGLÚTEA) A CADA 30 DIAS',
            via: 'IM',
            controlado: false,
            obs: 'Antes de prescrever, confirmar: PA normal, ausência de enxaqueca com aura, história de trombose ou suspeita de gravidez. Válido por até 6 meses.',
          },
        ],
      },
    ],
    },
];

// ============================================================
// NOTA: os últimos blocos "alta internação" e a prescrição
// avulsa (Nistatina/Loratadina/Dipirona/Nimesulida/Albendazol)
// não foram incluídos como "doenças" porque são combos de alta
// hospitalar / receitas genéricas, não protocolos por condição.
// Se quiser, dá pra criar uma categoria separada tipo
// "kits-alta" ou incorporá-los na tela de RECEITAS já existente.
// ============================================================