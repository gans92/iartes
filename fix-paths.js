const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const indexPath = path.join(distDir, 'index.html');
const path404 = path.join(distDir, '404.html');

if (fs.existsSync(indexPath)) {
  // Copia index.html para 404.html para o GitHub Pages não quebrar no F5
  fs.copyFileSync(indexPath, path404);
  console.log('✅ 404.html criado com sucesso!');
} else {
  console.error('❌ index.html não encontrado na pasta dist.');
}