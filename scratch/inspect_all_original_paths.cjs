const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\misho\\Desktop\\biomes\\src\\assets\\Vegetation-no-legend.svg', 'utf8');

const pathTagRegex = /<path([^>]*?)\/>/g;
let match;
while ((match = pathTagRegex.exec(content)) !== null) {
  const body = match[1];
  const idMatch = body.match(/id="([^"]+)"/);
  const fillMatch = body.match(/fill="([^"]+)"/);
  console.log(`Original SVG path -> id: ${idMatch ? idMatch[1] : 'unknown'}, fill: ${fillMatch ? fillMatch[1] : 'none'}`);
}
