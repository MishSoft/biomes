const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\misho\\Desktop\\biomes\\src\\assets\\Vegetation-no-legend.svg', 'utf8');

const pathTagRegex = /<path([^>]*?)\/>/g;
let match;
while ((match = pathTagRegex.exec(content)) !== null) {
  const body = match[1];
  const idMatch = body.match(/id="([^"]+)"/);
  const styleMatch = body.match(/style="([^"]+)"/);
  let fill = 'none';
  if (styleMatch) {
    const fillProp = styleMatch[1].split(';').find(p => p.trim().startsWith('fill:'));
    if (fillProp) {
      fill = fillProp.split(':')[1].trim();
    }
  }
  console.log(`id: ${idMatch ? idMatch[1] : 'unknown'}, fill: ${fill}`);
}
