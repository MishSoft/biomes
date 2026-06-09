const fs = require('fs');
const path = require('path');

function parseSVG(filename) {
  const filePath = path.join('c:\\Users\\misho\\Desktop\\biomes\\src\\assets', filename);
  if (!fs.existsSync(filePath)) {
    console.log(`${filename} does not exist`);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  
  const pathTagRegex = /<path([^>]*?)\/>/g;
  let match;
  const paths = [];
  
  while ((match = pathTagRegex.exec(content)) !== null) {
    const body = match[1];
    const idMatch = body.match(/id="([^"]+)"/);
    const id = idMatch ? idMatch[1] : 'unknown';
    
    let fill = 'none';
    const styleMatch = body.match(/style="([^"]+)"/);
    if (styleMatch) {
      const fillProp = styleMatch[1].split(';').find(p => p.trim().startsWith('fill:'));
      if (fillProp) {
        fill = fillProp.split(':')[1].trim();
      }
    }
    
    const fillAttrMatch = body.match(/fill="([^"]+)"/);
    if (fillAttrMatch) {
      fill = fillAttrMatch[1];
    }
    
    paths.push({ id, fill });
  }
  
  console.log(`Summary for ${filename}:`);
  console.log(`  Total paths: ${paths.length}`);
  const uniqueFills = new Set(paths.map(p => p.fill));
  console.log(`  Unique fills count: ${uniqueFills.size}`);
  
  // Show a few samples
  console.log(`  Sample paths (first 5):`, paths.slice(0, 5));
}

parseSVG('Vegetation-no-legend.svg');
parseSVG('22.svg');
