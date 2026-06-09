const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\misho\\Desktop\\biomes\\src\\assets\\Vegetation-no-legend.svg', 'utf8');

const svgTagMatch = content.match(/<svg([^>]*?)>/);
if (svgTagMatch) {
  console.log('SVG tag attributes in Vegetation-no-legend.svg:', svgTagMatch[1].trim());
} else {
  console.log('Could not find SVG tag');
}

const content2 = fs.readFileSync('c:\\Users\\misho\\Desktop\\biomes\\src\\assets\\22.svg', 'utf8');
const svgTagMatch2 = content2.match(/<svg([^>]*?)>/);
if (svgTagMatch2) {
  console.log('SVG tag attributes in 22.svg:', svgTagMatch2[1].trim());
} else {
  console.log('Could not find SVG tag in 22.svg');
}
