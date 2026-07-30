const fs = require('fs');
const path = require('path');

const PREFIX = '/iartes';

// Corrige o index.html
const htmlPath = 'dist/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');
html = html.replace(/="\//g, `="${PREFIX}/`);
fs.writeFileSync(htmlPath, html);

// Corrige o bundle JS principal
const jsDir = 'dist/_expo/static/js/web';
const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
files.forEach(file => {
  const filePath = path.join(jsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/"\/assets\//g, `"${PREFIX}/assets/`);
  fs.writeFileSync(filePath, content);
});

// .gitignore vazio dentro de dist, para não herdar regras do .gitignore da raiz
fs.writeFileSync('dist/.gitignore', '');

fs.writeFileSync('dist/.nojekyll', '');
console.log('Caminhos corrigidos, .gitignore neutralizado e .nojekyll criado');
