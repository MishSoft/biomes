const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\misho\\Desktop\\biomes\\src\\assets\\22.svg', 'utf8');

// Print first 1000 characters of 22.svg to see the structure
console.log('--- 22.svg first 1000 chars ---');
console.log(content.substring(0, 1000));
console.log('-------------------------------');

// Let's count how many group tags have IDs
const gTagRegex = /<g([^>]*?)>/g;
let match;
const gGroups = [];
while ((match = gTagRegex.exec(content)) !== null) {
  const body = match[1];
  const idMatch = body.match(/id="([^"]+)"/);
  if (idMatch) {
    gGroups.push(idMatch[1]);
  }
}
console.log('Group IDs found in 22.svg (first 30):', gGroups.slice(0, 30));
console.log('Total group IDs:', gGroups.length);
