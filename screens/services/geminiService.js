// geminiService.js

const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-20b";

// ============================================================
// FUNÇÃO GENÉRICA PARA GROQ
// ============================================================

const chamarGroq = async (systemPrompt, userPrompt, temperature = 0.2) => {
  try {
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY.trim()}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature,
      }),
    });

    const data = await response.json();

    if (!response.ok || data?.error) {
      const mensagem = data?.error?.message || `Erro HTTP ${response.status}`;
      console.error("Erro da Groq:", mensagem);
      alert(`Erro na Groq:\n${mensagem}`);
      return null;
    }

    const texto = data?.choices?.[0]?.message?.content;

    if (!texto) {
      console.error("A Groq não retornou conteúdo:", data);
      alert("A IA não retornou uma resposta.");
      return null;
    }

    return texto.trim();
  } catch (error) {
    console.error("Erro na requisição para Groq:", error);
    alert("Erro de conexão ao comunicar com a IA.");
    return null;
  }
};

// Padrão comum às duas funções abaixo: chama a Groq, se der certo
// devolve em maiúsculas, se falhar devolve o fallback original.
const chamarGroqMaiusculo = async (systemPrompt, userPrompt, fallback) => {
  const resultado = await chamarGroq(systemPrompt, userPrompt);
  return resultado ? resultado.toUpperCase() : fallback;
};

// ============================================================
// MELHORAR HDA
// ============================================================

export const melhorarHDA = async (rascunhoHda, contextoGeral = '') => {
  if (!rascunhoHda || rascunhoHda.trim() === '') {
    return rascunhoHda;
  }

  const systemPrompt = `
Você é um assistente médico especializado em documentação clínica e prontuários eletrônicos.
Sua função é auxiliar o médico na redação da História da Doença Atual (HDA).
Você NÃO deve inventar informações clínicas.
Preserve rigorosamente os dados fornecidos pelo médico.
Não crie sintomas, sinais, diagnósticos, medicações, doses, exames ou resultados
que não estejam presentes no texto original.
Apenas organize e melhore a redação.
`;

  const userPrompt = `
Reescreva a HDA abaixo em linguagem médica formal, clara, objetiva e bem estruturada.

Rascunho da HDA:
${rascunhoHda}

Contexto da consulta:
${contextoGeral}

REGRAS:
1. Utilize terceira pessoa.
2. Preserve todos os dados clínicos fornecidos pelo médico.
3. Não invente informações.
4. Organize os acontecimentos de forma cronológica quando houver dados para isso.
5. Mantenha duração, localização, intensidade, características, fatores
   de melhora/piora e sintomas associados quando presentes.
6. Não acrescente diagnóstico ou hipótese diagnóstica que não esteja no texto.
7. Retorne somente a HDA final.
8. Não escreva explicações, comentários, títulos ou observações.
9. Retorne em LETRAS MAIÚSCULAS.
`;

  return chamarGroqMaiusculo(systemPrompt, userPrompt, rascunhoHda);
};

// ============================================================
// FORMULAR PLANO
// ============================================================

