# CALC MED

Aplicativo de calculadoras médicas feito com React Native (Expo). Site publicado via GitHub Pages.

🔗 **Site online:** https://gans92.github.io/iartes/

## Sobre

App com calculadoras clínicas rápidas:
- Avaliação de Função Renal (Cockcroft-Gault)
- Gravidade de Pneumonia (Escore CURB-65)
- Escore de Glasgow
- Distúrbios Ácido-Base

## Rodando localmente

```bash
npm install
npm start
```

Isso abre o Expo. Escolha rodar no navegador (`w`), Android ou iOS.

## Publicando atualizações no site (GitHub Pages)

Sempre que você editar o código (telas, funcionalidades, etc.), siga estes passos:

### 1. Salvar o código no GitHub (branch `main`)

```bash
git add .
git commit -m "descreva o que voce mudou"
git push origin main
```

### 2. Publicar o site atualizado (branch `gh-pages`)

```bash
npm run deploy
```

Esse comando faz automaticamente:
1. Gera a versão web do app (`expo export --platform web`)
2. Corrige os caminhos dos arquivos para funcionar na subpasta `/iartes/`
3. Publica tudo na branch `gh-pages`, que é o que o GitHub Pages exibe

Depois de rodar, aguarde 1-3 minutos e acesse https://gans92.github.io/iartes/ (use `Ctrl+Shift+R` para recarregar sem cache, caso o navegador mostre a versão antiga).

## Detalhes tecnicos do deploy

Esse projeto usa o pacote gh-pages para publicar a pasta `dist/` (gerada pelo Expo) na branch `gh-pages`.

Como o site fica hospedado numa subpasta (`gans92.github.io/iartes/`, nao na raiz do dominio), foram feitos dois ajustes para os arquivos funcionarem corretamente:

- **fix-paths.js**: script que roda automaticamente antes do deploy (via `predeploy`). Ele corrige os caminhos absolutos no index.html e no bundle JavaScript adicionando o prefixo `/iartes`, cria um `.gitignore` vazio dentro de `dist/` (para a pasta `dist/assets/node_modules/` nao ser ignorada), e cria o arquivo `.nojekyll` (necessario porque o GitHub Pages usa Jekyll por padrao, que ignora pastas comecando com `_` como `_expo`)

- **package.json**: contem os scripts `predeploy` (roda o fix-paths.js apos o export) e `deploy` (publica com `gh-pages -d dist --dotfiles`)

Se algum dia migrar para um dominio proprio ou mudar o nome do repositorio, ajuste a constante PREFIX dentro de fix-paths.js.

## Requisitos

- Node.js 20 ou superior
- Conta no GitHub com acesso de push ao repositorio (autenticacao via token de acesso pessoal, nao senha)
