const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\misho\\Desktop\\biomes\\src\\assets\\Vegetation-no-legend.svg', 'utf8');

// Let's find any text tags or metadata or comments
console.log('--- Searching for text/metadata/comments in Vegetation-no-legend.svg ---');
const textMatch = content.match(/<text[\s\S]*?<\/text>/g);
if (textMatch) {
  console.log(`Found ${textMatch.length} <text> tags!`);
  console.log('Sample <text> tags:', textMatch.slice(0, 5));
} else {
  console.log('No <text> tags found');
}

const commentMatch = content.match(/<!--[\s\S]*?-->/g);
if (commentMatch) {
  console.log(`Found ${commentMatch.length} comments!`);
  console.log('Sample comments:', commentMatch.slice(0, 5));
}

const titleMatch = content.match(/<title[\s\S]*?<\/title>/g);
if (titleMatch) {
  console.log(`Found ${titleMatch.length} <title> tags!`);
  console.log('Sample <title> tags:', titleMatch.slice(0, 5));
}

const labelMatch = content.match(/inkscape:label="([^"]+)"/g);
if (labelMatch) {
  console.log(`Found ${labelMatch.length} inkscape:label attributes!`);
  console.log('Sample labels:', labelMatch.slice(0, 10));
}