export const formularPlano = async (subjetivo, objetivo, avaliacao, contextoGeral = '') => {
  const semConteudo =
    (!subjetivo || !subjetivo.trim()) &&
    (!objetivo || !objetivo.trim()) &&
    (!avaliacao || !avaliacao.trim());

  if (semConteudo) {
    alert("PREENCHA PELO MENOS O SUBJETIVO, OBJETIVO OU AVALIAÇÃO ANTES DE FORMULAR O PLANO.");
    return '';
  }

  const systemPrompt = `
VOCÊ É UM ASSISTENTE DE DOCUMENTAÇÃO MÉDICA.
SUA FUNÇÃO É ORGANIZAR O CAMPO PLANO (P) DO SOAP.

NÃO FAÇA RACIOCÍNIO CLÍNICO PARA CRIAR NOVAS CONDUTAS.
NÃO COMPLETE O PLANO COM CONDUTAS QUE NÃO FORAM INFORMADAS.

REGRA PRINCIPAL:
NÃO INVENTE NENHUMA INFORMAÇÃO, MEDICAMENTO, DOSE, EXAME, ENCAMINHAMENTO OU PRAZO.
NÃO ALTERE MEDICAMENTOS DE USO CONTÍNUO DO PACIENTE.
NÃO INICIE, SUSPENDA OU AJUSTE MEDICAMENTOS.
NÃO CRIE PRESCRIÇÕES.
NÃO CRIE EXAMES.
NÃO CRIE ENCAMINHAMENTOS.
NÃO CRIE PRAZOS DE RETORNO.
NÃO CRIE ORIENTAÇÕES SOBRE DIETA, EXERCÍCIO, GLICEMIA OU OUTROS CUIDADOS
ESPECÍFICOS QUE NÃO ESTEJAM EXPRESSAMENTE PRESENTES NOS DADOS.

O PLANO DEVE SER CONSTRUÍDO A PARTIR DAS CONDUTAS QUE JÁ APARECEM NO SOAP.

FORMATO OBRIGATÓRIO:

ORIENTAÇÕES GERAIS
[ORIENTAÇÃO]

PRESCREVO
[MEDICAMENTOS/CONDUTAS EXPLICITAMENTE INFORMADOS]

OUTRAS CATEGORIAS SOMENTE DEVEM APARECER SE A RESPECTIVA CONDUTA ESTIVER
EXPLICITAMENTE PRESENTE NOS DADOS.
NÃO É OBRIGATÓRIO PREENCHER TODAS AS CATEGORIAS.

NÃO ESCREVA "SE NECESSÁRIO".
NÃO ESCREVA "SE INDICADO".
NÃO ESCREVA "CONFORME NECESSIDADE".
NÃO ESCREVA "QUANDO INDICADO".
NÃO ESCREVA EXPLICAÇÕES.
NÃO REPITA S, O OU A.
ESCREVA EM MAIÚSCULAS.
MÁXIMO DE 700 CARACTERES.
RETORNE SOMENTE O PLANO.

REGRAS CRÍTICAS SOBRE MEDICAMENTOS:
OS MEDICAMENTOS CITADOS NO SUBJETIVO, OBJETIVO OU HISTÓRIA DO PACIENTE
REPRESENTAM APENAS MEDICAMENTOS QUE O PACIENTE JÁ UTILIZA.

NUNCA TRANSFORME UM MEDICAMENTO CITADO COMO "USA", "FAZ USO", "EM USO",
"TOMA", "UTILIZA" OU EXPRESSÃO SEMELHANTE EM UMA PRESCRIÇÃO.
NUNCA ESCREVA "CONTINUAR USO DE..." APENAS PORQUE UM MEDICAMENTO FOI
CITADO NO SUBJETIVO.
NUNCA COLOQUE ESSES MEDICAMENTOS NO CAMPO "PRESCREVO".

O CAMPO "PRESCREVO" SÓ PODE CONTER MEDICAMENTOS QUE ESTIVEREM
EXPLICITAMENTE PRESENTES EM "CONDUTAS/PRESCRIÇÕES INFORMADAS PELO MÉDICO".
SE NÃO EXISTIR UMA PRESCRIÇÃO INFORMADA PELO MÉDICO, NÃO CRIE O BLOCO "PRESCREVO".
`;

  const userPrompt = `
ELABORE O PLANO DESTE SOAP.

SUBJETIVO:
${subjetivo || '[NÃO INFORMADO]'}

OBJETIVO:
${objetivo || '[NÃO INFORMADO]'}

AVALIAÇÃO:
${avaliacao || '[NÃO INFORMADA]'}

ATENÇÃO:
OS MEDICAMENTOS MENCIONADOS NO SUBJETIVO SÃO APENAS MEDICAMENTOS DE USO PRÉVIO.
NÃO PRESCREVA NENHUM MEDICAMENTO COM BASE APENAS NO FATO DE ELE ESTAR
SENDO UTILIZADO PELO PACIENTE.
NÃO ESCREVA "CONTINUAR GLIBENCLAMIDA", "CONTINUAR METFORMINA" OU
CONDUTA SEMELHANTE.
NÃO CRIE MEDICAMENTOS, DOSES OU TRATAMENTOS.

NESTA ETAPA, GERE SOMENTE ORIENTAÇÕES GERAIS RELACIONADAS AO CASO E
CONDUTAS QUE ESTEJAM EXPLICITAMENTE PRESENTES NOS DADOS.

COMECE COM:
ORIENTAÇÕES GERAIS

RETORNE SOMENTE O PLANO.
`;

  return chamarGroqMaiusculo(systemPrompt, userPrompt, '');
};