// geminiService.js

const GROQ_API_KEY = "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";

export const melhorarHDA = async (rascunhoHda, contextoGeral = '') => {
  if (!rascunhoHda || rascunhoHda.trim() === '') return rascunhoHda;

  const prompt = `
  Você é um assistente médico especialista em prontuários eletrônicos.
  Sua tarefa é reescrever o texto de História da Doença Atual (HDA) digitado pelo médico, transformando-o em um texto formal, altamente técnico e bem estruturado na norma culta médica do Português do Brasil.

  Rascunho digitado pelo médico: "${rascunhoHda}"
  Contexto/Título da Consulta: "${contextoGeral}"

  Regras:
  1. Mantenha o texto na terceira pessoa ("Paciente refere...", "Relata...").
  2. Mantenha a precisão dos dados (duração, dosagens, características da dor).
  3. Não invente sintomas que não foram citados.
  4. Retorne APENAS o texto da HDA melhorada, em MAIÚSCULAS, sem introduções, saudações ou explicações.
  `;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY.trim()}`
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: "Você é um assistente médico especialista." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2
      })
    });

    const data = await response.json();

    if (data.error) {
      alert(`Erro na Groq:\n${data.error.message}`);
      return rascunhoHda;
    }

    const textoGerado = data?.choices?.[0]?.message?.content;
    return textoGerado ? textoGerado.trim().toUpperCase() : rascunhoHda;

  } catch (error) {
    console.error("Erro na requisição para Groq:", error);
    alert("Erro de conexão ao comunicar com a IA.");
    return rascunhoHda;
  }
};