const fs = require('fs');
const path = require('path');

// Obtener la ruta completa del archivo data.json
const dataFilePath = path.join(__dirname, 'utils', 'data.json');

// Leer y parsear los datos del archivo JSON
let comicsData = [];
try {
  const rawData = fs.readFileSync(dataFilePath, 'utf-8');
  comicsData = JSON.parse(rawData);
} catch (err) {
  console.error('Error reading data.json:', err);
}
