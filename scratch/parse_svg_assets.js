const fs = require('fs');
const path = require('path');

function parseSVG(filename) {
  const filePath = path.join('c:\\Users\\misho\\Desktop\\biomes\\src\\assets', filename);
  if (!fs.existsSync(filePath)) {
    console.log(`${filename} does not exist`);
    return;
  }
  console.log(`Parsing ${filename}...`);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Let's find paths and styles
  const pathTagRegex = /<path([^>]*?)\/>/g;
  let match;
  const paths = [];
  
  while ((match = pathTagRegex.exec(content)) !== null) {
    const body = match[1];
    const idMatch = body.match(/id="([^"]+)"/);
    const id = idMatch ? idMatch[1] : 'unknown';
    
    // Check style fill, or direct fill attribute
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
  
  console.log(`Total paths found: ${paths.length}`);
  console.log('First 20 paths:', paths.slice(0, 20));
  
  // Count unique fills
  const fillCounts = {};
  paths.forEach(p => {
    fillCounts[p.fill] = (fillCounts[p.fill] || 0) + 1;
  });
  console.log('Unique fills and their path counts:', fillCounts);
}

parseSVG('Vegetation-no-legend.svg');
parseSVG('22.svg');
