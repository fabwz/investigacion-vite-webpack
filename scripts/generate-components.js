import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, '..', 'src', 'components', 'generated');
const COMPONENT_COUNT = 120;

function pad(num) {
  return String(num).padStart(3, '0');
}

function componentTemplate(index) {
  const id = pad(index);
  const price = (index * 3.5).toFixed(2);

  return `export function createItem${id}() {
  const el = document.createElement('div');
  el.className = 'card';
  el.textContent = 'Item ${id} - $${price}';
  return el;
}
`;
}

function generateComponents() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (let i = 1; i <= COMPONENT_COUNT; i++) {
    const fileName = `item${pad(i)}.js`;
    const filePath = path.join(OUTPUT_DIR, fileName);
    fs.writeFileSync(filePath, componentTemplate(i), 'utf8');
  }

  console.log(`Generados ${COMPONENT_COUNT} componentes en ${OUTPUT_DIR}`);
}

generateComponents();
