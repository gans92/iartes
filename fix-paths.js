const fs = require('fs');
const path = require('path');

const PREFIX = '/iartes';

// 1. Corrige o index.html
const htmlPath = 'dist/index.html';
if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  html = html.replace(/="\//g, `="${PREFIX}/`);
  fs.writeFileSync(htmlPath, html);
  
  // 2. Copia para 404.html (Evita tela branca / erro no F5)
  fs.copyFileSync(htmlPath, 'dist/404.html');
}

// 3. Corrige o bundle JS principal para ajustar o roteamento do React Navigation
const jsDir = 'dist/_expo/static/js/web';
if (fs.existsSync(jsDir)) {
  const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
  files.forEach(file => {
    const filePath = path.join(jsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Substitui links de assets e caminhos absolutos
    content = content.replace(/"\/assets\//g, `"${PREFIX}/assets/`);
    
    fs.writeFileSync(filePath, content);
  });
}

// 4. Arquivo de neutralização de gitignore e nojekyll
fs.writeFileSync('dist/.gitignore', '');
fs.writeFileSync('dist/.nojekyll', '');

console.log('✅ Caminhos, roteamento e 404.html corrigidos com sucesso!');