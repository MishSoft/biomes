const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\misho\\Desktop\\biomes\\src\\assets\\Vegetation-no-legend.svg', 'utf8');

const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
if (styleMatch) {
  console.log('Found style block! Length:', styleMatch[1].length);
  console.log('First 1000 characters of style block:');
  console.log(styleMatch[1].substring(0, 1000));
} else {
  console.log('No style block found in Vegetation-no-legend.svg');
}
